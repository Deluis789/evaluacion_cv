import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { candidateSchema, type CandidateFormValues } from "@/schemas";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FileUpload } from "@/components/ui/FileUpload";
import { useJobs } from "@/hooks/useJobs";
import { useCreateCandidate, useUploadCv, useAnalyzeCandidate } from "@/hooks/useCandidates";
import { AnalyzingOverlay } from "@/features/cv/AnalyzingOverlay";
import { useToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const STEP_LABELS = ["Convocatoria", "Datos del candidato", "Cargar CV"];

export function NewCandidatePage() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [createdCandidateId, setCreatedCandidateId] = useState<string | null>(null);

  const { data: jobs } = useJobs();
  const createCandidate = useCreateCandidate();
  const uploadCv = useUploadCv();
  const analyzeCandidate = useAnalyzeCandidate();
  const { push } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateSchema),
    defaultValues: { experienceYears: 0 },
  });

  const jobId = watch("jobId");

  const goNext = async () => {
    if (step === 0) {
      const valid = await trigger("jobId");
      if (!valid) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      const valid = await trigger(["firstName", "lastName", "email", "experienceYears"]);
      if (!valid) return;
      setStep(2);
    }
  };

  const onSubmitCandidate = async (values: CandidateFormValues) => {
    if (!file) {
      push("Debes cargar el CV en PDF antes de continuar", "error");
      return;
    }
    try {
      const candidate = await createCandidate.mutateAsync(values);
      setCreatedCandidateId(candidate.id);
      await uploadCv.mutateAsync({ candidateId: candidate.id, file });
      setAnalyzing(true);
    } catch (err: any) {
      push(err?.message ?? "Ocurrió un error al registrar al candidato", "error");
    }
  };

  const handleAnalysisComplete = async () => {
    if (!createdCandidateId) return;
    try {
      await analyzeCandidate.mutateAsync(createdCandidateId);
      navigate(`/evaluations/${createdCandidateId}`);
    } catch (err: any) {
      setAnalyzing(false);
      push(err?.message ?? "Ocurrió un error al analizar al candidato", "error");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button
        onClick={() => navigate("/candidates")}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a candidatos
      </button>

      <div>
        <h1 className="font-display text-2xl font-bold text-white">Nuevo candidato</h1>
        <p className="text-sm text-slate-500">
          Registra al candidato y carga su CV para iniciar la evaluación automática.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {STEP_LABELS.map((label, idx) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                idx <= step
                  ? "bg-gradient-to-br from-accent-400 to-accent-600 text-brand-950 shadow-glow"
                  : "bg-white/10 text-slate-400"
              )}
            >
              {idx + 1}
            </div>
            <span className={cn("hidden text-sm sm:block", idx <= step ? "text-slate-200" : "text-slate-400")}>
              {label}
            </span>
            {idx < STEP_LABELS.length - 1 && <div className="h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmitCandidate)} noValidate>
          {step === 0 && (
            <div className="space-y-4">
              <Select label="Convocatoria" error={errors.jobId?.message} {...register("jobId")}>
                <option value="">Selecciona una convocatoria</option>
                {(jobs ?? [])
                  .filter((j) => j.status === "ACTIVE")
                  .map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} — {j.area}
                    </option>
                  ))}
              </Select>
              {jobId && (
                <p className="text-xs text-slate-400">
                  Continuarás con el registro de los datos del candidato para esta convocatoria.
                </p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Nombre" error={errors.firstName?.message} {...register("firstName")} />
              <Input label="Apellido" error={errors.lastName?.message} {...register("lastName")} />
              <Input label="Email" type="email" className="sm:col-span-2" error={errors.email?.message} {...register("email")} />
              <Input
                label="Años de experiencia"
                type="number"
                min={0}
                error={errors.experienceYears?.message}
                {...register("experienceYears")}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <FileUpload file={file} onFileSelected={setFile} />
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Atrás
            </Button>
            {step < 2 ? (
              <Button type="button" onClick={goNext}>
                Continuar <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                isLoading={createCandidate.isPending || uploadCv.isPending}
                disabled={!file}
              >
                Analizar candidato
              </Button>
            )}
          </div>
        </form>
      </Card>

      {analyzing && <AnalyzingOverlay onComplete={handleAnalysisComplete} />}
    </div>
  );
}
