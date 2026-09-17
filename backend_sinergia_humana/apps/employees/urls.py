from django.urls import path
from .views import EmployeeDetailView, EmployeeListView

urlpatterns = [
    path("employees/", EmployeeListView.as_view(), name="employee-list"),
    path("employees/<uuid:pk>/", EmployeeDetailView.as_view(), name="employee-detail"),
]