import { getScoreTier, scoreTierColor, scoreTierLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const tier = getScoreTier(score);
  const colors = scoreTierColor[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-semibold tabular-nums",
        colors.bg,
        colors.text,
        colors.glow,
        className
      )}
      title={scoreTierLabel[tier]}
    >
      {score}%
    </span>
  );
}
