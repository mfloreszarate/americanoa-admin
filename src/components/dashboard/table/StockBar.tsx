interface StockBarProps {
  label: string;
  tone: "secondary" | "error";
}

export function StockBar({ label, tone }: StockBarProps) {
  // const fillClass = tone === "error" ? "bg-error" : "bg-secondary";
  const textClass =
    tone === "error"
      ? "text-error"
      : "text-on-secondary-container";

  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-[10px] font-bold leading-tight ${textClass}`}>
        {label}
      </span>
    </div>
  );
}
