import { useEffect, useMemo, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { sampleProducts } from "@/data/products";
import type { ProductRow } from "@/types/product";

interface CartItem {
  product: ProductRow;
  quantity: number;
}

const shortcuts = [
  ["F1", "Ayuda"],
  ["F8", "Descuento"],
  ["Ctrl+F", "Buscar"],
];

const paymentMethods = [
  { icon: "payments", label: "Efectivo", selected: true },
  { icon: "credit_card", label: "Tarjeta", selected: false },
  { icon: "qr_code_2", label: "Digital", selected: false },
];

const loggedUserName = "Mariano";
const terminalId = "T01-Norte";

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
  }).format(value);
}

export function NewSalePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + priceDisplayToNumber(item.product.price) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const searchSuggestions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return [];

    return sampleProducts
      .filter((product) =>
        [
          product.id,
          product.name,
          product.laboratory,
          product.category,
          product.price,
          product.priceUnit,
          product.stockLabel,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
      .slice(0, 8);
  }, [searchQuery]);

  const appliedDiscount = Math.min(discountAmount, subtotal);
  const total = Math.max(subtotal - appliedDiscount, 0);
  const change = Math.max(paidAmount - total, 0);
  const formattedDate = currentDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const addProduct = (product: ProductRow) => {
    if (product.stockUnits <= 0) return;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stockUnits),
              }
            : item,
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const handleSearchChange = (value: string) => {
    const barcode = value.trim();
    const matchingProduct = sampleProducts.find(
      (product) => product.id === barcode,
    );

    if (matchingProduct) {
      addProduct(matchingProduct);
      setSearchQuery("");
      return;
    }

    setSearchQuery(value);
  };

  const selectProduct = (product: ProductRow) => {
    addProduct(product);
    setSearchQuery("");
    setSearchFocused(false);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: Math.min(
                  Math.max(item.quantity + delta, 0),
                  item.product.stockUnits,
                ),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeProduct = (productId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  };

  return (
    <main className="min-h-screen bg-surface-container-high p-6 font-body text-on-background">
      <section className="flex h-[calc(100vh-3rem)] w-full overflow-hidden rounded-2xl border border-outline-variant/30 bg-background shadow-2xl">
        <div className="flex min-w-0 flex-1 flex-col bg-background">
          <header className="flex items-center justify-between border-b border-outline-variant/10 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container text-white shadow-sm">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-headline text-lg font-bold leading-none text-primary">
                  América NOA
                </h1>
                <span className="text-[10px] font-medium uppercase tracking-widest text-outline">
                  Terminal POS v2.4
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface-container-high px-4 py-2">
              <MaterialIcon name="account_circle" className="text-[28px] text-primary" />
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-xs font-bold text-primary">
                    {loggedUserName}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-outline">
                    Terminal ID: {terminalId}
                  </span>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-outline">
                  {formattedDate}
                </p>
                <p className="font-mono text-sm font-bold text-primary">
                  {formattedTime}
                </p>
              </div>
            </div>
          </header>

          <div className="flex items-center gap-3 px-8 py-4">
            <label className="relative block flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MaterialIcon name="search" className="text-[20px] text-outline" />
              </span>
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && searchSuggestions[0]) {
                    event.preventDefault();
                    selectProduct(searchSuggestions[0]);
                  }
                }}
                className="block w-full rounded-xl border-none bg-surface-container-highest py-3 pl-12 pr-4 text-base font-medium text-on-background placeholder-outline transition-all focus:ring-2 focus:ring-secondary/40"
                placeholder="Escaneá o ingresá un código de barras para agregar al carrito... (Ctrl+F)"
                type="text"
              />
              {searchFocused && searchQuery.trim() ? (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xl">
                  {searchSuggestions.length > 0 ? (
                    <div className="max-h-80 overflow-auto py-1">
                      {searchSuggestions.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            selectProduct(product);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-container-low"
                        >
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container-high">
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-on-background">
                              {product.name}
                            </p>
                            <p className="truncate text-[11px] text-outline">
                              {product.id} - {product.laboratory} - {product.category}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {product.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-outline">
                      No hay productos que coincidan.
                    </div>
                  )}
                </div>
              ) : null}
            </label>
            <button
              type="button"
              onClick={() => setCartItems([])}
              disabled={cartItems.length === 0}
              className="flex items-center gap-2 rounded-xl bg-error-container px-4 py-3 text-sm font-bold text-error transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MaterialIcon name="delete_sweep" className="text-[18px]" />
              Limpiar carrito
            </button>
          </div>

          <div className="flex-1 overflow-auto px-8 pb-4">
            <div className="overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest">
              <table className="w-full border-collapse text-left">
                <thead className="sticky top-0 z-10 bg-surface-container-low">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-outline">
                      Código
                    </th>
                    <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-outline">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-outline">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-outline">
                      Precio unitario
                    </th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-outline">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-outline">
                      Subtotal
                    </th>
                    <th className="px-6 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-outline">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {cartItems.map((item) => (
                    <tr
                      key={item.product.id}
                      className="group transition-colors hover:bg-surface-container-low"
                    >
                      <td className="px-6 py-3 font-mono text-xs text-outline">
                        {item.product.id}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container-high">
                            <img
                              src={item.product.imageSrc}
                              alt={item.product.imageAlt}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="block truncate text-sm font-medium text-on-background">
                              {item.product.name}
                            </span>
                            <span className="text-[10px] font-medium text-outline">
                              {item.product.laboratory}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] font-medium">
                          {item.product.category}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-sm font-semibold">
                        {item.product.price}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center rounded-lg bg-surface-container-high p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="flex h-7 w-7 items-center justify-center rounded text-sm hover:bg-surface-variant"
                              aria-label={`Restar ${item.product.name}`}
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, 1)}
                              disabled={item.quantity >= item.product.stockUnits}
                              className="flex h-7 w-7 items-center justify-center rounded text-sm hover:bg-surface-variant disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Sumar ${item.product.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right text-sm font-bold text-primary">
                        {formatCurrency(
                          priceDisplayToNumber(item.product.price) * item.quantity,
                        )}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeProduct(item.product.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-error transition-all hover:bg-error-container/40"
                          aria-label={`Quitar ${item.product.name}`}
                        >
                          <MaterialIcon name="delete" className="text-[18px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cartItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-10 text-center text-sm text-outline"
                      >
                        Escaneá o ingresá un código de barras para agregar productos al carrito.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-outline-variant/20 bg-surface-container-high/50 px-8 py-4">
            <div className="grid grid-cols-[1.1fr_1.4fr_1.6fr_auto] items-end gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-outline">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                {appliedDiscount > 0 ? (
                  <div className="flex justify-between text-xs">
                    <span className="text-outline">Descuento</span>
                    <span className="font-medium text-error">
                      -{formatCurrency(appliedDiscount)}
                    </span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between border-t border-dashed border-outline-variant pt-2">
                  <span className="font-headline text-xs font-bold uppercase text-primary">
                    Total
                  </span>
                  <span className="font-headline text-xl font-bold text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.label}
                    type="button"
                    className={
                      method.selected
                        ? "flex flex-col items-center justify-center rounded-xl border-2 border-secondary bg-secondary-fixed px-1 py-2 text-on-secondary-fixed"
                        : "flex flex-col items-center justify-center rounded-xl border-2 border-transparent bg-surface-container-highest px-1 py-2 text-on-surface-variant hover:bg-surface-container-high"
                    }
                  >
                    <MaterialIcon name={method.icon} className="text-[20px]" />
                    <span className="mt-1 text-[10px] font-bold">{method.label}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <label>
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider text-outline">
                    Descuento
                  </span>
                  <span className="relative block">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm font-bold text-outline">
                      $
                    </span>
                    <input
                      className="w-full rounded-lg border-none bg-surface-container-lowest py-2 pl-6 font-headline text-lg font-bold text-primary focus:ring-2 focus:ring-primary/20"
                      type="number"
                      min={0}
                      max={subtotal}
                      value={discountAmount}
                      onChange={(event) =>
                        setDiscountAmount(Number(event.target.value) || 0)
                      }
                      placeholder="0"
                    />
                  </span>
                </label>
                <label>
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider text-outline">
                    Paga con
                  </span>
                  <span className="relative block">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm font-bold text-outline">
                      $
                    </span>
                    <input
                      className="w-full rounded-lg border-none bg-surface-container-lowest py-2 pl-6 font-headline text-lg font-bold text-primary focus:ring-2 focus:ring-primary/20"
                      type="number"
                      min={0}
                      value={paidAmount}
                      onChange={(event) =>
                        setPaidAmount(Number(event.target.value) || 0)
                      }
                    />
                  </span>
                </label>
                <div>
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider text-outline">
                    Vuelto
                  </span>
                  <div className="flex w-full items-center justify-between rounded-lg bg-secondary-fixed/50 px-3 py-2 font-headline text-lg font-bold text-secondary">
                    <span className="text-sm">$</span>
                    <span>{change.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="group flex min-w-44 flex-col items-center gap-0.5 rounded-xl bg-gradient-to-r from-primary to-primary-container px-6 py-4 text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-headline text-sm font-extrabold uppercase tracking-widest transition-all group-hover:tracking-widest">
                  Finalizar venta
                </span>
                <span className="text-[9px] font-medium uppercase opacity-60">
                  Presioná F12
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t border-outline-variant/20 bg-surface-container-low px-8 py-3 text-[10px] font-medium text-outline">
            {shortcuts.map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <kbd className="rounded border border-outline-variant bg-surface-container-highest px-1.5 py-0.5 text-on-surface shadow-sm">
                  {key}
                </kbd>
                <span>{label}</span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2 text-secondary">
              <MaterialIcon name="verified_user" className="text-[14px]" />
              <span className="font-bold uppercase tracking-widest">Seguro</span>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
