import React from "react";
import { Outlet } from "react-router-dom";
import { CartDrawer } from "../components/CartDrawer";
import { HeaderNavBar } from "../components/HeaderNavBar";

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderNavBar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <CartDrawer />
      <footer className="border-t bg-muted/40 p-4 text-center w-full text-sm text-muted-foreground">
        © {new Date().getFullYear()} Storefront. All rights reserved.
      </footer>
    </div>
  );
};
