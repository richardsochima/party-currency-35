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
      image: "/currency-200.png",
    },
    {
      id: 2,
      denomination: "500",
      image: "/currency-500.png",
    },
    {
      id: 3,
      denomination: "1000",
      image: "/currency-1000.png",
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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Currency Templates</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currencies.map((currency) => (
                <div
                  key={currency.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-[16/9] relative">
                    <img
                      src={currency.image}
                      alt={`${currency.denomination} denomination`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        {currency.denomination} Denomination
                      </h3>
                      <Button
                        variant="outline"
                        className="text-bluePrimary border-bluePrimary hover:bg-bluePrimary hover:text-white"
                      >
                        Customize
                      </Button>
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