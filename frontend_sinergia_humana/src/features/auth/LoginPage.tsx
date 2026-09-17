import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Sparkles, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/schemas";
import { useAuth } from "@/app/providers/AuthProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ParticlesBackground } from "@/components/layout/ParticlesBackground";
import { Logo } from "@/components/layout/Logo";
import { useToast } from "@/lib/toast";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { push } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "admin@talentai.local", password: "", remember: true },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    try {
      await login(values);
      push("Bienvenido a Talent AI", "success");
      navigate("/dashboard");
    } catch (err: any) {
      setFormError(err?.message ?? "No se pudo iniciar sesión.");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_#0B1836_0%,_#070E24_45%,_#040914_100%)] px-4 py-10">
      <ParticlesBackground className="pointer-events-none absolute inset-0 h-full w-full" density={90} speed={1.3} linkDistance={160} />
      <div className="pointer-events-none absolute inset-0 bg-grid-glow opacity-[0.12] [background-size:22px_22px]" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent-500/100/10 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="hidden flex-col gap-6 lg:flex">
          <Logo light size={44} />
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-500/10 px-3 py-1 text-xs font-medium text-accent-300">
              <Sparkles className="h-3.5 w-3.5" /> Acceso institucional
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-white">
              Inteligencia para encontrar
              <span className="block bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                el talento correcto.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-slate-400">
              Evaluación automatizada de talento humano combinando un motor determinístico
              y análisis semántico asistido por IA.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Plataforma institucional de evaluación de talento
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex justify-center lg:hidden">
            <Logo light size={40} />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-panel backdrop-blur-2xl">
            <h2 className="font-display mb-1 text-2xl font-bold text-white">Iniciar sesión</h2>
            <p className="mb-6 text-sm text-slate-400">
              Ingresa tus credenciales para acceder a la plataforma.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <Input
                label="Email"
                type="email"
                placeholder="tu.correo@talentai.local"
                error={errors.email?.message}
                {...register("email")}
              />
              <div className="relative">
                <Input
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-[38px] text-slate-500 hover:text-slate-300"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-400">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-accent-500 focus:ring-accent-400/40"
                    {...register("remember")}
                  />
                  Recordarme
                </label>
                <button type="button" className="font-medium text-accent-300 hover:text-accent-200">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {formError && (
                <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                  {formError}
                </p>
              )}

              <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
                Iniciar sesión <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 rounded-xl border border-accent-400/20 bg-accent-500/5 px-4 py-3 text-xs text-accent-200">
              Demo: <strong className="text-white">admin@talentai.local</strong> /{" "}
              <strong className="text-white">12345678</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
