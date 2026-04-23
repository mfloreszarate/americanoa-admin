import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  type Row,
  type SortingState,
  type Table,
} from "@tanstack/react-table";
import {
  DataTablePagination,
} from "@/components/ui/data-table/DataTablePagination";
import {
  DataTableToolbar,
  type DataTableChipOption,
} from "@/components/ui/data-table/DataTableToolbar";

export type { DataTableChipOption };

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  getRowId?: (originalRow: TData, index: number) => string;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  globalFilterFn: FilterFn<TData>;
  /** Optional multi-value filter rendered as chips (single column, OR semantics). */
  chipFilter?: {
    columnId: string;
    chips: DataTableChipOption[];
  };
  sortOptions: readonly string[];
  defaultSortOption: string;
  mapSortToSortingState: (option: string) => SortingState;
  pageSize?: number;
  renderHeader: (ctx: { table: Table<TData> }) => ReactNode;
  renderRow: (row: Row<TData>) => ReactNode;
  emptyMessage?: string;
  className?: string;
  filtersButtonTitle?: string;
  /** When the visible header has more columns than TanStack leaf columns (e.g. actions column). */
  tableColumnCount?: number;
  /** Extra classes on `<table>` (e.g. `table-fixed` for column width control). */
  tableClassName?: string;
  /** Placeholder for the toolbar search field. */
  searchPlaceholder?: string;
  /** When false, hides the toolbar “Ordenar por” select (column header sorting only). */
  showSortSelect?: boolean;
}

export function DataTable<TData>({
  data,
  columns,
  getRowId,
  globalFilter,
  onGlobalFilterChange,
  globalFilterFn,
  chipFilter,
  sortOptions,
  defaultSortOption,
  mapSortToSortingState,
  pageSize = 10,
  renderHeader,
  renderRow,
  emptyMessage = "No hay resultados con los filtros actuales.",
  className = "",
  filtersButtonTitle,
  tableColumnCount,
  tableClassName = "",
  searchPlaceholder,
  showSortSelect = true,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>(() =>
    mapSortToSortingState(defaultSortOption),
  );
  const [sortValue, setSortValue] = useState(defaultSortOption);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize });
  }, [pageSize]);

  const selectedChipValues = useMemo(() => {
    if (!chipFilter) return [];
    const raw = columnFilters.find((f) => f.id === chipFilter.columnId)?.value;
    return (raw as string[] | undefined) ?? [];
  }, [columnFilters, chipFilter]);

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onGlobalFilterChange: (updater) => {
      const next =
        typeof updater === "function"
          ? (updater as (prev: string) => string)(globalFilter)
          : updater;
      onGlobalFilterChange(String(next ?? ""));
    },
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setPagination((p) =>
      p.pageIndex === 0 ? p : { ...p, pageIndex: 0 },
    );
  }, [globalFilter, sorting]);

  function toggleChipFilter(value: string) {
    if (!chipFilter) return;
    const columnId = chipFilter.columnId;
    setColumnFilters((prev) => {
      const rest = prev.filter((f) => f.id !== columnId);
      const current =
        (prev.find((f) => f.id === columnId)?.value as string[] | undefined) ??
        [];
      const next = current.includes(value)
        ? current.filter((c) => c !== value)
        : [...current, value];
      if (next.length === 0) return rest;
      return [...rest, { id: columnId, value: next }];
    });
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }

  function handleSortChange(value: string) {
    setSortValue(value);
    setSorting(mapSortToSortingState(value));
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }

  function handleResetFilters() {
    setColumnFilters([]);
    onGlobalFilterChange("");
    setSortValue(defaultSortOption);
    setSorting(mapSortToSortingState(defaultSortOption));
    setPagination({ pageIndex: 0, pageSize });
  }

  const rows = table.getRowModel().rows;
  const emptyColSpan =
    tableColumnCount ?? table.getAllLeafColumns().length;

  return (
    <div
      className={`overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm ${className}`.trim()}
    >
      <DataTableToolbar
        selectedChipValues={selectedChipValues}
        onToggleChip={toggleChipFilter}
        chipOptions={chipFilter?.chips}
        sortOptions={sortOptions}
        sortValue={sortValue}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
        filtersButtonTitle={filtersButtonTitle}
        searchValue={globalFilter}
        onSearchChange={(value) => onGlobalFilterChange(value)}
        searchPlaceholder={searchPlaceholder}
        showSortSelect={showSortSelect}
      />
      <div className="overflow-x-auto">
        <table
          className={`w-full border-collapse text-left ${tableClassName}`.trim()}
        >
          <thead className="bg-surface-container-low text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            <tr>{renderHeader({ table })}</tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(1, emptyColSpan)}
                  className="px-4 py-8 text-center text-xs text-on-surface-variant"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => renderRow(row))
            )}
          </tbody>
        </table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
