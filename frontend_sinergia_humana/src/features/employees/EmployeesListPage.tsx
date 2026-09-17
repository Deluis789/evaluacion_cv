import { useEmployees } from "@/hooks/useDomainData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { Avatar } from "@/components/ui/Avatar";
import { CardSkeleton } from "@/components/ui/States";
import { initials } from "@/lib/utils";

export function EmployeesListPage() {
  const { data: employees, isLoading } = useEmployees();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Empleados de referencia</h1>
        <p className="text-sm text-slate-500">
          Empleados internos utilizados como referencia para el algoritmo de comparación.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

        {employees?.map((e) => (
          <Card key={e.id}>
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar initials={initials(e.firstName, e.lastName)} />
                <div>
                  <p className="font-medium text-slate-100">
                    {e.firstName} {e.lastName}
                  </p>
                  <p className="text-xs text-slate-400">{e.role}</p>
                </div>
              </div>
              {e.performance.isHighPerformer && <Badge tone="success">Alto rendimiento</Badge>}
            </div>
            <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
              <span>{e.area}</span>
              <span>{e.experienceYears} años exp.</span>
            </div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {e.skills.slice(0, 4).map((s) => (
                <Badge key={s} tone="neutral">
                  {s}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs text-slate-400">Performance</span>
              <ScoreBadge score={e.performance.score} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
