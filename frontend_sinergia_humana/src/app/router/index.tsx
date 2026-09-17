import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/LoginPage";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { JobsListPage } from "@/features/jobs/JobsListPage";
import { JobDetailPage } from "@/features/jobs/JobDetailPage";
import { CandidatesListPage } from "@/features/candidates/CandidatesListPage";
import { NewCandidatePage } from "@/features/candidates/NewCandidatePage";
import { EvaluationsListPage } from "@/features/evaluations/EvaluationsListPage";
import { EvaluationDetailPage } from "@/features/evaluations/EvaluationDetailPage";
import { RankingsPage } from "@/features/rankings/RankingsPage";
import { EmployeesListPage } from "@/features/employees/EmployeesListPage";
import { UsersListPage } from "@/features/users/UsersListPage";
import { AIInsightsPage } from "@/features/ai/AIInsightsPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <LoginPage /> },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/jobs", element: <JobsListPage /> },
      { path: "/jobs/:id", element: <JobDetailPage /> },
      { path: "/candidates", element: <CandidatesListPage /> },
      { path: "/candidates/new", element: <NewCandidatePage /> },
      { path: "/evaluations", element: <EvaluationsListPage /> },
      { path: "/evaluations/:id", element: <EvaluationDetailPage /> },
      { path: "/rankings", element: <RankingsPage /> },
      { path: "/employees", element: <EmployeesListPage /> },
      { path: "/users", element: <UsersListPage /> },
      { path: "/ai-insights", element: <AIInsightsPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
