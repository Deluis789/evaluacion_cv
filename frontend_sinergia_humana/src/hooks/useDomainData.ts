import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "@/services/api/employeeService";
import { rankingService } from "@/services/api/rankingService";
import { aiService } from "@/services/api/aiService";
import { dashboardService } from "@/services/api/dashboardService";
import { userService, type CreateUserPayload } from "@/services/api/userService";

export function useEmployees() {
  return useQuery({ queryKey: ["employees"], queryFn: () => employeeService.list() });
}

export function useRankings() {
  return useQuery({ queryKey: ["rankings"], queryFn: () => rankingService.list() });
}

export function useAIInsights() {
  return useQuery({ queryKey: ["ai-insights"], queryFn: () => aiService.getInsights() });
}

export function useDashboardSummary() {
  return useQuery({ queryKey: ["dashboard"], queryFn: () => dashboardService.getSummary() });
}

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: () => userService.list() });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => userService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
