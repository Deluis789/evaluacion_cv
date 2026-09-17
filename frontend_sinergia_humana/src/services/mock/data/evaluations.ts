import type { Evaluation } from "@/types";

const baseAI = (confidence: number, summary: string): Evaluation["aiAnalysis"] => ({
  provider: "Institutional LLM",
  confidence,
  summary,
  isAssisted: true,
});

export const mockEvaluations: Evaluation[] = [
  {
    id: "eval-1",
    candidateId: "cand-1",
    candidateName: "Juan Pérez",
    jobId: "job-1",
    jobTitle: "Backend Developer",
    finalScore: 92,
    breakdown: { experience: 90, skills: 95, education: 90, compatibility: 93, profile: 92 },
    strengths: ["Experiencia sólida con Python", "Django", "Docker", "PostgreSQL"],
    gaps: ["Experiencia limitada con Kubernetes"],
    recommendation: "Avanzar a entrevista técnica",
    aiAnalysis: baseAI(
      91,
      "El candidato presenta una alta coincidencia con los requisitos técnicos de la convocatoria, destacando su experiencia previa en arquitecturas backend similares a las utilizadas por la institución."
    ),
    createdAt: "2026-08-10T14:00:00Z",
  },
  {
    id: "eval-2",
    candidateId: "cand-2",
    candidateName: "María López",
    jobId: "job-2",
    jobTitle: "Analista de Crédito",
    finalScore: 89,
    breakdown: { experience: 88, skills: 90, education: 92, compatibility: 87, profile: 88 },
    strengths: ["Análisis financiero avanzado", "Excel avanzado", "Scoring crediticio"],
    gaps: ["Poca exposición a Power BI"],
    recommendation: "Avanzar a entrevista técnica",
    aiAnalysis: baseAI(
      88,
      "El perfil evidencia un dominio claro de metodologías de análisis de riesgo crediticio, con resultados comparables a los de analistas de alto desempeño de la institución."
    ),
    createdAt: "2026-08-09T09:20:00Z",
  },
  {
    id: "eval-3",
    candidateId: "cand-3",
    candidateName: "Carlos Gómez",
    jobId: "job-1",
    jobTitle: "Backend Developer",
    finalScore: 87,
    breakdown: { experience: 85, skills: 92, education: 90, compatibility: 88, profile: 86 },
    strengths: ["Experiencia con Python", "Django", "Docker", "PostgreSQL"],
    gaps: ["Experiencia limitada con AWS", "REST API no claramente evidenciado"],
    recommendation: "Avanzar a entrevista técnica",
    aiAnalysis: baseAI(
      87,
      "El candidato presenta una alta compatibilidad con los requisitos técnicos de la convocatoria, aunque se recomienda profundizar en su experiencia con servicios en la nube durante la entrevista."
    ),
    createdAt: "2026-08-08T11:10:00Z",
  },
  {
    id: "eval-4",
    candidateId: "cand-4",
    candidateName: "Ana Torres",
    jobId: "job-1",
    jobTitle: "Backend Developer",
    finalScore: 76,
    breakdown: { experience: 68, skills: 80, education: 78, compatibility: 75, profile: 77 },
    strengths: ["Buen manejo de Python", "Disposición para aprender nuevas tecnologías"],
    gaps: ["Experiencia profesional aún limitada", "Sin evidencia de trabajo con bases de datos relacionales"],
    recommendation: "Considerar para posiciones junior",
    aiAnalysis: baseAI(
      74,
      "El perfil muestra potencial técnico pero con una trayectoria profesional aún corta respecto al nivel esperado para la convocatoria."
    ),
    createdAt: "2026-08-07T16:30:00Z",
  },
  {
    id: "eval-5",
    candidateId: "cand-5",
    candidateName: "Diego Ramírez",
    jobId: "job-2",
    jobTitle: "Analista de Crédito",
    finalScore: 72,
    breakdown: { experience: 70, skills: 74, education: 75, compatibility: 70, profile: 71 },
    strengths: ["Conocimientos básicos de análisis financiero"],
    gaps: ["Poca experiencia en scoring crediticio", "No evidencia manejo de SQL"],
    recommendation: "Evaluar para otras posiciones del área",
    aiAnalysis: baseAI(
      70,
      "El candidato cumple parcialmente los requisitos técnicos; se sugiere considerar su perfil para posiciones de menor seniority dentro del área de riesgos."
    ),
    createdAt: "2026-08-06T10:00:00Z",
  },
  {
    id: "eval-6",
    candidateId: "cand-6",
    candidateName: "Paola Suárez",
    jobId: "job-4",
    jobTitle: "Ejecutivo de Atención al Cliente",
    finalScore: 65,
    breakdown: { experience: 60, skills: 68, education: 65, compatibility: 66, profile: 65 },
    strengths: ["Buena comunicación", "Actitud orientada al cliente"],
    gaps: ["Experiencia limitada en atención presencial", "Inglés no evidenciado"],
    recommendation: "Considerar con reservas",
    aiAnalysis: baseAI(
      64,
      "El perfil cumple de forma moderada con los requisitos de la convocatoria, principalmente por su experiencia limitada en el rubro."
    ),
    createdAt: "2026-08-05T12:00:00Z",
  },
  {
    id: "eval-7",
    candidateId: "cand-7",
    candidateName: "Sergio Aguilar",
    jobId: "job-1",
    jobTitle: "Backend Developer",
    finalScore: 58,
    breakdown: { experience: 50, skills: 62, education: 60, compatibility: 55, profile: 58 },
    strengths: ["Conocimientos básicos de Python"],
    gaps: ["Sin experiencia demostrable con Django", "Sin evidencia de trabajo en equipo técnico"],
    recommendation: "No avanzar en el proceso",
    aiAnalysis: baseAI(
      59,
      "El candidato no alcanza el nivel de compatibilidad técnica requerido para la convocatoria actual."
    ),
    createdAt: "2026-08-04T09:00:00Z",
  },
  {
    id: "eval-8",
    candidateId: "cand-8",
    candidateName: "Valentina Choque",
    jobId: "job-4",
    jobTitle: "Ejecutivo de Atención al Cliente",
    finalScore: 45,
    breakdown: { experience: 35, skills: 48, education: 50, compatibility: 45, profile: 47 },
    strengths: ["Disponibilidad inmediata"],
    gaps: ["Sin experiencia previa en atención al cliente", "Comunicación escrita a mejorar"],
    recommendation: "No avanzar en el proceso",
    aiAnalysis: baseAI(
      46,
      "El perfil no evidencia experiencia relevante para el puesto ni las competencias comunicacionales requeridas."
    ),
    createdAt: "2026-08-03T15:20:00Z",
  },
  {
    id: "eval-9",
    candidateId: "cand-9",
    candidateName: "Rodrigo Fernández",
    jobId: "job-2",
    jobTitle: "Analista de Crédito",
    finalScore: 32,
    breakdown: { experience: 25, skills: 30, education: 40, compatibility: 30, profile: 33 },
    strengths: ["Formación académica afín"],
    gaps: ["Sin experiencia laboral relevante", "Sin conocimientos de scoring crediticio"],
    recommendation: "No avanzar en el proceso",
    aiAnalysis: baseAI(
      33,
      "El candidato no cumple con los requisitos mínimos de experiencia establecidos en la convocatoria."
    ),
    createdAt: "2026-08-02T08:30:00Z",
  },
  {
    id: "eval-10",
    candidateId: "cand-10",
    candidateName: "Camila Ibáñez",
    jobId: "job-1",
    jobTitle: "Backend Developer",
    finalScore: 0,
    breakdown: { experience: 0, skills: 0, education: 0, compatibility: 0, profile: 0 },
    strengths: [],
    gaps: [],
    recommendation: "Evaluación pendiente",
    aiAnalysis: baseAI(0, "Evaluación aún no procesada."),
    createdAt: "2026-08-20T09:00:00Z",
  },
];
