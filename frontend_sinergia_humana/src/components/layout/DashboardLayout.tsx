import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ParticlesBackground } from "./ParticlesBackground";

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,_#0B1836_0%,_#070E24_45%,_#040914_100%)]">
      <ParticlesBackground
        className="pointer-events-none absolute inset-0 h-full w-full"
        density={75}
        speed={1.2}
        linkDistance={150}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid-glow opacity-[0.15] [background-size:22px_22px]" />

      <div className="relative z-10 flex h-full w-full">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px] animate-fadeIn">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
