# 🚀 QUICK DEPLOYMENT GUIDE

## 🎯 **RECOMMENDED: RAILWAY DEPLOYMENT**

### **Step 1: Get Ready (5 minutes)**
```bash
# Generate a new secret key for production
python -c "import secrets; print('SECRET_KEY=' + secrets.token_urlsafe(50))"
```

### **Step 2: Deploy to Railway (5 minutes)**
1. **Visit**: [railway.app](https://railway.app)
2. **Sign up** with your GitHub account
3. **New Project** → **Deploy from GitHub repo**
4. **Select** your `Webstrat` repository
5. **Wait** for auto-deployment (2-3 minutes)

### **Step 3: Configure Environment Variables (5 minutes)**
In Railway dashboard → Variables tab, add:

```env
SECRET_KEY=<your-generated-secret-key>
DEBUG=False
ALLOWED_HOSTS=*.railway.app
PAYFAST_MERCHANT_ID=your-payfast-id
PAYFAST_MERCHANT_KEY=your-payfast-key
PAYFAST_SANDBOX=False
```

### **Step 4: Test Your Live Site! (2 minutes)**
- Railway gives you a URL like: `falcon-bus-production.up.railway.app`
- Test booking a ticket
- Check admin panel at `/admin/`
- Verify PDF downloads work

### **Step 5: Custom Domain (Optional)**
- Buy domain from [Namecheap](https://namecheap.com) or [GoDaddy](https://godaddy.com)
- Add to Railway dashboard → Settings → Domains
- Update DNS records as instructed

## 💡 **TOTAL TIME: 15 MINUTES TO GO LIVE!**

## 🆓 **ALTERNATIVE: FREE RENDER DEPLOYMENT**

### **For Budget-Conscious Option:**
1. **Visit**: [render.com](https://render.com)
2. **New Web Service** → Connect GitHub
3. **Settings**:
   - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn wsgi:application`
4. **Add environment variables** (same as above)
5. **Deploy** (free tier!)

## 🎯 **WHAT HAPPENS AFTER DEPLOYMENT**

✅ **Your website** will be live at a public URL  
✅ **Database** automatically created and connected  
✅ **SSL certificate** automatically configured  
✅ **Auto-deployments** when you push to GitHub  
✅ **Performance monitoring** included  
✅ **Professional email** bookings work  
✅ **PayFast payments** process live transactions  

## 🚨 **IMPORTANT: PAYFAST SETUP**

Before going live:
1. **Register** with [PayFast](https://payfast.co.za)
2. **Get** your live merchant credentials
3. **Set** `PAYFAST_SANDBOX=False`
4. **Update** webhook URL to your live domain
5. **Test** with small amounts first

## 📞 **NEED HELP?**

- **Railway docs**: [docs.railway.app](https://docs.railway.app)
- **Render docs**: [render.com/docs](https://render.com/docs)
- **PayFast support**: [payfast.co.za/help](https://payfast.co.za/help)

## 🎉 **READY TO LAUNCH?**

Your Falcon Bus Lines booking system is production-ready! All the performance optimizations, monitoring, and professional features are included. 

**Choose your platform and let's get you live in 15 minutes!** 🚀
