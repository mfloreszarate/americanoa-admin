import { TopNavBar } from "@/components/layout/TopNavBar";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { sampleProducts } from "@/data/products";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesTrend = [
  { label: "Lun", sales: 184000, tickets: 38 },
  { label: "Mar", sales: 221000, tickets: 45 },
  { label: "Mié", sales: 197000, tickets: 41 },
  { label: "Jue", sales: 256000, tickets: 52 },
  { label: "Vie", sales: 312000, tickets: 66 },
  { label: "Sáb", sales: 289000, tickets: 58 },
  { label: "Hoy", sales: 164000, tickets: 31 },
];

const monthlySales = [
  { label: "Ene", sales: 3480000, tickets: 612 },
  { label: "Feb", sales: 3720000, tickets: 640 },
  { label: "Mar", sales: 4210000, tickets: 705 },
  { label: "Abr", sales: 3980000, tickets: 684 },
  { label: "May", sales: 4460000, tickets: 731 },
  { label: "Jun", sales: 4890000, tickets: 790 },
  { label: "Jul", sales: 5120000, tickets: 842 },
  { label: "Ago", sales: 4750000, tickets: 801 },
  { label: "Sep", sales: 5310000, tickets: 866 },
  { label: "Oct", sales: 5580000, tickets: 902 },
  { label: "Nov", sales: 5920000, tickets: 944 },
  { label: "Dic", sales: 6480000, tickets: 1018 },
];

