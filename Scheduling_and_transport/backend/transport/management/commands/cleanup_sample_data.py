from django.core.management.base import BaseCommand
from transport.models import Route, Schedule, Booking, Bus

class Command(BaseCommand):
    help = 'Clean up sample data and keep only essential data'

    def handle(self, *args, **options):
        self.stdout.write('🧹 Starting sample data cleanup...')
        
        # Count before cleanup
        routes_before = Route.objects.count()
        schedules_before = Schedule.objects.count()
        bookings_before = Booking.objects.count()
        buses_before = Bus.objects.count()
        
        # Delete all sample bookings (they reference schedules which reference routes)
        bookings_deleted = Booking.objects.all().delete()[0]
        self.stdout.write(f'🗑️  Deleted {bookings_deleted} sample bookings')
        
        # Delete all sample schedules
        schedules_deleted = Schedule.objects.all().delete()[0]
        self.stdout.write(f'🗑️  Deleted {schedules_deleted} sample schedules')
        
        # Delete all sample routes
        routes_deleted = Route.objects.all().delete()[0]
        self.stdout.write(f'🗑️  Deleted {routes_deleted} sample routes')
        
        # Delete all sample buses
        buses_deleted = Bus.objects.all().delete()[0]
        self.stdout.write(f'🗑️  Deleted {buses_deleted} sample buses')
        
        # Summary
        self.stdout.write('\n📊 Cleanup Summary:')
        self.stdout.write(f'   Routes: {routes_before} → {Route.objects.count()}')
        self.stdout.write(f'   Schedules: {schedules_before} → {Schedule.objects.count()}')
        self.stdout.write(f'   Bookings: {bookings_before} → {Booking.objects.count()}')
        self.stdout.write(f'   Buses: {buses_before} → {Bus.objects.count()}')
        
        self.stdout.write('\n✅ Sample data cleanup completed!')
        self.stdout.write('💡 Database is now clean and ready for your real data.')
