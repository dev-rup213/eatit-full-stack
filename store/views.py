from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from store.models import Product, Order, OrderItem
import json

def get_products(request):
    products = Product.objects.all()
    data = []
    for p in products:
        data.append({
            'id': p.id,
            'name': p.name,
            'flavour': p.flavour,
            'category': p.category,
            'price': str(p.price),
            'old_price': str(p.old_price),
            'delivery_days': p.delivery_days,
            'in_stock': p.in_stock,
        })
    return JsonResponse({'products': data})

@csrf_exempt
def place_order(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = request.user if request.user.is_authenticated else None
        order = Order.objects.create(
            user=user,
            payment_method=data['payment_method'],
            total_amount=data['total_amount'],
        )
        for item in data['items']:
            product = Product.objects.get(id=item['product_id'])
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item['quantity'],
                price_at_purchase=item['price'],
            )
        return JsonResponse({'success': True, 'order_id': order.order_id})
    return JsonResponse({'error': 'Invalid request'}, status=400)

def get_orders(request):
    orders = Order.objects.all().order_by('-created_at')
    data = []
    for o in orders:
        items = []
        for item in o.items.all():
            items.append({
                'product': item.product.name,
                'quantity': item.quantity,
                'price': str(item.price_at_purchase),
            })
        data.append({
            'order_id': o.order_id,
            'total_amount': str(o.total_amount),
            'payment_method': o.payment_method,
            'status': o.status,
            'created_at': str(o.created_at),
            'items': items,
        })
    return JsonResponse({'orders': data})
def get_user_orders(request):
    if not request.user.is_authenticated: 
        return JsonResponse({'error': 'Not Logged in'}, status=401)
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    data=[]
    for o in orders:
        items = []
        for item in o.items.all():
            items.append({
                'product': item.product.name,
                'flavour': item.product.flavour,
                'quantity': item.quantity,
                'price': str(item.price_at_purchase),
                'subtotal': str(item.quantity * item.price_at_purchase)

            })
        data.append({
            'order_id':o.order_id,
            'total_amount':str(o.total_amount),
            'payment_method':o.payment_method,
            'status':o.status,
            'created_at': str(o.created_at),
            'items':items,

        })
    return JsonResponse({'orders':data})