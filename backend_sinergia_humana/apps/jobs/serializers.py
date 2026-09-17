from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    """Serializer de LECTURA — incluye los campos calculados."""
    candidate_count = serializers.SerializerMethodField()
    average_score = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            "id", "title", "area", "description", "min_experience_years",
            "required_skills", "desired_skills", "education_level", "status",
            "created_at", "candidate_count", "average_score",
        ]
        read_only_fields = fields

    def get_candidate_count(self, obj) -> int:
        # TODO(módulo candidates): reemplazar por obj.candidates.count()
        # cuando Candidate tenga FK a Job con related_name="candidates".
        return 0

    def get_average_score(self, obj) -> float:
        # TODO(módulo evaluations): promedio real de Evaluation.final_score
        # para los candidatos de esta convocatoria.
        return 0


class CreateJobSerializer(serializers.ModelSerializer):
    """Serializer de ESCRITURA — solo los campos que el usuario puede enviar."""
    class Meta:
        model = Job
        fields = [
            "title", "area", "description", "min_experience_years",
            "required_skills", "desired_skills", "education_level", "status",
        ]

    def validate_required_skills(self, value):
        if not isinstance(value, list) or not all(isinstance(s, str) for s in value):
            raise serializers.ValidationError("Debe ser una lista de texto.")
        return value

    def validate_desired_skills(self, value):
        if not isinstance(value, list) or not all(isinstance(s, str) for s in value):
            raise serializers.ValidationError("Debe ser una lista de texto.")
        return value