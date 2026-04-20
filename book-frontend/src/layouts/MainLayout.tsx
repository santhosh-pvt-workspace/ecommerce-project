import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useStore } from "../store";
import { CartDrawer } from "../components/CartDrawer";
import { observer } from "mobx-react-lite";
import { useCartQuery } from "../queries/cartQueries";

export const MainLayout: React.FC = observer(() => {
  const { cartStore } = useStore();
  const { data: cartData } = useCartQuery();
  const cartItemsCount = cartData?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Storefront
          </Link>
          <nav className="flex gap-4 items-center">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <button 
              onClick={() => cartStore.openCart()} 
              className="relative p-2 text-gray-600 hover:text-blue-600 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <CartDrawer />
      <footer className="bg-gray-100 p-4 text-center mt-auto w-full text-sm text-gray-500">
        © {new Date().getFullYear()} Storefront. All rights reserved.
      </footer>
    </div>
  );
});
