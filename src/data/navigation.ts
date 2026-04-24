import type { NavItem, NavSubItem } from "@/types/navigation";

export const mainNavItems: NavItem[] = [
  { id: "dashboard", label: "Inicio", icon: "dashboard", to: "/" },
  { id: "products", label: "Productos", icon: "inventory_2", to: "/productos" },
  { id: "stock", label: "Inventario", icon: "inventory", to: "/inventario" },
  { id: "sales", label: "Ventas", icon: "payments", to: "/ventas" },
  { id: "reports", label: "Reportes", icon: "analytics", to: "/reportes" },
];

export const configuracionNavItems: NavSubItem[] = [
  {
    id: "cfg-general",
    label: "Unidades de medida",
    icon: "scale",
    to: "/configuracion/unidades-de-medida",
  },
  {
    id: "cfg-formas-de-pago",
    label: "Formas de pago",
    icon: "payments",
    to: "/configuracion/formas-de-pago",
  },
  {
    id: "cfg-usuarios",
    label: "Usuarios",
    icon: "group",
    to: "/configuracion/usuarios",
  },
  // {
  //   id: "cfg-notificaciones",
  //   label: "Notificaciones",
  //   icon: "notifications",
  //   to: "/configuracion/notificaciones",
  // },
  {
    id: "cfg-integraciones",
    label: "Ajustes",
    icon: "settings",
    to: "/configuracion/ajustes",
  },
  {
    id: "cfg-integraciones",
    label: "Negocio",
    icon: "business",
    to: "/configuracion/negocio",
  },
];
