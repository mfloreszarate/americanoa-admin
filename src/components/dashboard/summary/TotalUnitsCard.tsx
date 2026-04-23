import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface TotalUnitsCardProps {
  label: string;
  value: string;
  trendLabel: string;
}

export function TotalUnitsCard({
  label,
  value,
  trendLabel,
}: TotalUnitsCardProps) {
  return (
    <div className="col-span-12 rounded-lg border-l-4 border-primary bg-surface-container-lowest p-6 shadow-sm md:col-span-4">
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
        {label}
      </span>
      <div className="text-4xl font-extrabold tracking-tight text-on-surface">
        {value}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm font-bold text-secondary">
        <MaterialIcon name="trending_up" className="text-sm" />
        {trendLabel}
      </div>
    </div>
  );
}
