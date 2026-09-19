from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .selectors import evaluation_list
from .serializers import EvaluationSerializer


class EvaluationListView(generics.ListAPIView):
    serializer_class = EvaluationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return evaluation_list(
            candidate_id=self.request.query_params.get("candidateId")
        )


class EvaluationDetailView(generics.RetrieveAPIView):
    serializer_class = EvaluationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return evaluation_list()