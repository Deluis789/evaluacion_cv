import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap, Briefcase, Calendar } from "lucide-react";
import { useJob } from "@/hooks/useJobs";
import { useCandidates } from "@/hooks/useCandidates";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { Loading, ErrorState } from "@/components/ui/States";
import { JobStatusBadge } from "./JobStatusBadge";
import { formatDate } from "@/lib/utils";

export function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useJob(id);
  const { data: candidates } = useCandidates();

  if (isLoading) return <Loading label="Cargando convocatoria..." />;
  if (isError || !job) {
    return (
      <ErrorState
        title="No se pudo cargar la convocatoria"
        action={{ label: "Volver a convocatorias", onClick: () => navigate("/jobs") }}
      />
    );
  }

  const jobCandidates = (candidates ?? [])
    .filter((c) => c.jobId === job.id)
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1));

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/jobs")}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a convocatorias
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-white">{job.title}</h1>
            <JobStatusBadge status={job.status} />
          </div>
          <p className="text-sm text-slate-500">{job.area}</p>
        </div>
        {job.averageScore > 0 && (
          <div className="text-right">
            <p className="text-xs text-slate-400">Score promedio</p>
            <ScoreBadge score={job.averageScore} className="text-base" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Descripción del cargo</CardTitle>
          </CardHeader>
          <p className="text-sm leading-relaxed text-slate-400">{job.description}</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Briefcase className="h-4 w-4 text-accent-400" /> {job.minExperienceYears}+ años exp.
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <GraduationCap className="h-4 w-4 text-accent-400" /> {job.educationLevel}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="h-4 w-4 text-accent-400" /> {formatDate(job.createdAt)}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Habilidades obligatorias
            </p>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((s) => (
                <Badge key={s} tone="brand">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          {job.desiredSkills.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Habilidades deseables
              </p>
              <div className="flex flex-wrap gap-2">
                {job.desiredSkills.map((s) => (
                  <Badge key={s} tone="neutral">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ranking de candidatos</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {jobCandidates.length === 0 && (
              <p className="text-sm text-slate-400">Aún no hay candidatos para esta convocatoria.</p>
            )}
            {jobCandidates.map((c, idx) => (
              <div
                key={c.id}
                onClick={() => c.score !== null && navigate(`/evaluations/${c.id}`)}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 px-3 py-2.5 hover:bg-accent-500/10"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 text-center text-xs font-bold text-accent-300">#{idx + 1}</span>
                  <span className="text-sm text-slate-200">
                    {c.firstName} {c.lastName}
                  </span>
                </div>
                {c.score !== null ? <ScoreBadge score={c.score} /> : <Badge tone="neutral">Pendiente</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
