"""
Email service for Falcon Bus Lines
Handles sending booking confirmations and PDF tickets
"""

from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from .pdf_generator import generate_booking_pdf
import logging

logger = logging.getLogger(__name__)

class BookingEmailService:
    
    @staticmethod
    def send_booking_confirmation(booking):
        """Send booking confirmation email with PDF ticket attachment"""
        try:
            print(f"📧 EMAIL SERVICE: Starting email generation for booking {booking.booking_reference}")
            print(f"📧 EMAIL SERVICE: Passenger email: {booking.passenger_email}")
            
            # Generate PDF ticket
            print("📧 EMAIL SERVICE: Generating PDF ticket...")
            pdf_content = generate_booking_pdf(booking)
            print(f"📧 EMAIL SERVICE: PDF generated successfully, size: {len(pdf_content)} bytes")
            
            # Prepare email content
            subject = f"Booking Confirmation - {booking.booking_reference}"
            print(f"📧 EMAIL SERVICE: Email subject: {subject}")
            
            # Email body
            email_body = f"""
Dear {booking.passenger_name},

Thank you for booking with Falcon Bus Lines & Beyers Busdiens!

Your booking has been confirmed. Here are your travel details:

🎫 BOOKING REFERENCE: {booking.booking_reference}

🚌 JOURNEY DETAILS:
Route: {booking.schedule.route.origin} → {booking.schedule.route.destination}
Departure: {booking.schedule.departure_time.strftime('%A, %B %d, %Y at %H:%M')}
Arrival: {booking.schedule.arrival_time.strftime('%H:%M')}
Bus: {booking.schedule.bus.bus_number} ({booking.schedule.bus.bus_type.title()})
Seats: {booking.number_of_seats}
Total Amount: R {booking.total_amount_zar:,.2f}

⚠️ IMPORTANT REMINDERS:
• Please arrive at least 30 minutes before departure
• Bring valid ID matching your booking details
• Present your digital ticket when boarding
• Luggage allowance: 1 carry-on + 1 checked bag (max 20kg)

📱 Your digital ticket is attached as a PDF file. You can also present this email when boarding.

Need help? Contact us:
📧 support@falconbuslines.co.za
📞 +27 11 123 4567
💬 WhatsApp: +27 82 123 4567
🚨 Emergency: +27 82 999 8888

Safe travels!

Falcon Bus Lines & Beyers Busdiens Team
Operating Hours: Monday - Sunday, 6:00 AM - 10:00 PM
            """
            
            # Create email message
            print("📧 EMAIL SERVICE: Creating email message...")
            email = EmailMessage(
                subject=subject,
                body=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[booking.passenger_email],
                reply_to=['support@falconbuslines.co.za']
            )
            print(f"📧 EMAIL SERVICE: Email message created, from: {settings.DEFAULT_FROM_EMAIL}, to: {booking.passenger_email}")
            
            # Attach PDF ticket
            print("📧 EMAIL SERVICE: Attaching PDF ticket...")
            email.attach(
                filename=f"falcon-ticket-{booking.booking_reference}.pdf",
                content=pdf_content,
                mimetype="application/pdf"
            )
            print("📧 EMAIL SERVICE: PDF attached successfully")
            
            # Send email
            print("📧 EMAIL SERVICE: Sending email...")
            email.send()
            print("📧 EMAIL SERVICE: ✅ Email sent successfully!")
            
            logger.info(f"Booking confirmation email sent successfully to {booking.passenger_email} for booking {booking.booking_reference}")
            return True
            
        except Exception as e:
            print(f"📧 EMAIL SERVICE: ❌ EXCEPTION occurred: {str(e)}")
            import traceback
            traceback.print_exc()
            logger.error(f"Failed to send booking confirmation email for booking {booking.booking_reference}: {str(e)}")
            return False
    
    @staticmethod
    def send_booking_cancellation(booking):
        """Send booking cancellation email"""
        try:
            subject = f"Booking Cancellation - {booking.booking_reference}"
            
            email_body = f"""
Dear {booking.passenger_name},

Your booking with Falcon Bus Lines has been cancelled.

Booking Reference: {booking.booking_reference}
Route: {booking.schedule.route.origin} → {booking.schedule.route.destination}
Original Departure: {booking.schedule.departure_time.strftime('%A, %B %d, %Y at %H:%M')}

If you cancelled this booking, no further action is required.
If you believe this cancellation was made in error, please contact us immediately.

Refund Policy:
- Cancellations made 24+ hours before departure: Full refund
- Cancellations made 2-24 hours before departure: 50% refund
- Cancellations made less than 2 hours before departure: No refund

Contact us:
📧 support@falconbuslines.co.za
📞 +27 11 123 4567
💬 WhatsApp: +27 82 123 4567

Thank you for choosing Falcon Bus Lines.

Falcon Bus Lines & Beyers Busdiens Team
            """
            
            email = EmailMessage(
                subject=subject,
                body=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[booking.passenger_email],
                reply_to=['support@falconbuslines.co.za']
            )
            
            email.send()
            
            logger.info(f"Booking cancellation email sent successfully to {booking.passenger_email} for booking {booking.booking_reference}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send booking cancellation email for booking {booking.booking_reference}: {str(e)}")
            return False
