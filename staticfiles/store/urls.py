from django.urls import path
from store import views
urlpatterns = [
    path('products/',views.get_products),
    path('order/',views.place_order),
    path('orders/',views.get_orders),
    path('my-orders/',views.get_user_orders),
]