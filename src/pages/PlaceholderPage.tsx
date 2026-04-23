import { TopNavBar } from "@/components/layout/TopNavBar";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <>
      <TopNavBar searchDisabled searchPlaceholder="Buscar…" />
      <main className="min-h-screen bg-surface p-8 pt-24">
        <h1 className="font-headline text-3xl font-extrabold text-primary">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl text-on-surface-variant">{description}</p>
        ) : (
          <p className="mt-2 text-on-surface-variant">
            Esta sección se implementará próximamente.
          </p>
        )}
      </main>
    </>
  );
}
