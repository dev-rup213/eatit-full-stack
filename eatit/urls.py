"""
URL configuration for eatit project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store.urls')),
    path('api/auth/', include('accounts.urls')),
    path('',TemplateView.as_view(template_name='index.html')),
    path('login/',TemplateView.as_view(template_name='login2.html')),
    path('store/',TemplateView.as_view(template_name='Stores.html')),
    path('cart/',TemplateView.as_view(template_name='cart2.html')),
    path('purchase/',TemplateView.as_view(template_name='purchase.html')),
    path('help/',TemplateView.as_view(template_name='Help.html')),
    path('product/',TemplateView.as_view(template_name='Product.html')),
    path('spoon/',TemplateView.as_view(template_name='Edible Spoon.html')),
    path('fork/',TemplateView.as_view(template_name='Edible Fork.html')),
    path('bowl/',TemplateView.as_view(template_name='bowl.html')),
    path('set/',TemplateView.as_view(template_name='set.html')),
    path('orders/',TemplateView.as_view(template_name='orders.html')),
    path('profile/',TemplateView.as_view(template_name='profile.html')),

] + static('/', document_root = settings.BASE_DIR)
