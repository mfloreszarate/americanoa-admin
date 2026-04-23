export type ProductCategory = "Semillas" | "Frutos secos" | "Suplementos";

export interface ProductRow {
  id: string;
  name: string;
  // batch: string;
  imageSrc: string;
  imageAlt: string;
  category: ProductCategory;
  price: string;
  priceUnit: string;
  laboratory: string;
  /** 0–100 for bar width */
  stockPercent: number;
  stockLabel: string;
  stockTone: "secondary" | "error";
  /** Numeric stock for sorting */
  stockUnits: number;
  /** ISO date string for "Newest Added" */
  addedAt: string;
}
