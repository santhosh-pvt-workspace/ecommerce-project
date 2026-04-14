import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/Public/HomePage";
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
      // Note: add /login here later
    ],
  },
];
