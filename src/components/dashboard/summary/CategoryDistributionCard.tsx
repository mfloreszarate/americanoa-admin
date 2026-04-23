interface CategoryDistributionCardProps {
  title: string;
  activeVarieties: string;
  activeVarietiesLabel: string;
}

export function CategoryDistributionCard({
  title,
  activeVarieties,
  activeVarietiesLabel,
}: CategoryDistributionCardProps) {
  return (
    <div className="col-span-12 rounded-lg bg-surface-container-low p-6 md:col-span-5">
      <div className="flex items-start justify-between">
        <div>
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            {title}
          </span>
          <div className="mt-4 flex gap-2">
            <div className="h-10 w-2 rounded-full bg-primary" />
            <div className="h-10 w-2 rounded-full bg-secondary" />
            <div className="h-10 w-2 rounded-full bg-on-tertiary-container" />
            <div className="h-10 w-2 rounded-full bg-primary-container" />
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-on-surface">
            {activeVarieties}
          </span>
          <span className="block text-sm text-on-surface-variant">
            {activeVarietiesLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
