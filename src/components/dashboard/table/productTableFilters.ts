import type { FilterFn } from "@tanstack/react-table";
import type { ProductRow } from "@/types/product";

export const productGlobalFilterFn: FilterFn<ProductRow> = (
  row,
  _columnId,
  filterValue,
) => {
  const q = String(filterValue ?? "")
    .toLowerCase()
    .trim();
  if (!q) return true;
  const p = row.original;
  const haystack = [
    p.name,
    p.id,
    p.laboratory,
    p.category,
    p.price,
    p.priceUnit,
    p.stockLabel,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
};
