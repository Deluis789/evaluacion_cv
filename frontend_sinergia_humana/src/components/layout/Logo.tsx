import { cn } from "@/lib/utils";

interface LogoProps {
  compact?: boolean;
  light?: boolean;
  size?: number;
}

/**
 * Logo de la plataforma. Usa /public/logo.svg como imagen — reemplaza ese
 * archivo por tu logo real (mismo nombre) y se actualizará en toda la app
 * sin tocar este componente. También puedes pasar otra extensión (logo.png)
 * ajustando el src de abajo.
 */
export function Logo({ compact = false, light = false, size = 60 }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-950/40 shadow-glow ring-1 ring-white/10"
        style={{ width: size, height: size }}
      >
        <img src="/logoSinergiaBlanco.png" alt="Talent AI" className="h-full w-full object-cover" draggable={false} />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className={cn("text-base font-bold tracking-tight", light ? "text-white" : "text-white")}>
            Sinergia Humana
          </p>
          <p className={cn("text-[11px] font-medium", light ? "text-brand-200" : "text-slate-400")}>
            Plataforma de talento inteligente
          </p>
        </div>
      )}
    </div>
  );
}
