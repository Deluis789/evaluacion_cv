import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div>
      <div className="mb-5 flex gap-1 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              active === tab.id ? "text-accent-300" : "text-slate-500 hover:text-slate-300"
            )}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent-400 shadow-[0_0_8px_1px_rgba(45,212,232,0.6)]" />
            )}
          </button>
        ))}
      </div>
      <div className="animate-fadeIn">{activeTab?.content}</div>
    </div>
  );
}
