from .models import Evaluation


def evaluation_list(*, candidate_id=None):
    qs = Evaluation.objects.select_related("candidate", "candidate__job").all()
    if candidate_id:
        qs = qs.filter(candidate_id=candidate_id)
    return qs


def evaluation_get(*, evaluation_id):
    return Evaluation.objects.select_related("candidate", "candidate__job").get(id=evaluation_id)