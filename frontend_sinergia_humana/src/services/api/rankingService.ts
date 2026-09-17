import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import { mockCandidates } from "@/services/mock/data/candidates";
import type { RankingEntry } from "@/types";

export interface IRankingService {
  list(): Promise<RankingEntry[]>;
}

const mockRankingService: IRankingService = {
  async list() {
    await mockDelay();
    return mockCandidates
      .filter((c) => c.score !== null)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .map((c, idx) => ({
        position: idx + 1,
        candidateId: c.id,
        candidateName: `${c.firstName} ${c.lastName}`,
        jobTitle: c.jobTitle,
        score: c.score ?? 0,
      }));
  },
};

// GET /api/rankings/
const realRankingService: IRankingService = {
  async list() {
    const { data } = await apiClient.get("/rankings/");
    return data;
  },
};

export const rankingService: IRankingService = env.useMocks
  ? mockRankingService
  : realRankingService;
