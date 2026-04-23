import type { Table } from "@tanstack/react-table";

interface SortableThProps<TData> {
  table: Table<TData>;
  columnId: string;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}

export function SortableTh<TData>({
  table,
  columnId,
  children,
  className = "",
  align = "left",
}: SortableThProps<TData>) {
  const column = table.getColumn(columnId);
  if (!column) {
    return (
      <th scope="col" className={className}>
        {children}
      </th>
    );
  }

  const canSort = column.getCanSort();
  const sortDir = column.getIsSorted();
  const alignClass =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "";

  return (
    <th
      scope="col"
      className={`${className} ${alignClass} ${
        canSort
          ? "cursor-pointer select-none hover:bg-surface-container/80"
          : ""
      }`.trim()}
      aria-sort={
        sortDir === "asc"
          ? "ascending"
          : sortDir === "desc"
            ? "descending"
            : "none"
      }
      onClick={canSort ? column.getToggleSortingHandler() : undefined}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {canSort ? (
          sortDir === "asc" ? (
            <span className="text-primary" aria-hidden>
              ↑
            </span>
          ) : sortDir === "desc" ? (
            <span className="text-primary" aria-hidden>
              ↓
            </span>
          ) : (
            <span className="text-on-surface-variant/40" aria-hidden>
              ↕
            </span>
          )
        ) : null}
      </span>
    </th>
  );
}
