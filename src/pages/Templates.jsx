import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import { useAuthenticated } from "../lib/hooks";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { Button } from "@/components/ui/button";
import { CurrencyEditor } from "@/components/CurrencyEditor";
import CurrencyBreakdown from "@/components/CurrencyBreakdown";

export default function Templates() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isCustomized, setIsCustomized] = useState(false);
  const navigate = useNavigate();
  const authenticated = useAuthenticated();

  const currencies = [
    {
      id: 1,
      denomination: "200",
      image: "/lovable-uploads/200-front.jpg",
      title: "Celebration of Life",
      path: "/customize-200"
    },
    {
      id: 2,
      denomination: "500",
      image: "/lovable-uploads/500-front.jpg",
      title: "Happy Birthday!",
      path: "/customize-500"
    },
    {
      id: 3,
      denomination: "1000",
      image: "/lovable-uploads/1000-front.jpg",
      title: "Happy Birthday!",
      path: "/customize-1000"
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCustomize = (path) => {
    setIsCustomized(true);
    navigate(path);
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
            <p className="text-gray-600 mb-6">
              Select a currency template to preview and personalize.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currencies.map((currency) => (
                <div
                  key={currency.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden group"
                >
                  <div className="relative aspect-[3/2]">
                    <img
                      src={currency.image}
                      alt={`₦${currency.denomination} denomination`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        onClick={() => handleCustomize(currency.path)}
                        className="bg-bluePrimary hover:bg-bluePrimary/90 text-white font-medium"
                      >
                        Customize
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-bluePrimary">₦{currency.denomination}</h3>
                    <p className="text-gray-600">{currency.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <CurrencyBreakdown isEnabled={isCustomized} />
            </div>
          </div>
        </main>
      </div>

      {showEditor && (
        <CurrencyEditor
          currencyImage="/lovable-uploads/aa99ff96-d8a0-496f-b5b4-2fbbdfd720ec.png"
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}