import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import { mockCandidates } from "@/services/mock/data/candidates";
import { mockJobs } from "@/services/mock/data/jobs";
import type {
  CandidatesByJob,
  DashboardKpis,
  EvaluationsTrendPoint,
  ScoreDistributionBucket,
} from "@/types";

export interface DashboardSummary {
  kpis: DashboardKpis;
  scoreDistribution: ScoreDistributionBucket[];
  candidatesByJob: CandidatesByJob[];
  evaluationsTrend: EvaluationsTrendPoint[];
}

export interface IDashboardService {
  getSummary(): Promise<DashboardSummary>;
}

function buildScoreDistribution(): ScoreDistributionBucket[] {
  const buckets = [
    { range: "0-59", min: 0, max: 59 },
    { range: "60-74", min: 60, max: 74 },
    { range: "75-89", min: 75, max: 89 },
    { range: "90-100", min: 90, max: 100 },
  ];
  return buckets.map((b) => ({
    range: b.range,
    count: mockCandidates.filter((c) => c.score !== null && c.score >= b.min && c.score <= b.max)
      .length,
  }));
}

function buildCandidatesByJob(): CandidatesByJob[] {
  return mockJobs.map((j) => ({
    jobTitle: j.title,
    count: mockCandidates.filter((c) => c.jobId === j.id).length,
  }));
}

const mockDashboardService: IDashboardService = {
  async getSummary() {
    await mockDelay();
    const evaluated = mockCandidates.filter((c) => c.score !== null);
    return {
      kpis: {
        totalCandidates: mockCandidates.length,
        activeJobs: mockJobs.filter((j) => j.status === "ACTIVE").length,
        evaluationsCompleted: evaluated.length,
        standoutCandidates: evaluated.filter((c) => (c.score ?? 0) >= 85).length,
      },
      scoreDistribution: buildScoreDistribution(),
      candidatesByJob: buildCandidatesByJob(),
      evaluationsTrend: [
        { date: "Sem 1", count: 3 },
        { date: "Sem 2", count: 5 },
        { date: "Sem 3", count: 8 },
        { date: "Sem 4", count: 6 },
        { date: "Sem 5", count: 9 },
      ],
    };
  },
};

const realDashboardService: IDashboardService = {
  async getSummary() {
    const { data } = await apiClient.get("/dashboard/summary/");
    return data;
  },
};

export const dashboardService: IDashboardService = env.useMocks
  ? mockDashboardService
  : realDashboardService;
