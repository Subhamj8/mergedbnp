import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import ProfilePage from "./pages/ProfilePage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

// Admin
import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminOrdersPage from "./pages/admin/OrdersPage";
import AdminUsersPage from "./pages/admin/UsersPage";

// Vendor
import VendorDashboardPage from "./pages/vendor/DashboardPage";
import VendorOrdersPage from "./pages/vendor/OrdersPage";
import VendorProductsPage from "./pages/vendor/ProductsPage";

// Layouts
import VendorLayout from "./layouts/VendorLayout";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/order/confirmation" element={<OrderConfirmationPage />} />

      {/* Client Protected Routes */}
      <Route path="/" element={<ClientLayout />}>
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>

      {/* Vendor */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route path="dashboard" element={<VendorDashboardPage />} />
        <Route path="products" element={<VendorProductsPage />} />
        <Route path="orders" element={<VendorOrdersPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
