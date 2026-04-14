import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";

interface ProtectedRouteProps {
  role?: string;
}

export const ProtectedRoute = observer(({ role }: ProtectedRouteProps) => {
  const { authStore } = useStore();

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && authStore.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
});
