from rest_framework import generics, status
from rest_framework.response import Response

from .permissions import CanManageJobs
from .selectors import job_list
from .serializers import CreateJobSerializer, JobSerializer
from .services import job_create, job_delete, job_update


class JobListCreateView(generics.ListCreateAPIView):
    permission_classes = [CanManageJobs]

    def get_queryset(self):
        return job_list()

    def get_serializer_class(self):
        return CreateJobSerializer if self.request.method == "POST" else JobSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        job = job_create(**serializer.validated_data)
        return Response(JobSerializer(job).data, status=status.HTTP_201_CREATED)


class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CanManageJobs]

    def get_queryset(self):
        return job_list()

    def get_serializer_class(self):
        return CreateJobSerializer if self.request.method in ("PUT", "PATCH") else JobSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        job = job_update(job=instance, **serializer.validated_data)
        return Response(JobSerializer(job).data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        job_delete(job=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)