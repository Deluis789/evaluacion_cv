import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { jobSchema, type JobFormValues } from "@/schemas";
import { useCreateJob } from "@/hooks/useJobs";
import { useToast } from "@/lib/toast";

export function JobFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createJob = useCreateJob();
  const { push } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: { status: "DRAFT", minExperienceYears: 0 },
  });

  const onSubmit = async (values: JobFormValues) => {
    try {
      await createJob.mutateAsync({
        title: values.title,
        area: values.area,
        description: values.description,
        minExperienceYears: values.minExperienceYears,
        requiredSkills: values.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean),
        desiredSkills: (values.desiredSkills ?? "").split(",").map((s) => s.trim()).filter(Boolean),
        educationLevel: values.educationLevel,
        status: values.status,
      });
      push("Convocatoria creada correctamente", "success");
      reset();
      onClose();
    } catch (err: any) {
      push(err?.message ?? "No se pudo crear la convocatoria", "error");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Nueva convocatoria" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Cargo" placeholder="Ej. Backend Developer" error={errors.title?.message} {...register("title")} />
          <Input label="Área" placeholder="Ej. Tecnología" error={errors.area?.message} {...register("area")} />
        </div>
        <Input
          label="Descripción"
          placeholder="Descripción de las funciones del cargo"
          error={errors.description?.message}
          {...register("description")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Experiencia mínima (años)"
            type="number"
            min={0}
            error={errors.minExperienceYears?.message}
            {...register("minExperienceYears")}
          />
          <Input
            label="Nivel educativo"
            placeholder="Ej. Ingeniería en Sistemas"
            error={errors.educationLevel?.message}
            {...register("educationLevel")}
          />
        </div>
        <Input
          label="Habilidades obligatorias (separadas por coma)"
          placeholder="Python, Django, PostgreSQL"
          error={errors.requiredSkills?.message}
          {...register("requiredSkills")}
        />
        <Input
          label="Habilidades deseables (separadas por coma)"
          placeholder="Docker, AWS"
          {...register("desiredSkills")}
        />
        <Select label="Estado" error={errors.status?.message} {...register("status")}>
          <option value="DRAFT">Borrador</option>
          <option value="ACTIVE">Activa</option>
          <option value="CLOSED">Cerrada</option>
        </Select>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Crear convocatoria
          </Button>
        </div>
      </form>
    </Modal>
  );
}
