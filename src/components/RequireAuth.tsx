import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useApp } from "@/context/AppContext";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default RequireAuth;