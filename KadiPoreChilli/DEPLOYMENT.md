# 🌶️ KadiPore Chilli Farms - Netlify Deployment Guide

## 🚀 Quick Deployment to Netlify

### Method 1: Git Repository Deployment (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - KadiPore Chilli Farms website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select your KadiPore repository

3. **Build Settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
   - **Node version:** 18

### Method 2: Manual Deployment

1. **Build the project locally:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `frontend/dist` folder to Netlify

## ⚙️ Environment Variables

Set these in Netlify Dashboard → Site Settings → Environment Variables:

```bash
# Optional - for future backend integration
VITE_API_URL=https://your-api-url.com

# Optional - for Stripe payments
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key

# Optional - for EmailJS contact forms
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📁 Project Structure

```
KadiPoreChilli/
├── netlify.toml          # Netlify configuration
├── package.json          # Root deployment scripts
├── .gitignore           # Git ignore rules
├── README.md            # This file
└── frontend/            # React application
    ├── src/
    │   ├── components/   # React components
    │   ├── utils/        # Utilities (animations, etc.)
    │   ├── tests/        # Chatbot tests
    │   └── ...
    ├── public/           # Static assets
    ├── package.json      # Frontend dependencies
    └── dist/            # Build output (created after npm run build)
```

## 🧪 Pre-Deployment Testing

1. **Test Build Locally:**
   ```bash
   cd frontend
   npm install
   npm run build
   npm run preview
   ```

2. **Test Chatbot:**
   - Open `frontend/src/tests/chatbot-test.html` in browser
   - Run all tests to ensure 75%+ success rate

3. **Test Animations:**
   - Scroll through all sections to verify animations trigger
   - Check Shop, About, Products, Services, Contact sections

## 🔧 Build Configuration

The `netlify.toml` file includes:

- **Build settings:** Node 18, npm build process
- **SPA routing:** Redirects for React Router
- **Security headers:** XSS protection, frame options
- **Performance:** Cache headers for assets
- **Form handling:** Ready for contact forms

## 🌐 Custom Domain Setup

1. **In Netlify Dashboard:**
   - Go to Site Settings → Domain Management
   - Add custom domain: `www.kadiporechillifarms.co.za`

2. **DNS Configuration:**
   - Point your domain to Netlify:
   - `CNAME www netlify-app-name.netlify.app`

## 📊 Features Included

✅ **Responsive Design** - Mobile, tablet, desktop optimized
✅ **Scroll Animations** - Smooth animations on scroll
✅ **Interactive Chatbot** - ChilliBot with 75%+ test success
✅ **Product Catalog** - Complete shop with pricing
✅ **Contact Forms** - Ready for Netlify form handling
✅ **SEO Optimized** - Meta tags, semantic HTML
✅ **Performance** - Optimized images, lazy loading

## 🚨 Troubleshooting

### Build Fails:
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Animations Not Working:
- Check that `scrollAnimations.jsx` exists in `src/utils/`
- Verify all components import from `../utils/scrollAnimations.jsx`

### Chatbot Issues:
- Test using `src/tests/chatbot-test.html`
- Verify `chatbotConfig.js` has `getBotReply` function

### Routing Issues:
- Ensure `netlify.toml` includes SPA redirect rules
- Check that build output is in `frontend/dist`

## 📞 Support

For deployment issues:
- Check Netlify build logs in dashboard
- Verify all file paths use forward slashes
- Ensure Node.js version 18+ compatibility

## 🎉 Post-Deployment Checklist

- [ ] Site loads correctly on mobile and desktop
- [ ] All animations work on scroll
- [ ] Chatbot responds to test questions
- [ ] Shop section displays products
- [ ] Contact forms work (if connected)
- [ ] Images load properly
- [ ] Navigation works on all pages

---

**Ready to go live with KadiPore Chilli Farms! 🌶️🚀**
