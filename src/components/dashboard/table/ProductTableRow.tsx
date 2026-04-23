import { MaterialIcon } from "@/components/ui/MaterialIcon";
// import { ProductCategoryBadge } from "@/components/dashboard/table/ProductCategoryBadge";
import { StockBar } from "@/components/dashboard/table/StockBar";
import type { ProductRow } from "@/types/product";

interface ProductTableRowProps {
  product: ProductRow;
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  return (
    <tr className={`group transition-colors hover:bg-surface-container-low ${product.stockUnits < 100 ? "bg-red-100 text-red-800 hover:bg-red-200" : ""}`}>
      <td className="px-4 py-2 text-[12px]">{product.id}</td>
      <td className="min-w-0 w-72 px-2 py-2 sm:w-96">
        <div className="flex min-w-0 items-center gap-2">
          <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-md bg-surface-container-high">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-sm leading-tight text-on-surface">
              {product.name}
            </span>
            {/* <span className="text-[10px] leading-tight text-on-surface-variant">
              Lote: {product.batch}
            </span> */}
          </div>
        </div>
      </td>
      {/* <td className="px-3 py-2 align-middle">
        <ProductCategoryBadge category={product.category} />
      </td> */}
      <td className="px-3 py-2 align-middle">
        <span className="text-sm font-bold text-primary">{product.laboratory}</span>
      </td>
      <td className="px-3 py-2 align-middle">
        <span className="text-sm font-bold text-primary">{product.price}</span>
        <span className="ml-1 text-[10px] text-on-surface-variant">
          {product.priceUnit}
        </span>
      </td>
      <td className="px-3 py-2 align-middle">
        <span className="text-sm font-bold text-primary">{product.price}</span>
        <span className="ml-1 text-[10px] text-on-surface-variant">
          {product.priceUnit}
        </span>
      </td>
      <td className="px-3 py-2 align-middle">
        <StockBar
          // percent={product.stockPercent}
          label={product.stockLabel}
          tone={product.stockTone}
        />
      </td>
      <td className="px-3 py-2 text-right align-middle">
        <button
          type="button"
          className="rounded-full p-1 text-primary transition-all hover:bg-primary-container/10"
          aria-label={`Editar ${product.name}`}
        >
          <MaterialIcon name="edit" className="text-lg leading-none" />
        </button>
        <button
          type="button"
          className="rounded-full p-1 text-error transition-all hover:bg-error-container/20"
          aria-label={`Eliminar ${product.name}`}
        >
          <MaterialIcon name="delete" className="text-lg leading-none" />
        </button>
      </td>
    </tr>
  );
}
