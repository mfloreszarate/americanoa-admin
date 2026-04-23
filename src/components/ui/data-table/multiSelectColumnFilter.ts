import type { FilterFn } from "@tanstack/react-table";

/**
 * Column filter: empty selection shows all rows; otherwise row value must be in the list (OR semantics).
 */
export const multiSelectStringFilter: FilterFn<unknown> = (
  row,
  columnId,
  filterValue,
) => {
  const selected = filterValue as string[] | undefined;
  if (!selected?.length) return true;
  return selected.includes(String(row.getValue(columnId)));
};
