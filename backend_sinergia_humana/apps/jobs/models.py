import uuid
from django.db import models

class JobStatus(models.TextChoices):
    ACTIVE = "ACTIVE", "Activa"
    CLOSED = "CLOSED", "Cerrada"
    DRAFT = "DRAFT", "Borrador"

class Job(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    area = models.CharField(max_length=100)
    description = models.TextField()
    min_experience_years = models.PositiveSmallIntegerField(default=0)
    required_skills = models.JSONField(default=list, blank=True)
    desired_skills = models.JSONField(default=list, blank=True)
    education_level = models.CharField(max_length=150, blank=True, default="")
    status = models.CharField(max_length=20, choices=JobStatus.choices, default=JobStatus.DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "jobs"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title