import { useMemo, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export type SortDirection = "asc" | "desc";

export interface TableSorting {
  sortBy: string;
  sortDir: SortDirection;
}

export type PaginatedTableQuery<TFilters extends Record<string, unknown>> =
  TFilters & {
    search: string;
    page: number;
    pageSize: number;
    sortBy: string;
    sortDir: SortDirection;
  };

interface UsePaginatedTableOptions<TFilters extends Record<string, unknown>> {
  initialFilters: TFilters;
  initialSorting: TableSorting;
  initialPage?: number;
  initialPageSize?: number;
  searchDebounceMs?: number;
}

type StateUpdater<T> = T | ((current: T) => T);

export function usePaginatedTable<TFilters extends Record<string, unknown>>({
  initialFilters,
  initialSorting,
  initialPage = 1,
  initialPageSize = 10,
  searchDebounceMs = 350,
}: UsePaginatedTableOptions<TFilters>) {
  const [search, setSearchValue] = useState("");
  const [page, setPageValue] = useState(initialPage);
  const [pageSize, setPageSizeValue] = useState(initialPageSize);
  const [sorting, setSortingValue] = useState<TableSorting>(initialSorting);
  const [filters, setFiltersValue] = useState<TFilters>(initialFilters);
  const debouncedSearch = useDebouncedValue(search, searchDebounceMs);

  const resetPage = () => setPageValue(initialPage);

  const setSearch = (value: string) => {
    setSearchValue(value);
    resetPage();
  };

  const setPageSize = (value: number) => {
    setPageSizeValue(value);
    resetPage();
  };

  const setSorting = (value: TableSorting) => {
    setSortingValue(value);
    resetPage();
  };

  const setFilters = (updater: StateUpdater<TFilters>) => {
    setFiltersValue((current) =>
      typeof updater === "function"
        ? (updater as (current: TFilters) => TFilters)(current)
        : updater,
    );
    resetPage();
  };

  const reset = () => {
    setSearchValue("");
    setPageValue(initialPage);
    setPageSizeValue(initialPageSize);
    setSortingValue(initialSorting);
    setFiltersValue(initialFilters);
  };

  const query = useMemo<PaginatedTableQuery<TFilters>>(
    () => ({
      ...filters,
      search: debouncedSearch,
      page,
      pageSize,
      sortBy: sorting.sortBy,
      sortDir: sorting.sortDir,
    }),
    [debouncedSearch, filters, page, pageSize, sorting.sortBy, sorting.sortDir],
  );

  return {
    search,
    debouncedSearch,
    setSearch,
    page,
    setPage: setPageValue,
    pageSize,
    setPageSize,
    sorting,
    setSorting,
    filters,
    setFilters,
    query,
    reset,
  };
}
