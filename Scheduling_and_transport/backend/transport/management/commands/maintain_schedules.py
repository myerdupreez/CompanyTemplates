"""
Django Management Command for Schedule Maintenance

This command automatically:
1. Removes old/past schedules to keep database clean
2. Generates new schedules for future dates
3. Maintains a rolling window of available schedules

Can be run manually or set up as a cron job to run daily/weekly.

Usage:
python manage.py maintain_schedules
python manage.py maintain_schedules --days-ahead=120
python manage.py maintain_schedules --cleanup-past
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from transport.models import Route, Bus, Schedule
import random

class Command(BaseCommand):
    help = 'Maintain schedules by cleaning old ones and generating new ones'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--days-ahead',
            type=int,
            default=90,
            help='Number of days ahead to maintain schedules (default: 90)',
        )
        
        parser.add_argument(
            '--cleanup-past',
            action='store_true',
            help='Remove schedules from past dates',
        )
        
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be done without making changes',
        )
    
    def handle(self, *args, **options):
        self.stdout.write('🔧 Starting schedule maintenance...\n')
        
        days_ahead = options['days_ahead']
        cleanup_past = options['cleanup_past']
        dry_run = options['dry_run']
        
        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No changes will be made\n'))
        
        # Step 1: Cleanup past schedules if requested
        if cleanup_past:
            self.cleanup_past_schedules(dry_run)
        
        # Step 2: Check what dates we have schedules for
        self.analyze_current_schedules()
        
        # Step 3: Generate missing schedules
        self.generate_missing_schedules(days_ahead, dry_run)
        
        self.stdout.write(self.style.SUCCESS('\n✅ Schedule maintenance completed!'))
    
    def cleanup_past_schedules(self, dry_run=False):
        """Remove schedules from past dates"""
        today = timezone.now().date()
        past_schedules = Schedule.objects.filter(departure_time__date__lt=today)
        count = past_schedules.count()
        
        if count > 0:
            self.stdout.write(f'🗑️  Found {count} past schedules to remove...')
            if not dry_run:
                past_schedules.delete()
                self.stdout.write(self.style.SUCCESS(f'   Removed {count} past schedules'))
            else:
                self.stdout.write(f'   Would remove {count} past schedules')
        else:
            self.stdout.write('✨ No past schedules to clean up')
    
    def analyze_current_schedules(self):
        """Analyze what schedules currently exist"""
        today = timezone.now().date()
        
        # Find date range of existing schedules
        future_schedules = Schedule.objects.filter(departure_time__date__gte=today)
        
        if future_schedules.exists():
            earliest = future_schedules.earliest('departure_time').departure_time.date()
            latest = future_schedules.latest('departure_time').departure_time.date()
            count = future_schedules.count()
            
            self.stdout.write(f'📊 Current schedule status:')
            self.stdout.write(f'   • {count} future schedules')
            self.stdout.write(f'   • Date range: {earliest} to {latest}')
            self.stdout.write(f'   • Days covered: {(latest - today).days + 1}')
        else:
            self.stdout.write(self.style.WARNING('⚠️  No future schedules found!'))
    
    def generate_missing_schedules(self, days_ahead, dry_run=False):
        """Generate schedules for dates that don't have them"""
        today = timezone.now().date()
        target_date = today + timedelta(days=days_ahead)
        
        routes = Route.objects.filter(is_active=True)
        buses = Bus.objects.filter(is_active=True)
        
        if not routes.exists():
            self.stdout.write(self.style.ERROR('❌ No active routes found!'))
            return
        
        if not buses.exists():
            self.stdout.write(self.style.ERROR('❌ No active buses found!'))
            return
        
        # Day name mapping
        weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        
        # Route departure times
        route_schedules = {
            'Phalaborwa': ['06:20'],
            'Gravelotte': ['07:00'],
            'Tzaneen': ['08:00'],
            'Haenertsburg': ['08:30'],
            'Polokwane': ['09:20'],
            'Pretoria': ['12:10', '12:30'],
            'Krugersdorp': ['13:05'],
            'Potchefstroom': ['15:00']
        }
        
        schedules_created = 0
        dates_processed = 0
        
        self.stdout.write(f'🚌 Generating schedules from {today} to {target_date}...')
        
        for route in routes:
            operating_days = route.get_operating_days_list()
            departure_times = route_schedules.get(route.origin, ['08:00'])
            
            # Get suitable buses
            if route.distance_km > 200:
                suitable_buses = [b for b in buses if b.total_seats >= 35]
            else:
                suitable_buses = list(buses)
            
            if not suitable_buses:
                suitable_buses = list(buses)
            
            # Generate schedules for each day
            current_date = today
            while current_date <= target_date:
                day_name = weekdays[current_date.weekday()]
                
                if day_name in operating_days:
                    for time_str in departure_times:
                        # Check if schedule already exists
                        hour, minute = map(int, time_str.split(':'))
                        departure_datetime = timezone.make_aware(
                            datetime.combine(current_date, datetime.min.time().replace(hour=hour, minute=minute))
                        )
                        
                        existing = Schedule.objects.filter(
                            route=route,
                            departure_time=departure_datetime
                        ).exists()
                        
                        if not existing:
                            if not dry_run:
                                # Create new schedule
                                arrival_datetime = departure_datetime + timedelta(hours=route.duration_hours)
                                bus = random.choice(suitable_buses)
                                
                                Schedule.objects.create(
                                    route=route,
                                    bus=bus,
                                    departure_time=departure_datetime,
                                    arrival_time=arrival_datetime,
                                    available_seats=bus.total_seats,
                                    price_zar=route.base_price_zar,
                                    is_active=True
                                )
                            
                            schedules_created += 1
                
                current_date += timedelta(days=1)
                dates_processed += 1
        
        self.stdout.write(f'📈 Generation summary:')
        self.stdout.write(f'   • Dates processed: {dates_processed}')
        if dry_run:
            self.stdout.write(f'   • Would create: {schedules_created} schedules')
        else:
            self.stdout.write(f'   • Created: {schedules_created} new schedules')

"""
To set up automatic maintenance, you can:

1. Linux/Mac - Add to crontab:
   # Run daily at 2 AM
   0 2 * * * cd /path/to/project && python manage.py maintain_schedules --cleanup-past

2. Windows - Task Scheduler:
   - Create task to run daily
   - Action: Start program
   - Program: python
   - Arguments: manage.py maintain_schedules --cleanup-past
   - Start in: C:\path\to\Backend\

3. Django-Crontab (recommended):
   pip install django-crontab
   # Add to settings.py
   CRONJOBS = [
       ('0 2 * * *', 'transport.management.commands.maintain_schedules.Command.handle', ['--cleanup-past'])
   ]
"""
