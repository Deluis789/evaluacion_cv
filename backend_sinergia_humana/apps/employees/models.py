import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Employee(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=150)
    area = models.CharField(max_length=100)
    experience_years = models.PositiveSmallIntegerField(default=0)
    skills = models.JSONField(default=list, blank=True)
    education = models.CharField(max_length=200, blank=True ,default="")
    performance_score = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    is_high_performer = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "employees"
        ordering = ["-performance_score"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
