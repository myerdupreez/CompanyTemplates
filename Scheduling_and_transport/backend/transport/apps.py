"""
Daily Schedule Maintenance App Configuration
Automatically runs schedule maintenance every day
"""

from django.apps import AppConfig
from django.conf import settings
import threading
import time
import logging

logger = logging.getLogger(__name__)

class TransportConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'transport'
    
    def ready(self):
        """
        This method is called when Django starts up.
        We use it to start our background schedule maintenance.
        """
        # Only run the scheduler in the main process (not in worker processes)
        import os
        if os.environ.get('RUN_MAIN') or settings.DEBUG is False:
            self.start_daily_maintenance()
    
    def start_daily_maintenance(self):
        """Start the daily maintenance scheduler"""
        try:
            # Import here to avoid circular imports
            from .schedule_management import auto_maintain_schedules
            
            def run_daily_maintenance():
                """Run the daily maintenance task"""
                logger.info("🤖 Starting automated daily schedule maintenance...")
                try:
                    result = auto_maintain_schedules(days_ahead=90, dry_run=False)
                    logger.info(f"✅ Daily maintenance completed: {result}")
                except Exception as e:
                    logger.error(f"❌ Daily maintenance failed: {str(e)}", exc_info=True)
            
            def run_scheduler():
                """Background thread that runs the scheduler"""
                from datetime import datetime, time as dt_time
                import time
                
                logger.info("🕐 Daily maintenance scheduler started (runs at 2 AM)")
                
                while True:
                    now = datetime.now()
                    target_time = dt_time(2, 0)  # 2 AM
                    
                    # Check if it's 2 AM (within a 1-minute window)
                    if (now.time().hour == target_time.hour and 
                        now.time().minute == target_time.minute):
                        run_daily_maintenance()
                        # Sleep for 61 seconds to avoid running twice in the same minute
                        time.sleep(61)
                    else:
                        time.sleep(30)  # Check every 30 seconds
            
            # Run scheduler in background thread
            scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
            scheduler_thread.start()
            
            logger.info("🚀 Daily schedule maintenance system activated!")
            
        except Exception as e:
            logger.error(f"Failed to start daily maintenance scheduler: {e}", exc_info=True)
