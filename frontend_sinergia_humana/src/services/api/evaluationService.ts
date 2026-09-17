import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import { mockEvaluations } from "@/services/mock/data/evaluations";
import type { Candidate, Evaluation } from "@/types";

export interface IEvaluationService {
  list(): Promise<Evaluation[]>;
  getById(id: string): Promise<Evaluation>;
  getByCandidateId(candidateId: string): Promise<Evaluation | undefined>;
  createFromCandidate(candidate: Candidate): Promise<Evaluation>;
}

let evaluationsStore = [...mockEvaluations];

function buildStrengths(skills: string[]): string[] {
  return skills.slice(0, 4);
}

const REQUIRED_SKILLS_BY_JOB: Record<string, string[]> = {
  "job-1": ["Python", "Django", "Docker", "PostgreSQL"],
  "job-2": ["Análisis financiero", "Excel avanzado", "Scoring crediticio"],
  "job-3": ["SIEM", "Redes", "ISO 27001"],
  "job-4": ["Atención al cliente", "Comunicación efectiva"],
};

const mockEvaluationService: IEvaluationService = {
  async list() {
    await mockDelay();
    return evaluationsStore;
  },
  async getById(id) {
    await mockDelay(200);
    const evaluation = evaluationsStore.find((e) => e.id === id);
    if (!evaluation) throw { message: "Evaluación no encontrada", status: 404 };
    return evaluation;
  },
  async getByCandidateId(candidateId) {
    await mockDelay(200);
    return evaluationsStore.find((e) => e.candidateId === candidateId);
  },
  async createFromCandidate(candidate) {
    const score = candidate.score ?? 70;
    const jitter = () => Math.max(0, Math.min(100, score + Math.round((Math.random() - 0.5) * 12)));
    const skills = REQUIRED_SKILLS_BY_JOB[candidate.jobId] ?? ["Python", "Django"];

    const existing = evaluationsStore.find((e) => e.candidateId === candidate.id);
    const newEvaluation: Evaluation = {
      id: existing?.id ?? `eval-${evaluationsStore.length + 1}`,
      candidateId: candidate.id,
      candidateName: `${candidate.firstName} ${candidate.lastName}`,
      jobId: candidate.jobId,
      jobTitle: candidate.jobTitle,
      finalScore: score,
      breakdown: {
        experience: jitter(),
        skills: jitter(),
        education: jitter(),
        compatibility: jitter(),
        profile: jitter(),
      },
      strengths: buildStrengths(skills),
      gaps: score >= 85 ? ["Área de mejora menor detectada en habilidades complementarias"] : ["Experiencia limitada con AWS", "REST API no claramente evidenciado"],
      recommendation:
        score >= 85
          ? "Avanzar a entrevista técnica"
          : score >= 60
          ? "Considerar para siguiente etapa con reservas"
          : "No avanzar en el proceso",
      aiAnalysis: {
        provider: "Institutional LLM",
        confidence: Math.max(50, score - 3),
        summary:
          score >= 85
            ? "El candidato presenta una alta coincidencia con los requisitos técnicos de la convocatoria."
            : score >= 60
            ? "El candidato cumple parcialmente los requisitos técnicos de la convocatoria."
            : "El candidato no alcanza el nivel de compatibilidad técnica requerido.",
        isAssisted: true,
      },
      createdAt: new Date().toISOString(),
    };

    evaluationsStore = existing
      ? evaluationsStore.map((e) => (e.id === existing.id ? newEvaluation : e))
      : [newEvaluation, ...evaluationsStore];

    return newEvaluation;
  },
};

// GET/POST /api/evaluations/  |  GET /api/evaluations/:id/
const realEvaluationService: IEvaluationService = {
  async list() {
    const { data } = await apiClient.get("/evaluations/");
    return data;
  },
  async getById(id) {
    const { data } = await apiClient.get(`/evaluations/${id}/`);
    return data;
  },
  async getByCandidateId(candidateId) {
    const { data } = await apiClient.get("/evaluations/", { params: { candidateId } });
    return data?.[0];
  },
  async createFromCandidate(candidate) {
    const { data } = await apiClient.post("/evaluations/", { candidateId: candidate.id });
    return data;
  },
};

export const evaluationService: IEvaluationService = env.useMocks
  ? mockEvaluationService
  : realEvaluationService;
