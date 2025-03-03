
import { Navigate } from "react-router-dom";
import { getAuth } from "@/lib/util";
import { toast } from "react-hot-toast";

export default function PrivateRoute({ children, userType }) {
  const { accessToken, userType: currentUserType } = getAuth();
  console.log("PrivateRoute check - Required type:", userType, "Current type:", currentUserType);

  if (!accessToken) {
    console.log("No access token, redirecting to login");
    return <Navigate to="/login" />;
  }

  // Redirect to appropriate dashboard if user type doesn't match
  if (userType && userType !== currentUserType) {
    const redirectPath = currentUserType === "merchant" 
      ? "/merchant/transactions" 
      : "/dashboard";
    console.log(`User type mismatch. Required: ${userType}, Current: ${currentUserType}. Redirecting to:`, redirectPath);
    
    // Add toast to inform user why they're being redirected
    toast.info(`Redirected to ${currentUserType === "merchant" ? "merchant" : "celebrant"} area`);
    
    return <Navigate to={redirectPath} />;
  }

  return children;
}
