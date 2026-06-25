from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, name, phone, address, password=None):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            phone=phone,
            address=address
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, name, phone, address, password=None):

        user = self.create_user(
            email=email,
            name=name,
            phone=phone,
            address=address,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    name     = models.CharField(max_length=100)
    email    = models.EmailField(unique=True)
    phone    = models.CharField(max_length=15)
    address  = models.TextField()
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['name', 'phone', 'address']

    objects = UserManager()

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def is_superuser(self):
        return self.is_admin
    def has_perm(self,perm,obj=None):
        return self.is_admin
    def has_module_perms(self,app_label):
        return self.is_admin

    def __str__(self):
        return f"{self.name} ({self.email})"
