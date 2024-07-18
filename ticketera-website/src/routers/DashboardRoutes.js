import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

// Importaciones de componentes raíz
import { MainScreen } from "../components/root/MainScreen";

// Importaciones de constantes
import { UserRol } from "../helpers/constants";

// Importaciones de componentes de autenticación
import { InvalidSession } from "../components/auth/InvalidSession";

// Importaciones de componentes específicos
import Dashboard from "../components/dashboard/dashboard/Dashboard";
import Admin from "../components/admin/Admin";
import Reports from "../components/reports/Reports";
import { TicketDetail } from "../components/ticket/TicketDetail/TicketDetail";

// Importaciones de páginas
import Products from "../components/ProductPage/Products";
import Marca from "../components/Brands/Brands";

export const DashboardRoutes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth, shallowEqual);

  if (
    user?.roles?.includes(UserRol.LocalSM) ||
    user?.roles?.includes(UserRol.LocalTEC)
  ) {
    // ADMINISTRADOR
    return (
      <Routes>
        {/*  <Route path="tickets" element={<MainScreen />} /> */}

        <Route path="/tickets">
          <Route index element={<MainScreen />} />
          <Route path=":id" element={<TicketDetail />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/administration" element={<Admin />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/product" element={<Products />} />
        <Route path="/marca" element={<Marca />} />

        {/* <Route path="tickets/:id" element={ <TicketDetail /> } />
         */}

        <Route path="/" element={<Navigate to="/tickets" />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/tickets" />} />
        <Route path="/tickets">
          <Route index element={<MainScreen />} />
          <Route path=":id" element={<TicketDetail />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/administration" element={<Admin />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/create" element={<Create />} />

        <Route path="error" element={<InvalidSession />} />
        <Route path="/" element={<Navigate to="/error" />} />
      </Routes>
    );
  }
};
