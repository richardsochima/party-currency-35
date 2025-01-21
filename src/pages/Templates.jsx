import React, { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import { useAuthenticated } from "../lib/hooks";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { Button } from "@/components/ui/button";

export default function Templates() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authenticated = useAuthenticated();

  const currencies = [
    {
      id: 1,
      denomination: "200",
      image: "/lovable-uploads/3038b010-3f71-40af-971b-cd5665ca3497.png",
      title: "Celebration of Life"
    },
    {
      id: 2,
      denomination: "500",
      image: "/lovable-uploads/67853c60-ef4c-4132-b2e2-6da7e8d8f4ea.png",
      title: "Happy Birthday!"
    },
    {
      id: 3,
      denomination: "1000",
      image: "/lovable-uploads/67853c60-ef4c-4132-b2e2-6da7e8d8f4ea.png",
      title: "Happy Birthday!"
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!authenticated) {
    return <LoadingDisplay />;
  }

  return (
    <div className="bg-white min-h-screen">
      <DashboardSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="md:pl-64">
        <DashboardHeader toggleMobileMenu={toggleMobileMenu} />

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-2">Currency Template</h1>
            <p className="text-gray-600 mb-6">Select a currency template to preview and personalize.</p>
            
            <div className="flex flex-col gap-6">
              {currencies.map((currency) => (
                <div
                  key={currency.id}
                  className="relative group bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={currency.image}
                      alt={`${currency.denomination} denomination`}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 right-4">
                        <Button
                          variant="secondary"
                          className="bg-white/90 hover:bg-white text-bluePrimary font-medium"
                        >
                          Customize
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}