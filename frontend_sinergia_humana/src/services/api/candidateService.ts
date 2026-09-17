import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import { mockCandidates } from "@/services/mock/data/candidates";
import { mockJobs } from "@/services/mock/data/jobs";
import type { Candidate, Evaluation } from "@/types";
import { evaluationService } from "./evaluationService";

export interface CreateCandidatePayload {
  firstName: string;
  lastName: string;
  email: string;
  jobId: string;
  experienceYears: number;
}

export interface ICandidateService {
  list(): Promise<Candidate[]>;
  getById(id: string): Promise<Candidate>;
  create(payload: CreateCandidatePayload): Promise<Candidate>;
  uploadCv(candidateId: string, file: File): Promise<Candidate>;
  analyze(candidateId: string): Promise<Evaluation>;
}

let candidatesStore = [...mockCandidates];

function randomScore(): number {
  const pool = [95, 92, 89, 84, 78, 72, 65, 58];
  return pool[Math.floor(Math.random() * pool.length)];
}

const mockCandidateService: ICandidateService = {
  async list() {
    await mockDelay();
    return candidatesStore;
  },
  async getById(id) {
    await mockDelay(200);
    const candidate = candidatesStore.find((c) => c.id === id);
    if (!candidate) throw { message: "Candidato no encontrado", status: 404 };
    return candidate;
  },
  async create(payload) {
    await mockDelay();
    const job = mockJobs.find((j) => j.id === payload.jobId);
    const newCandidate: Candidate = {
      id: `cand-${candidatesStore.length + 1}`,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      jobId: payload.jobId,
      jobTitle: job?.title ?? "Convocatoria",
      status: "PENDING",
      score: null,
      experienceYears: payload.experienceYears,
      evaluatedAt: null,
    };
    candidatesStore = [newCandidate, ...candidatesStore];
    return newCandidate;
  },
  // POST /api/candidates/:id/cv/ (multipart/form-data)
  async uploadCv(candidateId, file) {
    await mockDelay(700);
    candidatesStore = candidatesStore.map((c) =>
      c.id === candidateId
        ? {
            ...c,
            cv: {
              id: `cv-${candidateId}`,
              fileName: file.name,
              fileSizeKb: Math.round(file.size / 1024),
              mimeType: file.type || "application/pdf",
              uploadedAt: new Date().toISOString(),
            },
            status: "IN_REVIEW",
          }
        : c
    );
    return candidatesStore.find((c) => c.id === candidateId)!;
  },
  // POST /api/ai/analyze/
  async analyze(candidateId) {
    // El delay real de este paso lo maneja la UI (animación de procesamiento).
    const candidate = candidatesStore.find((c) => c.id === candidateId);
    if (!candidate) throw { message: "Candidato no encontrado", status: 404 };

    const score = randomScore();
    candidatesStore = candidatesStore.map((c) =>
      c.id === candidateId
        ? {
            ...c,
            score,
            status: score >= 60 ? "RECOMMENDED" : "NOT_RECOMMENDED",
            evaluatedAt: new Date().toISOString(),
          }
        : c
    );

    return evaluationService.createFromCandidate(candidatesStore.find((c) => c.id === candidateId)!);
  },
};

// GET/POST /api/candidates/  |  GET /api/candidates/:id/
const realCandidateService: ICandidateService = {
  async list() {
    const { data } = await apiClient.get("/candidates/");
    return data;
  },
  async getById(id) {
    const { data } = await apiClient.get(`/candidates/${id}/`);
    return data;
  },
  async create(payload) {
    const { data } = await apiClient.post("/candidates/", payload);
    return data;
  },
  async uploadCv(candidateId, file) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post(`/candidates/${candidateId}/cv/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
  async analyze(candidateId) {
    const { data } = await apiClient.post("/ai/analyze/", { candidateId });
    return data;
  },
};

export const candidateService: ICandidateService = env.useMocks
  ? mockCandidateService
  : realCandidateService;
