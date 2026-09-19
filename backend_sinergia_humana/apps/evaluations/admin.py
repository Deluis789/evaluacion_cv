from django.contrib import admin
from .models import Evaluation


@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ["candidate", "final_score", "recommendation", "created_at"]
    list_filter = ["recommendation"]