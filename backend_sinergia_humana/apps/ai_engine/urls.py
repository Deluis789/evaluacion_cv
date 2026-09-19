from django.urls import path
from .views import AnalyzeCandidateView

urlpatterns = [
    path("ai/analyze/", AnalyzeCandidateView.as_view(), name="ai-analyze"),
]