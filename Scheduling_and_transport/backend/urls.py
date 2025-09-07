"""
URL configuration for webstrat project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse, HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.static import serve
import os
import mimetypes

def api_info(request):
    return JsonResponse({
        'message': '🚌 Falcon Bus Transport API',
        'status': 'running',
        'endpoints': {
            '/api/routes/': 'List all bus routes',
            '/api/routes/{id}/schedules/': 'Get schedules for a route',
            '/api/bookings/': 'Create/list bookings',
            '/api/payment/initiate/': 'Initiate PayFast payment',
            '/api/payment/notify/': 'PayFast payment notification',
            '/admin/': 'Django Admin Panel'
        }
    })

def debug_db(request):
    """Debug endpoint to check database contents"""
    try:
        from transport.models import Route, Schedule, Booking
        
        routes_count = Route.objects.count()
        schedules_count = Schedule.objects.count()
        bookings_count = Booking.objects.count()
        
        # Get a few sample routes
        sample_routes = list(Route.objects.values('id', 'origin', 'destination', 'base_price_zar')[:5])
        
        # Get recent schedules
        from django.utils import timezone
        recent_schedules = list(Schedule.objects.filter(
            departure_datetime__gte=timezone.now()
        ).values('id', 'route__origin', 'route__destination', 'departure_datetime', 'available_seats')[:10])
        
        return JsonResponse({
            'database_status': 'connected',
            'counts': {
                'routes': routes_count,
                'schedules': schedules_count,
                'bookings': bookings_count
            },
            'sample_routes': sample_routes,
            'recent_schedules': recent_schedules,
            'message': 'Database debug info'
        })
    except Exception as e:
        return JsonResponse({
            'error': str(e),
            'database_status': 'error'
        }, status=500)

def serve_react_app(request):
    """Serve the Vite-built React app"""
    try:
        # Try to read the actual Vite build index.html
        dist_path = os.path.join(settings.BASE_DIR, 'frontend', 'dist', 'index.html')
        if os.path.exists(dist_path):
            with open(dist_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return HttpResponse(content, content_type='text/html')
    except Exception as e:
        pass
    
    # Fallback to simple HTML
    return HttpResponse("""
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Falcon Bus Service</title>
      </head>
      <body>
        <div id="root">
          <h1>🚌 Falcon Bus Service</h1>
          <p>Frontend is loading...</p>
          <p>If this persists, check the browser console for errors.</p>
        </div>
      </body>
    </html>
    """, content_type='text/html')

def serve_assets(request, path):
    """Serve Vite assets with proper MIME types"""
    try:
        # Try multiple locations for assets
        possible_paths = [
            os.path.join(settings.STATIC_ROOT, 'assets', path),
            os.path.join(settings.BASE_DIR, 'frontend', 'dist', 'assets', path),
            os.path.join(settings.BASE_DIR, 'staticfiles', 'assets', path),
            # Also check for direct files in static folders
            os.path.join(settings.STATIC_ROOT, path),
            os.path.join(settings.BASE_DIR, 'backend', 'static', path),
            os.path.join(settings.BASE_DIR, 'frontend', 'public', path),
            os.path.join(settings.BASE_DIR, 'frontend', 'dist', path),
        ]
        
        for file_path in possible_paths:
            if os.path.exists(file_path):
                # Determine MIME type
                mime_type, _ = mimetypes.guess_type(file_path)
                if not mime_type:
                    if file_path.endswith('.js'):
                        mime_type = 'application/javascript'
                    elif file_path.endswith('.css'):
                        mime_type = 'text/css'
                    elif file_path.endswith('.jpg') or file_path.endswith('.jpeg'):
                        mime_type = 'image/jpeg'
                    elif file_path.endswith('.png'):
                        mime_type = 'image/png'
                    elif file_path.endswith('.gif'):
                        mime_type = 'image/gif'
                    elif file_path.endswith('.svg'):
                        mime_type = 'image/svg+xml'
                    else:
                        mime_type = 'application/octet-stream'
                
                with open(file_path, 'rb') as f:
                    content = f.read()
                return HttpResponse(content, content_type=mime_type)
        
        raise Http404(f"Asset not found: {path}")
    except Exception as e:
        raise Http404(f"Error serving asset: {e}")

def serve_logo(request):
    """Serve the company logo"""
    try:
        # Try multiple locations for logo
        possible_paths = [
            os.path.join(settings.STATIC_ROOT, 'logo.png'),
            os.path.join(settings.BASE_DIR, 'backend', 'static', 'logo.png'),
            os.path.join(settings.BASE_DIR, 'frontend', 'public', 'logo.png'),
            os.path.join(settings.BASE_DIR, 'frontend', 'dist', 'logo.png'),
        ]
        
        for file_path in possible_paths:
            if os.path.exists(file_path):
                with open(file_path, 'rb') as f:
                    content = f.read()
                return HttpResponse(content, content_type='image/png')
        
        raise Http404("Logo not found")
    except Exception as e:
        raise Http404(f"Error serving logo: {e}")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('transport.urls')),
    # API info endpoint for root
    path('api-info/', api_info, name='api_info'),
    # Debug database
    path('debug-db/', debug_db, name='debug_db'),
    # Serve assets with proper MIME types
    re_path(r'^assets/(?P<path>.*)$', serve_assets, name='serve_assets'),
    # Serve logo specifically
    path('logo.png', serve_logo, name='serve_logo'),
    # Serve other static images
    re_path(r'^(?P<path>.*\.(png|jpg|jpeg|gif|svg|ico))$', serve_assets, name='serve_images'),
]

# Serve React app for all non-API routes (production)
if not settings.DEBUG:
    # Serve static files with proper MIME types
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
    # Then serve React app for everything else
    urlpatterns.append(
        re_path(r'^(?!api/|admin/|static/|assets/).*$', serve_react_app, name='react_app')
    )
else:
    # Development - show API info at root
    urlpatterns.append(path('', api_info, name='api_info'))

# Always serve static files (both dev and prod)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
