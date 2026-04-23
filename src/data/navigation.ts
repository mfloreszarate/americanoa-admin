import type { NavItem } from "@/types/navigation";

export const mainNavItems: NavItem[] = [
  { id: "dashboard", label: "Inicio", icon: "dashboard", to: "/" },
  { id: "products", label: "Productos", icon: "inventory_2", to: "/productos" },
  { id: "stock", label: "Inventario", icon: "inventory", to: "/inventario" },
  { id: "sales", label: "Ventas", icon: "payments", to: "/ventas" },
  { id: "reports", label: "Reportes", icon: "analytics", to: "/reportes" },
];
