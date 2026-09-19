from rest_framework import serializers
from .models import Evaluation


class EvaluationSerializer(serializers.ModelSerializer):
    candidate_id = serializers.UUIDField(read_only=True)
    candidate_name = serializers.SerializerMethodField()
    job_id = serializers.UUIDField(source="candidate.job_id", read_only=True)
    job_title = serializers.CharField(source="candidate.job.title", read_only=True)
    breakdown = serializers.SerializerMethodField()
    ai_analysis = serializers.SerializerMethodField()

    class Meta:
        model = Evaluation
        fields = [
            "id", "candidate_id", "candidate_name", "job_id", "job_title",
            "final_score", "breakdown", "strengths", "gaps", "recommendation",
            "ai_analysis", "created_at",
        ]
        read_only_fields = fields

    def get_candidate_name(self, obj):
        return f"{obj.candidate.first_name} {obj.candidate.last_name}"

    def get_breakdown(self, obj):
        return {
            "experience": obj.experience_score,
            "skills": obj.skills_score,
            "education": obj.education_score,
            "compatibility": obj.compatibility_score,
            "profile": obj.profile_score,
        }

    def get_ai_analysis(self, obj):
        return {
            "provider": obj.ai_provider,
            "confidence": obj.ai_confidence,
            "summary": obj.ai_summary,
            "is_assisted": True,
        }