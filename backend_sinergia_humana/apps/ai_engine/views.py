from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.candidates.selectors import candidate_get
from apps.evaluations.serializers import EvaluationSerializer

from .serializers import AnalyzeSerializer
from .services import analyze_candidate


class AnalyzeCandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AnalyzeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        candidate = candidate_get(candidate_id=serializer.validated_data["candidate_id"])
        evaluation = analyze_candidate(candidate=candidate)
        return Response(EvaluationSerializer(evaluation).data)