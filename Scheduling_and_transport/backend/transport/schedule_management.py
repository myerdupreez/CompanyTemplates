"""
Automated Schedule Management for Falcon Bus Lines

This module provides automatic schedule generation and maintenance.
It ensures that there are always schedules available for booking
and cleans up old schedules to keep the database efficient.

Features:
1. Automatic schedule generation based on operating days
2. Old schedule cleanup
3. Gap detection and filling
4. Configurable schedule horizon (default: 90 days)
"""

from django.utils import timezone
from datetime import datetime, timedelta, time
from transport.models import Route, Bus, Schedule
import random
import logging

logger = logging.getLogger(__name__)

class ScheduleManager:
    """
    Manages automatic schedule generation and maintenance
    """
    
    def __init__(self, days_ahead=90):
        self.days_ahead = days_ahead
        self.weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        self.route_schedules = {
            'Phalaborwa': ['06:20'],
            'Gravelotte': ['07:00'],
            'Tzaneen': ['08:00'],
            'Haenertsburg': ['08:30'],
            'Polokwane': ['09:20'],
            'Pretoria': ['12:10', '12:30'],
            'Krugersdorp': ['13:05'],
            'Potchefstroom': ['15:00']
        }
    
    def maintain_schedules(self, cleanup_past=True, days_ahead=None, dry_run=False):
        """
        Main method to maintain schedules
        Args:
            cleanup_past: Whether to clean up past schedules
            days_ahead: Override default days_ahead setting
            dry_run: If True, show what would be done without making changes
        Returns: dict with maintenance statistics
        """
        # Use custom days_ahead if provided
        original_days = self.days_ahead
        if days_ahead is not None:
            self.days_ahead = days_ahead
        
        stats = {
            'cleaned_schedules': 0,
            'created_schedules': 0,
            'would_clean': 0,
            'would_create': 0,
            'total_future_schedules': 0,
            'maintenance_date': timezone.now(),
            'days_ahead': self.days_ahead,
            'dry_run': dry_run
        }
        
        try:
            # Step 1: Clean up past schedules
            if cleanup_past:
                if dry_run:
                    cleanup_result = self.cleanup_past_schedules(dry_run=True)
                    stats['would_clean'] = cleanup_result.get('would_delete', 0)
                else:
                    stats['cleaned_schedules'] = self.cleanup_past_schedules()
            
            # Step 2: Generate missing schedules
            if dry_run:
                # For dry run, we need to count what would be created without actually creating
                today = timezone.now().date()
                target_date = today + timedelta(days=self.days_ahead)
                
                routes = Route.objects.filter(is_active=True)
                would_create = 0
                
                for route in routes:
                    operating_days = route.get_operating_days_list()
                    departure_times = self.route_schedules.get(route.origin, ['08:00'])
                    
                    current_date = today
                    while current_date <= target_date:
                        day_name = self.weekdays[current_date.weekday()]
                        
                        if day_name in operating_days:
                            for time_str in departure_times:
                                hour, minute = map(int, time_str.split(':'))
                                departure_datetime = timezone.make_aware(
                                    datetime.combine(current_date, time(hour, minute))
                                )
                                
                                # Check if schedule already exists
                                if not Schedule.objects.filter(
                                    route=route,
                                    departure_time=departure_datetime
                                ).exists():
                                    would_create += 1
                        
                        current_date += timedelta(days=1)
                
                stats['would_create'] = would_create
            else:
                stats['created_schedules'] = self.generate_missing_schedules()
            
            # Step 3: Get final count
            stats['total_future_schedules'] = self.get_future_schedules_count()
            
            logger.info(f"Schedule maintenance completed: {stats}")
            return stats
            
        finally:
            # Restore original days_ahead
            self.days_ahead = original_days
    
    def cleanup_past_schedules(self, dry_run=False):
        """Remove schedules from past dates"""
        today = timezone.now().date()
        past_schedules = Schedule.objects.filter(departure_time__date__lt=today)
        count = past_schedules.count()
        
        if dry_run:
            logger.info(f"Would clean up {count} past schedules")
            return {'would_delete': count}
        
        if count > 0:
            past_schedules.delete()
            logger.info(f"Cleaned up {count} past schedules")
        
        return count
    
    def generate_missing_schedules(self):
        """Generate schedules for missing dates"""
        today = timezone.now().date()
        target_date = today + timedelta(days=self.days_ahead)
        
        routes = Route.objects.filter(is_active=True)
        buses = Bus.objects.filter(is_active=True)
        
        if not routes.exists() or not buses.exists():
            logger.warning("No active routes or buses found")
            return 0
        
        schedules_created = 0
        
        for route in routes:
            operating_days = route.get_operating_days_list()
            departure_times = self.route_schedules.get(route.origin, ['08:00'])
            
            # Get suitable buses
            suitable_buses = self.get_suitable_buses(route, buses)
            
            # Generate schedules for each applicable day
            current_date = today
            while current_date <= target_date:
                day_name = self.weekdays[current_date.weekday()]
                
                if day_name in operating_days:
                    for time_str in departure_times:
                        if self.create_schedule_if_missing(route, current_date, time_str, suitable_buses):
                            schedules_created += 1
                
                current_date += timedelta(days=1)
        
        logger.info(f"Created {schedules_created} new schedules")
        return schedules_created
    
    def get_suitable_buses(self, route, buses):
        """Get buses suitable for a route"""
        if route.distance_km > 200:
            suitable_buses = [b for b in buses if b.total_seats >= 35]
        else:
            suitable_buses = list(buses)
        
        if not suitable_buses:
            suitable_buses = list(buses)
        
        return suitable_buses
    
    def create_schedule_if_missing(self, route, date, time_str, suitable_buses):
        """Create a schedule if it doesn't exist"""
        hour, minute = map(int, time_str.split(':'))
        departure_datetime = timezone.make_aware(
            datetime.combine(date, datetime.min.time().replace(hour=hour, minute=minute))
        )
        
        # Check if schedule already exists
        if Schedule.objects.filter(route=route, departure_time=departure_datetime).exists():
            return False
        
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
        
        return True
    
    def get_future_schedules_count(self):
        """Get count of future schedules"""
        today = timezone.now().date()
        return Schedule.objects.filter(departure_time__date__gte=today).count()
    
    def get_schedule_coverage(self):
        """Get information about schedule coverage"""
        today = timezone.now().date()
        future_schedules = Schedule.objects.filter(departure_time__date__gte=today)
        
        if not future_schedules.exists():
            return {
                'has_schedules': False,
                'earliest_date': None,
                'latest_date': None,
                'days_covered': 0,
                'total_schedules': 0
            }
        
        earliest = future_schedules.earliest('departure_time').departure_time.date()
        latest = future_schedules.latest('departure_time').departure_time.date()
        
        return {
            'has_schedules': True,
            'earliest_date': earliest,
            'latest_date': latest,
            'days_covered': (latest - today).days + 1,
            'total_schedules': future_schedules.count()
        }
    
    def get_health_status(self):
        """Get comprehensive health status of the schedule system"""
        coverage = self.get_schedule_coverage()
        
        return {
            'future_schedules': coverage['total_schedules'],
            'earliest_date': coverage['earliest_date'],
            'latest_date': coverage['latest_date'], 
            'days_covered': coverage['days_covered'],
            'has_schedules': coverage['has_schedules'],
            'needs_maintenance': coverage['days_covered'] < 30 if coverage['has_schedules'] else True,
            'status': 'healthy' if coverage['days_covered'] >= 60 else 'needs_attention' if coverage['days_covered'] >= 30 else 'critical'
        }

# Global instance for easy access
schedule_manager = ScheduleManager()

def auto_maintain_schedules(days_ahead=90, dry_run=False):
    """
    Convenience function for automatic maintenance
    Can be called from views, cron jobs, etc.
    
    Args:
        days_ahead: Number of days to maintain ahead (default: 90 = ~3 months)
        dry_run: If True, preview changes without executing
    """
    return schedule_manager.maintain_schedules(days_ahead=days_ahead, dry_run=dry_run)

def check_schedule_health():
    """
    Check if schedules need maintenance
    Returns True if maintenance is needed
    """
    coverage = schedule_manager.get_schedule_coverage()
    
    if not coverage['has_schedules']:
        return True
    
    # Need maintenance if we have less than 30 days of schedules ahead
    if coverage['days_covered'] < 30:
        return True
    
    return False
