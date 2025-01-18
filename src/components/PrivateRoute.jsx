import { Navigate } from "react-router-dom";
import { useAuthenticated } from "../lib/hooks";

export default function PrivateRoute({ children }) {
  const authenticated = useAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}