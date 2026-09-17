from django.db import migrations

EMPLOYEES = [
    dict(first_name="Carlos", last_name="Gómez", role="Backend Developer", area="Tecnología",
         experience_years=6, skills=["Python", "Django", "PostgreSQL", "Docker", "AWS"],
         education="Ingeniería en Sistemas", performance_score=96, is_high_performer=True),
    dict(first_name="María", last_name="Fernández", role="Analista de Crédito Senior", area="Riesgos",
         experience_years=8, skills=["Análisis financiero", "Power BI", "Scoring crediticio", "SQL"],
         education="Economía", performance_score=94, is_high_performer=True),
    dict(first_name="Jorge", last_name="Salinas", role="Backend Developer", area="Tecnología",
         experience_years=4, skills=["Python", "Django", "REST API", "Docker"],
         education="Ingeniería Informática", performance_score=88, is_high_performer=True),
    dict(first_name="Daniela", last_name="Rojas", role="Especialista en Ciberseguridad", area="Tecnología",
         experience_years=7, skills=["SIEM", "ISO 27001", "Redes", "Cloud Security"],
         education="Ingeniería en Ciberseguridad", performance_score=91, is_high_performer=True),
    dict(first_name="Ricardo", last_name="Vargas", role="Ejecutivo de Atención al Cliente", area="Operaciones",
         experience_years=3, skills=["Atención al cliente", "Comunicación efectiva", "Inglés intermedio"],
         education="Técnico Superior en Administración", performance_score=85, is_high_performer=False),
    dict(first_name="Valeria", last_name="Cárdenas", role="Analista de Crédito", area="Riesgos",
         experience_years=3, skills=["Excel avanzado", "Análisis financiero", "SQL"],
         education="Administración de Empresas", performance_score=80, is_high_performer=False),
    dict(first_name="Andrés", last_name="Quispe", role="Backend Developer Junior", area="Tecnología",
         experience_years=1, skills=["Python", "Django"],
         education="Ingeniería en Sistemas", performance_score=68, is_high_performer=False),
    dict(first_name="Camila", last_name="Ortiz", role="Especialista en Riesgos", area="Riesgos",
         experience_years=5, skills=["Scoring crediticio", "Power BI", "Análisis financiero"],
         education="Economía", performance_score=89, is_high_performer=True),
    dict(first_name="Fernando", last_name="Paz", role="Ejecutivo de Atención al Cliente Senior", area="Operaciones",
         experience_years=6, skills=["Atención al cliente", "Resolución de conflictos", "Inglés avanzado"],
         education="Bachiller", performance_score=90, is_high_performer=True),
    dict(first_name="Lucía", last_name="Mendoza", role="Backend Developer", area="Tecnología",
         experience_years=5, skills=["Python", "Django", "PostgreSQL", "REST API", "Kubernetes"],
         education="Ingeniería en Sistemas", performance_score=93, is_high_performer=True),
]


def seed_employees(apps, schema_editor):
    Employee = apps.get_model("employees", "Employee")
    for data in EMPLOYEES:
        Employee.objects.create(**data)


def remove_seed(apps, schema_editor):
    Employee = apps.get_model("employees", "Employee")
    Employee.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("employees", "0001_initial"),
    ]
    operations = [
        migrations.RunPython(seed_employees, reverse_code=remove_seed),
    ]