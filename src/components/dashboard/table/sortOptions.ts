import type { SortingState } from "@tanstack/react-table";

export const PRODUCT_SORT_OPTIONS = [
  "Stock (mayor a menor)",
  "Alfabético",
  "Más recientes",
] as const;

export type ProductSortOption = (typeof PRODUCT_SORT_OPTIONS)[number];

export function sortOptionToSortingState(option: string): SortingState {
  if (option === "Alfabético") return [{ id: "name", desc: false }];
  if (option === "Más recientes") return [{ id: "addedAt", desc: true }];
  return [{ id: "stockUnits", desc: true }];
}
