from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils import timezone

class TheAccountManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError('Please enter a valid email address')

    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must provide a First Name')
        if not last_name:
            raise ValueError('Users must provide a Last Name')
        if not password:
            raise ValueError('Users must provide a password')

        email = self.normalize_email(email)
        self.email_validator(email)

        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, first_name, last_name, password, **extra_fields)

class Account(AbstractBaseUser, PermissionsMixin):
    email        = models.EmailField(unique=True)
    first_name   = models.CharField(max_length=30)
    last_name    = models.CharField(max_length=30)
    is_active    = models.BooleanField(default=True)
    is_superuser    = models.BooleanField(default=True)
    is_staff     = models.BooleanField(default=False)
    last_login   = models.DateTimeField(verbose_name='Last Login', auto_now_add=True)
    date_joined  = models.DateTimeField(verbose_name='Date joined', auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = TheAccountManager()

    def __str__(self):
        return f'User Object {self.email}'
    def has_perms(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label: str) -> bool:
        return super().has_module_perms(app_label)

