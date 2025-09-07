
from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse, path
from django.utils.safestring import mark_safe
from django.http import HttpResponse
from django.utils import timezone
from .models import Route, Bus, Schedule, Booking, ContactInfo, FAQ
from .pdf_generator import PremiumTicketPDFGenerator

# Customize admin site header and title
admin.site.site_header = "Falcon Bus Lines Administration"
admin.site.site_title = "Falcon Bus Admin"
admin.site.index_title = "Welcome to Falcon Bus Lines Admin Portal"

@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display = ['bus_number', 'bus_type', 'total_seats', 'is_active', 'last_maintenance', 'schedule_count']
    list_filter = ['bus_type', 'is_active']
    search_fields = ['bus_number', 'amenities']
    list_editable = ['is_active']
    fieldsets = (
        ('Basic Information', {
            'fields': ('bus_number', 'bus_type', 'total_seats')
        }),
        ('Features & Amenities', {
            'fields': ('amenities',),
            'description': 'Enter amenities separated by commas (e.g., WiFi, AC, USB Charging, Entertainment System)'
        }),
        ('Status & Maintenance', {
            'fields': ('is_active', 'last_maintenance')
        }),
    )
    
    def schedule_count(self, obj):
        count = obj.schedule_set.count()
        if count > 0:
            url = reverse('admin:transport_schedule_changelist') + f'?bus__id__exact={obj.id}'
            return format_html('<a href="{}">{} schedules</a>', url, count)
        return '0 schedules'
    schedule_count.short_description = 'Schedules'

