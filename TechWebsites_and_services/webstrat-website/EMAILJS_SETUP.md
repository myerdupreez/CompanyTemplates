# EmailJS Setup Instructions for WebStrat IT

## 🚀 Quick Setup Guide (Using webstratit.co.za email)

### Prerequisites: Custom Domain Email
Before setting up EmailJS, you need an email account with your domain.

**🏆 You're using: ImprovMX (Excellent choice! FREE & Easy)**
1. Go to [improvmx.com](https://improvmx.com/)
2. Enter your domain: `webstratit.co.za`
3. Enter your Gmail as destination
4. Add MX records to your DNS (see setup below)

**📧 ImprovMX Setup Process:**

**Step 1: Configure ImprovMX**
1. Go to: https://improvmx.com/
2. Enter domain: `webstratit.co.za`
3. Enter your Gmail address as destination
4. Note the MX records they provide

**Step 2: Add DNS Records**
Add these MX records in your domain registrar's DNS settings:
```
Type: MX
Host: @ (or leave blank)
Value: mx1.improvmx.com
Priority: 10

Type: MX
Host: @ (or leave blank)
Value: mx2.improvmx.com
Priority: 20
```

**Step 3: Create Email Aliases**
In ImprovMX dashboard, create:
- `contact@webstratit.co.za` → your-gmail@gmail.com
- `info@webstratit.co.za` → your-gmail@gmail.com

**Step 4: Test Email Forwarding**
1. Send test email to `contact@webstratit.co.za`
2. Check your Gmail inbox
3. Verify emails are forwarding correctly

---

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

### Step 2: Connect Your Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose **"Gmail"** (since ImprovMX forwards to Gmail)

**Gmail Settings for ImprovMX:**
```
Service Type: Gmail
Gmail Account: your-gmail@gmail.com
From Name: WebStrat IT
Reply-To: contact@webstratit.co.za
```

**Why Gmail + ImprovMX works perfectly:**
- ✅ Emails to `contact@webstratit.co.za` → forwarded to your Gmail
- ✅ EmailJS sends from your Gmail account
- ✅ Customers see professional `contact@webstratit.co.za` address
- ✅ You manage everything from one Gmail inbox

### Step 3: Create Professional Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this professional template:

**Subject:** New Contact Form Submission - WebStrat IT

**Template Body:**
```
Hello WebStrat IT Team,

You have received a new contact form submission from webstratit.co.za:

CLIENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}
Service Interest: {{service}}

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This inquiry was submitted through the WebStrat IT website contact form.
Please respond within 24 hours to maintain our professional service standard.

Reply directly to this email to respond to {{from_name}} at {{from_email}}.

Best regards,
WebStrat IT Contact System
```

4. **Template Settings:**
   - From Name: `WebStrat IT`
   - From Email: `contact@webstratit.co.za`
   - Reply-To: `{{from_email}}` (customer's email)

5. Save the template and note the Template ID

### Step 4: Get Your Credentials
1. **Service ID**: Found in Email Services section
2. **Template ID**: Found in Email Templates section  
3. **Public Key**: Found in Account settings → API Keys

### Step 5: Update Environment Variables
Replace the values in `.env` file:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### Step 6: Test the Contact Form
1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Check your email for the submission
4. 🎉 Success!

## 📧 Email Configuration Tips

### Professional Setup:
- **From Name**: WebStrat IT Contact Form
- **Reply-To**: Customer's email address
- **Subject**: New Contact Form Submission - WebStrat IT

### Spam Prevention:
- Enable reCAPTCHA in EmailJS (optional)
- Set up email filters in your inbox
- Monitor submission patterns

### Custom Domain Email:
Once you have `contact@webstratit.co.za`:
1. Set up email forwarding (Cloudflare) OR full hosting (Zoho)
2. Update "Reply-To" field in template
3. Customers see professional email address

## 💰 Cost Summary (All FREE!)

| Service | Monthly Cost | Features |
|---------|-------------|----------|
| **ImprovMX** | FREE | Professional email forwarding |
| **EmailJS** | FREE | 200 emails/month contact form |
| **Gmail** | FREE | Email management & sending |
| **Total** | **$0/month** | Complete professional setup! |

**🎉 Perfect combination: ImprovMX + Gmail + EmailJS = $0/month professional email system!**

## 🔒 Security Notes
- Never commit `.env` file to Git (already in .gitignore)
- Public key is safe to expose (it's meant to be public)
- EmailJS handles rate limiting automatically

## 📞 Support
If you need help:
- EmailJS documentation: https://www.emailjs.com/docs/
- Zoho Mail setup: https://www.zoho.com/mail/help/
- Check browser console for error messages
- Test with simple email first

---
Your contact form is now ready for production - completely FREE! 🚀💰
