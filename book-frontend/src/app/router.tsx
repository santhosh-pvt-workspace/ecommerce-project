import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "@/routes/public.routes";
import { adminRoutes } from "@/routes/admin.routes";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...adminRoutes,
]);
