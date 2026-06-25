from django.db import models
from django.conf import settings

class Product(models.Model):
    FLAVOUR_CHOICES = [
        ('classic', 'Classic'),
        ('chocolate', 'Chocolate'),
    ]
    CATEGORY_CHOICES = [
        ('spoon', 'Spoon'),
        ('fork', 'Fork'),
        ('bowl', 'Bowl'),
        ('cutlery_set', 'Cutlery Set'),
    ]

    name = models.CharField(max_length=100)
    flavour = models.CharField(max_length=20, choices=FLAVOUR_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    old_price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity_per_pack = models.IntegerField(default=10)
    delivery_days = models.CharField(max_length=20, default='3-4 days')
    in_stock = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.flavour} {self.name}"


class Order(models.Model):
    PAYMENT_CHOICES = [
        ('upi', 'UPI'),
        ('card', 'Card'),
        ('cod', 'Cash on Delivery'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('delivered', 'Delivered'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,blank=True,
        related_name='orders'
    )

    order_id = models.AutoField(primary_key=True)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.order_id} - {self.status}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price_at_purchase = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Order #{self.order.order_id})"
