"""
Django settings for webstrat project.
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

def get_env_value(env_var, default=None):
    """Get environment variable with fallback"""
    return os.environ.get(env_var, default)

def get_env_bool(env_var, default=False):
    """Get boolean environment variable"""
    value = get_env_value(env_var, str(default)).lower()
    return value in ('true', '1', 'yes', 'on')

# Security
SECRET_KEY = get_env_value('SECRET_KEY', 'django-insecure-dev-key-change-in-production')
DEBUG = get_env_bool('DEBUG', True)

# Hosts - Updated for production
ALLOWED_HOSTS = get_env_value('ALLOWED_HOSTS', '').split(',')
if not ALLOWED_HOSTS or ALLOWED_HOSTS == ['']:
    ALLOWED_HOSTS = [
        'localhost', 
        '127.0.0.1', 
        '*.onrender.com',  # All Render subdomains
        'webstrat.onrender.com',  # Your actual Render URL
        'falcon-bus-lines.onrender.com',  # Alternative naming
        'falconbuslines.co.za',  # Your custom domain
        'www.falconbuslines.co.za'
    ]

# CSRF trusted origins for admin panel and production
CSRF_TRUSTED_ORIGINS = [
    'https://*.onrender.com',
    'https://falcon-bus-lines.onrender.com',
    'https://falconbuslines.co.za',
    'https://www.falconbuslines.co.za',
    'http://localhost:3000',
    'http://127.0.0.1:8000',
]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'transport',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.gzip.GZipMiddleware',  # Add compression
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'backend' / 'templates',  # Django templates
            BASE_DIR / 'frontend' / 'dist',  # React build directory (fallback)
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'wsgi.application'

# Database
import dj_database_url
DATABASE_URL = "postgresql://webstrat_zbm9_user:E2AFcSmfZqbw6pobp0vv0hN0eph3E0lC@dpg-d2ebec49c44c738pinq0-a.oregon-postgres.render.com:5432/webstrat_zbm9"
DATABASES = {
    'default': dj_database_url.parse(DATABASE_URL, conn_max_age=600)
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# React build files - include both potential locations
STATICFILES_DIRS = []

# Add React dist files if they exist (after build)
REACT_DIST_PATH = BASE_DIR / "frontend" / "dist"
if REACT_DIST_PATH.exists():
    STATICFILES_DIRS.append(REACT_DIST_PATH)

# WhiteNoise for static files
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'  # Disable manifest
WHITENOISE_INDEX_FILE = True
WHITENOISE_AUTOREFRESH = True

# Add MIME type mappings for Vite assets
WHITENOISE_MIMETYPES = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
}

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_AUTHENTICATION_classes': [],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour'
    }
}

# CORS settings
CORS_ALLOW_ALL_ORIGINS = DEBUG  # Only allow all origins in development
if not DEBUG:
    CORS_ALLOWED_ORIGINS = [
        'https://*.onrender.com',
        'https://falcon-bus-lines.onrender.com',
        'https://falconbuslines.co.za',
        'https://www.falconbuslines.co.za',
        'https://*.vercel.app',  # If using Vercel for frontend
    ]
    # Only add FRONTEND_URL if it exists and is not empty
    frontend_url = get_env_value('FRONTEND_URL', '')
    if frontend_url:
        CORS_ALLOWED_ORIGINS.append(frontend_url)

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Email configuration
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'noreply@falconbuslines.co.za'
EMAIL_SUBJECT_PREFIX = '[Falcon Bus Lines] '

# PayFast settings

# PayFast sandbox test credentials (for development)
PAYFAST_MERCHANT_ID = get_env_value('PAYFAST_MERCHANT_ID', '10000100')  # Test Merchant ID
PAYFAST_MERCHANT_KEY = get_env_value('PAYFAST_MERCHANT_KEY', '46f0cd694581a')  # Test Merchant Key
PAYFAST_PASSPHRASE = get_env_value('PAYFAST_PASSPHRASE', '')  # Leave blank for sandbox
PAYFAST_SANDBOX = get_env_bool('PAYFAST_SANDBOX', True)  # True = sandbox mode

# PayFast URLs
PAYFAST_BASE_URL = 'https://sandbox.payfast.co.za/eng/process' if PAYFAST_SANDBOX else 'https://www.payfast.co.za/eng/process'
PAYFAST_VALIDATE_URL = 'https://sandbox.payfast.co.za/eng/query/validate' if PAYFAST_SANDBOX else 'https://www.payfast.co.za/eng/query/validate'
PAYFAST_RETURN_URL = get_env_value('PAYFAST_RETURN_URL', 'http://localhost:3000/booking-success')
PAYFAST_CANCEL_URL = get_env_value('PAYFAST_CANCEL_URL', 'http://localhost:3000/booking-cancelled')
PAYFAST_NOTIFY_URL = get_env_value('PAYFAST_NOTIFY_URL', 'http://127.0.0.1:8000/api/payfast/webhook/')
PAYFAST_CURRENCY = 'ZAR'

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': get_env_value('DJANGO_LOG_LEVEL', 'INFO'),
            'propagate': False,
        },
    },
}
