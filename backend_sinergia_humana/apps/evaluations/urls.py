from django.urls import path
from .views import EvaluationDetailView, EvaluationListView

urlpatterns = [
    path("evaluations/", EvaluationListView.as_view(), name="evaluation-list"),
    path("evaluations/<uuid:pk>/", EvaluationDetailView.as_view(), name="evaluation-detail"),
]