import uuid
from django.db import models
from apps.candidates.models import Candidate


class Evaluation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    candidate = models.OneToOneField(Candidate, related_name="evaluation", on_delete=models.CASCADE)

    final_score = models.PositiveSmallIntegerField()
    experience_score = models.PositiveSmallIntegerField()
    skills_score = models.PositiveSmallIntegerField()
    education_score = models.PositiveSmallIntegerField()
    compatibility_score = models.PositiveSmallIntegerField()
    profile_score = models.PositiveSmallIntegerField()

    strengths = models.JSONField(default=list)
    gaps = models.JSONField(default=list)
    recommendation = models.CharField(max_length=255)

    ai_provider = models.CharField(max_length=100, default="Institutional LLM")
    ai_confidence = models.PositiveSmallIntegerField()
    ai_summary = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "evaluations"
        ordering = ["-created_at"]