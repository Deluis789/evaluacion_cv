import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { userSchema, type UserFormValues } from "@/schemas";
import { useCreateUser } from "@/hooks/useDomainData";
import { useToast } from "@/lib/toast";

export function UserFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createUser = useCreateUser();
  const { push } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { role: "RECRUITER" },
  });

  const onSubmit = async (values: UserFormValues) => {
    try {
      await createUser.mutateAsync(values);
      push("Usuario creado correctamente", "success");
      reset();
      onClose();
    } catch (err: any) {
      push(err?.message ?? "No se pudo crear el usuario", "error");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Nuevo usuario">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Nombre" error={errors.firstName?.message} {...register("firstName")} />
          <Input label="Apellido" error={errors.lastName?.message} {...register("lastName")} />
        </div>
        <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
        <Input label="Contraseña" type="password" error={errors.password?.message} {...register("password")} />
        <Select label="Rol" error={errors.role?.message} {...register("role")}>
          <option value="RECRUITER">Reclutador</option>
          <option value="ADMIN">Administrador</option>
        </Select>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Crear usuario
          </Button>
        </div>
      </form>
    </Modal>
  );
}
