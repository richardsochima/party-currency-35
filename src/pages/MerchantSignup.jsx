
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper";
import { FormInput } from "@/components/forms/FormInput";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { SocialAuthButtons } from "@/components/forms/SocialAuthButtons";
import { merchantSignupSchema } from "@/lib/validations/auth";
import { USER_PROFILE_CONTEXT } from "@/context";
import { signupMerchantApi } from "@/api/authApi";
import { storeAuth } from "@/lib/util";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { formatErrorMessage } from "../utils/errorUtils";
import { toast } from "react-hot-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function MerchantSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(merchantSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      businessType: "",
      country: "Nigeria",
      state: "",
      city: "",
      phoneNumber: "+234",
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    try {
      const response = await signupMerchantApi(values);
      const data = await response.json();

      if (response.ok) {
        const accessToken = data.token;
        storeAuth(accessToken, "merchant", true);
        setUserProfile(data.user);
        navigate("/merchant/transactions");
      } else {
        const errorData = formatErrorMessage(data);
        console.log("API Error response:", errorData);
        
        // Handle email-specific errors, whether they're in email field or detail field
        if (errorData.email) {
          form.setError("email", { 
            type: "manual", 
            message: Array.isArray(errorData.email) ? errorData.email[0] : errorData.email 
          });
        } else if (errorData.detail && errorData.detail.toLowerCase().includes("email")) {
          form.setError("email", { 
            type: "manual", 
            message: errorData.detail 
          });
        }
        
        // Handle other field-specific errors
        if (errorData.phone_number) {
          form.setError("phoneNumber", { 
            type: "manual", 
            message: Array.isArray(errorData.phone_number) ? errorData.phone_number[0] : errorData.phone_number 
          });
        }
        if (errorData.password) {
          form.setError("password", { 
            type: "manual", 
            message: Array.isArray(errorData.password) ? errorData.password[0] : errorData.password 
          });
        }
        if (errorData.first_name) {
          form.setError("firstName", { 
            type: "manual", 
            message: Array.isArray(errorData.first_name) ? errorData.first_name[0] : errorData.first_name 
          });
        }
        if (errorData.last_name) {
          form.setError("lastName", { 
            type: "manual", 
            message: Array.isArray(errorData.last_name) ? errorData.last_name[0] : errorData.last_name 
          });
        }
        if (errorData.business_type) {
          form.setError("businessType", { 
            type: "manual", 
            message: Array.isArray(errorData.business_type) ? errorData.business_type[0] : errorData.business_type 
          });
        }
        if (errorData.state) {
          form.setError("state", { 
            type: "manual", 
            message: Array.isArray(errorData.state) ? errorData.state[0] : errorData.state 
          });
        }
        if (errorData.city) {
          form.setError("city", { 
            type: "manual", 
            message: Array.isArray(errorData.city) ? errorData.city[0] : errorData.city 
          });
        }
        
        // Show generic toast error only if we couldn't map any specific field errors
        const hasSetFieldErrors = Object.keys(form.formState.errors).length > 0;
        if (!hasSetFieldErrors && errorData.message) {
          toast.error(typeof errorData.message === 'string' ? errorData.message : "Signup failed. Please check your information and try again.");
        }
      }
    } catch (error) {
      toast.error("Network error occurred. Please check your connection and try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingDisplay />;
  }

  return (
    <AuthFormWrapper
      title="Sign up as merchant"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkPath="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="gap-4 grid grid-cols-2">
            <FormInput
              label="First Name"
              name="firstName"
              control={form.control}
              placeholder="John"
              labelClassName="text-left"
            />
            <FormInput
              label="Last Name"
              name="lastName"
              control={form.control}
              placeholder="Doe"
              labelClassName="text-left"
            />
          </div>

          <FormInput
            label="Email"
            name="email"
            type="email"
            control={form.control}
            placeholder="john@example.com"
            labelClassName="text-left"
          />

          <PhoneInput
            label="Phone Number"
            name="phoneNumber"
            control={form.control}
            placeholder="8012345678"
          />

          <FormInput
            label="Password"
            name="password"
            control={form.control}
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            labelClassName="text-left"
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            control={form.control}
            showPasswordToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            labelClassName="text-left"
          />

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 text-left">
                Business Type
              </label>
              <Select
                onValueChange={(value) => form.setValue("businessType", value)}
                defaultValue={form.getValues("businessType")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kiosk">Kiosk operator</SelectItem>
                  <SelectItem value="foot-soldier">Foot soldier</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.businessType && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.businessType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 text-left">
                Country
              </label>
              <input
                type="text"
                id="country"
                value="Nigeria"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
              />
            </div>

            <div className="gap-4 grid grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 text-left">
                  State
                </label>
                <FormInput
                  name="state"
                  control={form.control}
                />
                {form.formState.errors.state && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.state.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">
                  City
                </label>
                <FormInput
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ikeja">Ikeja</SelectItem>
                        <SelectItem value="lekki">Lekki</SelectItem>
                        <SelectItem value="vi">Victoria Island</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.city && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-paragraph" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <SocialAuthButtons />
          <div className="text-center text-sm">
            By clicking "Create an Account" above, you acknowledge that you have
            read, understood, and agree to Party Currency's{" "}
            <a href="/terms" className="text-gold hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-gold hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </form>
      </Form>
    </AuthFormWrapper>
  );
}
