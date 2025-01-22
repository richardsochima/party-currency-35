import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { EventSuccessModal } from "@/components/events/EventSuccessModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuth } from "@/lib/util";
import { BASE_URL } from "@/config";
import { fetchStates, fetchLGAs } from "@/services/locationService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";

const eventTypes = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Corporate Event",
  "Burial",
  "Other",
];

export default function CreateEvent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [eventId, setEventId] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const { data: states, isLoading: statesLoading, error: statesError } = useQuery({
    queryKey: ['states'],
    queryFn: fetchStates,
  });

  const { data: lgas, isLoading: lgasLoading, error: lgasError } = useQuery({
    queryKey: ['lgas', selectedState],
    queryFn: () => selectedState ? fetchLGAs(selectedState) : null,
    enabled: !!selectedState,
  });

  const [formData, setFormData] = useState({
    event_name: "",
    event_type: "",
    start_date: "",
    end_date: "",
    street_address: "",
    state: "",
    lga: "",
    reconciliation_service: false,
  });

  const validateDates = () => {
    const start = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    if (end < start) {
      toast.error("End date must be after start date");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setFormData(prev => ({
      ...prev,
      state: value,
      lga: "", // Reset LGA when state changes
    }));
  };

  const handleLGAChange = (value) => {
    setFormData(prev => ({
      ...prev,
      lga: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateDates()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { accessToken } = getAuth();
      const response = await fetch(`${BASE_URL}/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      setEventId(data.event_id);
      setShowSuccessModal(true);
      toast.success("Event created successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (statesError || lgasError) {
    toast.error("Failed to load location data. Please try again.");
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardSidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl font-semibold mb-8 text-left">Create Event</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">Event Name</label>
                <Input
                  required
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleInputChange}
                  minLength={3}
                  maxLength={100}
                  placeholder="Enter event name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">Event Type</label>
                <select
                  required
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">Start Date</label>
                <Input
                  required
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">End Date</label>
                <Input
                  required
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  min={formData.start_date || new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">Street Address</label>
                <Input
                  required
                  name="street_address"
                  value={formData.street_address}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">State</label>
                <Select
                  value={formData.state}
                  onValueChange={handleStateChange}
                  disabled={statesLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={statesLoading ? "Loading states..." : "Select state"} />
                  </SelectTrigger>
                  <SelectContent>
                    {states?.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-left block">LGA</label>
                <Select
                  value={formData.lga}
                  onValueChange={handleLGAChange}
                  disabled={!selectedState || lgasLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={
                      !selectedState 
                        ? "Select a state first" 
                        : lgasLoading 
                          ? "Loading LGAs..." 
                          : "Select LGA"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {lgas?.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reconciliation_service"
                name="reconciliation_service"
                checked={formData.reconciliation_service}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor="reconciliation_service" className="text-sm font-medium text-left">
                Enable Reconciliation Service
              </label>
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto px-8 bg-gold hover:bg-gold/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Creating Event...
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </form>
        </main>
      </div>

      {showSuccessModal && (
        <EventSuccessModal
          eventId={eventId}
          onClose={() => setShowSuccessModal(false)}
          onNavigate={() => navigate("/templates")}
        />
      )}
    </div>
  );
}