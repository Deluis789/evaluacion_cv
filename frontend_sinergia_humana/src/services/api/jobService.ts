import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import { mockJobs } from "@/services/mock/data/jobs";
import type { Job, JobStatus } from "@/types";

export interface CreateJobPayload {
  title: string;
  area: string;
  description: string;
  minExperienceYears: number;
  requiredSkills: string[];
  desiredSkills: string[];
  educationLevel: string;
  status: JobStatus;
}

export interface IJobService {
  list(): Promise<Job[]>;
  getById(id: string): Promise<Job>;
  create(payload: CreateJobPayload): Promise<Job>;
  update(id: string, payload: Partial<CreateJobPayload>): Promise<Job>;
  remove(id: string): Promise<void>;
}

let jobsStore = [...mockJobs];

const mockJobService: IJobService = {
  async list() {
    await mockDelay();
    return jobsStore;
  },
  async getById(id) {
    await mockDelay(300);
    const job = jobsStore.find((j) => j.id === id);
    if (!job) throw { message: "Convocatoria no encontrada", status: 404 };
    return job;
  },
  async create(payload) {
    await mockDelay();
    const newJob: Job = {
      id: `job-${jobsStore.length + 1}`,
      candidateCount: 0,
      averageScore: 0,
      createdAt: new Date().toISOString(),
      ...payload,
    };
    jobsStore = [newJob, ...jobsStore];
    return newJob;
  },
  async update(id, payload) {
    await mockDelay();
    jobsStore = jobsStore.map((j) => (j.id === id ? { ...j, ...payload } : j));
    return jobsStore.find((j) => j.id === id)!;
  },
  async remove(id) {
    await mockDelay();
    jobsStore = jobsStore.filter((j) => j.id !== id);
  },
};

// GET/POST /api/jobs/  |  GET/PATCH/DELETE /api/jobs/:id/
const realJobService: IJobService = {
  async list() {
    const { data } = await apiClient.get("/jobs/");
    return data;
  },
  async getById(id) {
    const { data } = await apiClient.get(`/jobs/${id}/`);
    return data;
  },
  async create(payload) {
    const { data } = await apiClient.post("/jobs/", payload);
    return data;
  },
  async update(id, payload) {
    const { data } = await apiClient.patch(`/jobs/${id}/`, payload);
    return data;
  },
  async remove(id) {
    await apiClient.delete(`/jobs/${id}/`);
  },
};

export const jobService: IJobService = env.useMocks ? mockJobService : realJobService;
