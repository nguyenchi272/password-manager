import { Navigate } from "react-router-dom";
import { useAuthStore } from "../state/auth.store";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token);

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
