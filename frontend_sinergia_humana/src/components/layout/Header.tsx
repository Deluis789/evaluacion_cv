import { useState } from "react";
import { Bell, Menu, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "./Logo";
import { initials } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#070E24]/60 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-slate-200 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center border-l border-white/10 pl-3 sm:pl-4 lg:border-0 lg:pl-0">
          <Logo compact light size={34} />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="relative rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-slate-200"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_6px_1px_rgba(45,212,232,0.8)] ring-2 ring-[#070E24]" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/10"
          >
            <Avatar initials={initials(user.firstName, user.lastName)} size="sm" />
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-tight text-slate-100">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs leading-tight text-slate-500">
                {user.role === "ADMIN" ? "Administrador" : "Reclutador"}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-white/10 bg-[#0A1330]/95 p-1.5 shadow-panel backdrop-blur-xl animate-fadeIn">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/settings");
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
                >
                  <UserIcon className="h-4 w-4" /> Mi perfil
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                    navigate("/login");
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" /> Cerrar sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
