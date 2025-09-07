"""
Performance monitoring and optimization utilities for Falcon Bus Lines
"""

from django.core.cache import cache
from django.db import connection
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
import time
import logging

logger = logging.getLogger(__name__)

class PerformanceMonitor:
    """Monitor database and API performance"""
    
    @staticmethod
    def log_query_count(view_name):
        """Decorator to log database query count for views"""
        def decorator(view_func):
            def wrapper(*args, **kwargs):
                # Reset query log
                from django.db import reset_queries
                reset_queries()
                
                start_time = time.time()
                result = view_func(*args, **kwargs)
                end_time = time.time()
                
                # Log performance metrics
                query_count = len(connection.queries)
                execution_time = end_time - start_time
                
                logger.info(f"VIEW: {view_name} | QUERIES: {query_count} | TIME: {execution_time:.3f}s")
                
                if query_count > 10:
                    logger.warning(f"HIGH QUERY COUNT in {view_name}: {query_count} queries")
                
                return result
            return wrapper
        return decorator
    
    @staticmethod
    def get_slow_queries():
        """Get slow queries from Django connection (development only)"""
        if not settings.DEBUG:
            return []
        
        slow_queries = []
        for query in connection.queries:
            time_taken = float(query['time'])
            if time_taken > 0.1:  # Queries taking more than 100ms
                slow_queries.append({
                    'sql': query['sql'][:200] + '...' if len(query['sql']) > 200 else query['sql'],
                    'time': time_taken
                })
        
        return sorted(slow_queries, key=lambda x: x['time'], reverse=True)

class CacheManager:
    """Manage caching for frequently accessed data"""
    
    CACHE_TIMEOUTS = {
        'routes': 300,  # 5 minutes
        'active_schedules': 60,  # 1 minute
        'bus_types': 3600,  # 1 hour
        'contact_info': 1800,  # 30 minutes
    }
    
    @classmethod
    def get_active_routes(cls):
        """Get cached active routes"""
        cache_key = 'active_routes_list'
        routes = cache.get(cache_key)
        
        if routes is None:
            from .models import Route
            routes = list(Route.objects.filter(is_active=True).values(
                'id', 'name', 'origin', 'destination', 'base_price_zar'
            ))
            cache.set(cache_key, routes, cls.CACHE_TIMEOUTS['routes'])
            logger.info(f"Cached {len(routes)} active routes")
        
        return routes
    
    @classmethod
    def get_schedule_summary(cls, days_ahead=7):
        """Get cached schedule summary for next N days"""
        cache_key = f'schedule_summary_{days_ahead}d'
        summary = cache.get(cache_key)
        
        if summary is None:
            from .models import Schedule
            from django.utils import timezone
            
            end_date = timezone.now() + timedelta(days=days_ahead)
            schedules = Schedule.objects.select_related('route', 'bus').filter(
                is_active=True,
                departure_time__gte=timezone.now(),
                departure_time__lte=end_date
            ).values(
                'id', 'route__name', 'route__origin', 'route__destination',
                'departure_time', 'available_seats', 'price_zar'
            )
            
            summary = list(schedules)
            cache.set(cache_key, summary, cls.CACHE_TIMEOUTS['active_schedules'])
            logger.info(f"Cached {len(summary)} schedules for {days_ahead} days")
        
        return summary
    
    @classmethod
    def invalidate_cache(cls, cache_type=None):
        """Invalidate specific cache or all caches"""
        if cache_type:
            cache_keys = [f"*{cache_type}*"]
        else:
            cache_keys = ['active_routes_list', 'schedule_summary_*', 'contact_info']
        
        for key in cache_keys:
            cache.delete_pattern(key)
        
        logger.info(f"Invalidated cache: {cache_type or 'all'}")

@api_view(['GET'])
def performance_dashboard(request):
    """
    Admin endpoint for performance monitoring
    GET /api/performance/dashboard/
    """
    try:
        dashboard_data = {
            'database': {
                'total_queries': len(connection.queries),
                'slow_queries': PerformanceMonitor.get_slow_queries()[:5],
            },
            'cache': {
                'status': 'active' if cache.get('test_key') is not None else 'inactive',
                'active_routes_cached': cache.get('active_routes_list') is not None,
                'schedule_summary_cached': cache.get('schedule_summary_7d') is not None,
            },
            'models': {
                'routes_count': cache.get_or_set('routes_count', 
                    lambda: __get_model_count('Route'), 300),
                'schedules_count': cache.get_or_set('schedules_count', 
                    lambda: __get_model_count('Schedule'), 300),
                'bookings_count': cache.get_or_set('bookings_count', 
                    lambda: __get_model_count('Booking'), 300),
            },
            'recent_activity': {
                'recent_bookings': cache.get_or_set('recent_bookings', 
                    lambda: __get_recent_bookings(), 60),
                'active_schedules_today': cache.get_or_set('active_schedules_today', 
                    lambda: __get_todays_schedules(), 300),
            }
        }
        
        return Response({
            'success': True,
            'data': dashboard_data,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Performance dashboard error: {str(e)}")
        return Response({
            'success': False,
            'error': str(e)
        }, status=500)

def __get_model_count(model_name):
    """Helper function to get model count"""
    from .models import Route, Schedule, Booking
    
    models = {
        'Route': Route,
        'Schedule': Schedule,
        'Booking': Booking,
    }
    
    return models[model_name].objects.count()

def __get_recent_bookings():
    """Get recent bookings for dashboard"""
    from .models import Booking
    from django.utils import timezone
    
    yesterday = timezone.now() - timedelta(days=1)
    return Booking.objects.filter(
        booking_date__gte=yesterday
    ).count()

def __get_todays_schedules():
    """Get today's active schedules"""
    from .models import Schedule
    from django.utils import timezone
    
    today = timezone.now().date()
    return Schedule.objects.filter(
        departure_time__date=today,
        is_active=True
    ).count()

@api_view(['POST'])
def clear_cache(request):
    """
    Admin endpoint to clear cache
    POST /api/performance/clear-cache/
    """
    try:
        cache_type = request.data.get('cache_type', None)
        CacheManager.invalidate_cache(cache_type)
        
        return Response({
            'success': True,
            'message': f'Cache cleared: {cache_type or "all"}',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=500)

@api_view(['GET'])
def health_check(request):
    """
    System health check endpoint
    GET /api/health/
    """
    try:
        from .models import Schedule
        from django.utils import timezone
        
        # Test database connection
        start_time = time.time()
        schedule_count = Schedule.objects.count()
        db_time = time.time() - start_time
        
        # Test cache
        start_time = time.time()
        cache.set('health_check', 'ok', 10)
        cache_result = cache.get('health_check')
        cache_time = time.time() - start_time
        
        health_status = {
            'status': 'healthy',
            'database': {
                'status': 'ok',
                'response_time_ms': round(db_time * 1000, 2),
                'schedule_count': schedule_count
            },
            'cache': {
                'status': 'ok' if cache_result == 'ok' else 'error',
                'response_time_ms': round(cache_time * 1000, 2)
            },
            'timestamp': timezone.now().isoformat()
        }
        
        return Response(health_status)
        
    except Exception as e:
        return Response({
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': timezone.now().isoformat()
        }, status=500)
