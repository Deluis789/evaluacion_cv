from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "role", "area", "performance_score", "is_high_performer"]
    list_filter = ["area", "is_high_performer"]
    search_fields = ["first_name", "last_name", "role"]