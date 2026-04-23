import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { SidebarNavLink } from "@/components/layout/SidebarNavLink";
import type { NavItem } from "@/types/navigation";
import Logo from "@/assets/logo.png";

interface SideNavBarProps {
  items: NavItem[];
  brandTitle?: string;
  brandSubtitle?: string;
}

export function SideNavBar({
  items,
  brandTitle = "América NOA",
  brandSubtitle = "Botanical Archivist",
}: SideNavBarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-stone-50 px-4 py-8 dark:bg-stone-950">
      <div className="mb-10 px-4">
        <img src={Logo} alt={brandTitle} className="mx-auto h-auto w-24" />
        <p className="sr-only">{brandSubtitle}</p>
      </div>
      <nav className="flex flex-1 flex-col space-y-1">
        {items.map((item) => (
          <SidebarNavLink
            key={item.id}
            to={item.to}
            icon={item.icon}
            label={item.label}
            end={item.to === "/"}
          />
        ))}
      </nav>
      <div className="mt-auto px-4">
        <button
          type="button"
          className="flex w-full scale-95 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-container px-4 py-3 font-bold text-white transition-transform active:scale-90"
        >
          <MaterialIcon name="add" />
          Nueva Venta
        </button>
      </div>
    </aside>
  );
}
