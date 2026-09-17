import { Users, Briefcase, ClipboardCheck, Star, Sparkles, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { CardSkeleton } from "@/components/ui/States";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { Avatar } from "@/components/ui/Avatar";
import { useDashboardSummary } from "@/hooks/useDomainData";
import { useCandidates } from "@/hooks/useCandidates";
import {
  ScoreDistributionChart,
  CandidatesByJobChart,
  EvaluationsTrendChart,
  CompatibilityDonut,
} from "@/components/charts/DashboardCharts";
import { initials, cn } from "@/lib/utils";

type KpiTone = "accent" | "emerald" | "amber" | "rose";

const kpiToneClasses: Record<KpiTone, { chip: string; icon: string; glow: string }> = {
  accent: { chip: "bg-accent-500/10 ring-1 ring-accent-400/25", icon: "text-accent-300", glow: "bg-accent-400/10" },
  emerald: { chip: "bg-emerald-500/10 ring-1 ring-emerald-400/25", icon: "text-emerald-300", glow: "bg-emerald-400/10" },
  amber: { chip: "bg-amber-500/10 ring-1 ring-amber-400/25", icon: "text-amber-300", glow: "bg-amber-400/10" },
  rose: { chip: "bg-rose-500/10 ring-1 ring-rose-400/25", icon: "text-rose-300", glow: "bg-rose-400/10" },
};

interface KpiCardProps {
  label: string;
  value: number;
  icon: typeof Users;
  tone: KpiTone;
}

function KpiCard({ label, value, icon: Icon, tone }: KpiCardProps) {
  const t = kpiToneClasses[tone];
  return (
    <Card className="relative overflow-hidden">
      <div className={cn("absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl", t.glow)} />
      <div className={cn("relative flex h-10 w-10 items-center justify-center rounded-xl", t.chip)}>
        <Icon className={cn("h-5 w-5", t.icon)} />
      </div>
      <p className="relative mt-4 font-display text-3xl font-bold text-white">{value}</p>
      <p className="relative text-sm text-slate-500">{label}</p>
    </Card>
  );
}

export function DashboardPage() {
  const { data: summary, isLoading } = useDashboardSummary();
  const { data: candidates } = useCandidates();

  const topTalent = (candidates ?? [])
    .filter((c) => c.score !== null)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-500">Panorama general del proceso de evaluación de talento.</p>
      </div>

      {isLoading || !summary ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total candidatos" value={summary.kpis.totalCandidates} icon={Users} tone="accent" />
          <KpiCard label="Convocatorias activas" value={summary.kpis.activeJobs} icon={Briefcase} tone="emerald" />
          <KpiCard label="Evaluaciones realizadas" value={summary.kpis.evaluationsCompleted} icon={ClipboardCheck} tone="amber" />
          <KpiCard label="Candidatos destacados" value={summary.kpis.standoutCandidates} icon={Star} tone="rose" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de candidatos por score</CardTitle>
          </CardHeader>
          {summary && <ScoreDistributionChart data={summary.scoreDistribution} />}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Candidatos por convocatoria</CardTitle>
          </CardHeader>
          {summary && <CandidatesByJobChart data={summary.candidatesByJob} />}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Evolución de evaluaciones</CardTitle>
          </CardHeader>
          {summary && <EvaluationsTrendChart data={summary.evaluationsTrend} />}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribución de compatibilidad</CardTitle>
          </CardHeader>
          {summary && <CompatibilityDonut data={summary.scoreDistribution} />}
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Talent</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {topTalent.map((c, idx) => (
              <div
                key={c.id}
                className="flex items-center gap-3 rounded-xl border border-white/5 p-3 transition-colors hover:border-accent-400/20 hover:bg-accent-500/[0.05]"
              >
                <span className="w-5 text-center font-display text-sm font-bold text-accent-300">#{idx + 1}</span>
                <Avatar initials={initials(c.firstName, c.lastName)} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-100">
                    {c.firstName} {c.lastName}
                  </p>
                  <p className="text-xs text-slate-500">{c.jobTitle}</p>
                </div>
                <ScoreBadge score={c.score ?? 0} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="relative overflow-hidden border-accent-400/20 bg-gradient-to-br from-brand-800 via-brand-900 to-[#040914]">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-400/10 blur-3xl" />
          <div className="relative mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-300" />
            <h3 className="font-display text-base font-semibold text-white">AI Insights</h3>
          </div>
          <p className="relative text-sm text-slate-300">
            Se detectó una alta concentración de candidatos con experiencia en Python y Django.
          </p>
          <a
            href="/ai-insights"
            className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-300 hover:text-accent-200"
          >
            Ver análisis completo <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Card>
      </div>
    </div>
  );
}
