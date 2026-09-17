from .models import Job


def job_list():
    """Lecturas de convocatorias. Aquí es donde después agregamos filtros
    (?status=ACTIVE, ?area=Tecnología) sin tocar la vista."""
    return Job.objects.all()