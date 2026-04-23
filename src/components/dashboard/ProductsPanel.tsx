import { useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { SortableTh } from "@/components/ui/data-table/SortableTh";
import { getProductTableColumns } from "@/components/dashboard/table/productColumns";
import { productGlobalFilterFn } from "@/components/dashboard/table/productTableFilters";
import { ProductTableRow } from "@/components/dashboard/table/ProductTableRow";
import {
  PRODUCT_SORT_OPTIONS,
  sortOptionToSortingState,
} from "@/components/dashboard/table/sortOptions";
import type { ProductCategory, ProductRow } from "@/types/product";

const PRODUCT_CHIP_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "Semillas", label: "Semillas" },
  { value: "Frutos secos", label: "Frutos secos" },
  { value: "Suplementos", label: "Suplementos" },
];

interface ProductsPanelProps {
  products: ProductRow[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export function ProductsPanel({
  products,
  searchQuery,
  onSearchQueryChange,
}: ProductsPanelProps) {
  const columns = useMemo(() => getProductTableColumns(), []);

  return (
    <DataTable<ProductRow>
      data={products}
      columns={columns}
      getRowId={(row) => row.id}
      globalFilter={searchQuery}
      onGlobalFilterChange={onSearchQueryChange}
      globalFilterFn={productGlobalFilterFn}
      chipFilter={{
        columnId: "category",
        chips: PRODUCT_CHIP_OPTIONS,
      }}
      sortOptions={PRODUCT_SORT_OPTIONS}
      defaultSortOption={PRODUCT_SORT_OPTIONS[0]}
      mapSortToSortingState={sortOptionToSortingState}
      pageSize={10}
      tableColumnCount={7}
      tableClassName="table-fixed"
      showSortSelect={false}
      searchPlaceholder="ID, nombre, laboratorio, categoría, precio, stock…"
      emptyMessage="Ningún producto coincide con los filtros."
      renderHeader={({ table }: { table: Table<ProductRow> }) => (
        <>
          <SortableTh
            table={table}
            columnId="id"
            className="px-2 py-2 text-[10px]"
          >
            ID
          </SortableTh>
          <SortableTh
            table={table}
            columnId="name"
            className="w-72 px-2 py-2 text-[10px] sm:w-96"
          >
            Producto
          </SortableTh>
          <SortableTh table={table} columnId="laboratory" className="px-3 py-2 text-[10px]">
            Laboratorio
          </SortableTh>
          <SortableTh table={table} columnId="priceMin" className="px-3 py-2 text-[10px]">
            Precio Min.
          </SortableTh>
          <SortableTh table={table} columnId="priceMay" className="px-3 py-2 text-[10px]">
            Precio May.
          </SortableTh>
          <SortableTh table={table} columnId="stockUnits" className="px-3 py-2 text-[10px]">
            Stock
          </SortableTh>
          <th scope="col" className="px-3 py-2 text-right text-[10px]">
            Acciones
          </th>
        </>
      )}
      renderRow={(row) => (
        <ProductTableRow key={row.id} product={row.original} />
      )}
    />
  );
}
