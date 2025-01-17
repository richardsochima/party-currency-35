import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PenSquare,
  ClipboardList,
  Coins,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { USER_PROFILE_CONTEXT } from "@/context";
import { deleteAuth } from "@/lib/util";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PenSquare, label: "Create Event", href: "/create-event" },
  { icon: ClipboardList, label: "Manage Event", href: "/manage-event" },
  { icon: Coins, label: "Currency Templates", href: "/templates" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserProfile(null);
    deleteAuth();
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:fixed md:flex flex-col left-0 top-0 h-screen bg-bluePrimary text-white transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo Section */}
        <div className="flex justify-between items-center border-b border-white/10 px-3 py-2 h-20">
          {!isCollapsed && (
            <Link to="/">
              <img
                src="/main_logo.svg"
                alt="Party Currency"
                width={120}
                height={40}
              />
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:text-gray-300"
          >
            {isCollapsed ? (
              <ChevronsRight className="w-5 h-5" />
            ) : (
              <ChevronsLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 mt-8 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-3 mb-6">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg w-full text-left transition-colors"
          >
            <LogOut className="w-5 h-5 min-w-[20px]" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bluePrimary text-white z-50">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="p-2"
            >
              <item.icon className="w-6 h-6" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}