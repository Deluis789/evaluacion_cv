import { useMemo, useState } from "react";
import { Trophy } from "lucide-react";
import { useRankings } from "@/hooks/useDomainData";
import { useCandidates } from "@/hooks/useCandidates";
import { useEmployees } from "@/hooks/useDomainData";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Loading, EmptyState } from "@/components/ui/States";
import { CandidateVsReferenceRadar, type RadarDatum } from "@/components/charts/RadarComparisonChart";
import { cn } from "@/lib/utils";

function nameInitials(fullName: string): string {
  const parts = fullName.trim().split(" ");
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts[parts.length - 1]?.charAt(0) ?? "";
  return `${first}${last}`.toUpperCase();
}

export function RankingsPage() {
  const { data: rankings, isLoading } = useRankings();
  const { data: candidates } = useCandidates();
  const { data: employees } = useEmployees();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = (rankings ?? []).find((r) => r.candidateId === selectedId) ?? (rankings ?? [])[0];
  const selectedCandidate = (candidates ?? []).find((c) => c.id === selected?.candidateId);

  const highPerformers = (employees ?? []).filter((e) => e.performance.isHighPerformer);
  const avgReference = (metric: (e: (typeof highPerformers)[number]) => number) =>
    highPerformers.length
      ? Math.round(highPerformers.reduce((sum, e) => sum + metric(e), 0) / highPerformers.length)
      : 0;

  const radarData: RadarDatum[] = useMemo(() => {
    if (!selectedCandidate) return [];
    const score = selectedCandidate.score ?? 0;
    return [
      { metric: "Experiencia", candidato: Math.min(100, selectedCandidate.experienceYears * 15), referencia: avgReference((e) => e.experienceYears * 15) },
      { metric: "Habilidades", candidato: score, referencia: avgReference((e) => e.performance.score) },
      { metric: "Formación", candidato: Math.min(100, score - 5), referencia: 88 },
      { metric: "Score", candidato: score, referencia: avgReference((e) => e.performance.score) },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCandidate, employees]);

  if (isLoading) return <Loading label="Cargando ranking..." />;
  if (!rankings || rankings.length === 0) {
    return <EmptyState title="Aún no hay candidatos evaluados" description="El ranking se generará automáticamente conforme se completen evaluaciones." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Ranking de candidatos</h1>
        <p className="text-sm text-slate-500">
          Comparación de candidatos frente a empleados de alto desempeño.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              <CardTitle>Ranking general</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-2">
            {rankings.map((r) => (
              <button
                key={r.candidateId}
                onClick={() => setSelectedId(r.candidateId)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                  (selected?.candidateId ?? rankings[0].candidateId) === r.candidateId
                    ? "border-accent-400/30 bg-accent-500/10"
                    : "border-transparent hover:bg-white/5"
                )}
              >
                <span className="w-6 text-center text-sm font-bold text-accent-300">#{r.position}</span>
                <Avatar initials={nameInitials(r.candidateName)} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-100">{r.candidateName}</p>
                  <p className="truncate text-xs text-slate-400">{r.jobTitle}</p>
                </div>
                <ScoreBadge score={r.score} />
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Candidato vs empleados de referencia</CardTitle>
          </CardHeader>
          {selectedCandidate ? (
            <CandidateVsReferenceRadar data={radarData} />
          ) : (
            <p className="py-10 text-center text-sm text-slate-400">
              Selecciona un candidato del ranking para ver la comparación.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
