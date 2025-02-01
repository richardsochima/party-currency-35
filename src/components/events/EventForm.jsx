import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { EventBasicInfo } from "./EventBasicInfo";
import { EventDateInfo } from "./EventDateInfo";
import { EventLocationInfo } from "./EventLocationInfo";
import { ReconciliationSection } from "./ReconciliationSection";

export const EventForm = ({ formData, handleInputChange, handleSubmit, isSubmitting }) => {
  const [showReconciliationInfo, setShowReconciliationInfo] = useState(false);
  const [customEventType, setCustomEventType] = useState("");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EventBasicInfo
          formData={formData}
          handleInputChange={handleInputChange}
          customEventType={customEventType}
          setCustomEventType={setCustomEventType}
        />

        <EventDateInfo
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <EventLocationInfo
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </div>

      <ReconciliationSection
        formData={formData}
        handleInputChange={handleInputChange}
        showReconciliationInfo={showReconciliationInfo}
        setShowReconciliationInfo={setShowReconciliationInfo}
      />

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
};