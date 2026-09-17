import { useQuery } from "@tanstack/react-query";
import { evaluationService } from "@/services/api/evaluationService";

export function useEvaluations() {
  return useQuery({ queryKey: ["evaluations"], queryFn: () => evaluationService.list() });
}

export function useEvaluation(id?: string) {
  return useQuery({
    queryKey: ["evaluations", id],
    queryFn: () => evaluationService.getById(id!),
    enabled: !!id,
  });
}

export function useEvaluationByCandidate(candidateId?: string) {
  return useQuery({
    queryKey: ["evaluations", "by-candidate", candidateId],
    queryFn: () => evaluationService.getByCandidateId(candidateId!),
    enabled: !!candidateId,
  });
}
