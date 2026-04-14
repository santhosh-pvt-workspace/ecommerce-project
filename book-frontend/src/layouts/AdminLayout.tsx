import React from "react";
import { Outlet, Link } from "react-router-dom";

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col gap-4 shadow-lg shrink-0">
        <h2 className="text-xl font-bold text-blue-400 border-b border-gray-700 pb-2">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className="p-2 hover:bg-gray-700 rounded transition-colors">Dashboard</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 text-gray-900 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
