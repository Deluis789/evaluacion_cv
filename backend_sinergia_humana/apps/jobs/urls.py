from django.urls import path
from .views import JobDetailView, JobListCreateView

urlpatterns = [
    path("jobs/", JobListCreateView.as_view(), name="job-list"),
    path("jobs/<uuid:pk>/", JobDetailView.as_view(), name="job-detail"),
]