
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper";
import { FormInput } from "@/components/forms/FormInput";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { SocialAuthButtons } from "@/components/forms/SocialAuthButtons";
import { signupCelebrantApi } from "@/api/authApi";
import { storeAuth } from "@/lib/util";
import { USER_PROFILE_CONTEXT } from "@/context";
import { formatErrorMessage } from "@/utils/errorUtils";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { toast } from "react-hot-toast";

const formSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    phone: z.string().startsWith("+234", "Phone number must start with +234").min(13, "Invalid phone number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function CelebrantSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "+234",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await signupCelebrantApi(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.phone
      );

      const data = await response.json();

      if (response.ok) {
        const accessToken = data.token;
        storeAuth(accessToken, "customer", true);
        setUserProfile(data.user);
        navigate("/dashboard");
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
          form.setError("phone", { 
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
  };

  if (loading) {
    return <LoadingDisplay />;
  }

  return (
    <AuthFormWrapper
      title="Sign up as Host/Event planner"
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
              placeholder="John"
              control={form.control}
              labelClassName="text-left"
            />
            <FormInput
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              control={form.control}
              labelClassName="text-left"
            />
          </div>

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            control={form.control}
            labelClassName="text-left"
          />

          <FormInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            control={form.control}
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            labelClassName="text-left"
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            control={form.control}
            showPasswordToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            labelClassName="text-left"
          />

          <PhoneInput
            label="Phone number"
            name="phone"
            placeholder="8012345678"
            control={form.control}
          />

          <Button
            type="submit"
            className="bg-footer hover:bg-[#2D2D2D] w-full"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create an account"}
          </Button>
        </form>
      </Form>

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
    </AuthFormWrapper>
  );
}
