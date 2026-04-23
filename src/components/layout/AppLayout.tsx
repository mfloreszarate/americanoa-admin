import { Outlet } from "react-router-dom";
import { SideNavBar } from "@/components/layout/SideNavBar";
import { mainNavItems } from "@/data/navigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SideNavBar items={mainNavItems} />
      <div className="ml-64 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
