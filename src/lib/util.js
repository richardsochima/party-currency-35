
import { ACCESS_TOKEN_DURATION } from "@/config";
import Cookies from "js-cookie";

export function storeAuth(
  accessToken,
  userType = "customer",
  rememberMe = true
) {
  // Store user type - 'customer' or 'merchant'
  localStorage.setItem("userType", userType);
  console.log("Storing user type:", userType); // Debug log

  if (rememberMe) {
    Cookies.set("accessToken", accessToken, { expires: ACCESS_TOKEN_DURATION });
  } else {
    // deletes automatically when the user exits the browser
    Cookies.set("accessToken", accessToken);
  }
}

export function getAuth() {
  const accessToken = Cookies.get("accessToken");
  const userType = localStorage.getItem("userType") || "customer";
  console.log("Getting user type:", userType); // Debug log

  return { accessToken, userType };
}

export function deleteAuth() {
  Cookies.remove("accessToken");
  // We'll now clear the userType on logout to ensure a clean state for the next login
  localStorage.removeItem("userType");
  console.log("Auth cleared on logout");
}
