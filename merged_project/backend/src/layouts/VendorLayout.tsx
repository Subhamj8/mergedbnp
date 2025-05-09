import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const VendorLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "vendor") return <Navigate to="/" />;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Vendor Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li><a href="/vendor/dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/vendor/products" className="hover:underline">Products</a></li>
            <li><a href="/vendor/orders" className="hover:underline">Orders</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;
