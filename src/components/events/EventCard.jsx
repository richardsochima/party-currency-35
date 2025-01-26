import React from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
          <p className="text-gray-600">Date: {formatDate(event.date)}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            event.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {event.status}
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="outline">View Details</Button>
        <Button variant="outline">Manage Currencies</Button>
      </div>
    </div>
  );
}