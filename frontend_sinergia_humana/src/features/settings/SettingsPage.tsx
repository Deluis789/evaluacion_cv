import { useAuth } from "@/app/providers/AuthProvider";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { initials } from "@/lib/utils";
import { env } from "@/config/env";

export function SettingsPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Configuración</h1>
        <p className="text-sm text-slate-500">Información de tu cuenta y del entorno actual.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mi perfil</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-4">
          <Avatar initials={initials(user.firstName, user.lastName)} size="lg" />
          <div>
            <p className="font-medium text-slate-100">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-slate-400">{user.email}</p>
            <Badge tone="brand" className="mt-2">
              {user.role === "ADMIN" ? "Administrador" : "Reclutador"}
            </Badge>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Entorno</CardTitle>
        </CardHeader>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Modo de datos</span>
            <Badge tone={env.useMocks ? "warning" : "success"}>
              {env.useMocks ? "Mock data" : "API Django"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">API Base URL</span>
            <span className="font-mono text-xs text-slate-400">{env.apiBaseUrl}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
