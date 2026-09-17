from rest_framework.permissions import BasePermission

class CanManageJobs(BasePermission):
    """
    ADMIN y RECRUITER pueden crear, ver y editar convocatorias.
    Solo ADMIN puede eliminarlas.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.method == "DELETE":
            return request.user.role == "ADMIN"
        return True