from django.shortcuts import get_object_or_404
from .models import Candidate


def candidate_list():
    return Candidate.objects.select_related("job").all()


def candidate_get(*, candidate_id):
    return get_object_or_404(
        Candidate.objects.select_related("job"),
        id=candidate_id,
    )