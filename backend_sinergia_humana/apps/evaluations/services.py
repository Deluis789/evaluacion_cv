from .models import Evaluation


def evaluation_create_or_update(*, candidate, final_score, breakdown, strengths, gaps,
                                  recommendation, ai_provider, ai_confidence, ai_summary) -> Evaluation:
    evaluation, _ = Evaluation.objects.update_or_create(
        candidate=candidate,
        defaults=dict(
            final_score=final_score,
            experience_score=breakdown["experience"],
            skills_score=breakdown["skills"],
            education_score=breakdown["education"],
            compatibility_score=breakdown["compatibility"],
            profile_score=breakdown["profile"],
            strengths=strengths,
            gaps=gaps,
            recommendation=recommendation,
            ai_provider=ai_provider,
            ai_confidence=ai_confidence,
            ai_summary=ai_summary,
        ),
    )
    return evaluation