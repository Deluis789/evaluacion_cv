import { env } from "@/config/env";
import { apiClient } from "@/services/http/apiClient";
import { mockDelay } from "@/services/mock/mockDelay";
import type { AIInsights } from "@/types";

export interface IAIService {
  getInsights(): Promise<AIInsights>;
}

const mockInsights: AIInsights = {
  topSkills: [
    { skill: "Python", demandPercentage: 92 },
    { skill: "Django", demandPercentage: 78 },
    { skill: "SQL", demandPercentage: 70 },
    { skill: "Docker", demandPercentage: 64 },
    { skill: "AWS", demandPercentage: 48 },
  ],
  missingSkills: [
    { skill: "Kubernetes", demandPercentage: 65 },
    { skill: "Cloud Security", demandPercentage: 58 },
    { skill: "Power BI", demandPercentage: 40 },
  ],
  talentAvailabilityByArea: [
    { area: "Tecnología", availability: 72 },
    { area: "Riesgos", availability: 58 },
    { area: "Operaciones", availability: 81 },
  ],
  hardToFillAreas: ["Ciberseguridad", "Arquitectura Cloud"],
  narrative:
    "Se detectó una alta concentración de candidatos con experiencia en Python y Django, mientras que las habilidades en la nube (AWS, Kubernetes) siguen siendo un factor diferenciador escaso en el mercado actual.",
};

const mockAIService: IAIService = {
  async getInsights() {
    await mockDelay();
    return mockInsights;
  },
};

// POST /api/ai/analyze/ (este endpoint agregado de insights se expondrá a futuro)
const realAIService: IAIService = {
  async getInsights() {
    const { data } = await apiClient.get("/ai/insights/");
    return data;
  },
};

export const aiService: IAIService = env.useMocks ? mockAIService : realAIService;
