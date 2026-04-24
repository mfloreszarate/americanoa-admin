import { Outlet, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NewSalePage } from "@/pages/NewSalePage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import 'react-loading-skeleton/dist/skeleton.css'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<DashboardPage />} />
        <Route
          path="/inventario"
          element={<PlaceholderPage title="Inventario" />}
        />
        <Route path="/ventas" element={<PlaceholderPage title="Ventas" />} />
        <Route path="/ventas/nueva" element={<NewSalePage />} />
        <Route
          path="/reportes"
          element={<PlaceholderPage title="Reportes" />}
        />
        <Route path="/configuracion" element={<Outlet />}>
          <Route
            path="unidades-de-medida"
            element={
              <PlaceholderPage title="Configuración — Unidades de medida" />
            }
          />
          <Route
            path="usuarios"
            element={<PlaceholderPage title="Configuración — Usuarios" />}
          />
          <Route
            path="formas-de-pago"
            element={<PlaceholderPage title="Configuración — Formas de pago" />}
          />
          <Route
            path="ajustes"
            element={<PlaceholderPage title="Configuración — Ajustes" />}
          />
          <Route
            path="negocio"
            element={<PlaceholderPage title="Configuración — Negocio" />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
