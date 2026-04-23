import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface PageHeroProps {
  title: string;
  description?: string;
  actionLabel: string;
  onActionClick?: () => void;
}

export function PageHero({
  title,
  description,
  actionLabel,
  onActionClick,
}: PageHeroProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-lg text-on-surface-variant">{description}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onActionClick}
        className="flex items-center gap-2 rounded-lg bg-secondary-container px-6 py-3 font-bold text-on-secondary-container shadow-sm transition-all hover:brightness-95"
      >
        <MaterialIcon name="add_circle" />
        {actionLabel}
      </button>
    </div>
  );
}
