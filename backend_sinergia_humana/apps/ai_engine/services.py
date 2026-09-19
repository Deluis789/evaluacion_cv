from django.utils import timezone

from apps.candidates.models import CandidateStatus
from apps.evaluations.services import evaluation_create_or_update

from .docling_service import extract_cv_text
from .openai_service import score_candidate


def analyze_candidate(*, candidate):
    if not candidate.cv_file:
        raise ValueError("El candidato no tiene un CV cargado.")

    cv_text = extract_cv_text(candidate.cv_file.path)
    result = score_candidate(cv_text=cv_text, job=candidate.job)

    breakdown = {
        "experience": result["experience_score"],
        "skills": result["skills_score"],
        "education": result["education_score"],
        "compatibility": result["compatibility_score"],
        "profile": result["profile_score"],
    }

    evaluation = evaluation_create_or_update(
        candidate=candidate,
        final_score=result["final_score"],
        breakdown=breakdown,
        strengths=result["strengths"],
        gaps=result["gaps"],
        recommendation=result["recommendation"],
        ai_provider="Institutional LLM",
        ai_confidence=result["confidence"],
        ai_summary=result["summary"],
    )

    candidate.score = result["final_score"]
    candidate.status = (
        CandidateStatus.RECOMMENDED if result["final_score"] >= 60 else CandidateStatus.NOT_RECOMMENDED
    )
    candidate.evaluated_at = timezone.now()
    candidate.save()

    return evaluation