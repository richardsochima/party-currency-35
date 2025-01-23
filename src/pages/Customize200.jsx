import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Customize200 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/templates")}
        className="flex items-center text-gold hover:text-yellow-600 transition-colors mb-8"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="ml-2">Back to Templates</span>
      </button>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Front View */}
        <div className="space-y-4">
          <img
            src="/lovable-uploads/200-front.jpg"
            alt="200 Currency Front"
            className="w-full rounded-lg shadow-md"
          />
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 border border-bluePrimary rounded-lg hover:bg-gray-50 transition-colors">
              Edit Front Text
            </button>
            <button className="px-6 py-3 border border-bluePrimary rounded-lg hover:bg-gray-50 transition-colors">
              Change Image
            </button>
          </div>
        </div>

        {/* Back View */}
        <div className="space-y-4">
          <img
            src="/lovable-uploads/200-back.jpg"
            alt="200 Currency Back"
            className="w-full rounded-lg shadow-md"
          />
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 border border-bluePrimary rounded-lg hover:bg-gray-50 transition-colors">
              Edit Back Text
            </button>
            <button className="px-6 py-3 border border-bluePrimary rounded-lg hover:bg-gray-50 transition-colors">
              Change Image
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <button className="w-full bg-bluePrimary text-white py-4 rounded-lg hover:bg-opacity-90 transition-colors">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Customize200;