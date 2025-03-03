
import { useEffect, useContext } from "react";
import { USER_PROFILE_CONTEXT } from "@/context";
import { getProfileApi } from "@/api/authApi";
import { getAuth, storeAuth } from "@/lib/util";
import { toast } from "react-hot-toast";

export function InitializeApp({ children }) {
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);

  useEffect(() => {
    const { accessToken, userType } = getAuth();
    console.log("InitializeApp - Current user type:", userType);
    
    if (accessToken) {
      getProfileApi()
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable to fetch profile");
          }
          return response.json();
        })
        .then((profile) => {
          // Determine if this is a merchant based on profile data
          const hasMerchantDetails = profile.merchant_details || profile.business_type;
          
          // Update user type if profile indicates this is a merchant but stored type doesn't match
          if (hasMerchantDetails && userType !== "merchant") {
            console.log("Profile indicates merchant, updating user type from:", userType, "to: merchant");
            storeAuth(accessToken, "merchant", true);
          }
          // Update user type if profile indicates this is a customer but stored type is merchant
          else if (!hasMerchantDetails && userType === "merchant") {
            console.log("Profile indicates customer, updating user type from:", userType, "to: customer");
            storeAuth(accessToken, "customer", true);
          }
          
          setUserProfile(profile);
          console.log("Profile initialized:", profile);
        })
        .catch((error) => {
          console.error("Profile fetch error:", error);
          toast.error("Failed to load user profile");
        });
    }
  }, []);

  return <div>{children}</div>;
}
