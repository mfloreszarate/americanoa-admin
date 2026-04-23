import type { ProductCategory } from "@/types/product";

interface ProductCategoryBadgeProps {
  category: ProductCategory;
}

const categoryClass: Record<ProductCategory, string> = {
  "Frutos secos": "bg-surface-container-high text-on-surface-variant",
  Semillas: "bg-secondary-fixed text-on-secondary-fixed",
  Suplementos: "bg-tertiary-fixed text-on-tertiary-fixed",
};

export function ProductCategoryBadge({ category }: ProductCategoryBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-tight ${categoryClass[category]}`}
    >
      {category}
    </span>
  );
}
