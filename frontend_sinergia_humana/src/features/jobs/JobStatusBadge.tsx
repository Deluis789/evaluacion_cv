import { Badge } from "@/components/ui/Badge";
import type { JobStatus } from "@/types";

const config: Record<JobStatus, { label: string; tone: "success" | "neutral" | "warning" }> = {
  ACTIVE: { label: "Activa", tone: "success" },
  CLOSED: { label: "Cerrada", tone: "neutral" },
  DRAFT: { label: "Borrador", tone: "warning" },
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const c = config[status];
  return <Badge tone={c.tone}>{c.label}</Badge>;
}
