import uuid
from django.db import models
from apps.jobs.models import Job


class CandidateStatus(models.TextChoices):
    PENDING = "PENDING", "Pendiente"
    IN_REVIEW = "IN_REVIEW", "En evaluación"
    EVALUATED = "EVALUATED", "Evaluado"
    RECOMMENDED = "RECOMMENDED", "Recomendado"
    NOT_RECOMMENDED = "NOT_RECOMMENDED", "No recomendado"


def cv_upload_path(instance, filename):
    return f"cvs/{instance.id}/{filename}"


class Candidate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    job = models.ForeignKey(Job, related_name="candidates", on_delete=models.PROTECT)
    status = models.CharField(max_length=20, choices=CandidateStatus.choices, default=CandidateStatus.PENDING)
    score = models.PositiveSmallIntegerField(null=True, blank=True)
    experience_years = models.PositiveSmallIntegerField(default=0)
    extracted_profile = models.JSONField(default=dict, blank=True)
    evaluated_at = models.DateTimeField(null=True, blank=True)

    cv_file = models.FileField(upload_to=cv_upload_path, null=True, blank=True)
    cv_file_name = models.CharField(max_length=255, blank=True)
    cv_size_kb = models.PositiveIntegerField(null=True, blank=True)
    cv_uploaded_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "candidates"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"