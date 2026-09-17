from rest_framework import serializers
from apps.jobs.models import Job
from .models import Candidate


class CandidateSerializer(serializers.ModelSerializer):
    """Lectura — incluye job_id/job_title planos y el objeto cv anidado."""
    job_id = serializers.UUIDField(source="job_id", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)
    cv = serializers.SerializerMethodField()

    class Meta:
        model = Candidate
        fields = [
            "id", "first_name", "last_name", "email", "job_id", "job_title",
            "status", "score", "experience_years", "extracted_profile", "evaluated_at", "cv",
        ]
        read_only_fields = fields

    def get_cv(self, obj):
        if not obj.cv_file:
            return None
        return {
            "id": f"cv-{obj.id}",
            "file_name": obj.cv_file_name,
            "file_size_kb": obj.cv_size_kb,
            "mime_type": "application/pdf",
            "uploaded_at": obj.cv_uploaded_at,
        }


class CreateCandidateSerializer(serializers.Serializer):
    """Escritura — no es ModelSerializer porque job_id no es un objeto Job,
    es solo su UUID (la resolución real pasa por el service)."""
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    job_id = serializers.UUIDField()
    experience_years = serializers.IntegerField(min_value=0)

    def validate_job_id(self, value):
        if not Job.objects.filter(id=value).exists():
            raise serializers.ValidationError("La convocatoria indicada no existe.")
        return value


class UploadCvSerializer(serializers.Serializer):
    file = serializers.FileField()