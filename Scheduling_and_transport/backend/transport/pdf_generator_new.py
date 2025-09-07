"""
Premium PDF Ticket Generator for Falcon Bus Lines
Creates elegant, professional PDF tickets with logo integration
"""

import io
from datetime import datetime
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.graphics.shapes import Drawing, Rect, String, Circle, Line
from reportlab.graphics import renderPDF
from django.conf import settings
import os

class PremiumTicketPDFGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.logo_path = os.path.join(settings.BASE_DIR, 'backend', 'static', 'logo.png')
        
        # Premium color palette
        self.falcon_red = colors.HexColor('#dc2626')         # Primary red
        self.deep_blue = colors.HexColor('#1e40af')          # Deep blue
        self.gold = colors.HexColor('#f59e0b')               # Gold accent
        self.charcoal = colors.HexColor('#111827')           # Charcoal
        self.slate = colors.HexColor('#475569')              # Slate gray
        self.light_blue = colors.HexColor('#dbeafe')         # Light blue
        self.cream = colors.HexColor('#fefce8')              # Cream
        self.silver = colors.HexColor('#e5e7eb')             # Silver
        
        # Setup styles after colors
        self.setup_premium_styles()
    
    def setup_premium_styles(self):
        """Set up premium styling for elegant tickets"""
        
        # Main brand title
        self.brand_title_style = ParagraphStyle(
            'BrandTitle',
            parent=self.styles['Heading1'],
            fontSize=36,
            spaceAfter=8,
            textColor=self.falcon_red,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold',
            leading=40
        )
        
        # Tagline style
        self.tagline_style = ParagraphStyle(
            'Tagline',
            parent=self.styles['Normal'],
            fontSize=14,
            spaceAfter=20,
            textColor=self.slate,
            alignment=TA_CENTER,
            fontName='Helvetica-Oblique'
        )
        
        # Ticket title
        self.ticket_title_style = ParagraphStyle(
            'TicketTitle',
            parent=self.styles['Heading2'],
            fontSize=24,
            spaceAfter=15,
            textColor=self.deep_blue,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        )
        
        # Section headers
        self.section_style = ParagraphStyle(
            'SectionHeader',
            parent=self.styles['Heading3'],
            fontSize=16,
            spaceAfter=10,
            spaceBefore=15,
            textColor=self.falcon_red,
            fontName='Helvetica-Bold',
            borderWidth=1,
            borderColor=self.falcon_red,
            borderPadding=8,
            backColor=colors.HexColor('#fef2f2')
        )
        
        # Content styles
        self.content_style = ParagraphStyle(
            'Content',
            parent=self.styles['Normal'],
            fontSize=11,
            spaceAfter=8,
            textColor=self.charcoal,
            fontName='Helvetica',
            leading=14
        )
        
        # Important info style
        self.info_style = ParagraphStyle(
            'InfoStyle',
            parent=self.styles['Normal'],
            fontSize=10,
            spaceAfter=6,
            textColor=self.slate,
            fontName='Helvetica',
            leading=12
        )

    def generate_ticket_pdf(self, booking):
        """Generate premium PDF ticket with logo and elegant design"""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=50,
            leftMargin=50,
            topMargin=50,
            bottomMargin=50
        )
        
        story = []
        
        # Header with logo and branding
        story.extend(self._build_premium_header())
        
        # Ticket reference section
        story.extend(self._build_reference_section(booking))
        
        # Journey details in elegant card
        story.extend(self._build_journey_section(booking))
        
        # Passenger information
        story.extend(self._build_passenger_section(booking))
        
        # Travel guidelines
        story.extend(self._build_guidelines_section())
        
        # Footer with contact info
        story.extend(self._build_premium_footer())
        
        # Build the PDF
        doc.build(story)
        pdf_value = buffer.getvalue()
        buffer.close()
        return pdf_value

    def _build_premium_header(self):
        """Build header with logo and premium branding"""
        content = []
        
        # Logo and company name section
        header_data = []
        
        # Try to include logo
        try:
            if os.path.exists(self.logo_path):
                logo = Image(self.logo_path, width=1.5*inch, height=1*inch)
                header_data.append([logo, Paragraph("FALCON BUS LINES<br/>& Beyers Busdiens", 
                    ParagraphStyle('HeaderText', 
                        parent=self.brand_title_style,
                        fontSize=28,
                        alignment=TA_LEFT
                    ))])
            else:
                # Fallback without logo
                header_data.append([Paragraph("🦅 FALCON BUS LINES<br/>& Beyers Busdiens", 
                    self.brand_title_style)])
        except Exception as e:
            # Fallback text-only header
            header_data.append([Paragraph("🦅 FALCON BUS LINES<br/>& Beyers Busdiens", 
                self.brand_title_style)])
        
        if len(header_data[0]) == 2:  # Has logo
            header_table = Table(header_data, colWidths=[2*inch, 5*inch])
            header_table.setStyle(TableStyle([
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ]))
        else:  # Text only
            header_table = Table(header_data, colWidths=[7*inch])
            header_table.setStyle(TableStyle([
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('TOPPADDING', (0, 0), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ]))
        
        content.append(header_table)
        
        # Elegant separator
        separator_data = [['']]
        separator_table = Table(separator_data, colWidths=[7*inch], rowHeights=[0.1*inch])
        separator_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), self.falcon_red),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        content.append(separator_table)
        content.append(Spacer(1, 20))
        
        return content

    def _build_reference_section(self, booking):
        """Build booking reference section with premium styling"""
        content = []
        
        content.append(Paragraph("DIGITAL BUS TICKET", self.ticket_title_style))
        content.append(Spacer(1, 15))
        
        # Premium reference box
        ref_data = [[f"BOOKING REF: {booking.booking_reference}"]]
        ref_table = Table(ref_data, colWidths=[7*inch], rowHeights=[0.8*inch])
        ref_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), self.light_blue),
            ('TEXTCOLOR', (0, 0), (-1, -1), self.deep_blue),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 20),
            ('BOX', (0, 0), (-1, -1), 3, self.deep_blue),
            ('LEFTPADDING', (0, 0), (-1, -1), 20),
            ('RIGHTPADDING', (0, 0), (-1, -1), 20),
        ]))
        
        content.append(ref_table)
        content.append(Spacer(1, 25))
        
        return content

    def _build_journey_section(self, booking):
        """Build journey information with premium card design"""
        content = []
        
        content.append(Paragraph("🚌 JOURNEY INFORMATION", self.section_style))
        content.append(Spacer(1, 15))
        
        # Main route information
        route_header = [['DEPARTURE', 'ARRIVAL', 'DATE', 'TIME']]
        route_data = [[
            booking.schedule.route.origin,
            booking.schedule.route.destination,
            booking.schedule.departure_time.strftime('%d %B %Y'),
            booking.schedule.departure_time.strftime('%H:%M')
        ]]
        
        route_table = Table(route_header + route_data, 
                           colWidths=[1.75*inch, 1.75*inch, 1.75*inch, 1.75*inch])
        route_table.setStyle(TableStyle([
            # Header styling
            ('BACKGROUND', (0, 0), (-1, 0), self.falcon_red),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
            
            # Data styling
            ('BACKGROUND', (0, 1), (-1, 1), self.cream),
            ('TEXTCOLOR', (0, 1), (-1, 1), self.charcoal),
            ('FONTNAME', (0, 1), (-1, 1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 1), (-1, 1), 13),
            ('ALIGN', (0, 1), (-1, 1), 'CENTER'),
            
            # Borders and padding
            ('BOX', (0, 0), (-1, -1), 2, self.falcon_red),
            ('INNERGRID', (0, 0), (-1, -1), 1, self.silver),
            ('TOPPADDING', (0, 0), (-1, -1), 15),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
        ]))
        
        content.append(route_table)
        content.append(Spacer(1, 20))
        
        # Additional journey details
        details = [
            ['Bus Number:', booking.schedule.bus.bus_number, 'Arrival Time:', booking.schedule.arrival_time.strftime('%H:%M')],
            ['Bus Type:', booking.schedule.bus.bus_type.title(), 'Seats:', str(booking.number_of_seats)],
            ['Total Paid:', f"R {booking.total_amount_zar:,.2f}", 'Status:', 'CONFIRMED ✓']
        ]
        
        # Add discount if applicable
        if hasattr(booking, 'discount_type') and booking.discount_type and booking.discount_type != 'none':
            details.insert(-1, ['Original Price:', f"R {booking.original_amount:,.2f}", 'Discount:', f"-R {booking.discount_amount:,.2f}"])
        
        details_table = Table(details, colWidths=[1.5*inch, 2*inch, 1.5*inch, 2*inch])
        details_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (2, 0), (2, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('TEXTCOLOR', (0, 0), (0, -1), self.slate),
            ('TEXTCOLOR', (2, 0), (2, -1), self.slate),
            ('TEXTCOLOR', (1, 0), (1, -1), self.charcoal),
            ('TEXTCOLOR', (3, 0), (3, -1), self.charcoal),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ]))
        
        content.append(details_table)
        
        # Route description if available
        if booking.schedule.route.description:
            content.append(Spacer(1, 20))
            content.append(Paragraph("📍 PICKUP & DROP-OFF DETAILS", 
                ParagraphStyle('LocationHeader', 
                    parent=self.section_style,
                    fontSize=14,
                    backColor=self.cream
                )))
            content.append(Spacer(1, 10))
            
            # Style the route description
            desc_lines = booking.schedule.route.description.split('\n')
            for line in desc_lines:
                if line.strip():
                    content.append(Paragraph(line.strip(), self.content_style))
        
        content.append(Spacer(1, 25))
        return content

    def _build_passenger_section(self, booking):
        """Build passenger information section"""
        content = []
        
        content.append(Paragraph("👤 PASSENGER DETAILS", self.section_style))
        content.append(Spacer(1, 15))
        
        passenger_info = [
            ['Name:', booking.passenger_name, 'Phone:', booking.passenger_phone],
            ['Email:', booking.passenger_email, 'ID Number:', booking.passenger_id_number or 'Not provided']
        ]
        
        if booking.emergency_contact:
            passenger_info.append([
                'Emergency Contact:', booking.emergency_contact,
                'Emergency Phone:', booking.emergency_phone or 'Not provided'
            ])
        
        if booking.special_requests:
            passenger_info.append([
                'Special Requests:', booking.special_requests, '', ''
            ])
        
        passenger_table = Table(passenger_info, colWidths=[1.5*inch, 2.5*inch, 1.5*inch, 1.5*inch])
        passenger_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (2, 0), (2, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('TEXTCOLOR', (0, 0), (0, -1), self.slate),
            ('TEXTCOLOR', (2, 0), (2, -1), self.slate),
            ('TEXTCOLOR', (1, 0), (1, -1), self.charcoal),
            ('TEXTCOLOR', (3, 0), (3, -1), self.charcoal),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        
        content.append(passenger_table)
        content.append(Spacer(1, 25))
        
        return content

    def _build_guidelines_section(self):
        """Build travel guidelines with premium styling"""
        content = []
        
        content.append(Paragraph("⚠️ IMPORTANT TRAVEL GUIDELINES", self.section_style))
        content.append(Spacer(1, 15))
        
        # Create three-column layout for guidelines
        guidelines = [
            {
                'icon': '🕒',
                'title': 'CHECK-IN',
                'points': [
                    'Arrive 30 minutes early',
                    'Bring valid ID document',
                    'Present ticket at boarding'
                ]
            },
            {
                'icon': '🧳',
                'title': 'LUGGAGE',
                'points': [
                    'Carry-on: Max 7kg',
                    'Checked: Max 20kg',
                    'No dangerous items'
                ]
            },
            {
                'icon': '📞',
                'title': 'SUPPORT',
                'points': [
                    'support@falconbuslines.co.za',
                    '+27 11 123 4567',
                    'Emergency: +27 82 999 8888'
                ]
            }
        ]
        
        for guideline in guidelines:
            content.append(Paragraph(f"{guideline['icon']} {guideline['title']}", 
                ParagraphStyle('GuidelineTitle',
                    parent=self.content_style,
                    fontSize=12,
                    fontName='Helvetica-Bold',
                    textColor=self.falcon_red,
                    spaceAfter=8
                )))
            
            for point in guideline['points']:
                content.append(Paragraph(f"• {point}", self.info_style))
            
            content.append(Spacer(1, 12))
        
        return content

    def _build_premium_footer(self):
        """Build premium footer with contact information"""
        content = []
        
        content.append(Spacer(1, 20))
        
        # Footer separator
        footer_sep = Table([['']], colWidths=[7*inch], rowHeights=[0.05*inch])
        footer_sep.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), self.silver),
        ]))
        content.append(footer_sep)
        content.append(Spacer(1, 15))
        
        # Company information
        footer_info = ParagraphStyle(
            'FooterInfo',
            parent=self.info_style,
            fontSize=9,
            alignment=TA_CENTER,
            textColor=self.slate,
            spaceAfter=5
        )
        
        content.append(Paragraph("FALCON BUS LINES & BEYERS BUSDIENS", 
            ParagraphStyle('FooterBrand', parent=footer_info, fontName='Helvetica-Bold', fontSize=11, textColor=self.falcon_red)))
        
        content.append(Paragraph("Professional Bus Transport Services • Operating Daily 6:00 AM - 10:00 PM", footer_info))
        content.append(Paragraph("📧 info@falconbuslines.co.za  •  📞 +27 11 123 4567  •  💬 WhatsApp: +27 82 123 4567", footer_info))
        
        content.append(Spacer(1, 15))
        
        # Generation timestamp
        content.append(Paragraph(
            f"Ticket generated on {datetime.now().strftime('%d %B %Y at %H:%M')} • Safe travels!",
            ParagraphStyle('Timestamp', parent=footer_info, fontSize=8, textColor=colors.HexColor('#9ca3af'))
        ))
        
        return content

# Keep the same interface
def generate_booking_pdf(booking):
    """Generate premium PDF ticket with logo integration"""
    generator = PremiumTicketPDFGenerator()
    return generator.generate_ticket_pdf(booking)
