from django.urls import path
from accounts import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.user_login),
    path('logout/', views.user_logout),
    path('profile/', views.get_profile),
    path('address/', views.update_address),
    path('update-phone/', views.update_phone),


]