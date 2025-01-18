import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { useAuthenticated } from "@/lib/hooks";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { createEventApi } from "@/api/eventApi";
import toast from "react-hot-toast";

export default function CreateEvent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const authenticated = useAuthenticated();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await createEventApi(data);
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      const result = await response.json();
      toast.success("Event created successfully!");
      navigate("/templates");
    } catch (err) {
      toast.error(err.message || "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authenticated) {
    return <LoadingDisplay />;
  }

  return (
    <div className="bg-gradientWhite1 min-h-screen">
      <DashboardSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="md:pl-64">
        <div className="fixed top-0 right-0 left-0 md:left-64 z-10 bg-white">
          <DashboardHeader toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>

        <main className="pt-24 p-4 md:p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-playfair font-semibold text-bluePrimary mb-8">
            Create New Event
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="auth-input-label text-bluePrimary">Event Name</label>
              <input
                {...register("event_name", { required: "Event name is required" })}
                className="auth-input px-4 py-2 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-bluePrimary"
                placeholder="Enter event name"
              />
              {errors.event_name && (
                <p className="text-red-500 text-sm">{errors.event_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="auth-input-label text-bluePrimary">Event Description</label>
              <textarea
                {...register("event_description", { required: "Description is required" })}
                className="auth-input px-4 py-2 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-bluePrimary min-h-[100px]"
                placeholder="Describe your event"
              />
              {errors.event_description && (
                <p className="text-red-500 text-sm">{errors.event_description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="auth-input-label text-bluePrimary">Event Date</label>
              <div className="relative">
                <input
                  type="date"
                  {...register("event_date", { required: "Event date is required" })}
                  className="auth-input px-4 py-2 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-bluePrimary"
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.event_date && (
                <p className="text-red-500 text-sm">{errors.event_date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="auth-input-label text-bluePrimary">Event Address</label>
              <input
                {...register("address", { required: "Event address is required" })}
                className="auth-input px-4 py-2 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-bluePrimary"
                placeholder="Enter event venue address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="auth-input-label text-bluePrimary">Delivery Address</label>
              <input
                {...register("delivery_address", { required: "Delivery address is required" })}
                className="auth-input px-4 py-2 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-bluePrimary"
                placeholder="Enter delivery address"
              />
              {errors.delivery_address && (
                <p className="text-red-500 text-sm">{errors.delivery_address.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-gold hover:bg-gold/90 text-white font-medium py-2 px-8 rounded-lg transition-colors"
            >
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}