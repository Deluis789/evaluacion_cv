from django.urls import path
from .views import CandidateCvUploadView, CandidateDetailView, CandidateListCreateView

urlpatterns = [
    path("candidates/", CandidateListCreateView.as_view(), name="candidate-list"),
    path("candidates/<uuid:pk>/", CandidateDetailView.as_view(), name="candidate-detail"),
    path("candidates/<uuid:pk>/cv/", CandidateCvUploadView.as_view(), name="candidate-cv-upload"),
]