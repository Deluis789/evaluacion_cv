from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User

def authenticate_user(*, email: str, password: str) -> tuple[User, str]:
    user = authenticate(username=email, password=password)
    if user is None:
        raise AuthenticationFailed("Credenciales inválidas. Verifica tu email y contraseña.")
    token = RefreshToken.for_user(user)
    return user, str(token.access_token)

def create_user(*, email: str, password: str, first_name: str, last_name: str, role: str) -> User:
    return User.objects.create_user(
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
        role=role,
    )