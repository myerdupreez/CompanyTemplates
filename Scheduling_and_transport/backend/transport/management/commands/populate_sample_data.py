"""
Django Management Command to Populate Sample Data

This command creates sample data for the bus transport system.
It's designed for testing and demonstration purposes.

To run this command:
python manage.py populate_sample_data

For beginners:
- Management commands are scripts that help with database setup
- This creates realistic South African bus routes and schedules
- You can run this after setting up the database to get started quickly
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from decimal import Decimal
from transport.models import Route, Bus, Schedule, ContactInfo, FAQ
import random

class Command(BaseCommand):
    """
    Management command to populate the database with sample data
    """
    
    help = 'Populate the database with sample South African bus transport data'
    
    def add_arguments(self, parser):
        """
        Add command line arguments
        """
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before creating new data',
        )
        
        parser.add_argument(
            '--days',
            type=int,
            default=90,
            help='Number of days to create schedules for (default: 90)',
        )
    
    def handle(self, *args, **options):
        """
        Main method that executes when the command is run
        """
        
        # Clear existing data if requested
        if options['clear']:
            self.stdout.write('Clearing existing data...')
            Route.objects.all().delete()
            Bus.objects.all().delete()
            Schedule.objects.all().delete()
            ContactInfo.objects.all().delete()
            FAQ.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('✓ Existing data cleared'))
        
        # Create sample data
        self.stdout.write('Creating sample data...')
        
        # Create routes
        routes = self.create_routes()
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(routes)} routes'))
        
        # Create buses
        buses = self.create_buses()
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(buses)} buses'))
        
        # Create schedules
        schedules = self.create_schedules(routes, buses, options['days'])
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(schedules)} schedules'))
        
        # Create company contact info
        contact = self.create_contact_info()
        self.stdout.write(self.style.SUCCESS('✓ Created company contact information'))
        
        # Create FAQs
        faqs = self.create_faqs()
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(faqs)} FAQs'))
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\n🎉 Sample data creation completed successfully!\n'
                f'📍 Routes: {len(routes)}\n'
                f'🚌 Buses: {len(buses)}\n'
                f'🕐 Schedules: {len(schedules)}\n'
                f'❓ FAQs: {len(faqs)}\n'
                f'\nYou can now:\n'
                f'1. Visit http://localhost:8000/admin/ to manage data\n'
                f'2. Test API endpoints at http://localhost:8000/api/\n'
                f'3. Search schedules and make bookings\n'
            )
        )
    
    def create_routes(self):
        """
        Create actual Falcon Bus Lines routes based on real pricing and locations
        """
        
        # Real Falcon Bus Lines routes
        route_data = [
            # Northern Routes (Phalaborwa)
            {
                'name': 'Phalaborwa Express',
                'origin': 'Phalaborwa',
                'destination': 'Tzaneen',
                'distance_km': 85,
                'duration_hours': 1.5,
                'base_price_zar': 150.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Phalaborwa - Postnet next to Viva\nDrop-off: Tzaneen - Sasol Agatha\n\nDeparture: 06:20\nArrival: 07:45'
            },
            {
                'name': 'Phalaborwa Express Round Trip',
                'origin': 'Phalaborwa',
                'destination': 'Tzaneen',
                'distance_km': 170,
                'duration_hours': 3,
                'base_price_zar': 300.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Phalaborwa - Postnet next to Viva\nDrop-off: Tzaneen - Sasol Agatha\n\nRound trip service available on operating days'
            },
            {
                'name': 'Phalaborwa to Polokwane',
                'origin': 'Phalaborwa',
                'destination': 'Polokwane',
                'distance_km': 180,
                'duration_hours': 3,
                'base_price_zar': 420.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Phalaborwa - Postnet next to Viva\nDrop-off: Polokwane - Total Fauna Park\n\nDeparture: 06:20\nArrival: 09:10'
            },
            {
                'name': 'Phalaborwa to Polokwane Round Trip',
                'origin': 'Phalaborwa',
                'destination': 'Polokwane',
                'distance_km': 360,
                'duration_hours': 6,
                'base_price_zar': 750.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Phalaborwa - Postnet next to Viva\nDrop-off: Polokwane - Total Fauna Park\n\nRound trip service with same day return'
            },
            {
                'name': 'Phalaborwa to Pretoria',
                'origin': 'Phalaborwa',
                'destination': 'Pretoria',
                'distance_km': 380,
                'duration_hours': 6,
                'base_price_zar': 650.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Phalaborwa - Postnet next to Viva\nDrop-off: Pretoria - Hatfield Gautrain\n\nDeparture: 06:20\nArrival: 12:05'
            },
            {
                'name': 'Phalaborwa to Pretoria Round Trip',
                'origin': 'Phalaborwa',
                'destination': 'Pretoria',
                'distance_km': 760,
                'duration_hours': 12,
                'base_price_zar': 1100.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Phalaborwa - Postnet next to Viva\nDrop-off: Pretoria - Hatfield Gautrain\n\nRound trip service available'
            },
            
            # Gravelotte Routes
            {
                'name': 'Gravelotte to Tzaneen',
                'origin': 'Gravelotte',
                'destination': 'Tzaneen',
                'distance_km': 45,
                'duration_hours': 0.75,
                'base_price_zar': 80.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Gravelotte - Viva filling station\nDrop-off: Tzaneen - Sasol Agatha\n\nDeparture: 07:00\nArrival: 07:45'
            },
            {
                'name': 'Gravelotte to Tzaneen Round Trip',
                'origin': 'Gravelotte',
                'destination': 'Tzaneen',
                'distance_km': 90,
                'duration_hours': 1.5,
                'base_price_zar': 150.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Gravelotte - Viva filling station\nDrop-off: Tzaneen - Sasol Agatha\n\nRound trip service'
            },
            {
                'name': 'Gravelotte to Polokwane',
                'origin': 'Gravelotte',
                'destination': 'Polokwane',
                'distance_km': 140,
                'duration_hours': 2.25,
                'base_price_zar': 300.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Gravelotte - Viva filling station\nDrop-off: Polokwane - Total Fauna Park\n\nDeparture: 07:00\nArrival: 09:10'
            },
            {
                'name': 'Gravelotte to Polokwane Round Trip',
                'origin': 'Gravelotte',
                'destination': 'Polokwane',
                'distance_km': 280,
                'duration_hours': 4.5,
                'base_price_zar': 580.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Gravelotte - Viva filling station\nDrop-off: Polokwane - Total Fauna Park\n\nRound trip service'
            },
            {
                'name': 'Gravelotte to Pretoria',
                'origin': 'Gravelotte',
                'destination': 'Pretoria',
                'distance_km': 340,
                'duration_hours': 5.25,
                'base_price_zar': 600.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Gravelotte - Viva filling station\nDrop-off: Pretoria - Hatfield Gautrain\n\nDeparture: 07:00\nArrival: 12:05'
            },
            {
                'name': 'Gravelotte to Pretoria Round Trip',
                'origin': 'Gravelotte',
                'destination': 'Pretoria',
                'distance_km': 680,
                'duration_hours': 10.5,
                'base_price_zar': 1050.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Gravelotte - Viva filling station\nDrop-off: Pretoria - Hatfield Gautrain\n\nRound trip service'
            },
            
            # Tzaneen Routes
            {
                'name': 'Tzaneen to Pretoria',
                'origin': 'Tzaneen',
                'destination': 'Pretoria',
                'distance_km': 300,
                'duration_hours': 4.5,
                'base_price_zar': 550.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Tzaneen - Sasol Agatha\nDrop-off: Pretoria - Hatfield Gautrain\n\nDeparture: 08:00\nArrival: 12:05'
            },
            {
                'name': 'Tzaneen to Pretoria Round Trip',
                'origin': 'Tzaneen',
                'destination': 'Pretoria',
                'distance_km': 600,
                'duration_hours': 9,
                'base_price_zar': 900.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Tzaneen - Sasol Agatha\nDrop-off: Pretoria - Hatfield Gautrain\n\nRound trip service'
            },
            
            # Haenertsburg Routes
            {
                'name': 'Haenertsburg to Pretoria',
                'origin': 'Haenertsburg',
                'destination': 'Pretoria',
                'distance_km': 280,
                'duration_hours': 4,
                'base_price_zar': 550.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Haenertsburg - Pancake House\nDrop-off: Pretoria - Hatfield Gautrain\n\nDeparture: 08:30\nArrival: 12:05'
            },
            {
                'name': 'Haenertsburg to Pretoria Round Trip',
                'origin': 'Haenertsburg',
                'destination': 'Pretoria',
                'distance_km': 560,
                'duration_hours': 8,
                'base_price_zar': 900.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Haenertsburg - Pancake House\nDrop-off: Pretoria - Hatfield Gautrain\n\nRound trip service'
            },
            
            # Polokwane Routes
            {
                'name': 'Polokwane to Pretoria',
                'origin': 'Polokwane',
                'destination': 'Pretoria',
                'distance_km': 200,
                'duration_hours': 3,
                'base_price_zar': 520.00,
                'route_type': 'one_way',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Polokwane - Total Fauna Park\nDrop-off: Pretoria - Hatfield Gautrain\n\nDeparture: 09:20\nArrival: 12:05'
            },
            {
                'name': 'Polokwane to Pretoria Round Trip',
                'origin': 'Polokwane',
                'destination': 'Pretoria',
                'distance_km': 400,
                'duration_hours': 6,
                'base_price_zar': 850.00,
                'route_type': 'round_trip',
                'operating_days': 'Wednesday,Friday,Sunday',
                'description': 'Pickup: Polokwane - Total Fauna Park\nDrop-off: Pretoria - Hatfield Gautrain\n\nRound trip service'
            },
            
            # Western Routes (Pretoria-Centurion-Krugersdorp-Potchefstroom) - Friday and Sunday only
            {
                'name': 'Pretoria to Krugersdorp',
                'origin': 'Pretoria',
                'destination': 'Krugersdorp',
                'distance_km': 60,
                'duration_hours': 1,
                'base_price_zar': 120.00,
                'route_type': 'one_way',
                'operating_days': 'Friday,Sunday',
                'description': 'Multiple pickup points:\n- BP Silver Lakes\n- Hatfield Mustang Sally\'s\n- Gautrain Hatfield\n- Centurion Total Energies\n\nDrop-off: Krugersdorp - Sasol Pinehaven'
            },
            {
                'name': 'Pretoria to Krugersdorp Round Trip',
                'origin': 'Pretoria',
                'destination': 'Krugersdorp',
                'distance_km': 120,
                'duration_hours': 2,
                'base_price_zar': 220.00,
                'route_type': 'round_trip',
                'operating_days': 'Friday,Sunday',
                'description': 'Multiple pickup points:\n- BP Silver Lakes\n- Hatfield Mustang Sally\'s\n- Gautrain Hatfield\n- Centurion Total Energies\n\nDrop-off: Krugersdorp - Sasol Pinehaven'
            },
            {
                'name': 'Pretoria to Potchefstroom',
                'origin': 'Pretoria',
                'destination': 'Potchefstroom',
                'distance_km': 160,
                'duration_hours': 2.5,
                'base_price_zar': 220.00,
                'route_type': 'one_way',
                'operating_days': 'Friday,Sunday',
                'description': 'Multiple pickup points:\n- BP Silver Lakes\n- Hatfield Mustang Sally\'s\n- Gautrain Hatfield\n- Centurion Total Energies\n\nDrop-off: Potchefstroom - Engen Mooirivier Convenience Centre'
            },
            {
                'name': 'Pretoria to Potchefstroom Round Trip',
                'origin': 'Pretoria',
                'destination': 'Potchefstroom',
                'distance_km': 320,
                'duration_hours': 5,
                'base_price_zar': 400.00,
                'route_type': 'round_trip',
                'operating_days': 'Friday,Sunday',
                'description': 'Multiple pickup points:\n- BP Silver Lakes\n- Hatfield Mustang Sally\'s\n- Gautrain Hatfield\n- Centurion Total Energies\n\nDrop-off: Potchefstroom - Engen Mooirivier Convenience Centre'
            },
            {
                'name': 'Krugersdorp to Potchefstroom',
                'origin': 'Krugersdorp',
                'destination': 'Potchefstroom',
                'distance_km': 100,
                'duration_hours': 1.5,
                'base_price_zar': 170.00,
                'route_type': 'one_way',
                'operating_days': 'Friday,Sunday',
                'description': 'Pickup: Krugersdorp - Sasol Pinehaven\nDrop-off: Potchefstroom - Engen Mooirivier Convenience Centre\n\nVia Carletonville Mall'
            },
            {
                'name': 'Krugersdorp to Potchefstroom Round Trip',
                'origin': 'Krugersdorp',
                'destination': 'Potchefstroom',
                'distance_km': 200,
                'duration_hours': 3,
                'base_price_zar': 300.00,
                'route_type': 'round_trip',
                'operating_days': 'Friday,Sunday',
                'description': 'Pickup: Krugersdorp - Sasol Pinehaven\nDrop-off: Potchefstroom - Engen Mooirivier Convenience Centre\n\nVia Carletonville Mall'
            }
        ]
        
        routes = []
        for data in route_data:
            route, created = Route.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
            routes.append(route)
            
            if created:
                self.stdout.write(f'  Created route: {route.origin} → {route.destination}')
        
        return routes
    
    def create_buses(self):
        """
        Create Falcon Bus Lines fleet
        """
        
        bus_data = [
            # Main fleet for longer routes
            {'bus_number': 'FB001', 'total_seats': 40, 'bus_type': 'standard', 'amenities': 'Air conditioning, Comfortable seats, Luggage compartment'},
            {'bus_number': 'FB002', 'total_seats': 42, 'bus_type': 'standard', 'amenities': 'Air conditioning, Reclining seats, Power outlets'},
            {'bus_number': 'FB003', 'total_seats': 38, 'bus_type': 'deluxe', 'amenities': 'Air conditioning, Extra legroom, WiFi, Refreshments'},
            {'bus_number': 'FB004', 'total_seats': 40, 'bus_type': 'standard', 'amenities': 'Air conditioning, Comfortable seating, Safety features'},
            {'bus_number': 'FB005', 'total_seats': 44, 'bus_type': 'standard', 'amenities': 'Air conditioning, Power outlets, Clean facilities'},
            
            # Smaller buses for shorter routes
            {'bus_number': 'FB006', 'total_seats': 28, 'bus_type': 'standard', 'amenities': 'Air conditioning, Comfortable seats'},
            {'bus_number': 'FB007', 'total_seats': 30, 'bus_type': 'standard', 'amenities': 'Air conditioning, Power outlets'},
            {'bus_number': 'FB008', 'total_seats': 32, 'bus_type': 'deluxe', 'amenities': 'Air conditioning, Reclining seats, WiFi'},
            
            # Backup fleet
            {'bus_number': 'FB009', 'total_seats': 36, 'bus_type': 'standard', 'amenities': 'Air conditioning, Luggage space'},
            {'bus_number': 'FB010', 'total_seats': 38, 'bus_type': 'standard', 'amenities': 'Air conditioning, Safety features'},
        ]
        
        buses = []
        for data in bus_data:
            bus, created = Bus.objects.get_or_create(
                bus_number=data['bus_number'],
                defaults={
                    'total_seats': data['total_seats'],
                    'bus_type': data['bus_type'],
                    'amenities': data['amenities'],
                    'is_active': True,
                    'last_maintenance': timezone.now().date() - timedelta(days=random.randint(1, 30))
                }
            )
            buses.append(bus)
            
            if created:
                self.stdout.write(f'  Created bus: {bus.bus_number} ({bus.bus_type}, {bus.total_seats} seats)')
        
        return buses
    
    def create_schedules(self, routes, buses, days):
        """
        Create schedules based on real Falcon Bus Lines timetable and operating days
        """
        
        schedules = []
        
        # Define actual departure times based on route patterns
        route_schedules = {
            # Northern route departures
            'Phalaborwa': ['06:20'],
            'Gravelotte': ['07:00'],
            'Tzaneen': ['08:00'],
            'Haenertsburg': ['08:30'],
            'Polokwane': ['09:20'],
            
            # Return departures from Pretoria
            'Pretoria': ['12:10', '12:30'],
            
            # Western routes
            'Krugersdorp': ['13:05'],
            'Potchefstroom': ['15:00']
        }
        
        # Day name mapping
        weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        
        for route in routes:
            # Get departure times for origin city
            departure_times = route_schedules.get(route.origin, ['08:00'])  # Default if not found
            
            # Get suitable buses for this route
            if route.distance_km > 200:
                suitable_buses = [b for b in buses if b.total_seats >= 35]  # Larger buses for longer routes
            else:
                suitable_buses = buses  # Any bus for shorter routes
            
            # Get operating days for this route
            operating_days = route.get_operating_days_list()
            
            # Create schedules for each day
            for day_offset in range(days):
                schedule_date = timezone.now().date() + timedelta(days=day_offset)
                
                # Check if this route operates on this day of the week
                day_name = weekdays[schedule_date.weekday()]
                if day_name not in operating_days:
                    continue  # Skip this day - route doesn't operate
                
                for time_str in departure_times:
                    # Parse departure time
                    hour, minute = map(int, time_str.split(':'))
                    departure_datetime = timezone.make_aware(
                        datetime.combine(schedule_date, datetime.min.time().replace(hour=hour, minute=minute))
                    )
                    
                    # Calculate arrival time
                    arrival_datetime = departure_datetime + timedelta(hours=route.duration_hours)
                    
                    # Select a random suitable bus
                    if suitable_buses:
                        bus = random.choice(suitable_buses)
                    else:
                        bus = random.choice(buses)
                    
                    # Use exact pricing from route data
                    schedule_price = route.base_price_zar
                    
                    # Create schedule
                    schedule, created = Schedule.objects.get_or_create(
                        route=route,
                        bus=bus,
                        departure_time=departure_datetime,
                        defaults={
                            'arrival_time': arrival_datetime,
                            'available_seats': bus.total_seats,
                            'price_zar': schedule_price,
                            'is_active': True
                        }
                    )
                    
                    if created:
                        schedules.append(schedule)
        
        return schedules
    
    def create_contact_info(self):
        """
        Create Falcon Bus Lines contact information
        """
        
        contact_data = {
            'company_name': 'Falcon Bus Service & Beyers Busdiens',
            'email': 'info@falconbuslines.co.za',
            'phone_primary': '+27 64 686 6963',
            'phone_secondary': '+27 11 123 4568',
            'whatsapp_number': '+27 64 686 6963',
            'address': 'Limpopo Province, South Africa',
            'business_hours': 'Monday - Sunday: 6:00 AM - 10:00 PM',
            'facebook_url': 'https://facebook.com/falconbusservice',
            'twitter_url': 'https://twitter.com/falconbusservice',
            'instagram_url': 'https://instagram.com/falconbusservice',
            'emergency_contact': '+27 82 999 8888'
        }
        
        contact, created = ContactInfo.objects.get_or_create(
            company_name=contact_data['company_name'],
            defaults=contact_data
        )
        
        return contact
    
    def create_faqs(self):
        """
        Create frequently asked questions
        """
        
        faq_data = [
            {
                'question': 'How far in advance can I book a ticket?',
                'answer': 'You can book tickets up to 3 months (90 days) in advance. This allows you to secure your preferred travel dates and often get better prices.',
                'order': 1
            },
            {
                'question': 'Can I change or cancel my booking?',
                'answer': 'Yes, you can change or cancel your booking up to 24 hours before departure. Cancellations made more than 48 hours in advance receive a full refund minus a small processing fee.',
                'order': 2
            },
            {
                'question': 'Do I need to print my ticket?',
                'answer': 'No, you can show your digital ticket on your smartphone. However, we recommend having a backup (screenshot or printed copy) in case of technical issues.',
                'order': 3
            },
            
            # Payment FAQs
            {
                'question': 'What payment methods do you accept?',
                'answer': 'We accept all major credit and debit cards (Visa, Mastercard, American Express) and EFT payments through our secure PayFast payment system. All payments are in South African Rand (ZAR).',
                'order': 4
            },
            {
                'question': 'Is my payment information secure?',
                'answer': 'Yes, we use PayFast\'s industry-leading security to process payments. Your card details are encrypted and never stored on our servers.',
                'order': 5
            },
            {
                'question': 'When will I be charged?',
                'answer': 'Payment is processed immediately when you complete your booking. You will receive a confirmation email with your receipt and ticket details.',
                'order': 6
            },
            
            # Travel FAQs
            {
                'question': 'What should I bring when traveling?',
                'answer': 'Please bring a valid ID document (South African ID, passport, or driver\'s license). For your comfort, consider bringing a pillow, blanket, snacks, and entertainment for longer journeys.',
                'order': 7
            },
            {
                'question': 'Are there luggage restrictions?',
                'answer': 'Each passenger can bring one large suitcase (up to 20kg) and one carry-on bag free of charge. Additional luggage may incur extra fees.',
                'order': 8
            },
            {
                'question': 'Do buses have WiFi and power outlets?',
                'answer': 'Our luxury and most standard coaches are equipped with free WiFi and power outlets. Economy coaches have power outlets but limited WiFi availability.',
                'order': 9
            },
            {
                'question': 'What happens if my bus is delayed or cancelled?',
                'answer': 'In case of delays, we\'ll notify you via SMS and email. For cancellations due to weather or mechanical issues, we\'ll rebook you on the next available service or provide a full refund.',
                'order': 10
            },
            
            # Safety FAQs
            {
                'question': 'What safety measures do you have in place?',
                'answer': 'All our drivers are professionally trained and regularly tested. Our buses undergo daily safety checks and regular maintenance. We also have GPS tracking and 24/7 monitoring of all vehicles.',
                'order': 11
            },
            {
                'question': 'Are face masks required?',
                'answer': 'We follow current government health guidelines. Please check our website or contact us for the latest health and safety requirements.',
                'order': 12
            },
            
            # General FAQs
            {
                'question': 'How early should I arrive at the bus station?',
                'answer': 'Please arrive at least 30 minutes before departure time. This allows time for check-in, luggage handling, and finding your seat.',
                'order': 13
            },
            {
                'question': 'Can I bring pets on the bus?',
                'answer': 'Small pets in carriers are allowed on most routes with advance notice and an additional fee. Service animals travel free of charge. Please contact us before booking to arrange pet travel.',
                'order': 14
            },
            {
                'question': 'Do you offer group discounts?',
                'answer': 'Yes, we offer discounts for groups of 10 or more passengers traveling together. Please contact our customer service team for group booking rates.',
                'order': 15
            }
        ]
        
        faqs = []
        for data in faq_data:
            faq, created = FAQ.objects.get_or_create(
                question=data['question'],
                defaults=data
            )
            
            if created:
                faqs.append(faq)
        
        return faqs
