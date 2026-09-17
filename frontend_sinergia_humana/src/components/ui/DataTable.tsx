import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TableSkeleton } from "./States";
import { EmptyState } from "./States";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  emptyTitle = "No hay datos para mostrar",
  emptyDescription,
  rowKey,
  onRowClick,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
        <TableSkeleton />
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-panel backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="whitespace-nowrap border-b border-white/10 bg-white/[0.02] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-accent-300/80"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={() => onRowClick?.(row)}
                className={cn("group transition-colors", onRowClick && "cursor-pointer")}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={col.header}
                    className={cn(
                      "relative whitespace-nowrap border-b border-white/[0.05] px-5 py-3.5 text-slate-300 transition-colors",
                      "group-hover:bg-accent-400/[0.05] group-hover:text-slate-100",
                      colIdx === 0 &&
                        "before:absolute before:left-0 before:top-1/2 before:h-0 before:w-[3px] before:-translate-y-1/2 before:rounded-r-full before:bg-accent-400 before:shadow-[0_0_10px_1px_rgba(45,212,232,0.6)] before:transition-all before:duration-200 group-hover:before:h-3/5",
                      col.className
                    )}
                  >
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
