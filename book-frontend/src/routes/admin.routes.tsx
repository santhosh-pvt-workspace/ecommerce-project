import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminDashboard } from "@/pages/Admin/AdminDashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import type { RouteObject } from "react-router-dom";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <ProtectedRoute role="admin" />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
];
