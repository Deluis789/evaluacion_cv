import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { useJobs } from "@/hooks/useJobs";
import { JobStatusBadge } from "./JobStatusBadge";
import { JobFormModal } from "./JobFormModal";
import { formatDate } from "@/lib/utils";
import type { Job } from "@/types";

export function JobsListPage() {
  const { data: jobs, isLoading } = useJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns: Column<Job>[] = [
    { header: "Cargo", accessor: (j) => <span className="font-medium text-slate-100">{j.title}</span> },
    { header: "Área", accessor: (j) => j.area },
    { header: "Estado", accessor: (j) => <JobStatusBadge status={j.status} /> },
    { header: "Candidatos", accessor: (j) => j.candidateCount },
    { header: "Fecha", accessor: (j) => formatDate(j.createdAt) },
    {
      header: "Score promedio",
      accessor: (j) => (j.averageScore > 0 ? <ScoreBadge score={j.averageScore} /> : "—"),
    },
    {
      header: "Acciones",
      accessor: (j) => (
        <Button size="sm" variant="outline" onClick={() => navigate(`/jobs/${j.id}`)}>
          Ver detalle
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Convocatorias</h1>
          <p className="text-sm text-slate-500">Gestiona los procesos de reclutamiento activos.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Nueva convocatoria
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={jobs ?? []}
        isLoading={isLoading}
        rowKey={(j) => j.id}
        onRowClick={(j) => navigate(`/jobs/${j.id}`)}
        emptyTitle="No hay convocatorias registradas"
        emptyDescription="Crea la primera convocatoria para comenzar a recibir candidatos."
      />

      <JobFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
