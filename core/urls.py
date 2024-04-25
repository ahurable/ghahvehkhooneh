"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from posts.views import *
from users.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sliders/', SlidersList.as_view(), name='slider_lists'),
    path('api/posts/', PostsList.as_view(), name="posts-list-url"),
    path('api/users/create/', UserCreateView.as_view(), name="user-create-url"),
    # auth urls
    path('api/auth/token/', TokenObtainPairView.as_view(), name="token_pair"),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='refresh_url'),
    path('api/auth/update-profile-info/', SetUpdateFirstNameLastNameBioView.as_view(), name="update-profile-url"),
    path('api/auth/profile/', ProfileInformation.as_view(), name="profile-url"),
    path('api/auth/update-avatar/<int:pk>/', UpdateAvatarView.as_view(), name="update-avatar-url")
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

