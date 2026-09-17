import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { CandidateStatusBadge } from "./CandidateStatusBadge";
import { useCandidates } from "@/hooks/useCandidates";
import { useJobs } from "@/hooks/useJobs";
import { formatDate } from "@/lib/utils";
import type { Candidate, CandidateStatus } from "@/types";

export function CandidatesListPage() {
  const { data: candidates, isLoading } = useCandidates();
  const { data: jobs } = useJobs();
  const navigate = useNavigate();

  const [jobFilter, setJobFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | CandidateStatus>("all");

  const filtered = useMemo(() => {
    return (candidates ?? []).filter((c) => {
      if (jobFilter !== "all" && c.jobId !== jobFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      return true;
    });
  }, [candidates, jobFilter, statusFilter]);

  const columns: Column<Candidate>[] = [
    {
      header: "Candidato",
      accessor: (c) => (
        <div>
          <p className="font-medium text-slate-100">
            {c.firstName} {c.lastName}
          </p>
          <p className="text-xs text-slate-400">{c.email}</p>
        </div>
      ),
    },
    { header: "Cargo", accessor: (c) => c.jobTitle },
    { header: "Score", accessor: (c) => (c.score !== null ? <ScoreBadge score={c.score} /> : "—") },
    { header: "Estado", accessor: (c) => <CandidateStatusBadge status={c.status} /> },
    { header: "Experiencia", accessor: (c) => `${c.experienceYears} años` },
    { header: "Evaluado", accessor: (c) => (c.evaluatedAt ? formatDate(c.evaluatedAt) : "—") },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Candidatos</h1>
          <p className="text-sm text-slate-500">Gestiona y evalúa a los candidatos del proceso.</p>
        </div>
        <Button onClick={() => navigate("/candidates/new")}>
          <Plus className="h-4 w-4" /> Nuevo candidato
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)} className="w-56">
          <option value="all">Todas las convocatorias</option>
          {(jobs ?? []).map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </Select>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="w-52"
        >
          <option value="all">Todos los estados</option>
          <option value="PENDING">Pendiente</option>
          <option value="IN_REVIEW">En evaluación</option>
          <option value="EVALUATED">Evaluado</option>
          <option value="RECOMMENDED">Recomendado</option>
          <option value="NOT_RECOMMENDED">No recomendado</option>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        rowKey={(c) => c.id}
        onRowClick={(c) => c.score !== null && navigate(`/evaluations/${c.id}`)}
        emptyTitle="No hay candidatos que coincidan con los filtros"
      />
    </div>
  );
}
