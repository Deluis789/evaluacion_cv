import { Loader2, Inbox, AlertTriangle, type LucideIcon } from "lucide-react";
import { Button } from "./Button";

export function Loading({ label = "Cargando..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
      <Loader2 className="h-8 w-8 animate-spin text-accent-400" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

interface StateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ title, description, icon: Icon = Inbox, action }: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center backdrop-blur-sm">
      <div className="rounded-full bg-accent-500/10 p-3 ring-1 ring-accent-400/20">
        <Icon className="h-6 w-6 text-accent-300" />
      </div>
      <p className="text-sm font-medium text-slate-200">{title}</p>
      {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
      {action && (
        <Button size="sm" onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({ title, description, action }: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] py-16 text-center backdrop-blur-sm">
      <div className="rounded-full bg-rose-500/10 p-3 ring-1 ring-rose-400/20">
        <AlertTriangle className="h-6 w-6 text-rose-300" />
      </div>
      <p className="text-sm font-medium text-slate-200">{title}</p>
      {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
      {action && (
        <Button size="sm" variant="outline" onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer rounded-md bg-[linear-gradient(110deg,rgba(255,255,255,0.04)_8%,rgba(255,255,255,0.09)_18%,rgba(255,255,255,0.04)_33%)] bg-[length:200%_100%] ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <Skeleton className="mb-3 h-3 w-24" />
      <Skeleton className="mb-2 h-7 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
