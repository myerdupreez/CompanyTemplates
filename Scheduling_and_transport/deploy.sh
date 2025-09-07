#!/bin/bash
# Production deployment script for Railway/Render

echo "🚀 Starting Falcon Bus Lines deployment..."

# Navigate to backend
cd backend

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

echo "🗄️ Running database migrations..."
python manage.py migrate

echo "🔧 Collecting static files..."
python manage.py collectstatic --noinput

echo "👤 Creating superuser (if needed)..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@falconbuslines.co.za', 'falcon2025!')
    print('✅ Superuser created')
else:
    print('ℹ️ Superuser already exists')
"

echo "🎯 Starting Gunicorn server..."
exec gunicorn wsgi:application --bind 0.0.0.0:$PORT --workers 3 --timeout 120
