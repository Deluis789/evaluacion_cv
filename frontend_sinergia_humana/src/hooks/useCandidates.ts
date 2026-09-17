import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { candidateService, type CreateCandidatePayload } from "@/services/api/candidateService";

const CANDIDATES_KEY = ["candidates"];

export function useCandidates() {
  return useQuery({ queryKey: CANDIDATES_KEY, queryFn: () => candidateService.list() });
}

export function useCandidate(id?: string) {
  return useQuery({
    queryKey: [...CANDIDATES_KEY, id],
    queryFn: () => candidateService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCandidatePayload) => candidateService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CANDIDATES_KEY }),
  });
}

export function useUploadCv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ candidateId, file }: { candidateId: string; file: File }) =>
      candidateService.uploadCv(candidateId, file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CANDIDATES_KEY }),
  });
}

export function useAnalyzeCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (candidateId: string) => candidateService.analyze(candidateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CANDIDATES_KEY });
      queryClient.invalidateQueries({ queryKey: ["evaluations"] });
      queryClient.invalidateQueries({ queryKey: ["rankings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
