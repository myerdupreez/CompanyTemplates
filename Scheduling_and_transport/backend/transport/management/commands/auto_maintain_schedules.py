#!/usr/bin/env python3
"""
Daily Auto-Maintenance Command for Falcon Bus Lines
Automatically maintains schedules to always be 3 months ahead
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, timedelta
import logging

from transport.schedule_management import ScheduleManager

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Automatically maintain schedules to always be 3 months ahead'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be done without making changes',
        )
        parser.add_argument(
            '--verbose',
            action='store_true',
            help='Enable verbose output',
        )
        parser.add_argument(
            '--months-ahead',
            type=int,
            default=3,
            help='Number of months to maintain ahead (default: 3)',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        verbose = options['verbose']
        months_ahead = options['months_ahead']
        
        # Calculate days ahead (3 months ≈ 90 days)
        days_ahead = months_ahead * 30
        
        self.stdout.write("🤖 Starting daily auto-maintenance...")
        if dry_run:
            self.stdout.write("🔍 DRY RUN MODE - No changes will be made")
        
        try:
            manager = ScheduleManager()
            
            # Get current status
            if verbose:
                status = manager.get_health_status()
                self.stdout.write(f"📊 Current status:")
                self.stdout.write(f"   • {status['future_schedules']} future schedules")
                self.stdout.write(f"   • Coverage until: {status['latest_date']}")
                self.stdout.write(f"   • Days covered: {status['days_covered']}")
            
            # Perform full maintenance
            self.stdout.write(f"🔧 Maintaining schedules {months_ahead} months ahead...")
            result = manager.maintain_schedules(days_ahead=days_ahead, dry_run=dry_run)
            
            # Report results
            if result.get('cleaned_schedules', 0) > 0 or result.get('would_clean', 0) > 0:
                if dry_run:
                    self.stdout.write(f"🗑️  Would remove {result['would_clean']} past schedules")
                else:
                    self.stdout.write(f"🗑️  Removed {result['cleaned_schedules']} past schedules")
            
            if result.get('created_schedules', 0) > 0 or result.get('would_create', 0) > 0:
                if dry_run:
                    self.stdout.write(f"📅 Would create {result['would_create']} new schedules")
                else:
                    self.stdout.write(f"📅 Created {result['created_schedules']} new schedules")
            
            # Final status
            final_status = manager.get_health_status()
            self.stdout.write(f"✅ Maintenance complete!")
            self.stdout.write(f"   • Total future schedules: {final_status['future_schedules']}")
            self.stdout.write(f"   • Coverage until: {final_status['latest_date']}")
            self.stdout.write(f"   • Days ahead: {final_status['days_covered']}")
            
            # Log for system monitoring
            logger.info(f"Auto-maintenance completed: {final_status['future_schedules']} schedules, "
                       f"coverage until {final_status['latest_date']}")
            
            return "Auto-maintenance completed successfully"
            
        except Exception as e:
            error_msg = f"Auto-maintenance failed: {str(e)}"
            self.stdout.write(self.style.ERROR(f"❌ {error_msg}"))
            logger.error(error_msg, exc_info=True)
            raise
