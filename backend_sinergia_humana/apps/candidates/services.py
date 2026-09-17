from django.utils import timezone
from rest_framework.exceptions import ValidationError

from apps.jobs.models import Job
from .models import Candidate, CandidateStatus

MAX_CV_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


def candidate_create(*, first_name, last_name, email, job_id, experience_years) -> Candidate:
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        raise ValidationError({"jobId": "La convocatoria indicada no existe."})

    return Candidate.objects.create(
        first_name=first_name,
        last_name=last_name,
        email=email,
        job=job,
        experience_years=experience_years,
    )


def candidate_attach_cv(*, candidate: Candidate, file) -> Candidate:
    if file.content_type != "application/pdf":
        raise ValidationError({"file": "Solo se admiten archivos PDF."})
    if file.size > MAX_CV_SIZE_BYTES:
        raise ValidationError({"file": "El archivo supera el tamaño máximo permitido (5 MB)."})

    candidate.cv_file = file
    candidate.cv_file_name = file.name
    candidate.cv_size_kb = file.size // 1024
    candidate.cv_uploaded_at = timezone.now()
    candidate.status = CandidateStatus.IN_REVIEW
    candidate.save()
    return candidate