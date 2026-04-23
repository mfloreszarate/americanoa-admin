import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

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
        <Route
          path="/reportes"
          element={<PlaceholderPage title="Reportes" />}
        />
      </Route>
    </Routes>
  );
}
