from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse
from decimal import Decimal
import logging
from .models import Route, Bus, Schedule, Booking, ContactInfo, FAQ
from .serializers import (
    RouteSerializer, BusSerializer, ScheduleSerializer, BookingSerializer,
    ContactInfoSerializer, FAQSerializer, SimpleScheduleSerializer
)
from .schedule_management import auto_maintain_schedules, check_schedule_health
from .pdf_generator import generate_booking_pdf
from .payment_service import PayFastPaymentService, PaymentStatusTracker

logger = logging.getLogger(__name__)

class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    
    def get_queryset(self):
        queryset = Route.objects.all()
        is_active = self.request.query_params.get('is_active', None)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        return queryset
    
    @action(detail=True, methods=['patch'])
    def toggle_status(self, request, pk=None):
        route = self.get_object()
        route.is_active = not route.is_active
        route.save()
        serializer = self.get_serializer(route)
        return Response(serializer.data)

class BusViewSet(viewsets.ModelViewSet):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    
    def get_queryset(self):
        queryset = Bus.objects.all()
        is_active = self.request.query_params.get('is_active', None)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        return queryset

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.select_related('route', 'bus').all()
    serializer_class = ScheduleSerializer
    
    def get_queryset(self):
        queryset = Schedule.objects.select_related('route', 'bus').all()
        is_active = self.request.query_params.get('is_active', None)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        return queryset
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search schedules by various criteria"""
        origin = request.query_params.get('origin')
        destination = request.query_params.get('destination')
        route = request.query_params.get('route')
        date = request.query_params.get('date')
        
        queryset = Schedule.objects.select_related('route', 'bus').filter(is_active=True)
        
        if origin:
            queryset = queryset.filter(route__origin__icontains=origin)
        if destination:
            queryset = queryset.filter(route__destination__icontains=destination)
        if route:
            queryset = queryset.filter(route__id=route)
        if date:
            queryset = queryset.filter(departure_time__date=date)
            
        # Limit results to prevent large responses
        queryset = queryset[:100]
        
        print(f"Schedule search: {queryset.count()} results found")
        
        serializer = SimpleScheduleSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def available_dates(self, request):
        """Get available dates for a specific route"""
        route_id = request.query_params.get('route')
        
        if not route_id:
            return Response(
                {'error': 'Route ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            route = Route.objects.get(id=route_id)
        except Route.DoesNotExist:
            return Response(
                {'error': 'Route not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get future schedules for this route with available seats
        from django.utils import timezone
        today = timezone.now().date()
        
        schedules = Schedule.objects.filter(
            route_id=route_id,
            is_active=True,
            departure_time__date__gte=today,
            available_seats__gt=0
        ).values_list('departure_time__date', flat=True).distinct().order_by('departure_time__date')
        
        # Convert to list and format as strings
        available_dates = [date.strftime('%Y-%m-%d') for date in schedules]
        
        return Response({
            'route_id': route_id,
            'route_name': route.name,
            'available_dates': available_dates,
            'total_dates': len(available_dates)
        })

@method_decorator(csrf_exempt, name='dispatch')
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    def get_queryset(self):
        queryset = Booking.objects.select_related('schedule__route', 'schedule__bus').all()
        # Add filtering by status if needed
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset
    
    def create(self, request, *args, **kwargs):
        print(f"Received booking data: {request.data}")
        
        try:
            serializer = self.get_serializer(data=request.data)
            
            if not serializer.is_valid():
                print(f"Serializer errors: {serializer.errors}")
                return Response(
                    {'error': 'Validation failed', 'details': serializer.errors}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get the schedule and check seat availability
            schedule_id = serializer.validated_data['schedule_id']
            try:
                schedule = Schedule.objects.get(id=schedule_id)
                print(f"Schedule found: {schedule}")
            except Schedule.DoesNotExist:
                print(f"Schedule not found: {schedule_id}")
                return Response(
                    {'error': 'Schedule not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            seats_requested = 1  # Fixed to 1 seat per booking
            print(f"Seats requested: {seats_requested}, Available: {schedule.available_seats}")
            
            if schedule.available_seats < 1:
                return Response(
                    {'error': f'No seats available on this schedule.'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Calculate pricing with discount (1 seat)
            base_price = schedule.price_zar  # No multiplication needed for 1 seat
            discount_type = serializer.validated_data.get('discount_type', 'none')
            discount_amount = Decimal('0.00')
            
            # Apply R40 discount for eligible categories
            if discount_type in ['scholar', 'student', 'pensioner']:
                discount_amount = Decimal('40.00')
            
            final_price = max(base_price - discount_amount, Decimal('0.00'))  # Ensure price doesn't go negative
            
            print(f"Base price: R{base_price}, Discount: R{discount_amount}, Final price: R{final_price}")
            
            # Create booking with pending payment status
            print("Creating booking...")
            booking = serializer.save(
                schedule=schedule,
                number_of_seats=1,  # Fixed to 1 seat
                original_amount=base_price,
                discount_amount=discount_amount,
                total_amount_zar=final_price,
                status='pending_payment'  # Start with pending payment
            )
            print(f"Booking created successfully: {booking.booking_reference}")
            
            # Reserve the seat temporarily (reduce available seats)
            schedule.available_seats -= 1
            schedule.save()
            print(f"Seat reserved, updated available seats to: {schedule.available_seats}")
            
            # Create PayFast payment form data
            try:
                payment_info = PayFastPaymentService.create_payment_form_data(booking)
                print(f"PayFast payment form created: {payment_info['payment_id']}")
                
                # Include payment info in response
                response_data = self.get_serializer(booking).data
                response_data['payment'] = payment_info
                
                print(f"Response data prepared with PayFast payment info")
                return Response(response_data, status=status.HTTP_201_CREATED)
                
            except Exception as payment_error:
                print(f"PayFast payment setup failed: {str(payment_error)}")
                
                # Cancel the booking and release the seat
                booking.status = 'cancelled'
                booking.save()
                schedule.available_seats += 1
                schedule.save()
                
                return Response(
                    {'error': f'Payment setup failed: {str(payment_error)}'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
        except Exception as e:
            print(f"Unexpected error in booking creation: {str(e)}")
            import traceback
            traceback.print_exc()
            return Response(
                {'error': f'Internal server error: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def confirm_payment(self, request, pk=None):
        """Confirm payment for a booking (mainly for manual confirmation)"""
        booking = self.get_object()
        
        try:
            if not booking.payfast_payment_id:
                return Response(
                    {'error': 'No PayFast payment ID found for this booking'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Manual confirmation (mainly for testing)
            booking.status = 'confirmed'
            booking.payment_date = timezone.now()
            booking.payfast_payment_status = 'COMPLETE'
            booking.save()
            
            # Return updated booking data
            response_data = self.get_serializer(booking).data
            response_data['payment_status'] = {
                'status': 'COMPLETE',
                'booking_status': booking.status,
                'payment_date': booking.payment_date
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': f'Payment confirmation failed: {str(e)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['post'])
    def cancel_booking(self, request, pk=None):
        """Cancel a booking and its payment"""
        booking = self.get_object()
        
        try:
            # Check if cancellation is allowed
            if not PaymentStatusTracker.can_transition(booking.status, 'cancelled'):
                return Response(
                    {'error': f'Cannot cancel booking with status: {booking.status}'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Cancel payment and booking
            cancel_result = PayFastPaymentService.cancel_payment(booking)
            
            return Response(cancel_result, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': f'Booking cancellation failed: {str(e)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['get'])
    def payment_status(self, request, pk=None):
        """Get current payment status for a booking"""
        booking = self.get_object()
        
        return Response({
            'booking_reference': booking.booking_reference,
            'status': booking.status,
            'payfast_payment_id': booking.payfast_payment_id,
            'payfast_payment_status': booking.payfast_payment_status,
            'payment_date': booking.payment_date,
            'total_amount': booking.total_amount_zar,
            'available_transitions': PaymentStatusTracker.get_available_transitions(booking.status)
        })
    
    @action(detail=True, methods=['get'])
    def download_ticket(self, request, pk=None):
        """Download PDF ticket for a booking (only for confirmed bookings)"""
        booking = self.get_object()
        
        # Only allow ticket download for confirmed bookings
        if booking.status != 'confirmed':
            return Response(
                {'error': f'Cannot download ticket for booking with status: {booking.status}. Payment must be confirmed first.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Generate PDF
            pdf_content = generate_booking_pdf(booking)
            
            # Create HTTP response with PDF
            response = HttpResponse(pdf_content, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="falcon-ticket-{booking.booking_reference}.pdf"'
            
            return response
            
        except Exception as e:
            return Response(
                {'error': f'Failed to generate PDF ticket: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['get'])
    def status(self, request, pk=None):
        """Get booking status and payment information"""
        booking = self.get_object()
        
        status_info = {
            'booking_id': booking.id,
            'booking_reference': booking.booking_reference,
            'status': booking.status,
            'payfast_payment_status': booking.payfast_payment_status,
            'payment_date': booking.payment_date,
            'can_download_ticket': booking.status == 'confirmed',
            'status_message': self._get_status_message(booking.status)
        }
        
        return Response(status_info, status=status.HTTP_200_OK)
    
    def _get_status_message(self, booking_status):
        """Get user-friendly status message"""
        status_messages = {
            'pending': 'Booking created, awaiting payment',
            'payment_processing': 'Payment received, awaiting confirmation from PayFast',
            'confirmed': 'Payment confirmed! Your ticket is ready for download',
            'cancelled': 'Booking has been cancelled',
            'completed': 'Journey completed',
            'refunded': 'Booking refunded'
        }
        return status_messages.get(booking_status, f'Status: {booking_status}')

class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    
    def get_queryset(self):
        queryset = FAQ.objects.all()
        is_active = self.request.query_params.get('is_active', None)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        return queryset.order_by('order', 'question')

# Admin Schedule Maintenance Views
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.admin.views.decorators import staff_member_required
from .schedule_management import ScheduleManager
import json

@csrf_exempt
@staff_member_required
@require_http_methods(["POST"])
def admin_schedule_maintenance(request):
    """Admin endpoint for schedule maintenance"""
    try:
        data = json.loads(request.body)
        action = data.get('action', 'status')
        
        manager = ScheduleManager()
        
        if action == 'status':
            status_info = manager.get_health_status()
            return JsonResponse({
                'success': True,
                'action': 'status',
                'data': status_info
            })
        
        elif action == 'cleanup':
            dry_run = data.get('dry_run', True)
            result = manager.cleanup_past_schedules(dry_run=dry_run)
            return JsonResponse({
                'success': True,
                'action': 'cleanup',
                'dry_run': dry_run,
                'data': result
            })
        
        elif action == 'generate':
            days_ahead = data.get('days_ahead', 30)
            dry_run = data.get('dry_run', True)
            result = manager.generate_future_schedules(days_ahead=days_ahead, dry_run=dry_run)
            return JsonResponse({
                'success': True,
                'action': 'generate',
                'dry_run': dry_run,
                'data': result
            })
        
        elif action == 'maintain':
            dry_run = data.get('dry_run', True)
            result = manager.full_maintenance(dry_run=dry_run)
            return JsonResponse({
                'success': True,
                'action': 'maintain',
                'dry_run': dry_run,
                'data': result
            })
        
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid action. Use: status, cleanup, generate, or maintain'
            }, status=400)
            
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)

# =============================================================================
# PAYFAST WEBHOOK ENDPOINT  
# =============================================================================

from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["POST"])
def payfast_webhook(request):
    """Handle PayFast ITN (Instant Transaction Notification) webhook"""
    try:
        # Get POST data
        post_data = {key: value for key, value in request.POST.items()}
        
        if not post_data:
            return JsonResponse({
                'success': False,
                'error': 'No POST data received'
            }, status=400)
        
        # Process the payment notification
        result = PayFastPaymentService.process_payment_notification(post_data)
        
        return JsonResponse({
            'success': True,
            'result': result
        })
        
    except Exception as e:
        logger.error(f"PayFast webhook error: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
