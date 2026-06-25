from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from accounts.models import User
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name     = data.get('name', '').strip()
        phone    = data.get('phone', '').strip()
        email    = data.get('email', '').strip().lower()
        address  = data.get('address', '').strip()
        password = data.get('password', '')

        if not all([name, phone, email, address, password]):
            return JsonResponse({'error': 'All fields are required.'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'An account with this email already exists.'}, status=400)

        user = User.objects.create_user(
            email=email,
            name=name,
            phone=phone,
            address=address,
            password=password
        )
        login(request, user)
        return JsonResponse({'success': True, 'name': user.name})

    return JsonResponse({'error': 'Invalid request'}, status=400)


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data     = json.loads(request.body)
        email    = data.get('email', '').strip().lower()
        password = data.get('password', '')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'name': user.name})
        else:
            return JsonResponse({'error': 'Invalid email or password.'}, status=401)

    return JsonResponse({'error': 'Invalid request'}, status=400)


@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({'success': True})


def get_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Not logged in.'}, status=401)
    user = request.user
    return JsonResponse({
        'name':    user.name,
        'email':   user.email,
        'phone':   user.phone,
        'address': user.address,
    })


@csrf_exempt
def update_address(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Not logged in.'}, status=401)
    if request.method == 'POST':
        data = json.loads(request.body)
        address = data.get('address', '').strip()
        if not address:
            return JsonResponse({'error': 'Address cannot be empty.'}, status=400)
        request.user.address = address
        request.user.save()
        return JsonResponse({'success': True})
    return JsonResponse({'error': 'Invalid request'}, status=400)
def update_phone(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Not logged in.'}, status=401)
    if request.method == 'POST':
        data = json.loads(request.body)
        phone = data.get('phone', '').strip()
        if not phone:
            return JsonResponse({'error': 'Address cannot be empty.'}, status=400)
        request.user.phone = phone
        request.user.save()
        return JsonResponse({'success': True})
    return JsonResponse({'error': 'Invalid request'}, status=400)
