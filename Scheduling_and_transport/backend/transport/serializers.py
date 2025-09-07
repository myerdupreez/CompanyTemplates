from rest_framework import serializers
from .models import Route, Bus, Schedule, Booking, ContactInfo, FAQ

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    route = RouteSerializer(read_only=True)
    bus = BusSerializer(read_only=True)
    route_id = serializers.IntegerField(write_only=True)
    bus_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Schedule
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    schedule = ScheduleSerializer(read_only=True)
    schedule_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('booking_id', 'booking_reference', 'booking_date', 'updated_at')

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

# Simple serializers for basic route/schedule lookup
class SimpleRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'name', 'origin', 'destination', 'base_price_zar']

class SimpleScheduleSerializer(serializers.ModelSerializer):
    route = SimpleRouteSerializer(read_only=True)
    bus_number = serializers.CharField(source='bus.bus_number', read_only=True)
    bus_type = serializers.CharField(source='bus.bus_type', read_only=True)
    
    class Meta:
        model = Schedule
        fields = ['id', 'route', 'bus_number', 'bus_type', 'departure_time', 
                 'arrival_time', 'available_seats', 'price_zar']

# Ultra-lightweight serializers for list views
class MinimalRouteSerializer(serializers.ModelSerializer):
    """Minimal route data for quick loading"""
    class Meta:
        model = Route
        fields = ['id', 'name', 'origin', 'destination']

class MinimalScheduleSerializer(serializers.ModelSerializer):
    """Minimal schedule data for search results"""
    route_name = serializers.CharField(source='route.name', read_only=True)
    origin = serializers.CharField(source='route.origin', read_only=True)
    destination = serializers.CharField(source='route.destination', read_only=True)
    
    class Meta:
        model = Schedule
        fields = ['id', 'route_name', 'origin', 'destination', 
                 'departure_time', 'available_seats', 'price_zar']

class MinimalBookingSerializer(serializers.ModelSerializer):
    """Minimal booking data for admin lists"""
    route_name = serializers.CharField(source='schedule.route.name', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['booking_reference', 'passenger_name', 'route_name', 
                 'status', 'total_amount_zar', 'booking_date']
    bus_type = serializers.CharField(source='bus.bus_type', read_only=True)
    
    class Meta:
        model = Schedule
        fields = [
            'id', 'route', 'bus_number', 'bus_type', 'departure_time', 
            'arrival_time', 'available_seats', 'price_zar'
        ]
