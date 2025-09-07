"""
Django Management Command to Setup Default Data

This command creates:
1. Default admin superuser (username: admin, password: admin123)
2. Two sample routes with schedules for testing

To run this command:
python manage.py setup_defaults
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime, timedelta
from decimal import Decimal
from transport.models import Route, Bus, Schedule
import random

class Command(BaseCommand):
    help = 'Setup default admin user and basic test data'
    
    def handle(self, *args, **options):
        """
        Main method that executes when the command is run
        """
        
        self.stdout.write('Setting up default data...')
        
        # Create default admin user
        admin_user = self.create_admin_user()
        self.stdout.write(self.style.SUCCESS(f'✓ Admin user: {admin_user.username}'))
        
        # Create basic routes
        routes = self.create_basic_routes()
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(routes)} routes'))
        
        # Create basic buses
        buses = self.create_basic_buses()
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(buses)} buses'))
        
        # Create schedules for next 30 days
        schedules = self.create_basic_schedules(routes, buses)
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(schedules)} schedules'))
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\n🎉 Default setup completed!\n'
                f'👤 Admin Login: admin / admin123\n'
                f'🌐 Admin Panel: http://localhost:8000/admin/\n'
                f'📍 Routes: {len(routes)}\n'
                f'🚌 Buses: {len(buses)}\n'
                f'🕐 Schedules: {len(schedules)}\n'
            )
        )
    
    def create_admin_user(self):
        """
        Create default admin superuser
        """
        username = 'admin'
        password = 'admin123'
        email = 'admin@falconbus.co.za'
        
        # Check if admin user already exists
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            self.stdout.write(f'  Admin user already exists: {username}')
        else:
            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(f'  Created admin user: {username}')
        
        return user
    
    def create_basic_routes(self):
        """
        Create 2 basic test routes
        """
        route_data = [
            {
                'name': 'Phalaborwa to Tzaneen',
                'origin': 'Phalaborwa',
                'destination': 'Tzaneen',
                'distance_km': 85,
                'duration_hours': 1.5,
                'base_price_zar': Decimal('150.00'),
                'route_type': 'one_way',
                'operating_days': 'Monday,Wednesday,Friday',
                'description': 'Daily express service from Phalaborwa to Tzaneen.\n\nPickup: Phalaborwa - Postnet next to Viva\nDrop-off: Tzaneen - Sasol Agatha\n\nDeparture: 06:30\nArrival: 08:00'
            },
            {
                'name': 'Pretoria to Polokwane',
                'origin': 'Pretoria',
                'destination': 'Polokwane',
                'distance_km': 200,
                'duration_hours': 3.0,
                'base_price_zar': Decimal('300.00'),
                'route_type': 'one_way',
                'operating_days': 'Tuesday,Thursday,Saturday',
                'description': 'Regular service from Pretoria to Polokwane.\n\nPickup: Pretoria - Hatfield Gautrain Station\nDrop-off: Polokwane - Total Fauna Park\n\nDeparture: 08:00\nArrival: 11:00'
            }
        ]
        
        routes = []
        for data in route_data:
            route, created = Route.objects.get_or_create(
                name=data['name'],
                origin=data['origin'],
                destination=data['destination'],
                defaults=data
            )
            routes.append(route)
            
            if created:
                self.stdout.write(f'  Created route: {route.origin} → {route.destination}')
        
        return routes
    
    def create_basic_buses(self):
        """
        Create 2 basic test buses
        """
        bus_data = [
            {
                'bus_number': 'FB001',
                'total_seats': 40,
                'bus_type': 'standard',
                'amenities': 'Air conditioning, Comfortable seats, Luggage compartment',
                'is_active': True,
                'last_maintenance': timezone.now().date() - timedelta(days=5)
            },
            {
                'bus_number': 'FB002',
                'total_seats': 35,
                'bus_type': 'deluxe',
                'amenities': 'Air conditioning, Reclining seats, WiFi, Power outlets',
                'is_active': True,
                'last_maintenance': timezone.now().date() - timedelta(days=3)
            }
        ]
        
        buses = []
        for data in bus_data:
            bus, created = Bus.objects.get_or_create(
                bus_number=data['bus_number'],
                defaults=data
            )
            buses.append(bus)
            
            if created:
                self.stdout.write(f'  Created bus: {bus.bus_number} ({bus.bus_type}, {bus.total_seats} seats)')
        
        return buses
    
    def create_basic_schedules(self, routes, buses):
        """
        Create schedules for the next 30 days
        """
        schedules = []
        days_ahead = 30
        
        # Define departure times for each route
        departure_times = {
            'Phalaborwa to Tzaneen': ['06:30', '14:30'],
            'Pretoria to Polokwane': ['08:00', '15:00']
        }
        
        # Day name mapping
        weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        
        for route in routes:
            # Get operating days for this route
            operating_days = route.get_operating_days_list()
            
            # Get departure times for this route
            times = departure_times.get(route.name, ['08:00'])
            
            # Create schedules for each day
            for day_offset in range(days_ahead):
                schedule_date = timezone.now().date() + timedelta(days=day_offset)
                day_name = weekdays[schedule_date.weekday()]
                
                # Check if route operates on this day
                if day_name not in operating_days:
                    continue
                
                for time_str in times:
                    # Parse departure time
                    hour, minute = map(int, time_str.split(':'))
                    departure_datetime = timezone.make_aware(
                        datetime.combine(schedule_date, datetime.min.time().replace(hour=hour, minute=minute))
                    )
                    
                    # Calculate arrival time
                    arrival_datetime = departure_datetime + timedelta(hours=route.duration_hours)
                    
                    # Assign bus (alternate between buses)
                    bus = buses[len(schedules) % len(buses)]
                    
                    # Create schedule if it doesn't exist
                    schedule, created = Schedule.objects.get_or_create(
                        route=route,
                        bus=bus,
                        departure_time=departure_datetime,
                        defaults={
                            'arrival_time': arrival_datetime,
                            'available_seats': bus.total_seats,
                            'price_zar': route.base_price_zar,
                            'is_active': True
                        }
                    )
                    
                    if created:
                        schedules.append(schedule)
        
        return schedules
