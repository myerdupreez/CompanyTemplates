"""
Management command to populate the database with sample data for demonstration
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from transport.models import Route, Schedule, Booking
import random

class Command(BaseCommand):
    help = 'Populate database with sample bus routes and schedules'

    def handle(self, *args, **options):
        self.stdout.write('🚌 Creating sample bus routes and schedules...')
        
        # Clear existing data
        Schedule.objects.all().delete()
        Route.objects.all().delete()
        from transport.models import Bus
        Bus.objects.all().delete()

        # Create a default bus
        default_bus = Bus.objects.create(
            bus_number='BT001',
            bus_type='standard',
            total_seats=50,
            amenities='WiFi, AC, USB Charging',
            is_active=True
        )

        # Sample routes
        routes_data = [
            {
                'origin': 'Cape Town',
                'destination': 'Johannesburg', 
                'distance_km': 1400,
                'base_price_zar': 450.00,
                'duration_hours': 16,
                'description': 'Premium intercity service between Cape Town and Johannesburg with comfortable seating and onboard amenities.'
            },
            {
                'origin': 'Johannesburg',
                'destination': 'Durban',
                'distance_km': 560,
                'base_price_zar': 320.00,
                'duration_hours': 8,
                'description': 'Direct route from Johannesburg to Durban with scenic coastal views.'
            },
            {
                'origin': 'Cape Town',
                'destination': 'Port Elizabeth',
                'distance_km': 770,
                'base_price_zar': 280.00,
                'duration_hours': 10,
                'description': 'Comfortable journey along the Garden Route with multiple stops.'
            },
            {
                'origin': 'Pretoria',
                'destination': 'Bloemfontein',
                'distance_km': 350,
                'base_price_zar': 180.00,
                'duration_hours': 5,
                'description': 'Regular service connecting the administrative capital to the Free State.'
            },
            {
                'origin': 'Durban',
                'destination': 'Cape Town',
                'distance_km': 1600,
                'base_price_zar': 520.00,
                'duration_hours': 18,
                'description': 'Cross-country journey with overnight stops and meal breaks.'
            }
        ]
        
        routes = []
        for route_data in routes_data:
            route = Route.objects.create(**route_data)
            routes.append(route)
            self.stdout.write(f'✅ Created route: {route.origin} → {route.destination}')
        
        # Create schedules for the next 30 days
        self.stdout.write('\n📅 Creating schedules...')
        
        today = timezone.now().date()
        
        for route in routes:
            # Create 2-3 schedules per day for each route
            for day in range(30):
                date = today + timedelta(days=day)
                # Calculate duration as timedelta
                duration = timedelta(hours=route.duration_hours)

                # Morning departure
                morning_time = datetime.combine(date, datetime.min.time().replace(hour=6, minute=0))
                morning_time = timezone.make_aware(morning_time)
                morning_arrival = morning_time + duration
                Schedule.objects.create(
                    route=route,
                    bus=default_bus,
                    departure_time=morning_time,
                    arrival_time=morning_arrival,
                    available_seats=random.randint(25, 50),
                    price_zar=route.base_price_zar
                )

                # Afternoon departure
                afternoon_time = datetime.combine(date, datetime.min.time().replace(hour=14, minute=30))
                afternoon_time = timezone.make_aware(afternoon_time)
                afternoon_arrival = afternoon_time + duration
                Schedule.objects.create(
                    route=route,
                    bus=default_bus,
                    departure_time=afternoon_time,
                    arrival_time=afternoon_arrival,
                    available_seats=random.randint(25, 50),
                    price_zar=route.base_price_zar + 50  # Slightly higher afternoon price
                )

                # Evening departure (not every day)
                if random.choice([True, False]):
                    evening_time = datetime.combine(date, datetime.min.time().replace(hour=20, minute=0))
                    evening_time = timezone.make_aware(evening_time)
                    evening_arrival = evening_time + duration
                    Schedule.objects.create(
                        route=route,
                        bus=default_bus,
                        departure_time=evening_time,
                        arrival_time=evening_arrival,
                        available_seats=random.randint(20, 45),
                        price_zar=route.base_price_zar + 100  # Premium evening price
                    )
        
        total_schedules = Schedule.objects.count()
        self.stdout.write(f'✅ Created {total_schedules} schedules')
        


        self.stdout.write(
            self.style.SUCCESS(
                f'\n🎉 Database populated successfully!\n'
                f'Routes: {Route.objects.count()}\n'
                f'Schedules: {Schedule.objects.count()}\n'
                f'Bookings: {Booking.objects.count()}\n'
            )
        )
