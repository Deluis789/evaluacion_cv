from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Employee
from .selectors import employee_list
from .serializers import EmployeeSerializer


class EmployeeListView(generics.ListAPIView):
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return employee_list()


class EmployeeDetailView(generics.RetrieveAPIView):
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]
    queryset = Employee.objects.all()