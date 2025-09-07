from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .performance import performance_dashboard, clear_cache, health_check

router = DefaultRouter()
router.register(r'routes', views.RouteViewSet)
router.register(r'buses', views.BusViewSet)
router.register(r'schedules', views.ScheduleViewSet)
router.register(r'bookings', views.BookingViewSet)
router.register(r'contact-info', views.ContactInfoViewSet)
router.register(r'faqs', views.FAQViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/schedule-maintenance/', views.admin_schedule_maintenance, name='admin_schedule_maintenance'),
    path('payfast/webhook/', views.payfast_webhook, name='payfast_webhook'),
    # Performance monitoring endpoints
    path('health/', health_check, name='health_check'),
    path('performance/dashboard/', performance_dashboard, name='performance_dashboard'),
    path('performance/clear-cache/', clear_cache, name='clear_cache'),
]
