
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { getProfileApi, loginCustomerApi } from "@/api/authApi";
import { storeAuth } from "@/lib/util";
import { validateAdminCredentials, setAdminAuth } from '@/lib/admin-auth';
import { USER_PROFILE_CONTEXT, SIGNUP_CONTEXT } from "@/context";
import { formatErrorMessage } from "../utils/errorUtils";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const { setSignupOpen } = useContext(SIGNUP_CONTEXT);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (validateAdminCredentials(identifier, password)) {
      setAdminAuth(identifier);
      navigate("/admin/dashboard");
      return;
    }

    if (!identifier.includes('@')) {
      setErrorMessage("Please enter a valid email address for customer login");
      setLoading(false);
      return;
    }

    try {
      const response = await loginCustomerApi(identifier, password);
      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        const accessToken = data.token;
        
        // Initially, determine user type based on API response
        let initialUserType = "customer"; // Default to customer
        
        // Check if API response has explicit user_type field
        if (data.user_type && data.user_type.toLowerCase() === "merchant") {
          initialUserType = "merchant";
          console.log("API response indicates merchant user type");
        }
        
        // First store auth with the initial user type
        storeAuth(accessToken, initialUserType, true);

        try {
          // Fetch user profile to confirm user type
          const userProfileResponse = await getProfileApi();
          
          if (userProfileResponse.ok) {
            const userProfileData = await userProfileResponse.json();
            console.log("User profile data:", userProfileData);
            
            // Check if the profile has merchant indicators
            const hasMerchantDetails = userProfileData.merchant_details || userProfileData.business_type;
            
            // If profile confirms user is a merchant, update the stored user type
            if (hasMerchantDetails) {
              console.log("Profile confirms merchant user type via merchant_details or business_type");
              storeAuth(accessToken, "merchant", true);
              setUserProfile(userProfileData);
              
              // Redirect to merchant transactions page
              console.log("Redirecting to merchant transactions page");
              toast.success("Logged in as merchant");
              navigate("/merchant/transactions");
            } else {
              // User is confirmed as a regular customer/celebrant
              console.log("Profile confirms customer/celebrant user type");
              setUserProfile(userProfileData);
              
              // Redirect to customer dashboard
              console.log("Redirecting to customer dashboard");
              toast.success("Logged in successfully");
              navigate("/dashboard");
            }
          } else {
            throw new Error("Failed to fetch user profile");
          }
        } catch (profileError) {
          console.error("Profile fetch error:", profileError);
          
          // If we can't get the profile, use the initial user type from login
          if (initialUserType === "merchant") {
            console.log("Falling back to merchant type from login response");
            navigate("/merchant/transactions");
          } else {
            console.log("Falling back to customer type from login response");
            navigate("/dashboard");
          }
        }
      } else {
        const errorMsg = formatErrorMessage(data);
        setErrorMessage(errorMsg);
        toast.error(errorMsg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = formatErrorMessage(error) || "An error occurred. Please try again later.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-screen">
      <div className="top-4 left-4 md:left-8 absolute">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-black transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span className="ml-2 text-sm md:text-base">Back</span>
        </button>
      </div>

      <div className="space-y-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src="/logo.svg"
            alt="Party Currency Logo"
            width={60}
            height={60}
            className="mb-6"
          />
          <h1 className="font-playfair text-3xl">Welcome back!</h1>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2 text-left">
            <Label htmlFor="identifier">Email or Username</Label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="border-lightgray"
              placeholder="Enter your email or username"
            />
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-lightgray"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <Button
            type="submit"
            className="bg-[#1A1A1A] hover:bg-[#2D2D2D] w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="border-t border-lightgray w-full"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-2">
            <Button variant="outline" className="border-lightgray">
              <img src="/google.svg" alt="Google" className="mr-2 w-5 h-5" />
              Google
            </Button>
            <Button variant="outline" className="border-lightgray">
              <img src="/apple.svg" alt="Apple" className="mr-2 w-5 h-5" />
              Apple
            </Button>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <Link
            to="/forgot-password"
            className="text-muted-foreground text-sm hover:underline"
          >
            Forgotten password?
          </Link>
          <div className="text-sm">
            <span>New to Party Currency? </span>
            <button
              type="button"
              onClick={() => setSignupOpen(true)}
              className="text-gold hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
