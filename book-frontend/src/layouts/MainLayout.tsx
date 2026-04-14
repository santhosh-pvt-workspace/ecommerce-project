import React from "react";
import { Outlet, Link } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Storefront
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="hover:text-blue-600">Home</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <footer className="bg-gray-100 p-4 text-center mt-auto w-full text-sm text-gray-500">
        © {new Date().getFullYear()} Storefront. All rights reserved.
      </footer>
    </div>
  );
};
