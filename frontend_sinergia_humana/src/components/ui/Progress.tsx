import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  label?: string;
  colorClass?: string;
  className?: string;
}

export function Progress({
  value,
  label,
  colorClass = "bg-gradient-to-r from-accent-400 to-accent-600",
  className,
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-400">
          <span>{label}</span>
          <span className="text-slate-300">{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", colorClass)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
