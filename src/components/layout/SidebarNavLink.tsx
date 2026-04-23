import { NavLink } from "react-router-dom";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface SidebarNavLinkProps {
  to: string;
  icon: string;
  label: string;
  /** Use exact matching for the index route. */
  end?: boolean;
}

export function SidebarNavLink({
  to,
  icon,
  label,
  end = false,
}: SidebarNavLinkProps) {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-lg font-manrope text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-stone-100/50 dark:hover:bg-stone-900/50 transition-colors scale-95 active:scale-90 duration-200";
  const activeCls =
    "font-bold text-purple-900 dark:text-white border-r-4 border-lime-500 hover:bg-stone-100/50 dark:hover:bg-stone-900/50";

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `${base} ${isActive ? activeCls : ""}`.trim()}
    >
      <MaterialIcon name={icon} />
      {label}
    </NavLink>
  );
}
