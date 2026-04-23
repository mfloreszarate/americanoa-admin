import { useState } from "react";
import { PageHero } from "@/components/dashboard/PageHero";
import { ProductsPanel } from "@/components/dashboard/ProductsPanel";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { NewProductModal } from "@/components/product/NewProductModal";
import { sampleProducts } from "@/data/products";
import { SummaryBentoGrid } from "./summary/SummaryBentoGrid";

export function DashboardPage() {
  const [productSearch, setProductSearch] = useState("");
  const [newProductOpen, setNewProductOpen] = useState(false);

  return (
    <>
      <TopNavBar searchDisabled searchPlaceholder="Buscar en la tabla de productos" />
      <main className="min-h-screen bg-surface p-8 pt-24">
        <PageHero
          title="Productos"
          actionLabel="Nuevo Producto"
          onActionClick={() => setNewProductOpen(true)}
        />
        <SummaryBentoGrid />
        <ProductsPanel
          products={sampleProducts}
          searchQuery={productSearch}
          onSearchQueryChange={setProductSearch}
        />
      </main>
      <NewProductModal open={newProductOpen} onOpenChange={setNewProductOpen} />
    </>
  );
}
