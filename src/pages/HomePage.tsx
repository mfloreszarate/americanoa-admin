import { TopNavBar } from "@/components/layout/TopNavBar";

export function HomePage() {
  return (
    <>
      <TopNavBar searchDisabled searchPlaceholder="Buscar…" />
      <main className="min-h-screen bg-surface p-8 pt-24">
        <h1 className="font-headline text-3xl font-extrabold text-primary">
          Inicio
        </h1>
        <p className="mt-2 max-w-xl text-on-surface-variant">
          Panel principal. Usá el menú lateral para ir a Productos, Inventario,
          Ventas o Reportes.
        </p>
      </main>
    </>
  );
}
