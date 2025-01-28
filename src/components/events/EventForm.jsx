import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { LocationSelect } from "./LocationSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EventForm({ formData, handleInputChange, handleSubmit, isSubmitting }) {
  const eventTypes = [
    "Birthday",
    "Wedding",
    "Anniversary",
    "Corporate Event",
    "Burial",
    "Other",
  ];

  const [showExplanation, setShowExplanation] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleEventTypeChange = (value) => {
    handleInputChange({
      target: {
        name: "event_type",
        value,
      },
    });
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const handleCheckboxChange = (e) => {
    if (!isChecked) {
      toggleExplanation(); // Show explanation on first click
    } else {
      handleInputChange(e); // Enable service on second click
    }
    setIsChecked(!isChecked);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Other form fields remain unchanged */}
        {/* ... */}
      </div>

      {/* Reconciliation Service Section */}
      <div className="space-y-4">
        {/* Checkbox and Label */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleExplanation}>
          <input
            type="checkbox"
            id="reconciliation_service"
            name="reconciliation_service"
            checked={formData.reconciliation_service}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 cursor-pointer"
          />
          <label htmlFor="reconciliation_service" className="text-sm font-medium text-left cursor-pointer">
            Enable Reconciliation Service
          </label>
        </div>

        {/* Explanation (Conditionally Rendered with Animation) */}
        {showExplanation && (
          <div
            className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ease-in-out"
          >
            <p className="text-sm text-gray-600">
              Party currency reconciliation service streamlines event management by providing foot soldiers to assist with currency transfers, a kiosk operator to convert party currency to real cash for guest artists, and an event wallet for hosts to monitor balances and transactions effortlessly, ensuring a stress-free experience with no risk of theft or fraud.
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
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
  );
}