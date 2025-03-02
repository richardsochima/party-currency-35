
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { NameInputs } from "@/components/forms/NameInputs";
import { PasswordInputs } from "@/components/forms/PasswordInputs";
import { BusinessInfoInputs } from "./BusinessInfoInputs";
import { SocialAuthButtons } from "@/components/forms/SocialAuthButtons";
import { TermsAndConditions } from "@/components/forms/TermsAndConditions";
import { merchantSignupSchema } from "@/lib/validations/auth";
import { USER_PROFILE_CONTEXT } from "@/context";
import { signupMerchantApi } from "@/api/authApi";
import { storeAuth } from "@/lib/util";
import { formatErrorMessage } from "@/utils/errorUtils";
import { toast } from "react-hot-toast";

export function MerchantSignupForm() {
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <NameInputs form={form} />

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

          <PasswordInputs 
            form={form} 
            showPassword={showPassword} 
            setShowPassword={setShowPassword} 
            showConfirmPassword={showConfirmPassword} 
            setShowConfirmPassword={setShowConfirmPassword} 
          />

          <BusinessInfoInputs form={form} />

          <Button type="submit" className="w-full bg-paragraph" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <SocialAuthButtons />
          <TermsAndConditions />
        </form>
      </Form>
    </>
  );
}
