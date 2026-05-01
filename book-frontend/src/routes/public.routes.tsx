import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/Public/HomePage";
import { ProductDetailPage } from "@/pages/Public/ProductDetailPage";
import type { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path : "products/:id",
        element : <ProductDetailPage />,
      }
      // Note: add /login here later
    ],
  },
];
