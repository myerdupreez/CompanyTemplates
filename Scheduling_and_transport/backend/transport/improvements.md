# Backend & Database Improvements for Falcon Bus Lines

## 🎯 PRIORITY IMPROVEMENTS

### 1. DATABASE INDEXES (HIGH IMPACT)
Add these indexes to dramatically improve query performance:

```python
# In models.py, add these to Meta classes:

class Schedule(models.Model):
    # ... existing fields ...
    
    class Meta:
        # ... existing meta ...
        indexes = [
            models.Index(fields=['departure_time'], name='schedule_departure_idx'),
            models.Index(fields=['route', 'departure_time'], name='schedule_route_time_idx'),
            models.Index(fields=['is_active', 'departure_time'], name='schedule_active_time_idx'),
            models.Index(fields=['available_seats'], name='schedule_seats_idx'),
        ]

class Booking(models.Model):
    # ... existing fields ...
    
    class Meta:
        # ... existing meta ...
        indexes = [
            models.Index(fields=['booking_reference'], name='booking_ref_idx'),
            models.Index(fields=['status'], name='booking_status_idx'),
            models.Index(fields=['passenger_email'], name='booking_email_idx'),
            models.Index(fields=['schedule', 'status'], name='booking_schedule_status_idx'),
            models.Index(fields=['booking_date'], name='booking_date_idx'),
        ]

class Route(models.Model):
    # ... existing fields ...
    
    class Meta:
        # ... existing meta ...
        indexes = [
            models.Index(fields=['origin'], name='route_origin_idx'),
            models.Index(fields=['destination'], name='route_dest_idx'),
            models.Index(fields=['origin', 'destination'], name='route_origin_dest_idx'),
            models.Index(fields=['is_active'], name='route_active_idx'),
        ]
```

### 2. QUERY OPTIMIZATION (HIGH IMPACT)
Current views have N+1 query problems. Fix with select_related/prefetch_related:

```python
# In views.py, optimize these queries:

class ScheduleViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        # BEFORE: causes N+1 queries
        queryset = Schedule.objects.all()
        
        # AFTER: optimized with select_related
        queryset = Schedule.objects.select_related(
            'route', 'bus'
        ).prefetch_related(
            'booking_set'  # if you need booking counts
        ).all()
        
class BookingViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        # Optimize booking queries
        queryset = Booking.objects.select_related(
            'schedule__route',
            'schedule__bus'
        ).all()
```

### 3. CACHING LAYER (MEDIUM IMPACT)
Add Redis caching for frequently accessed data:

```python
# Add to requirements.txt:
# redis==5.0.1
# django-redis==5.4.0

# In settings.py:
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Cache frequently accessed routes and schedules:
from django.core.cache import cache

def get_active_routes():
    cache_key = 'active_routes'
    routes = cache.get(cache_key)
    if routes is None:
        routes = Route.objects.filter(is_active=True).values()
        cache.set(cache_key, routes, 300)  # 5 minutes
    return routes
```

### 4. DATABASE MONITORING (MEDIUM IMPACT)
Add query monitoring to identify slow queries:

```python
# In settings.py - Development only:
if DEBUG:
    LOGGING['loggers']['django.db.backends'] = {
        'level': 'DEBUG',
        'handlers': ['console'],
    }

# Add django-debug-toolbar for development:
# pip install django-debug-toolbar
```

## 🔧 ADDITIONAL IMPROVEMENTS

### 5. PAGINATION OPTIMIZATION
```python
# In views.py:
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class ScheduleViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
```

### 6. API VERSIONING
```python
# In urls.py:
urlpatterns = [
    path('api/v1/', include('transport.urls')),
]

# In settings.py:
REST_FRAMEWORK = {
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1'],
}
```

### 7. ASYNC TASK PROCESSING
```python
# Add Celery for background tasks:
# pip install celery redis

# tasks.py:
from celery import shared_task
from .email_service import send_booking_confirmation

@shared_task
def send_confirmation_email_async(booking_id):
    booking = Booking.objects.get(id=booking_id)
    send_booking_confirmation(booking)

# In views.py:
def create_booking(request):
    # ... create booking ...
    send_confirmation_email_async.delay(booking.id)
```

### 8. DATA VALIDATION & CONSTRAINTS
```python
# Add more robust validation:
class Route(models.Model):
    # ... existing fields ...
    
    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(distance_km__gt=0),
                name='positive_distance'
            ),
            models.CheckConstraint(
                check=models.Q(duration_hours__gt=0),
                name='positive_duration'
            ),
            models.UniqueConstraint(
                fields=['origin', 'destination', 'departure_time'],
                name='unique_route_time'
            )
        ]
```

### 9. SECURITY ENHANCEMENTS
```python
# Add API rate limiting:
# pip install django-ratelimit

from django_ratelimit.decorators import ratelimit

@ratelimit(key='ip', rate='10/m', method='POST')
def create_booking(request):
    # Limit booking creation to 10 per minute per IP
    pass

# Add request logging:
MIDDLEWARE = [
    'transport.middleware.RequestLoggingMiddleware',
    # ... existing middleware ...
]
```

### 10. MONITORING & HEALTH CHECKS
```python
# Add health check endpoint:
@api_view(['GET'])
def health_check(request):
    try:
        # Check database
        Schedule.objects.count()
        
        # Check cache
        cache.set('health_check', 'ok', 10)
        cache.get('health_check')
        
        return Response({
            'status': 'healthy',
            'database': 'ok',
            'cache': 'ok',
            'timestamp': timezone.now()
        })
    except Exception as e:
        return Response({
            'status': 'unhealthy',
            'error': str(e)
        }, status=500)
```

## 📊 PERFORMANCE MONITORING

### 11. DATABASE ANALYSIS
```sql
-- Run these queries to analyze your current database:

-- Check table sizes
SELECT 
    name,
    COUNT(*) as record_count
FROM sqlite_master 
WHERE type='table';

-- Find slow queries (if using PostgreSQL)
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

### 12. API RESPONSE OPTIMIZATION
```python
# Add response compression:
MIDDLEWARE = [
    'django.middleware.gzip.GZipMiddleware',
    # ... existing middleware ...
]

# Optimize serializer fields:
class ScheduleSerializer(serializers.ModelSerializer):
    route_name = serializers.CharField(source='route.name', read_only=True)
    bus_number = serializers.CharField(source='bus.bus_number', read_only=True)
    
    class Meta:
        model = Schedule
        fields = ['id', 'route_name', 'bus_number', 'departure_time', 'price_zar']
        # Only include necessary fields
```

## 🎯 IMMEDIATE ACTIONS (Priority Order):

1. **Add database indexes** (biggest performance gain)
2. **Fix N+1 queries** with select_related
3. **Add pagination** to large datasets
4. **Implement caching** for routes/schedules
5. **Add monitoring** and health checks
6. **Set up proper logging**

These improvements will make your app significantly faster and more robust! 🚀
