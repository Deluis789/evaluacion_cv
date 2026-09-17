import { Badge } from "@/components/ui/Badge";
import type { CandidateStatus } from "@/types";

const config: Record<CandidateStatus, { label: string; tone: "success" | "neutral" | "warning" | "brand" | "danger" }> = {
  PENDING: { label: "Pendiente", tone: "neutral" },
  IN_REVIEW: { label: "En evaluación", tone: "warning" },
  EVALUATED: { label: "Evaluado", tone: "brand" },
  RECOMMENDED: { label: "Recomendado", tone: "success" },
  NOT_RECOMMENDED: { label: "No recomendado", tone: "danger" },
};

export function CandidateStatusBadge({ status }: { status: CandidateStatus }) {
  const c = config[status];
  return <Badge tone={c.tone}>{c.label}</Badge>;
}
