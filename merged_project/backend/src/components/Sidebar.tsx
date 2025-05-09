import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">BNP Media</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">My Profile</Link>
        <Link to="/orders" className="hover:bg-gray-700 p-2 rounded">My Orders</Link>
        <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">Admin Dashboard</Link>
        <Link to="/admin/products" className="hover:bg-gray-700 p-2 rounded">Admin Products</Link>
        <Link to="/admin/orders" className="hover:bg-gray-700 p-2 rounded">Admin Orders</Link>
        <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">Admin Users</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
