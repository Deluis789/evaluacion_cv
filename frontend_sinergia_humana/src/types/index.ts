// ============================================================
// AUTH / USERS
// ============================================================
export type Role = "ADMIN" | "RECRUITER";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  status: UserStatus;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

// ============================================================
// JOBS (Convocatorias)
// ============================================================
export type JobStatus = "ACTIVE" | "CLOSED" | "DRAFT";

export interface Job {
  id: string;
  title: string;
  area: string;
  description: string;
  minExperienceYears: number;
  requiredSkills: string[];
  desiredSkills: string[];
  educationLevel: string;
  status: JobStatus;
  createdAt: string;
  candidateCount: number;
  averageScore: number;
}

// ============================================================
// EMPLOYEES (Referencia)
// ============================================================
export interface EmployeePerformance {
  score: number;
  isHighPerformer: boolean;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  area: string;
  experienceYears: number;
  skills: string[];
  education: string;
  performance: EmployeePerformance;
}

// ============================================================
// CANDIDATES
// ============================================================
export type CandidateStatus =
  | "PENDING"
  | "IN_REVIEW"
  | "EVALUATED"
  | "RECOMMENDED"
  | "NOT_RECOMMENDED";

export interface CVDocument {
  id: string;
  fileName: string;
  fileSizeKb: number;
  mimeType: string;
  uploadedAt: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobId: string;
  jobTitle: string;
  status: CandidateStatus;
  score: number | null;
  experienceYears: number;
  evaluatedAt: string | null;
  cv?: CVDocument;
}

// ============================================================
// EVALUATIONS
// ============================================================
export interface EvaluationScoreBreakdown {
  experience: number;
  skills: number;
  education: number;
  compatibility: number;
  profile: number;
}

export interface AIAnalysis {
  provider: "Institutional LLM" | "Local LLM";
  confidence: number;
  summary: string;
  isAssisted: true;
}

export interface Evaluation {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  finalScore: number;
  breakdown: EvaluationScoreBreakdown;
  strengths: string[];
  gaps: string[];
  recommendation: string;
  aiAnalysis: AIAnalysis;
  createdAt: string;
}

// ============================================================
// RANKINGS
// ============================================================
export interface RankingEntry {
  position: number;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  score: number;
}

// ============================================================
// AI INSIGHTS
// ============================================================
export interface SkillDemand {
  skill: string;
  demandPercentage: number;
}

export interface AIInsights {
  topSkills: SkillDemand[];
  missingSkills: SkillDemand[];
  talentAvailabilityByArea: { area: string; availability: number }[];
  hardToFillAreas: string[];
  narrative: string;
}

// ============================================================
// DASHBOARD
// ============================================================
export interface DashboardKpis {
  totalCandidates: number;
  activeJobs: number;
  evaluationsCompleted: number;
  standoutCandidates: number;
}

export interface ScoreDistributionBucket {
  range: string;
  count: number;
}

export interface CandidatesByJob {
  jobTitle: string;
  count: number;
}

export interface EvaluationsTrendPoint {
  date: string;
  count: number;
}

// ============================================================
// GENERIC
// ============================================================
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  status?: number;
  fieldErrors?: Record<string, string>;
}
