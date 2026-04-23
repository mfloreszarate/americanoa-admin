import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { multiSelectStringFilter } from "@/components/ui/data-table/multiSelectColumnFilter";
import type { ProductRow } from "@/types/product";

/** Parse "$ 24,50" / "$24,50" style display prices for numeric sort. */
export function priceDisplayToNumber(price: string): number {
  const normalized = price
    .replace(/\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const n = Number.parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
}

/** Columns for sorting, filtering, and row identity; cells stay custom via `DataTable` `renderRow`. */
export function getProductTableColumns(): ColumnDef<ProductRow>[] {
  return [
    { accessorKey: "id", id: "id", header: "ID" },
    { accessorKey: "name", id: "name", header: "Producto" },
    {
      accessorKey: "category",
      id: "category",
      header: "Category",
      filterFn: multiSelectStringFilter as FilterFn<ProductRow>,
    },
    { accessorKey: "laboratory", id: "laboratory", header: "Laboratorio" },
    {
      id: "priceMin",
      accessorFn: (row) => priceDisplayToNumber(row.price),
      header: "Precio Min.",
    },
    {
      id: "priceMay",
      accessorFn: (row) => priceDisplayToNumber(row.price),
      header: "Precio May.",
    },
    { accessorKey: "stockUnits", id: "stockUnits", header: "Stock" },
    { accessorKey: "addedAt", id: "addedAt", header: "Added" },
  ];
}
