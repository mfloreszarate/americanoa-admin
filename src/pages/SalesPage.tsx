import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { ColumnDef, FilterFn, SortingState, Table } from "@tanstack/react-table";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { SortableTh } from "@/components/ui/data-table/SortableTh";
import { multiSelectStringFilter } from "@/components/ui/data-table/multiSelectColumnFilter";
import { usePaginatedTable } from "@/hooks/usePaginatedTable";
import { useSales } from "@/hooks/useSales";
import type { SaleRow, SaleStatus } from "@/types/sale";

const SALE_STATUS_CHIPS: { value: SaleStatus; label: string }[] = [
  { value: "Completada", label: "Completadas" },
  { value: "Pendiente", label: "Pendientes" },
  { value: "Anulada", label: "Anuladas" },
];

const SALE_SORT_OPTIONS = [
  "Más recientes",
  "Mayor importe",
  "Menor importe",
  "Más items",
] as const;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function mapSaleSortToSortingState(option: string): SortingState {
  if (option === "Mayor importe") return [{ id: "total", desc: true }];
  if (option === "Menor importe") return [{ id: "total", desc: false }];
  if (option === "Más items") return [{ id: "itemsCount", desc: true }];
  return [{ id: "dateTime", desc: true }];
}

const saleGlobalFilterFn: FilterFn<SaleRow> = (row, _columnId, filterValue) => {
  const query = String(filterValue ?? "").toLowerCase().trim();
  if (!query) return true;

  const sale = row.original;
  const haystack = [
    sale.id,
    sale.customer,
    sale.paymentMethod,
    sale.status,
    sale.cashier,
    formatDateTime(sale.dateTime),
    formatCurrency(sale.total),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
};

function getSaleTableColumns(): ColumnDef<SaleRow>[] {
  return [
    { accessorKey: "id", id: "id", header: "Venta" },
    { accessorKey: "dateTime", id: "dateTime", header: "Fecha" },
    { accessorKey: "customer", id: "customer", header: "Cliente" },
    { accessorKey: "itemsCount", id: "itemsCount", header: "Items" },
    { accessorKey: "paymentMethod", id: "paymentMethod", header: "Pago" },
    {
      accessorKey: "status",
      id: "status",
      header: "Estado",
      filterFn: multiSelectStringFilter as FilterFn<SaleRow>,
    },
    { accessorKey: "cashier", id: "cashier", header: "Usuario" },
    { accessorKey: "total", id: "total", header: "Total" },
  ];
}

function statusClassName(status: SaleStatus): string {
  if (status === "Completada") return "bg-secondary-fixed text-on-secondary-fixed";
  if (status === "Pendiente") return "bg-tertiary-fixed text-on-tertiary-fixed";
  return "bg-error-container text-on-error-container";
}

const SaleTableRow = ({ sale }: { sale: SaleRow }) => {
  return (
    <tr className="group transition-colors hover:bg-surface-container-low">
      <td className="px-4 py-3 font-mono text-xs font-bold text-primary">
        {sale.id}
      </td>
      <td className="px-3 py-3 text-sm text-on-surface">
        {formatDateTime(sale.dateTime)}
      </td>
      <td className="px-3 py-3">
        <span className="block text-sm font-semibold text-on-surface">
          {sale.customer}
        </span>
        <span className="text-[10px] text-outline">Atendió {sale.cashier}</span>
      </td>
      <td className="px-3 py-3 text-center text-sm font-bold text-on-surface">
        {sale.itemsCount}
      </td>
      <td className="px-3 py-3 text-sm font-medium text-on-surface-variant">
        {sale.paymentMethod}
      </td>
      <td className="px-3 py-3">
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${statusClassName(sale.status)}`}>
          {sale.status}
        </span>
      </td>
      <td className="px-3 py-3 text-sm text-on-surface-variant">
        {sale.cashier}
      </td>
      <td className="px-3 py-3 text-right">
        <span className="block text-sm font-extrabold text-primary">
          {formatCurrency(sale.total)}
        </span>
        {sale.discount > 0 ? (
          <span className="text-[10px] font-medium text-error">
            Desc. {formatCurrency(sale.discount)}
          </span>
        ) : null}
      </td>
      <td className="px-3 py-3 text-right">
        <button
          type="button"
          className="rounded-full p-1.5 text-primary transition-all hover:bg-primary-container/10"
          aria-label={`Ver detalle de ${sale.id}`}
        >
          <MaterialIcon name="visibility" className="text-lg leading-none" />
        </button>
      </td>
    </tr>
  );
};

export function SalesPage() {
  const salesTable = usePaginatedTable<{ status: SaleStatus[] }>({
    initialFilters: { status: [] },
    initialSorting: { sortBy: "dateTime", sortDir: "desc" },
    initialPageSize: 10,
  });
  const columns = useMemo(() => getSaleTableColumns(), []);
  const salesQuery = useSales({
    ...salesTable.query,
    // The current DataTable paginates locally. Keep the endpoint returning
    // enough rows until the table gets a server-side pagination mode.
    page: 1,
    pageSize: 1000,
  });
  const sales = salesQuery.data?.data ?? [];

  const completedSales = sales.filter((sale) => sale.status === "Completada");
  const totalRevenue = completedSales.reduce((total, sale) => total + sale.total, 0);
  const averageTicket =
    completedSales.length > 0 ? totalRevenue / completedSales.length : 0;
  const pendingSales = sales.filter((sale) => sale.status === "Pendiente");

  return (
    <>
      <TopNavBar searchDisabled searchPlaceholder="Buscar ventas…" />
      <main className="min-h-screen bg-surface p-8 pt-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary">
              Ventas
            </p>
            <h1 className="mt-1 font-headline text-3xl font-extrabold text-primary">
              Listado de ventas
            </h1>
            <p className="mt-2 max-w-2xl text-on-surface-variant">
              Consultá ventas, estados de cobro, descuentos y comprobantes registrados.
            </p>
          </div>
          <Link
            to="/ventas/nueva"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-container px-5 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-transform active:scale-95"
          >
            <MaterialIcon name="add" />
            Nueva venta
          </Link>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-xl bg-surface-container-lowest p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-outline">
              Facturación completada
            </p>
            <p className="mt-3 font-headline text-3xl font-extrabold text-primary">
              {formatCurrency(totalRevenue)}
            </p>
          </article>
          <article className="rounded-xl bg-surface-container-lowest p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-outline">
              Ticket promedio
            </p>
            <p className="mt-3 font-headline text-3xl font-extrabold text-primary">
              {formatCurrency(averageTicket)}
            </p>
          </article>
          <article className="rounded-xl bg-surface-container-lowest p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-outline">
              Ventas pendientes
            </p>
            <p className="mt-3 font-headline text-3xl font-extrabold text-primary">
              {pendingSales.length.toString().padStart(2, "0")}
            </p>
          </article>
        </section>

        {salesQuery.isError ? (
          <div className="mb-4 rounded-xl bg-error-container p-4 text-sm font-semibold text-on-error-container">
            No se pudieron cargar las ventas. Intentá nuevamente.
          </div>
        ) : null}

        <DataTable<SaleRow>
          data={sales}
          columns={columns}
          getRowId={(row) => row.id}
          globalFilter={salesTable.search}
          onGlobalFilterChange={salesTable.setSearch}
          globalFilterFn={saleGlobalFilterFn}
          chipFilter={{
            columnId: "status",
            chips: SALE_STATUS_CHIPS,
          }}
          sortOptions={SALE_SORT_OPTIONS}
          defaultSortOption={SALE_SORT_OPTIONS[0]}
          mapSortToSortingState={mapSaleSortToSortingState}
          pageSize={10}
          tableColumnCount={9}
          showSortSelect={false}
          searchPlaceholder="Venta, cliente, estado, forma de pago, usuario, importe…"
          emptyMessage={
            salesQuery.isLoading
              ? "Cargando ventas…"
              : "Ninguna venta coincide con los filtros."
          }
          renderHeader={({ table }: { table: Table<SaleRow> }) => (
            <>
              <SortableTh table={table} columnId="id" className="px-4 py-3 text-[10px]">
                Venta
              </SortableTh>
              <SortableTh table={table} columnId="dateTime" className="px-3 py-3 text-[10px]">
                Fecha
              </SortableTh>
              <SortableTh table={table} columnId="customer" className="px-3 py-3 text-[10px]">
                Cliente
              </SortableTh>
              <SortableTh table={table} columnId="itemsCount" className="px-3 py-3 text-center text-[10px]">
                Items
              </SortableTh>
              <SortableTh table={table} columnId="paymentMethod" className="px-3 py-3 text-[10px]">
                Pago
              </SortableTh>
              <SortableTh table={table} columnId="status" className="px-3 py-3 text-[10px]">
                Estado
              </SortableTh>
              <SortableTh table={table} columnId="cashier" className="px-3 py-3 text-[10px]">
                Usuario
              </SortableTh>
              <SortableTh table={table} columnId="total" className="px-3 py-3 text-right text-[10px]">
                Total
              </SortableTh>
              <th scope="col" className="px-3 py-3 text-right text-[10px]">
                Acciones
              </th>
            </>
          )}
          renderRow={(row) => <SaleTableRow key={row.id} sale={row.original} />}
        />
      </main>
    </>
  );
}
