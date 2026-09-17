import { useEffect, useState } from "react";
import { CheckCircle2, FileSearch, Brain, GitCompare, BarChart3, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "CV recibido", icon: FileSearch },
  { label: "Extrayendo información", icon: FileSearch },
  { label: "Analizando habilidades", icon: Brain },
  { label: "Comparando perfil", icon: GitCompare },
  { label: "Generando evaluación", icon: BarChart3 },
  { label: "Evaluación completada", icon: PartyPopper },
];

interface AnalyzingOverlayProps {
  onComplete: () => void;
  stepDurationMs?: number;
}

export function AnalyzingOverlay({ onComplete, stepDurationMs = 700 }: AnalyzingOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length - 1) {
      const timeout = setTimeout(onComplete, 900);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setCurrentStep((s) => s + 1), stepDurationMs);
    return () => clearTimeout(timeout);
  }, [currentStep, onComplete, stepDurationMs]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#040914]/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0A1330] p-8 shadow-panel">
        <div className="mb-6 text-center">
          <h3 className="font-display text-lg font-semibold text-white">Analizando candidato</h3>
          <p className="text-sm text-slate-500">
            Recomendación asistida por IA — este proceso toma unos segundos.
          </p>
        </div>
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isActive = idx === currentStep;
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                  isActive && "bg-accent-500/10 ring-1 ring-accent-400/20",
                  isDone && "opacity-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    isDone
                      ? "bg-emerald-500/15 text-emerald-300"
                      : isActive
                      ? "bg-accent-500/15 text-accent-300 animate-pulseSoft"
                      : "bg-white/[0.05] text-slate-600"
                  )}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isDone
                      ? "text-slate-500 line-through"
                      : isActive
                      ? "text-accent-200"
                      : "text-slate-600"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
