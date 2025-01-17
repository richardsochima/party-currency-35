import React from "react";
import { Search, Menu } from "lucide-react";
import UserAvatar from "./UserAvatar";

export default function DashboardHeader({ toggleMobileMenu }) {
  return (
    <header className="h-20 border-b flex items-center justify-between px-4 md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Right Section */}
      <UserAvatar showName={true} auth={false} />
    </header>
  );
}