
import React, { useState } from "react";
import { MerchantSidebar } from "@/components/merchant/MerchantSidebar";
import MerchantHeader from "@/components/merchant/MerchantHeader";
import { EventHistoryTable } from "@/components/merchant/EventHistoryTable";
import { useAuthenticated } from "@/lib/hooks";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { CalendarDays } from "lucide-react";

export default function EventHistory() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authenticated = useAuthenticated();

  // Mock data for events
  const events = [
    {
      id: "EVT001",
      name: "Adams 50th Birthday Celebration",
      date: "2024-03-15",
      status: "completed",
      location: "Lagos, Nigeria"
    },
    {
      id: "EVT002",
      name: "Johnson Wedding Anniversary",
      date: "2024-04-01",
      status: "upcoming",
      location: "Abuja, Nigeria"
    },
    {
      id: "EVT003",
      name: "Corporate Launch Event",
      date: "2024-04-20",
      status: "upcoming",
      location: "Port Harcourt, Nigeria"
    }
  ];

  if (!authenticated) {
    return <LoadingDisplay />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MerchantSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <div className="md:pl-64 flex flex-col min-h-screen">
        <MerchantHeader 
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
        
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Event History</h1>
            </div>
            
            {events.length > 0 ? (
              <EventHistoryTable events={events} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No events yet</h3>
                <p className="text-gray-500">
                  Your event history will appear here once you participate in events.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
