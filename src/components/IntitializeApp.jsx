
import { useEffect, useContext } from "react";
import { USER_PROFILE_CONTEXT } from "@/context";
import { getProfileApi } from "@/api/authApi";
import { getAuth, storeAuth } from "@/lib/util";

export function InitializeApp({ children }) {
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);

  useEffect(() => {
    const { accessToken, userType } = getAuth();
    if (accessToken) {
      getProfileApi()
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable to fetch profile");
          }
          return response.json();
        })
        .then((profile) => {
          // Update user type if profile indicates this is a merchant
          if ((profile.merchant_details || profile.business_type) && userType !== "merchant") {
            console.log("Profile indicates merchant, updating user type");
            storeAuth(accessToken, "merchant", true);
          }
          
          setUserProfile(profile);
          console.log("Profile initialized:", profile);
        })
        .catch((error) => {
          console.error("Profile fetch error:", error);
        });
    }
  }, []);

  return <div>{children}</div>;
}
