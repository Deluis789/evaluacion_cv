import json
from django.conf import settings
from openai import OpenAI

_client = OpenAI(api_key=settings.OPENAI_API_KEY)

# JSON Schema que OpenAI está OBLIGADO a cumplir en su respuesta
# (Structured Outputs) — nada de parsear texto libre ni "confiar" en que
# el modelo responda bien formateado.
EVALUATION_SCHEMA = {
    "name": "candidate_evaluation",
    "strict": True,
    "schema": {
        "type": "object",
        "properties": {
            "final_score": {"type": "integer", "minimum": 0, "maximum": 100},
            "experience_score": {"type": "integer", "minimum": 0, "maximum": 100},
            "skills_score": {"type": "integer", "minimum": 0, "maximum": 100},
            "education_score": {"type": "integer", "minimum": 0, "maximum": 100},
            "compatibility_score": {"type": "integer", "minimum": 0, "maximum": 100},
            "profile_score": {"type": "integer", "minimum": 0, "maximum": 100},
            "strengths": {"type": "array", "items": {"type": "string"}},
            "gaps": {"type": "array", "items": {"type": "string"}},
            "recommendation": {"type": "string"},
            "confidence": {"type": "integer", "minimum": 0, "maximum": 100},
            "summary": {"type": "string"},
        },
        "required": [
            "final_score", "experience_score", "skills_score", "education_score",
            "compatibility_score", "profile_score", "strengths", "gaps",
            "recommendation", "confidence", "summary",
        ],
        "additionalProperties": False,
    },
}


def score_candidate(*, cv_text: str, job) -> dict:
    prompt = f"""
Eres un motor de evaluación de talento para una institución financiera.
Compara el siguiente CV contra los requisitos de la convocatoria y devuelve
únicamente el JSON solicitado.

CONVOCATORIA: {job.title} ({job.area})
Experiencia mínima requerida: {job.min_experience_years} años
Habilidades obligatorias: {", ".join(job.required_skills)}
Habilidades deseables: {", ".join(job.desired_skills)}
Nivel educativo esperado: {job.education_level}

CV DEL CANDIDATO (texto extraído del PDF):
{cv_text}
""".strip()

    response = _client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_schema", "json_schema": EVALUATION_SCHEMA},
    )
    return json.loads(response.choices[0].message.content)