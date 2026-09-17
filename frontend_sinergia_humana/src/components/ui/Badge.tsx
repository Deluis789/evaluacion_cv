import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "brand" | "success" | "warning" | "danger" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-accent-500/10 text-accent-300 ring-1 ring-inset ring-accent-400/30",
  success: "bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/30",
  warning: "bg-amber-500/10 text-amber-300 ring-1 ring-inset ring-amber-400/30",
  danger: "bg-rose-500/10 text-rose-300 ring-1 ring-inset ring-rose-400/30",
  neutral: "bg-white/[0.06] text-slate-300 ring-1 ring-inset ring-white/10",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
