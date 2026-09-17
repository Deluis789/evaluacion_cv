from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    performance = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            "id", "first_name", "last_name", "role", "area",
            "experience_years", "skills", "education", "performance",
        ]
        read_only_fields = fields

    def get_performance(self, obj) -> dict:
        return {"score": obj.performance_score, "is_high_performer": obj.is_high_performer}