import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { useUsers } from "@/hooks/useDomainData";
import { formatDate, initials } from "@/lib/utils";
import { UserFormModal } from "./UserFormModal";
import type { User } from "@/types";

export function UsersListPage() {
  const { data: users, isLoading } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);

  const columns: Column<User>[] = [
    {
      header: "Usuario",
      accessor: (u) => (
        <div className="flex items-center gap-3">
          <Avatar initials={initials(u.firstName, u.lastName)} size="sm" />
          <div>
            <p className="font-medium text-slate-100">
              {u.firstName} {u.lastName}
            </p>
            <p className="text-xs text-slate-400">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Rol",
      accessor: (u) => <Badge tone="brand">{u.role === "ADMIN" ? "Administrador" : "Reclutador"}</Badge>,
    },
    {
      header: "Estado",
      accessor: (u) => <Badge tone={u.status === "ACTIVE" ? "success" : "neutral"}>{u.status === "ACTIVE" ? "Activo" : "Inactivo"}</Badge>,
    },
    { header: "Fecha creación", accessor: (u) => formatDate(u.createdAt) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Usuarios</h1>
          <p className="text-sm text-slate-500">Administra los usuarios internos de la plataforma.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Nuevo usuario
        </Button>
      </div>

      <DataTable columns={columns} data={users ?? []} isLoading={isLoading} rowKey={(u) => u.id} />

      <UserFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
