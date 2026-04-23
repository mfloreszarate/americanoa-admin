import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { FilterChip } from "@/components/ui/data-table/FilterChip";

export interface DataTableChipOption {
  value: string;
  label: string;
}

interface DataTableToolbarProps {
  selectedChipValues: string[];
  onToggleChip: (value: string) => void;
  chipOptions?: DataTableChipOption[];
  sortOptions: readonly string[];
  sortValue: string;
  onSortChange: (value: string) => void;
  onResetFilters: () => void;
  filtersButtonTitle?: string;
  /** Text search bound to the table global filter. */
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  /** When false, the legacy “Ordenar por” select is hidden (e.g. sort only via column headers). */
  showSortSelect?: boolean;
}

export function DataTableToolbar({
  selectedChipValues,
  onToggleChip,
  chipOptions,
  sortOptions,
  sortValue,
  onSortChange,
  onResetFilters,
  filtersButtonTitle = "Restablecer búsqueda, filtros y orden",
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar…",
  showSortSelect = true,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-surface-container-high px-4 py-3">
      <div className="relative w-full max-w-xl">
        <MaterialIcon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-lg border-none bg-surface-container-highest py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none ring-1 ring-transparent transition-shadow placeholder:text-outline focus:ring-2 focus:ring-secondary/30"
          aria-label="Buscar en la tabla"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onResetFilters}
          title={filtersButtonTitle}
          className="flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-variant"
        >
          <MaterialIcon name="filter_list" className="text-base" />
          Filtros
        </button>
        {chipOptions && chipOptions.length > 0 ? (
          <>
            <div className="h-5 w-px bg-outline-variant opacity-30" />
            <div className="flex flex-wrap gap-2">
              {chipOptions.map((chip) => (
                <FilterChip
                  key={chip.value}
                  label={chip.label}
                  selected={selectedChipValues.includes(chip.value)}
                  onClick={() => onToggleChip(chip.value)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      {showSortSelect ? (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-on-surface-variant">
            Ordenar por:
          </span>
          <select
            className="cursor-pointer border-none bg-transparent text-sm font-bold text-primary focus:ring-0"
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      </div>
    </div>
  );
}
