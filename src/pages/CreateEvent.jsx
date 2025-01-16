import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { useAuthenticated } from "@/lib/hooks";
import LoadingDisplay from "@/components/LoadingDisplay";

// Form validation schema
const eventSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  event_type: z.string().min(1, "Event type is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  street_address: z.string().min(1, "Street address is required"),
  post_code: z.string().min(1, "Post code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  lga: z.string().min(1, "LGA is required"),
  reconciliation_service: z.boolean(),
});

const eventTypes = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Corporate Event",
  "Other",
];

const cities = ["Lagos", "Ibadan", "Abuja", "Port Harcourt", "Kano"];
const countries = ["Nigeria", "Ghana", "Kenya", "South Africa"];
const lgas = ["Ibadan North", "Ibadan South", "Akinyele", "Egbeda"];

export default function CreateEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [eventId, setEventId] = useState("");
  const navigate = useNavigate();
  const authenticated = useAuthenticated();

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      event_type: "",
      start_date: "",
      end_date: "",
      street_address: "",
      post_code: "",
      city: "",
      country: "",
      lga: "",
      reconciliation_service: false,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const result = await response.json();
      setEventId(result.event_id);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authenticated) {
    return <LoadingDisplay />;
  }

  return (
    <div className="bg-white min-h-screen">
      <DashboardSidebar />
      <div className="pl-64">
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Event Details</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormInput
                  control={form.control}
                  name="first_name"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <FormInput
                  control={form.control}
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormInput
                  control={form.control}
                  name="email"
                  label="Email Address"
                  placeholder="example@gmail.com"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Type</label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("event_type", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Starting Date</label>
                  <div className="relative">
                    <FormInput
                      control={form.control}
                      name="start_date"
                      type="date"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Ending Date</label>
                  <div className="relative">
                    <FormInput
                      control={form.control}
                      name="end_date"
                      type="date"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <FormInput
                control={form.control}
                name="street_address"
                label="Street Address"
                placeholder="Enter street address"
              />

              <div className="grid grid-cols-2 gap-6">
                <FormInput
                  control={form.control}
                  name="post_code"
                  label="Post Code"
                  placeholder="Enter post code"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("city", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("country", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country.toLowerCase()}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">LGA</label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("lga", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select LGA" />
                    </SelectTrigger>
                    <SelectContent>
                      {lgas.map((lga) => (
                        <SelectItem key={lga} value={lga.toLowerCase()}>
                          {lga}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Reconciliation Service
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="reconciliation_service"
                      value="yes"
                      onChange={() =>
                        form.setValue("reconciliation_service", true, {
                          shouldValidate: true,
                        })
                      }
                      className="form-radio"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="reconciliation_service"
                      value="no"
                      onChange={() =>
                        form.setValue("reconciliation_service", false, {
                          shouldValidate: true,
                        })
                      }
                      className="form-radio"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Event..." : "Create Event"}
              </Button>
            </form>
          </Form>
        </main>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Event Created Successfully!
              </h2>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Below is your unique Event ID. You can copy it for future reference.
            </p>
            <div className="bg-gray-100 p-3 rounded mb-4 text-center">
              <code>{eventId}</code>
            </div>
            <Button
              className="w-full bg-blueSecondary hover:bg-blueSecondary/90 text-white"
              onClick={() => navigate("/templates")}
            >
              Choose Currency Template
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}