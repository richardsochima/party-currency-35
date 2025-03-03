
import { Navigate } from "react-router-dom";
import { getAuth } from "@/lib/util";

export default function PrivateRoute({ children, userType }) {
  const { accessToken, userType: currentUserType } = getAuth();
  console.log("PrivateRoute check - Required type:", userType, "Current type:", currentUserType);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // Redirect to appropriate dashboard if user type doesn't match
  if (userType && userType !== currentUserType) {
    const redirectPath = currentUserType === "merchant" 
      ? "/merchant/transactions" 
      : "/dashboard";
    console.log("Redirecting to:", redirectPath);
    return <Navigate to={redirectPath} />;
  }

  return children;
}
