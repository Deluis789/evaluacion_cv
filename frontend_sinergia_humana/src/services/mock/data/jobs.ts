import type { Job } from "@/types";

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Backend Developer",
    area: "Tecnología",
    description:
      "Desarrollo y mantenimiento de microservicios backend para plataformas bancarias digitales.",
    minExperienceYears: 3,
    requiredSkills: ["Python", "Django", "PostgreSQL", "REST API"],
    desiredSkills: ["Docker", "AWS", "Kubernetes"],
    educationLevel: "Ingeniería en Sistemas / Informática",
    status: "ACTIVE",
    createdAt: "2026-06-02T10:00:00Z",
    candidateCount: 6,
    averageScore: 78,
  },
  {
    id: "job-2",
    title: "Analista de Crédito",
    area: "Riesgos",
    description:
      "Evaluación y análisis de solicitudes de crédito, seguimiento de cartera y elaboración de informes de riesgo.",
    minExperienceYears: 2,
    requiredSkills: ["Análisis financiero", "Excel avanzado", "Scoring crediticio"],
    desiredSkills: ["Power BI", "SQL"],
    educationLevel: "Economía / Finanzas / Administración",
    status: "ACTIVE",
    createdAt: "2026-06-10T10:00:00Z",
    candidateCount: 5,
    averageScore: 82,
  },
  {
    id: "job-3",
    title: "Especialista en Ciberseguridad",
    area: "Tecnología",
    description:
      "Monitoreo de infraestructura, gestión de vulnerabilidades y respuesta a incidentes de seguridad.",
    minExperienceYears: 4,
    requiredSkills: ["SIEM", "Redes", "ISO 27001"],
    desiredSkills: ["Ethical Hacking", "Cloud Security"],
    educationLevel: "Ingeniería en Sistemas / Ciberseguridad",
    status: "DRAFT",
    createdAt: "2026-07-01T10:00:00Z",
    candidateCount: 0,
    averageScore: 0,
  },
  {
    id: "job-4",
    title: "Ejecutivo de Atención al Cliente",
    area: "Operaciones",
    description:
      "Atención presencial y telefónica a clientes, apertura de cuentas y resolución de reclamos.",
    minExperienceYears: 1,
    requiredSkills: ["Atención al cliente", "Comunicación efectiva"],
    desiredSkills: ["Inglés intermedio"],
    educationLevel: "Bachiller / Técnico",
    status: "CLOSED",
    createdAt: "2026-04-15T10:00:00Z",
    candidateCount: 8,
    averageScore: 69,
  },
];
