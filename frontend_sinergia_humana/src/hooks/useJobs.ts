import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobService, type CreateJobPayload } from "@/services/api/jobService";

const JOBS_KEY = ["jobs"];

export function useJobs() {
  return useQuery({ queryKey: JOBS_KEY, queryFn: () => jobService.list() });
}

export function useJob(id?: string) {
  return useQuery({
    queryKey: [...JOBS_KEY, id],
    queryFn: () => jobService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateJobPayload) => jobService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: JOBS_KEY }),
  });
}
