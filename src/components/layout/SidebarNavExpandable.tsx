import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { SidebarNavLink } from "@/components/layout/SidebarNavLink";
import type { NavSubItem } from "@/types/navigation";

interface SidebarNavExpandableProps {
  title: string;
  icon: string;
  items: NavSubItem[];
}

function pathMatchesItem(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SidebarNavExpandable({
  title,
  icon,
  items,
}: SidebarNavExpandableProps) {
  const { pathname } = useLocation();
  const hasActiveChild = items.some((item) => pathMatchesItem(pathname, item.to));

  const [open, setOpen] = useState(hasActiveChild);

  useEffect(() => {
    if (hasActiveChild) setOpen(true);
  }, [hasActiveChild]);

  const triggerBase =
    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-manrope text-sm font-medium transition-colors duration-200";
  const triggerIdle =
    "text-stone-500 dark:text-stone-400 hover:bg-stone-100/50 dark:hover:bg-stone-900/50 hover:text-purple-700 dark:hover:text-purple-300";
  const triggerActive =
    "font-bold text-purple-900 dark:text-white bg-stone-100/70 dark:bg-stone-900/70";

  return (
    <div className="space-y-0.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`${triggerBase} ${hasActiveChild ? triggerActive : triggerIdle} scale-95 active:scale-90`}
      >
        <MaterialIcon name={icon} />
        <span className="flex-1">{title}</span>
        <MaterialIcon
          name="expand_more"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div className="space-y-0.5 pb-1" role="region" aria-label={title}>
          {items.map((item) => (
            <SidebarNavLink
              key={item.id}
              to={item.to}
              icon={item.icon}
              label={item.label}
              end
              nested
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
