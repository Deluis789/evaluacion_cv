from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .selectors import candidate_get, candidate_list
from .serializers import CandidateSerializer, CreateCandidateSerializer, UploadCvSerializer
from .services import candidate_attach_cv, candidate_create


class CandidateListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return candidate_list()

    def get_serializer_class(self):
        return CreateCandidateSerializer if self.request.method == "POST" else CandidateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        candidate = candidate_create(**serializer.validated_data)
        return Response(CandidateSerializer(candidate).data, status=status.HTTP_201_CREATED)


class CandidateDetailView(generics.RetrieveAPIView):
    serializer_class = CandidateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return candidate_list()


class CandidateCvUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, pk):
        candidate = candidate_get(candidate_id=pk)
        serializer = UploadCvSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        candidate = candidate_attach_cv(candidate=candidate, file=serializer.validated_data["file"])
        return Response(CandidateSerializer(candidate).data)