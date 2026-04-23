import { AttentionCard } from "@/components/dashboard/summary/AttentionCard";
import { CategoryDistributionCard } from "@/components/dashboard/summary/CategoryDistributionCard";
import { TotalUnitsCard } from "@/components/dashboard/summary/TotalUnitsCard";

export function SummaryBentoGrid() {
  return (
    <div className="mb-12 grid grid-cols-12 gap-6">
      <TotalUnitsCard
        label="Total Units"
        value="12,482"
        trendLabel="+14% from last harvest"
      />
      <CategoryDistributionCard
        title="Category Distribution"
        activeVarieties="32"
        activeVarietiesLabel="Active Varieties"
      />
      <AttentionCard
        title="Attention Required"
        count="04"
        description="Products below stock threshold"
      />
    </div>
  );
}
