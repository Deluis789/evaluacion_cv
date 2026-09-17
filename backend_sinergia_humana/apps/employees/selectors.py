from .models import Employee


def employee_list():
    """De momento trae todos. Cuando el frontend necesite filtrar por área
    o por high performers, se agrega el parámetro aquí sin tocar la vista."""
    return Employee.objects.all()


def employee_high_performers():
    """La usaremos más adelante, cuando construyamos el módulo `rankings`
    para comparar un candidato contra los empleados de alto desempeño."""
    return Employee.objects.filter(is_high_performer=True)