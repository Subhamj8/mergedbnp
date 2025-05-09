import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ClientLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "client") return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-4"><h1 className="text-xl font-bold">Client Portal</h1></header>
      <Outlet />
    </div>
  );
};

export default ClientLayout;
