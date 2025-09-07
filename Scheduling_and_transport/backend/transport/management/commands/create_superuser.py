from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Create a superuser for the admin panel'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@falconbus.com',
                password='admin123'  # Change this in production!
            )
            self.stdout.write('✅ Superuser "admin" created successfully!')
            self.stdout.write('   Username: admin')
            self.stdout.write('   Password: admin123')
            self.stdout.write('🔐 Please change the password immediately in production!')
        else:
            self.stdout.write('ℹ️  Superuser "admin" already exists.')
