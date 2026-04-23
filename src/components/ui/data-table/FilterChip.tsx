interface FilterChipProps {
  label: string;
  /** When true, uses accent chip styles (active in filter). */
  selected?: boolean;
  onClick?: () => void;
}

export function FilterChip({ label, selected = false, onClick }: FilterChipProps) {
  const styles = selected
    ? "bg-secondary-fixed text-on-secondary-fixed"
    : "bg-surface-container-high text-on-surface-variant";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition-opacity hover:opacity-90 ${styles}`.trim()}
      >
        {label}
      </button>
    );
  }

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${styles}`.trim()}
    >
      {label}
    </span>
  );
}
