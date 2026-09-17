import type { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "admin@talentai.local",
    firstName: "Sofía",
    lastName: "Administradora",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: "2026-01-15T08:00:00Z",
  },
  {
    id: "user-2",
    email: "reclutador@talentai.local",
    firstName: "Marco",
    lastName: "Reclutador",
    role: "RECRUITER",
    status: "ACTIVE",
    createdAt: "2026-02-20T08:00:00Z",
  },
];
