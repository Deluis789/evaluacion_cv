import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ClipboardCheck,
  Trophy,
  UserCog,
  Sparkles,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const groups: NavGroup[] = [
  { items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] },
  {
    title: "Talento",
    items: [
      { to: "/candidates", label: "Candidatos", icon: Users },
      { to: "/employees", label: "Empleados", icon: UserCog },
      { to: "/evaluations", label: "Evaluaciones", icon: ClipboardCheck },
      { to: "/rankings", label: "Ranking", icon: Trophy },
    ],
  },
  { title: "Reclutamiento", items: [{ to: "/jobs", label: "Convocatorias", icon: Briefcase }] },
  { title: "Administración", items: [{ to: "/users", label: "Usuarios", icon: UserCog }] },
  { title: "IA", items: [{ to: "/ai-insights", label: "AI Insights", icon: Sparkles }] },
];

export function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }: SidebarProps) {
  const navLinkClass = (isActive: boolean) =>
    cn(
      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all relative",
      isActive
        ? "bg-accent-400/10 text-white ring-1 ring-accent-400/25 shadow-[inset_2px_0_0_0_theme(colors.accent.400)]"
        : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
    );

  const content = (
    <div className="flex h-full flex-col border-r border-white/10 bg-[#070E24]/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && <Logo compact light size={32} />}
        {collapsed && <Logo compact light size={32} />}
        <button
          onClick={onToggle}
          className="hidden rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-slate-200 lg:block"
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group, idx) => (
          <div key={idx} className="mb-5">
            {group.title && !collapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={({ isActive }) => navLinkClass(isActive)}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <NavLink to="/settings" onClick={onCloseMobile} className={({ isActive }) => navLinkClass(isActive)}>
          <Settings className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span>Configuración</span>}
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          "hidden shrink-0 transition-all duration-300 lg:block",
          collapsed ? "w-[76px]" : "w-64"
        )}
      >
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <aside className="absolute left-0 top-0 h-full w-64 animate-slideUp">{content}</aside>
        </div>
      )}
    </>
  );
}
