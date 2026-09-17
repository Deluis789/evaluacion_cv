import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export type ScoreTier = "excellent" | "high" | "moderate" | "low";

export function getScoreTier(score: number): ScoreTier {
  if (score >= 90) return "excellent";
  if (score >= 75) return "high";
  if (score >= 60) return "moderate";
  return "low";
}

export const scoreTierLabel: Record<ScoreTier, string> = {
  excellent: "Excelente",
  high: "Alto",
  moderate: "Moderado",
  low: "Bajo",
};

export const scoreTierColor: Record<
  ScoreTier,
  { text: string; bg: string; ring: string; glow: string }
> = {
  excellent: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    ring: "#34D399",
    glow: "shadow-[0_0_16px_-2px_rgba(52,211,153,0.5)]",
  },
  high: {
    text: "text-accent-300",
    bg: "bg-accent-500/10",
    ring: "#2DD4E8",
    glow: "shadow-[0_0_16px_-2px_rgba(45,212,232,0.5)]",
  },
  moderate: {
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    ring: "#FBBF24",
    glow: "shadow-[0_0_14px_-2px_rgba(251,191,36,0.45)]",
  },
  low: {
    text: "text-rose-300",
    bg: "bg-rose-500/10",
    ring: "#FB7185",
    glow: "shadow-[0_0_14px_-2px_rgba(251,113,133,0.4)]",
  },
};

export function initials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
