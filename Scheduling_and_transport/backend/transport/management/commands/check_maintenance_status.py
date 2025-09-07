#!/usr/bin/env python3
"""
Check Auto-Maintenance Status Command
Shows the current status of automated schedule maintenance
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, timedelta

from transport.schedule_management import ScheduleManager

class Command(BaseCommand):
    help = 'Check the status of automated schedule maintenance'

    def handle(self, *args, **options):
        self.stdout.write("📊 Falcon Bus Lines - Schedule Maintenance Status")
        self.stdout.write("=" * 50)
        
        try:
            manager = ScheduleManager()
            status = manager.get_health_status()
            
            # Display current status
            self.stdout.write(f"🕐 Current Date: {timezone.now().date()}")
            self.stdout.write(f"📅 Future Schedules: {status['future_schedules']}")
            
            if status['has_schedules']:
                self.stdout.write(f"📆 Coverage: {status['earliest_date']} to {status['latest_date']}")
                self.stdout.write(f"⏳ Days Ahead: {status['days_covered']}")
                
                # Status indicator
                if status['status'] == 'healthy':
                    self.stdout.write(self.style.SUCCESS("✅ Status: HEALTHY"))
                elif status['status'] == 'needs_attention':
                    self.stdout.write(self.style.WARNING("⚠️  Status: NEEDS ATTENTION"))
                else:
                    self.stdout.write(self.style.ERROR("🚨 Status: CRITICAL"))
                
                # Recommendations
                if status['needs_maintenance']:
                    self.stdout.write("\n🔧 Recommendation: Run maintenance soon")
                    self.stdout.write("   Command: python manage.py auto_maintain_schedules")
                else:
                    self.stdout.write("\n✨ System is well-maintained!")
            else:
                self.stdout.write(self.style.ERROR("❌ No future schedules found!"))
                self.stdout.write("🔧 Run: python manage.py auto_maintain_schedules")
            
            # Check what auto-maintenance would do
            self.stdout.write("\n" + "─" * 30)
            self.stdout.write("🤖 Auto-Maintenance Preview (3 months ahead):")
            
            preview = manager.maintain_schedules(days_ahead=90, dry_run=True)
            
            if preview['would_clean'] > 0:
                self.stdout.write(f"🗑️  Would clean: {preview['would_clean']} past schedules")
            else:
                self.stdout.write("🗑️  No cleanup needed")
            
            if preview['would_create'] > 0:
                self.stdout.write(f"📅 Would create: {preview['would_create']} new schedules")
            else:
                self.stdout.write("📅 No new schedules needed")
            
            self.stdout.write(f"📊 Result total: {preview['total_future_schedules']} schedules")
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Error checking status: {str(e)}"))
            raise
