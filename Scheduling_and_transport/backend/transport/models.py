from django.db import models
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator

class Bus(models.Model):
    BUS_TYPES = [
        ('standard', 'Standard'),
        ('deluxe', 'Deluxe'),
        ('luxury', 'Luxury'),
        ('sleeper', 'Sleeper'),
    ]
    
    bus_number = models.CharField(
        max_length=20,
        unique=True,
        help_text="Unique bus registration number (e.g., 'BT001')"
    )
    bus_type = models.CharField(
        max_length=20,
        choices=BUS_TYPES,
        default='standard',
        help_text='Type of bus affecting price and amenities'
    )
    total_seats = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(60)],
        help_text='Total number of passenger seats'
    )
    amenities = models.TextField(
        blank=True,
        help_text="Comma-separated list of amenities (e.g., 'WiFi, AC, USB Charging')"
    )
    is_active = models.BooleanField(
        default=True,
        help_text='Whether this bus is currently in service'
    )
    last_maintenance = models.DateField(
        blank=True,
        null=True,
        help_text='Date of last maintenance check'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Bus'
        verbose_name_plural = 'Buses'
        ordering = ['bus_number']

    def __str__(self):
        return f"{self.bus_number} ({self.bus_type})"

class Route(models.Model):
    ROUTE_TYPES = [
        ('one_way', 'One Way'),
        ('round_trip', 'Round Trip'),
    ]
    
    name = models.CharField(
        max_length=200,
        help_text="Route name (e.g., 'Cape Town Express')"
    )
    origin = models.CharField(
        max_length=100,
        help_text="Starting city (e.g., 'Cape Town')"
    )
    destination = models.CharField(
        max_length=100,
        help_text="Ending city (e.g., 'Johannesburg')"
    )
    distance_km = models.FloatField(
        validators=[MinValueValidator(1.0)],
        help_text='Distance in kilometers'
    )
    duration_hours = models.FloatField(
        validators=[MinValueValidator(0.5)],
        help_text='Travel time in hours'
    )
    route_type = models.CharField(
        max_length=20,
        choices=ROUTE_TYPES,
        default='one_way',
        help_text='Whether this is a one-way or round-trip route'
    )
    description = models.TextField(
        blank=True,
        help_text='Detailed description of pickup/drop-off locations, Google Maps links, or special instructions'
    )
    operating_days = models.CharField(
        max_length=100,
        default='Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
        help_text='Comma-separated list of operating days (e.g., "Monday,Wednesday,Friday")'
    )
    base_price_zar = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(10.00)],
        help_text='Base price in South African Rand (ZAR)'
    )
    is_active = models.BooleanField(
        default=True,
        help_text='Whether this route is currently available for booking'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Bus Route'
        verbose_name_plural = 'Bus Routes'
        ordering = ['origin', 'destination']
        constraints = [
            models.CheckConstraint(
                check=~models.Q(origin=models.F('destination')),
                name='different_origin_destination'
            )
        ]
        indexes = [
            models.Index(fields=['origin'], name='route_origin_idx'),
            models.Index(fields=['destination'], name='route_dest_idx'),
            models.Index(fields=['origin', 'destination'], name='route_origin_dest_idx'),
            models.Index(fields=['is_active'], name='route_active_idx'),
            models.Index(fields=['base_price_zar'], name='route_price_idx'),
        ]

    def clean(self):
        from django.core.exceptions import ValidationError
        if self.origin and self.destination and self.origin.lower() == self.destination.lower():
            raise ValidationError('Origin and destination cannot be the same.')
        if self.distance_km and self.duration_hours:
            # Basic speed check (should be between 20-120 km/h for buses)
            speed = self.distance_km / self.duration_hours
            if speed < 20 or speed > 120:
                raise ValidationError(
                    f'Average speed ({speed:.1f} km/h) seems unrealistic for bus travel. '
                    'Please check distance and duration values.'
                )

    def operates_on_day(self, day_name):
        """
        Check if this route operates on a specific day
        day_name should be like 'Monday', 'Tuesday', etc.
        """
        operating_days = [day.strip() for day in self.operating_days.split(',')]
        return day_name in operating_days

    def get_operating_days_list(self):
        """
        Get list of operating days
        """
        return [day.strip() for day in self.operating_days.split(',')]

    def __str__(self):
        return f"{self.name}: {self.origin} to {self.destination}"

class Schedule(models.Model):
    route = models.ForeignKey(
        Route,
        on_delete=models.CASCADE,
        help_text='Which route this schedule is for'
    )
    bus = models.ForeignKey(
        Bus,
        on_delete=models.CASCADE,
        help_text='Which bus will be used for this trip'
    )
    departure_time = models.DateTimeField(
        help_text='When the bus departs'
    )
    arrival_time = models.DateTimeField(
        help_text='When the bus arrives at destination'
    )
    available_seats = models.IntegerField(
        help_text='Number of seats still available for booking'
    )
    price_zar = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text='Price for this specific trip in ZAR'
    )
    is_active = models.BooleanField(
        default=True,
        help_text='Whether this schedule is available for booking'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Bus Schedule'
        verbose_name_plural = 'Bus Schedules'
        ordering = ['departure_time']
        indexes = [
            models.Index(fields=['departure_time'], name='schedule_departure_idx'),
            models.Index(fields=['route', 'departure_time'], name='schedule_route_time_idx'),
            models.Index(fields=['is_active', 'departure_time'], name='schedule_active_time_idx'),
            models.Index(fields=['available_seats'], name='schedule_seats_idx'),
            models.Index(fields=['bus'], name='schedule_bus_idx'),
        ]

    def __str__(self):
        return f"{self.route.name} - {self.departure_time.strftime('%Y-%m-%d %H:%M')}"

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending_payment', 'Pending Payment'),
        ('payment_processing', 'Payment Processing'),
        ('payment_failed', 'Payment Failed'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
        ('no_show', 'No Show'),
    ]
    
    booking_id = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True,
        help_text='Unique booking reference number'
    )
    booking_reference = models.CharField(
        max_length=15,  # Increased length for timestamp-based refs
        unique=True,
        editable=False,
        blank=True,
        null=True,
        help_text='Human-readable booking reference (e.g., FB123456)'
    )
    schedule = models.ForeignKey(
        Schedule,
        on_delete=models.CASCADE,
        help_text='Which scheduled trip this booking is for'
    )
    passenger_name = models.CharField(
        max_length=100,
        help_text='Full name of the passenger'
    )
    passenger_email = models.EmailField(
        help_text='Email for booking confirmation'
    )
    passenger_phone = models.CharField(
        max_length=20,
        validators=[RegexValidator(
            regex=r'^[\+]?[0-9\s\-\(\)]{7,20}$',
            message="Please enter a valid phone number (e.g., +27 83 123 4567, 083 123 4567, +82 10 1234 5678)"
        )],
        help_text='Contact phone number (any international format accepted)'
    )
    passenger_id_number = models.CharField(
        max_length=20,
        blank=True,
        help_text='ID/Passport number (optional)'
    )
    date_of_birth = models.DateField(
        blank=True,
        null=True,
        help_text='Passenger date of birth'
    )
    emergency_contact = models.CharField(
        max_length=100,
        blank=True,
        help_text='Emergency contact name'
    )
    emergency_phone = models.CharField(
        max_length=20,
        blank=True,
        help_text='Emergency contact phone number'
    )
    number_of_seats = models.IntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(1)],
        help_text='Number of seats being booked (fixed to 1 per booking)'
    )
    total_amount_zar = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text='Total amount to be paid in ZAR'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending_payment',
        help_text='Current status of the booking'
    )
    payfast_payment_id = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text='PayFast payment ID for tracking'
    )
    payfast_payment_status = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text='PayFast payment status (COMPLETE, FAILED, CANCELLED)'
    )
    payment_date = models.DateTimeField(
        blank=True,
        null=True,
        help_text='When payment was completed'
    )
    payment_failure_reason = models.TextField(
        blank=True,
        help_text='Reason for payment failure (if applicable)'
    )
    special_requests = models.TextField(
        blank=True,
        help_text='Any special requests from passenger (wheelchair access, dietary needs, etc.)'
    )
    
    # Discount fields
    discount_type = models.CharField(
        max_length=20,
        choices=[
            ('none', 'No Discount'),
            ('scholar', 'Scholar (13 years & younger)'),
            ('student', 'Student (Student card required)'),
            ('pensioner', 'Pensioner (ID required)'),
        ],
        default='none',
        help_text="Type of discount applied"
    )
    discount_amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0.00,
        help_text="Discount amount in ZAR"
    )
    original_amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0.00,
        help_text="Original amount before discount"
    )
    
    booking_date = models.DateTimeField(
        auto_now_add=True,
        help_text='When this booking was created'
    )
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        """Ensure number_of_seats is always 1"""
        from django.core.exceptions import ValidationError
        if self.number_of_seats != 1:
            raise ValidationError('Each booking is limited to 1 seat. Create separate bookings for multiple passengers.')

    class Meta:
        verbose_name = 'Booking'
        verbose_name_plural = 'Bookings'
        ordering = ['-booking_date']
        indexes = [
            models.Index(fields=['booking_reference'], name='booking_ref_idx'),
            models.Index(fields=['status'], name='booking_status_idx'),
            models.Index(fields=['passenger_email'], name='booking_email_idx'),
            models.Index(fields=['schedule', 'status'], name='booking_schedule_status_idx'),
            models.Index(fields=['booking_date'], name='booking_date_idx'),
            models.Index(fields=['payfast_payment_id'], name='booking_payment_id_idx'),
        ]

    def save(self, *args, **kwargs):
        # Save first to get the ID, then generate reference
        if not self.booking_reference:
            # Save without reference first to get the ID
            super().save(*args, **kwargs)
            
            # Generate reference using ID to ensure uniqueness
            import random
            from datetime import datetime
            
            # Use ID + timestamp + random for guaranteed uniqueness
            timestamp = datetime.now().strftime('%M%S')  # MMSS
            random_digit = random.randint(0, 9)
            self.booking_reference = f'FB{self.id}{timestamp}{random_digit}'
            
            # Save again with the reference
            super().save(update_fields=['booking_reference'])
        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.passenger_name} - {self.schedule}"

