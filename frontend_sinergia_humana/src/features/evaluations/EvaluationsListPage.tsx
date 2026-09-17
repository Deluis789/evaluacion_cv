import { useNavigate } from "react-router-dom";
import { useEvaluations } from "@/hooks/useEvaluations";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { formatDate } from "@/lib/utils";
import type { Evaluation } from "@/types";

export function EvaluationsListPage() {
  const { data: evaluations, isLoading } = useEvaluations();
  const navigate = useNavigate();

  const columns: Column<Evaluation>[] = [
    { header: "Candidato", accessor: (e) => <span className="font-medium text-slate-100">{e.candidateName}</span> },
    { header: "Convocatoria", accessor: (e) => e.jobTitle },
    { header: "Score final", accessor: (e) => <ScoreBadge score={e.finalScore} /> },
    { header: "Recomendación", accessor: (e) => e.recommendation },
    { header: "Fecha", accessor: (e) => formatDate(e.createdAt) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Evaluaciones</h1>
        <p className="text-sm text-slate-500">Historial de evaluaciones generadas por el motor de IA.</p>
      </div>

      <DataTable
        columns={columns}
        data={evaluations ?? []}
        isLoading={isLoading}
        rowKey={(e) => e.id}
        onRowClick={(e) => navigate(`/evaluations/${e.candidateId}`)}
        emptyTitle="Aún no hay evaluaciones registradas"
      />
    </div>
  );
}
