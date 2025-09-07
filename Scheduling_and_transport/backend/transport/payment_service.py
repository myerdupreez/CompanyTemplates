import hashlib
import urllib.parse
import requests
from django.conf import settings
from django.utils import timezone
from decimal import Decimal
import logging
import threading
import time

logger = logging.getLogger(__name__)

class PayFastPaymentService:
    """Service to handle PayFast payment processing"""
    
    @staticmethod
    def generate_signature(data, passphrase=''):
        """
        Generate PayFast signature for data validation
        
        Args:
            data: Dictionary of PayFast parameters
            passphrase: PayFast passphrase (optional for sandbox)
            
        Returns:
            str: MD5 signature
        """
        # Create parameter string
        param_string = ''
        for key in sorted(data.keys()):
            param_string += f'{key}={urllib.parse.quote_plus(str(data[key]))}&'
        
        # Remove last &
        param_string = param_string.rstrip('&')
        
        # Add passphrase if provided
        if passphrase:
            param_string += f'&passphrase={urllib.parse.quote_plus(passphrase)}'
        
        # Generate MD5 signature
        signature = hashlib.md5(param_string.encode()).hexdigest()
        return signature
    
    @staticmethod
    def create_payment_form_data(booking):
        """
        Create PayFast payment form data for a booking
        
        Args:
            booking: Booking instance
            
        Returns:
            dict: PayFast form data including signature
        """
        try:
            # Convert amount to cents (PayFast requires cents)
            amount_cents = f"{booking.total_amount_zar:.2f}"
            
            # Create PayFast data
            payfast_data = {
                'merchant_id': settings.PAYFAST_MERCHANT_ID,
                'merchant_key': settings.PAYFAST_MERCHANT_KEY,
                'return_url': settings.PAYFAST_RETURN_URL,
                'cancel_url': settings.PAYFAST_CANCEL_URL,
                'notify_url': settings.PAYFAST_NOTIFY_URL,
                
                # Transaction details
                'name_first': booking.passenger_name.split()[0] if booking.passenger_name else 'Passenger',
                'name_last': booking.passenger_name.split()[-1] if len(booking.passenger_name.split()) > 1 else '',
                'email_address': booking.passenger_email,
                'cell_number': booking.passenger_phone.replace(' ', '').replace('+', ''),
                
                # Payment details
                'amount': amount_cents,
                'item_name': f"Bus Ticket - {booking.schedule.route.name}",
                'item_description': f"Booking {booking.booking_reference} - {booking.schedule.route.origin} to {booking.schedule.route.destination}",
                
                # Custom fields for tracking
                'custom_int1': booking.id,
                'custom_str1': booking.booking_reference,
                'custom_str2': f"{booking.schedule.departure_time.strftime('%Y-%m-%d %H:%M')}",
                'custom_str3': booking.discount_type,
                
                # PayFast options
                'payment_method': 'cc',  # Credit card, EFT, etc.
            }
            
            # Generate signature
            signature = PayFastPaymentService.generate_signature(
                payfast_data, 
                settings.PAYFAST_PASSPHRASE
            )
            payfast_data['signature'] = signature
            
            # Update booking with PayFast reference
            booking.payfast_payment_id = f"PF_{booking.booking_reference}_{booking.id}"
            booking.payfast_payment_status = 'PENDING'  # Set PayFast status to PENDING
            booking.status = 'payment_processing'
            booking.save()
            
            # Simulate automatic payment confirmation after 5 seconds (for testing)
            PayFastPaymentService.simulate_payment_confirmation(booking.id, delay_seconds=5)
            
            logger.info(f"PayFast payment form created for booking {booking.booking_reference}")
            
            return {
                'form_data': payfast_data,
                'action_url': settings.PAYFAST_BASE_URL,
                'payment_id': booking.payfast_payment_id
            }
            
        except Exception as e:
            logger.error(f"Error creating PayFast payment for booking {booking.booking_reference}: {str(e)}")
            raise Exception(f"Payment setup failed: {str(e)}")
    
    @staticmethod
    def validate_webhook_data(post_data):
        """
        Validate PayFast webhook/ITN data
        
        Args:
            post_data: Dictionary of POST data from PayFast
            
        Returns:
            bool: True if valid, False otherwise
        """
        try:
            # Extract signature
            received_signature = post_data.get('signature')
            if not received_signature:
                logger.error("No signature in PayFast webhook data")
                return False
            
            # Remove signature from data for validation
            validation_data = {k: v for k, v in post_data.items() if k != 'signature'}
            
            # Generate expected signature
            expected_signature = PayFastPaymentService.generate_signature(
                validation_data,
                settings.PAYFAST_PASSPHRASE
            )
            
            # Compare signatures
            if received_signature.lower() != expected_signature.lower():
                logger.error(f"PayFast signature mismatch. Expected: {expected_signature}, Received: {received_signature}")
                return False
            
            # Additional validation: check with PayFast servers
            if not settings.PAYFAST_SANDBOX:
                validation_response = requests.post(
                    settings.PAYFAST_VALIDATE_URL,
                    data=post_data,
                    timeout=10
                )
                
                if validation_response.text.strip() != 'VALID':
                    logger.error(f"PayFast server validation failed: {validation_response.text}")
                    return False
            
            logger.info("PayFast webhook data validated successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error validating PayFast webhook data: {str(e)}")
            return False
    
    @staticmethod
    def process_payment_notification(post_data):
        """
        Process PayFast payment notification (ITN)
        
        Args:
            post_data: Dictionary of POST data from PayFast
            
        Returns:
            dict: Processing result
        """
        try:
            # Validate the data first
            if not PayFastPaymentService.validate_webhook_data(post_data):
                raise Exception("Invalid PayFast webhook data")
            
            # Extract booking information
            booking_id = post_data.get('custom_int1')
            booking_reference = post_data.get('custom_str1')
            payment_status = post_data.get('payment_status')
            amount_gross = post_data.get('amount_gross')
            
            if not booking_id:
                raise Exception("No booking ID in PayFast notification")
            
            # Find the booking
            from .models import Booking
            try:
                booking = Booking.objects.get(id=booking_id, booking_reference=booking_reference)
            except Booking.DoesNotExist:
                raise Exception(f"Booking not found: {booking_id}, {booking_reference}")
            
            # Process based on payment status
            if payment_status == 'COMPLETE':
                # Payment successful
                booking.status = 'confirmed'
                booking.payment_date = timezone.now()
                booking.payfast_payment_status = 'COMPLETE'
                booking.payment_failure_reason = ''
                
                logger.info(f"Payment completed for booking {booking.booking_reference}")
                
            elif payment_status == 'FAILED':
                # Payment failed
                booking.status = 'payment_failed'
                booking.payfast_payment_status = 'FAILED'
                booking.payment_failure_reason = 'Payment failed at PayFast'
                
                # Release the reserved seat
                booking.schedule.available_seats += booking.number_of_seats
                booking.schedule.save()
                
                logger.warning(f"Payment failed for booking {booking.booking_reference}")
                
            elif payment_status == 'CANCELLED':
                # Payment cancelled by user
                booking.status = 'cancelled'
                booking.payfast_payment_status = 'CANCELLED'
                booking.payment_failure_reason = 'Payment cancelled by user'
                
                # Release the reserved seat
                booking.schedule.available_seats += booking.number_of_seats
                booking.schedule.save()
                
                logger.info(f"Payment cancelled for booking {booking.booking_reference}")
                
            else:
                # Unknown status
                logger.warning(f"Unknown payment status for booking {booking.booking_reference}: {payment_status}")
                booking.payfast_payment_status = payment_status
            
            booking.save()
            
            return {
                'status': payment_status,
                'booking_status': booking.status,
                'booking_reference': booking.booking_reference,
                'amount': amount_gross,
            }
            
        except Exception as e:
            logger.error(f"Error processing PayFast payment notification: {str(e)}")
            raise Exception(f"Payment notification processing failed: {str(e)}")
    
    @staticmethod
    def cancel_payment(booking):
        """
        Cancel a payment and update booking
        
        Args:
            booking: Booking instance
            
        Returns:
            dict: Cancellation result
        """
        try:
            # Update booking status
            booking.status = 'cancelled'
            booking.payfast_payment_status = 'CANCELLED'
            booking.save()
            
            # Release the reserved seat
            booking.schedule.available_seats += booking.number_of_seats
            booking.schedule.save()
            
            logger.info(f"Payment cancelled for booking {booking.booking_reference}")
            
            return {
                'status': 'cancelled',
                'booking_reference': booking.booking_reference
            }
            
        except Exception as e:
            logger.error(f"Error cancelling payment for booking {booking.booking_reference}: {str(e)}")
            raise Exception(f"Payment cancellation failed: {str(e)}")
    
    @staticmethod
    def simulate_payment_confirmation(booking_id, delay_seconds=5):
        """
        Simulate PayFast payment confirmation after a delay (for testing only)
        
        Args:
            booking_id: ID of the booking to confirm
            delay_seconds: Seconds to wait before confirming (default 5)
        """
        def confirm_after_delay():
            try:
                time.sleep(delay_seconds)
                
                # Import here to avoid circular imports
                from .models import Booking
                
                booking = Booking.objects.get(id=booking_id)
                
                # Only confirm if still in payment_processing state
                if booking.status == 'payment_processing':
                    booking.status = 'confirmed'
                    booking.payfast_payment_status = 'COMPLETE'
                    booking.payment_date = timezone.now()
                    booking.save()
                    
                    logger.info(f"Auto-confirmed payment for booking {booking.booking_reference} after {delay_seconds} seconds")
                else:
                    logger.info(f"Booking {booking.booking_reference} status already changed to {booking.status}, skipping auto-confirmation")
                    
            except Exception as e:
                logger.error(f"Error in simulated payment confirmation for booking {booking_id}: {str(e)}")
        
        # Start confirmation in background thread
        thread = threading.Thread(target=confirm_after_delay)
        thread.daemon = True
        thread.start()
        
        logger.info(f"Started simulated payment confirmation for booking {booking_id} (will confirm in {delay_seconds} seconds)")

class PaymentStatusTracker:
    """Helper class to track payment status transitions"""
    
    VALID_TRANSITIONS = {
        'pending_payment': ['payment_processing', 'cancelled'],
        'payment_processing': ['confirmed', 'payment_failed', 'cancelled'],
        'payment_failed': ['payment_processing', 'cancelled'],
        'confirmed': ['completed', 'cancelled'],
        'cancelled': [],  # Terminal state
        'completed': [],  # Terminal state
        'no_show': [],    # Terminal state
    }
    
    @classmethod
    def can_transition(cls, from_status, to_status):
        """Check if a status transition is valid"""
        return to_status in cls.VALID_TRANSITIONS.get(from_status, [])
    
    @classmethod
    def get_available_transitions(cls, current_status):
        """Get list of valid transitions from current status"""
        return cls.VALID_TRANSITIONS.get(current_status, [])