class ContactInfo(models.Model):
    company_name = models.CharField(
        max_length=200,
        default='SA Bus Transport',
        help_text='Company name displayed on website'
    )
    phone_primary = models.CharField(
        max_length=20,
        help_text='Main contact phone number'
    )
    phone_secondary = models.CharField(
        max_length=20,
        blank=True,
        help_text='Secondary phone number (optional)'
    )
    email = models.EmailField(
        help_text='Contact email address'
    )
    whatsapp_number = models.CharField(
        max_length=20,
        help_text='WhatsApp number for customer support'
    )
    address = models.TextField(
        help_text='Physical address of the company'
    )
    business_hours = models.TextField(
        default='Monday - Sunday: 6:00 AM - 10:00 PM',
        help_text='Operating hours'
    )
    facebook_url = models.URLField(
        blank=True,
        help_text='Facebook page URL'
    )
    twitter_url = models.URLField(
        blank=True,
        help_text='Twitter profile URL'
    )
    instagram_url = models.URLField(
        blank=True,
        help_text='Instagram profile URL'
    )
    emergency_contact = models.CharField(
        max_length=20,
        help_text='24/7 emergency contact number'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Contact Information'
        verbose_name_plural = 'Contact Information'

    def __str__(self):
        return self.company_name

class FAQ(models.Model):
    question = models.CharField(
        max_length=300,
        help_text='The question customers frequently ask'
    )
    answer = models.TextField(
        help_text='Detailed answer to the question'
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text='Order in which this FAQ appears (lower numbers first)'
    )
    is_active = models.BooleanField(
        default=True,
        help_text='Whether this FAQ is displayed on the website'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'
        ordering = ['order', 'question']

    def __str__(self):
        return self.question
