from .models import Candidate


def candidate_list():
    return Candidate.objects.select_related("job").all()


def candidate_get(*, candidate_id):
    return Candidate.objects.select_related("job").get(id=candidate_id)