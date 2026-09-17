import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, Sparkles, Users2 } from "lucide-react";
import { useEvaluationByCandidate } from "@/hooks/useEvaluations";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Loading, EmptyState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";
import { getScoreTier, scoreTierLabel } from "@/lib/utils";

const breakdownLabels: Record<string, string> = {
  experience: "Experiencia",
  skills: "Habilidades",
  education: "Educación",
  compatibility: "Compatibilidad",
  profile: "Perfil",
};

export function EvaluationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: evaluation, isLoading } = useEvaluationByCandidate(id);

  if (isLoading) return <Loading label="Cargando evaluación..." />;

  if (!evaluation) {
    return (
      <EmptyState
        title="Evaluación no encontrada"
        description="Este candidato aún no cuenta con una evaluación generada."
        action={{ label: "Volver a candidatos", onClick: () => navigate("/candidates") }}
      />
    );
  }

  const tier = getScoreTier(evaluation.finalScore);

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/candidates")}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a candidatos
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{evaluation.candidateName}</h1>
          <p className="text-sm text-slate-500">{evaluation.jobTitle}</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/rankings")}>
          <Users2 className="h-4 w-4" /> Ver comparación con empleados
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center gap-2 lg:col-span-1">
          <ScoreRing score={evaluation.finalScore} />
          <p className="text-sm text-slate-500">{scoreTierLabel[tier]} compatibilidad</p>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Score por criterio</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {Object.entries(evaluation.breakdown).map(([key, value]) => (
              <Progress key={key} label={breakdownLabels[key] ?? key} value={value} />
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fortalezas</CardTitle>
          </CardHeader>
          <ul className="space-y-2">
            {evaluation.strengths.length === 0 && (
              <p className="text-sm text-slate-400">Sin fortalezas destacadas registradas.</p>
            )}
            {evaluation.strengths.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" /> {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brechas</CardTitle>
          </CardHeader>
          <ul className="space-y-2">
            {evaluation.gaps.length === 0 && (
              <p className="text-sm text-slate-400">No se detectaron brechas relevantes.</p>
            )}
            {evaluation.gaps.map((g) => (
              <li key={g} className="flex items-center gap-2 text-sm text-slate-200">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" /> {g}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="border-accent-400/20 bg-accent-500/10">
        <CardHeader>
          <CardTitle>Recomendación</CardTitle>
        </CardHeader>
        <p className="text-sm font-medium text-accent-200">{evaluation.recommendation}</p>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-400" />
            <CardTitle>AI Analysis</CardTitle>
          </div>
          <Badge tone="brand">Recomendación asistida por IA</Badge>
        </CardHeader>
        <div className="mb-3 flex flex-wrap gap-6 text-sm">
          <div>
            <p className="text-xs text-slate-400">AI Provider</p>
            <p className="font-medium text-slate-200">{evaluation.aiAnalysis.provider}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Confidence</p>
            <p className="font-medium text-slate-200">{evaluation.aiAnalysis.confidence}%</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-400">{evaluation.aiAnalysis.summary}</p>
      </Card>
    </div>
  );
}
