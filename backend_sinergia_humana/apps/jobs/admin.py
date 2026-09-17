from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ["title", "area", "status", "min_experience_years", "created_at"]
    list_filter = ["status", "area"]
    search_fields = ["title", "area"]
