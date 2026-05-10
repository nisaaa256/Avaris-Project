# Avaris Backend Configuration (Django)

This document outlines the configuration and structure for the Avaris Project backend using **Django** and **Django REST Framework (DRF)**.

## 1. Project Setup

### Prerequisites
- Python 3.10+
- pip
- virtualenv

### Initialization
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers dj-database-url psycopg2-binary
```

## 2. Core Configuration (`settings.py`)

Key settings to enable integration with the React frontend.

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'core',  # Your app name
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be at the top
    'django.middleware.common.CommonMiddleware',
    ...
]

# CORS configuration for development
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite default port
]

# Database Configuration (Supabase PostgreSQL)
import dj_database_url
import os

# Gunakan environment variable untuk keamanan
# Contoh URL: postgres://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
DATABASES = {
    'default': dj_database_url.config(
        default='postgres://postgres:password_anda@localhost:5432/postgres'
    )
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## 3. Database Models (`models.py`)

Untuk menyesuaikan dengan tipe data di frontend (Leave, Permission, Reimbursement, Overtime), kita menggunakan satu model dengan field opsional:

```python
from django.db import models
from django.contrib.auth.models import User

class Request(models.Model):
    TYPES = (
        ('leave', 'Leave'),
        ('permission', 'Permission'),
        ('reimbursement', 'Reimbursement'),
        ('overtime', 'Overtime'),
    )
    
    STATUS = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPES)
    status = models.CharField(max_length=10, choices=STATUS, default='pending')
    
    # Common Fields
    reason = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    manager_comment = models.TextField(null=True, blank=True)
    
    # Leave Fields
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    document_url = models.URLField(null=True, blank=True)
    
    # Permission Fields
    permission_type = models.CharField(max_length=100, null=True, blank=True)
    
    # Reimbursement Fields
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    receipt_url = models.URLField(null=True, blank=True)
    
    # Overtime Fields
    hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.type} ({self.status})"
```

## 4. Serializer Configuration (`serializers.py`)

Kita perlu serializer untuk mengubah data model menjadi JSON yang dimengerti oleh frontend:

```python
from rest_framework import serializers
from .models import Request

class RequestSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.get_full_name')
    user_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Request
        fields = '__all__'
```

## 5. API Endpoints (`urls.py`)

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RequestViewSet

router = DefaultRouter()
router.register(r'requests', RequestViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
```

## 6. View Logic (`views.py`)

```python
from rest_framework import viewsets, permissions
from .models import Request
from .serializers import RequestSerializer

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Admin/Manager
            return Request.objects.all()
        return Request.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

## 7. Integration Steps

1. **Migrate Database**: `python manage.py migrate`
2. **Create Superuser**: `python manage.py createsuperuser`
3. **Run Server**: `python manage.py runserver`
4. **Connect Frontend**: Update `src/App.tsx` to fetch data from `http://localhost:8000/api/requests/` instead of using `mockData.ts`.
