from rest_framework import serializers


class AnalyzeSerializer(serializers.Serializer):
    candidate_id = serializers.UUIDField()