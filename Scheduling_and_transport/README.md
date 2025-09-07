# 🚌 Falcon Bus Transport System

A full-stack bus booking platform with PayFast payment integration.

## 📁 Project Structure

```
Falcon/
├── backend/          # Django API Backend
│   ├── manage.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── requirements.txt
│   ├── transport/    # Main app
│   └── .env
├── frontend/         # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── nixpacks.toml     # Railway deployment config
└── railway.json      # Railway deployment settings
```

## 🚀 Local Development

### Backend (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## 🌐 URLs
- **Frontend**: http://localhost:3000/
- **Backend API**: http://127.0.0.1:8000/api/
- **Admin Panel**: http://127.0.0.1:8000/admin/

## 🚀 Production
- **Live Site**: https://webstrat-production.up.railway.app/
- **Admin**: https://webstrat-production.up.railway.app/admin/

## 🔧 Features
- Bus route management
- Schedule booking system
- PayFast payment integration
- Admin panel
- Clean API endpoints
