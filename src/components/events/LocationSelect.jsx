import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fetchStates = async () => {
  const response = await fetch("https://nga-states-lga.onrender.com/fetch");
  const data = await response.json();
  return data.states;
};

const fetchLGAs = async (state) => {
  if (!state) return [];
  const response = await fetch(`https://nga-states-lga.onrender.com/?state=${state}`);
  const data = await response.json();
  return data.lga;
};

export function LocationSelect({ formData, handleInputChange }) {
  const {
    data: states,
    isLoading: statesLoading,
    error: statesError
  } = useQuery({
    queryKey: ["states"],
    queryFn: fetchStates
  });

  const {
    data: lgas,
    isLoading: lgasLoading,
    error: lgasError
  } = useQuery({
    queryKey: ["lgas", formData.state],
    queryFn: () => fetchLGAs(formData.state),
    enabled: !!formData.state
  });

  const handleStateChange = (value) => {
    handleInputChange({
      target: {
        name: "state",
        value
      }
    });
    handleInputChange({
      target: {
        name: "lga",
        value: ""
      }
    });
  };

  const handleLGAChange = (value) => {
    handleInputChange({
      target: {
        name: "lga",
        value
      }
    });
  };

  if (statesError || lgasError) {
    return <div>Error loading location data</div>;
  }

  return (
    <>
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
          disabled={!formData.state || lgasLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={
              !formData.state
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
    </>
  );
}