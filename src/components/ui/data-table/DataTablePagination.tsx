import type { Table as TanStackTable } from "@tanstack/react-table";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const filtered = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const canPrev = table.getCanPreviousPage();
  const canNext = table.getCanNextPage();

  const start = filtered === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, filtered);
  const summary = `Mostrando ${start} a ${end} de ${filtered} resultados`;

  const pageIndices =
    filtered === 0 || pageCount === 0
      ? []
      : Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-low px-4 py-3">
      <span className="text-xs text-on-surface-variant">{summary}</span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => table.previousPage()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest text-outline transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Página anterior"
        >
          <MaterialIcon name="chevron_left" />
        </button>
        {pageIndices.map((i) => {
          const page = i + 1;
          const isActive = pageIndex === i;
          return (
            <button
              key={page}
              type="button"
              onClick={() => table.setPageIndex(i)}
              className={
                isActive
                  ? "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                  : "flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest text-sm font-bold text-on-surface-variant transition-colors hover:text-primary"
              }
              aria-label={`Página ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
        <button
          type="button"
          disabled={!canNext}
          onClick={() => table.nextPage()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest text-outline transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Página siguiente"
        >
          <MaterialIcon name="chevron_right" />
        </button>
      </div>
    </div>
  );
}
