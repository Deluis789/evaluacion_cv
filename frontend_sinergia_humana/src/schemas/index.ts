import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El email es obligatorio").email("Ingresa un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  remember: z.boolean().optional(),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const jobSchema = z.object({
  title: z.string().min(3, "El cargo es obligatorio"),
  area: z.string().min(2, "El área es obligatoria"),
  description: z.string().min(10, "Agrega una descripción más detallada"),
  minExperienceYears: z.coerce.number().min(0, "Debe ser 0 o más"),
  requiredSkills: z.string().min(2, "Ingresa al menos una habilidad obligatoria"),
  desiredSkills: z.string().optional(),
  educationLevel: z.string().min(2, "El nivel educativo es obligatorio"),
  status: z.enum(["ACTIVE", "CLOSED", "DRAFT"]),
});
export type JobFormValues = z.infer<typeof jobSchema>;

export const candidateSchema = z.object({
  firstName: z.string().min(2, "El nombre es obligatorio"),
  lastName: z.string().min(2, "El apellido es obligatorio"),
  email: z.string().email("Ingresa un email válido"),
  jobId: z.string().min(1, "Selecciona una convocatoria"),
  experienceYears: z.coerce.number().min(0, "Debe ser 0 o más"),
});
export type CandidateFormValues = z.infer<typeof candidateSchema>;

export const userSchema = z.object({
  firstName: z.string().min(2, "El nombre es obligatorio"),
  lastName: z.string().min(2, "El apellido es obligatorio"),
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["ADMIN", "RECRUITER"]),
});
export type UserFormValues = z.infer<typeof userSchema>;