function priceDisplayToNumber(price: string): number {
  const normalized = price
    .replace(/\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : 0;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-AR").format(value);
}

export function HomePage() {
  const totalUnits = sampleProducts.reduce(
    (total, product) => total + product.stockUnits,
    0,
  );
  const lowStockProducts = sampleProducts.filter(
    (product) => product.stockTone === "error" || product.stockUnits < 100,
  );
  const inventoryValue = sampleProducts.reduce(
    (total, product) =>
      total + priceDisplayToNumber(product.price) * product.stockUnits,
    0,
  );
  const todaySales = salesTrend.at(-1)?.sales ?? 0;
  const todayTickets = salesTrend.at(-1)?.tickets ?? 0;
  const averageTicket = todayTickets > 0 ? todaySales / todayTickets : 0;

  const categoryTotals = sampleProducts.reduce<Record<string, number>>(
    (totals, product) => ({
      ...totals,
      [product.category]: (totals[product.category] ?? 0) + product.stockUnits,
    }),
    {},
  );
  const categories = Object.entries(categoryTotals);
  let accumulatedPercent = 0;
  const categoryColors = ["#3a1555", "#3c6a00", "#c5cf38"];
  const categoryGradient = categories
    .map(([_, units], index) => {
      const start = accumulatedPercent;
      const end = start + (units / totalUnits) * 100;
      accumulatedPercent = end;
      return `${categoryColors[index % categoryColors.length]} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <>
      <TopNavBar searchDisabled searchPlaceholder="Buscar…" />
      <main className="min-h-screen bg-surface p-8 pt-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary">
              Panel principal
            </p>
            <h1 className="mt-1 font-headline text-3xl font-extrabold text-primary">
              Inicio
            </h1>
            <p className="mt-2 max-w-2xl text-on-surface-variant">
              Resumen operativo de ventas, stock y alertas para la gestión diaria.
            </p>
          </div>
          <div className="rounded-xl bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface-variant">
            Actualizado hoy
          </div>
        </div>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Ventas de hoy",
              value: formatCurrency(todaySales),
              detail: `${todayTickets} comprobantes`,
              icon: "payments",
              tone: "text-secondary",
            },
            {
              label: "Ticket promedio",
              value: formatCurrency(averageTicket),
              detail: "+8% vs. semana anterior",
              icon: "trending_up",
              tone: "text-secondary",
            },
            {
              label: "Unidades en stock",
              value: formatNumber(totalUnits),
              detail: `${sampleProducts.length} productos activos`,
              icon: "inventory_2",
              tone: "text-primary",
            },
            {
              label: "Stock bajo",
              value: lowStockProducts.length.toString().padStart(2, "0"),
              detail: "requieren atención",
              icon: "warning",
              tone: "text-error",
            },
          ].map((kpi) => (
            <article
              key={kpi.label}
              className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-outline">
                    {kpi.label}
                  </p>
                  <p className="mt-3 font-headline text-3xl font-extrabold text-on-surface">
                    {kpi.value}
                  </p>
                </div>
                <MaterialIcon name={kpi.icon} className={`text-2xl ${kpi.tone}`} />
              </div>
              <p className="mt-3 text-sm font-medium text-on-surface-variant">
                {kpi.detail}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <article className="rounded-xl bg-surface-container-lowest p-6 shadow-sm xl:col-span-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-headline text-xl font-bold text-primary">
                  Evolución de ventas
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Monto vendido durante los últimos 7 días.
                </p>
              </div>
              <span className="rounded-full bg-secondary-fixed px-3 py-1 text-xs font-bold text-on-secondary-fixed">
                +14%
              </span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#e1e3e4" strokeDasharray="4 4" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#7d7480", fontSize: 12, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#7d7480", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => formatCurrency(Number(value))}
                    width={90}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value)), "Ventas"]}
                    labelFormatter={(label) => `Día: ${label}`}
                    contentStyle={{
                      borderRadius: "12px",
                      borderColor: "#cec3d0",
                      boxShadow: "0 12px 30px rgba(25, 28, 29, 0.12)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3a1555"
                    strokeWidth={3}
                    dot={{ r: 4, stroke: "#3c6a00", strokeWidth: 2, fill: "#f8f9fa" }}
                    activeDot={{ r: 6, fill: "#3c6a00" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-xl bg-surface-container-lowest p-6 shadow-sm xl:col-span-4">
            <h2 className="font-headline text-xl font-bold text-primary">
              Stock por categoría
            </h2>
            <p className="text-sm text-on-surface-variant">
              Distribución de unidades disponibles.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div
                className="flex h-44 w-44 items-center justify-center rounded-full"
                style={{ background: `conic-gradient(${categoryGradient})` }}
              >
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-surface-container-lowest">
                  <span className="text-2xl font-extrabold text-primary">
                    {formatNumber(totalUnits)}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-outline">
                    unidades
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {categories.map(([category, units], index) => (
                <div key={category} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: categoryColors[index % categoryColors.length],
                      }}
                    />
                    <span className="font-semibold text-on-surface">{category}</span>
                  </div>
                  <span className="text-on-surface-variant">
                    {formatNumber(units)}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <article className="rounded-xl bg-surface-container-lowest p-6 shadow-sm xl:col-span-7">
            <h2 className="font-headline text-xl font-bold text-primary">
              Ventas por mes
            </h2>
            <p className="text-sm text-on-surface-variant">
              Comparativo mensual de facturación acumulada.
            </p>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySales} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#e1e3e4" strokeDasharray="4 4" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#7d7480", fontSize: 12, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#7d7480", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => formatCurrency(Number(value))}
                    width={86}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "sales"
                        ? formatCurrency(Number(value))
                        : `${Number(value)} tickets`,
                      name === "sales" ? "Ventas" : "Tickets",
                    ]}
                    labelFormatter={(label) => `Mes: ${label}`}
                    contentStyle={{
                      borderRadius: "12px",
                      borderColor: "#cec3d0",
                      boxShadow: "0 12px 30px rgba(25, 28, 29, 0.12)",
                    }}
                  />
                  <Bar dataKey="sales" fill="#3c6a00" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-xl bg-surface-container-lowest p-6 shadow-sm xl:col-span-5">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-xl font-bold text-primary">
                Alertas de inventario
              </h2>
              <span className="text-sm font-bold text-error">
                {lowStockProducts.length} alertas
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg bg-error-container/50 p-3"
                >
                  <div>
                    <p className="text-sm font-bold text-on-surface">
                      {product.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {product.category} · {product.id}
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-error">
                    {product.stockUnits}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-surface-container-low p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-outline">
                Valorización estimada
              </p>
              <p className="mt-1 font-headline text-2xl font-extrabold text-primary">
                {formatCurrency(inventoryValue)}
              </p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