@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ['name', 'route_summary', 'distance_km', 'duration_display', 'base_price_zar', 'is_active', 'schedule_count']
    list_filter = ['is_active', 'origin', 'destination', 'route_type']
    search_fields = ['name', 'origin', 'destination']
    list_editable = ['is_active', 'base_price_zar']
    
    fieldsets = (
        ('Route Information', {
            'fields': ('name', 'route_type')
        }),
        ('Journey Details', {
            'fields': (('origin', 'destination'), ('distance_km', 'duration_hours'))
        }),
        ('Operating Schedule', {
            'fields': ('operating_days',),
            'description': 'Enter days separated by commas (e.g., "Wednesday,Friday,Sunday")'
        }),
        ('Description & Instructions', {
            'fields': ('description',),
            'description': 'Add pickup/drop-off location details, Google Maps links, or special instructions for passengers'
        }),
        ('Pricing', {
            'fields': ('base_price_zar',),
            'description': 'Base price in South African Rand (ZAR). Individual schedule prices may vary.'
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
    
    actions = ['activate_routes', 'deactivate_routes', 'duplicate_route']
    
    def route_summary(self, obj):
        return format_html(
            '<strong>{}</strong> → <strong>{}</strong>',
            obj.origin,
            obj.destination
        )
    route_summary.short_description = 'Route'
    
    def duration_display(self, obj):
        hours = int(obj.duration_hours)
        minutes = int((obj.duration_hours - hours) * 60)
        if minutes > 0:
            return f"{hours}h {minutes}m"
        return f"{hours}h"
    duration_display.short_description = 'Duration'
    
    def schedule_count(self, obj):
        count = obj.schedule_set.count()
        if count > 0:
            url = reverse('admin:transport_schedule_changelist') + f'?route__id__exact={obj.id}'
            return format_html('<a href="{}">{} schedules</a>', url, count)
        return '0 schedules'
    schedule_count.short_description = 'Schedules'
    
    def activate_routes(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} routes were successfully activated.')
    activate_routes.short_description = "Activate selected routes"
    
    def deactivate_routes(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} routes were successfully deactivated.')
    deactivate_routes.short_description = "Deactivate selected routes"
    
    def duplicate_route(self, request, queryset):
        for route in queryset:
            route.pk = None
            route.name = f"{route.name} (Copy)"
            route.save()
        count = queryset.count()
        self.message_user(request, f'{count} routes were successfully duplicated.')
    duplicate_route.short_description = "Duplicate selected routes"

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['route_display', 'bus', 'departure_time', 'arrival_time', 'available_seats', 'price_zar', 'is_active']
    list_filter = ['is_active', 'departure_time', 'route__origin', 'route__destination', 'bus__bus_type']
    search_fields = ['route__name', 'bus__bus_number', 'route__origin', 'route__destination']
    date_hierarchy = 'departure_time'
    list_editable = ['is_active', 'price_zar']
    
    fieldsets = (
        ('Schedule Details', {
            'fields': ('route', 'bus')
        }),
        ('Timing', {
            'fields': (('departure_time', 'arrival_time'),)
        }),
        ('Capacity & Pricing', {
            'fields': (('available_seats', 'price_zar'), 'is_active')
        }),
    )
    
    actions = ['activate_schedules', 'deactivate_schedules']
    
    def route_display(self, obj):
        return format_html(
            '<strong>{}</strong><br><small>{} → {}</small>',
            obj.route.name,
            obj.route.origin,
            obj.route.destination
        )
    route_display.short_description = 'Route'
    
    def activate_schedules(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} schedules were successfully activated.')
    activate_schedules.short_description = "Activate selected schedules"
    
    def deactivate_schedules(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} schedules were successfully deactivated.')
    deactivate_schedules.short_description = "Deactivate selected schedules"


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['booking_id_short', 'passenger_name', 'route_display', 'departure_time', 'number_of_seats', 'total_amount_zar', 'status', 'booking_date']
    list_filter = ['status', 'booking_date', 'schedule__route__origin', 'schedule__route__destination']
    search_fields = ['passenger_name', 'passenger_email', 'booking_id', 'passenger_phone']
    readonly_fields = ['booking_id', 'booking_date', 'updated_at']
    date_hierarchy = 'booking_date'
    # Use raw_id_fields for schedule to speed up the Add Booking form
    raw_id_fields = ['schedule']

    fieldsets = (
        ('Booking Information', {
            'fields': ('booking_id', 'schedule', 'status')
        }),
        ('Passenger Details', {
            'fields': (('passenger_name', 'passenger_email'), 
                      ('passenger_phone', 'passenger_id_number'),
                      'special_requests')
        }),
        ('Booking Details', {
            'fields': (('number_of_seats', 'total_amount_zar'),
                      ('payment_date', 'payfast_payment_id'))
        }),
        ('Timestamps', {
            'fields': ('booking_date', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    actions = ['confirm_bookings', 'cancel_bookings', 'print_selected_bookings']
    def print_selected_bookings(self, request, queryset):
        """Admin action to print selected bookings as a PDF."""
        if not queryset.exists():
            self.message_user(request, "No bookings selected.", level='warning')
            from django.shortcuts import redirect
            return redirect('..')

        # Use today's date for the title, but print only selected bookings
        from django.utils import timezone
        today = timezone.localdate()
        buffer = self.generate_bookings_list_pdf(queryset, today)
        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="selected_bookings_{today}.pdf"'
        return response
    print_selected_bookings.short_description = "Print selected bookings"

    def generate_bookings_list_pdf(self, bookings, date):
        """Generate a PDF listing all bookings for the given date."""
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
        from reportlab.lib import colors
        from reportlab.lib.styles import getSampleStyleSheet
        import io

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=24, leftMargin=24, topMargin=24, bottomMargin=24)
        styles = getSampleStyleSheet()
        story = []

        # Title
        story.append(Paragraph(f"Bookings for {date.strftime('%d %B %Y')}", styles['Title']))
        story.append(Spacer(1, 10))

        # Table header
        data = [[
            'Booking Ref', 'Passenger', 'Phone', 'Email', 'Route', 'Departure', 'Seats', 'Amount', 'Status'
        ]]
        # Table rows
        for b in bookings:
            data.append([
                getattr(b, 'booking_reference', getattr(b, 'booking_id', '')),
                b.passenger_name,
                b.passenger_phone,
                b.passenger_email,
                f"{b.schedule.route.origin} → {b.schedule.route.destination}",
                b.schedule.departure_time.strftime('%H:%M'),
                b.number_of_seats,
                f"R {b.total_amount_zar:,.2f}",
                b.status.title() if hasattr(b, 'status') else ''
            ])

        # Set column widths to fit A4 and reduce font size
        col_widths = [60, 70, 60, 90, 80, 45, 35, 50, 45]  # in points
        table = Table(data, repeatRows=1, colWidths=col_widths)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#dc2626')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 9),
            ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
            ('BACKGROUND', (0, 1), (-1, -1), colors.whitesmoke),
            ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 1), (-1, -1), 8),
            ('ALIGN', (0, 1), (-1, -1), 'CENTER'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.lightgrey]),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ]))
        story.append(table)
        doc.build(story)
        pdf = buffer.getvalue()
        buffer.close()
        return pdf

    def booking_id_short(self, obj):
        return str(obj.booking_id)[:8] + '...'
    booking_id_short.short_description = 'Booking ID'

    def route_display(self, obj):
        return f"{obj.schedule.route.origin} → {obj.schedule.route.destination}"
    route_display.short_description = 'Route'

    def departure_time(self, obj):
        return obj.schedule.departure_time.strftime('%Y-%m-%d %H:%M')
    departure_time.short_description = 'Departure'

    def confirm_bookings(self, request, queryset):
        updated = queryset.update(status='confirmed')
        self.message_user(request, f'{updated} bookings were successfully confirmed.')
    confirm_bookings.short_description = "Confirm selected bookings"

    def cancel_bookings(self, request, queryset):
        updated = queryset.update(status='cancelled')
        self.message_user(request, f'{updated} bookings were successfully cancelled.')
    cancel_bookings.short_description = "Cancel selected bookings"

@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'phone_primary', 'email']
    
    fieldsets = (
        ('Company Information', {
            'fields': ('company_name', 'address', 'business_hours')
        }),
        ('Contact Details', {
            'fields': (('phone_primary', 'phone_secondary'), 
                      ('email', 'whatsapp_number'),
                      'emergency_contact')
        }),
        ('Social Media', {
            'fields': ('facebook_url', 'twitter_url', 'instagram_url'),
            'classes': ('collapse',)
        }),
    )

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'order', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['question', 'answer']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'question']
    
    fieldsets = (
        ('FAQ Content', {
            'fields': ('question', 'answer')
        }),
        ('Display Settings', {
            'fields': ('order', 'is_active')
        }),
    )
    
    actions = ['activate_faqs', 'deactivate_faqs']
    
    def activate_faqs(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} FAQs were successfully activated.')
    activate_faqs.short_description = "Activate selected FAQs"
    
    def deactivate_faqs(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} FAQs were successfully deactivated.')
    deactivate_faqs.short_description = "Deactivate selected FAQs"
