import { useEffect, useState } from "react";
import { getScoreTier, scoreTierColor, scoreTierLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export function ScoreRing({
  score,
  size = 160,
  strokeWidth = 12,
  showLabel = true,
  className,
}: ScoreRingProps) {
  const [displayed, setDisplayed] = useState(0);
  const tier = getScoreTier(score);
  const colors = scoreTierColor[tier];

  useEffect(() => {
    let raf: number;
    const duration = 900;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - displayed / 100);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90 drop-shadow-[0_0_18px_rgba(45,212,232,0.25)]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.ring}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.2s linear" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold text-white">{displayed}%</span>
        {showLabel && (
          <span className={cn("mt-1 text-sm font-medium", colors.text)}>
            {scoreTierLabel[tier]}
          </span>
        )}
      </div>
    </div>
  );
}
