import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin

from .managers import UserManager

class Role(models.TextChoices):
    ADMIN = "ADMIN", "Administrador"
    RECRUITER  = "RECRUITER", "Reclutador"

class UserStatus(models.TextChoices):
    ACTIVE = "ACTIVE", "Activo"
    INACTIVE = "INACTIVE", "Inactivo"

class User(AbstractUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=False, null=True, blank=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.RECRUITER)
    status = models.CharField(max_length=20, choices=UserStatus.choices, default=UserStatus.ACTIVE)
    avatar_url = models.URLField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    class Meta:
        db_table = "users"
        ordering = ["-created_at"]

    def __str__(self):
        return self.email