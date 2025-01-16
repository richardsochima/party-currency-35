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
  Menu,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        className={`hidden md:fixed md:flex left-0 top-0 h-screen bg-bluePrimary text-white p-4 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo Section with Collapse Button */}
        <div className="flex justify-between items-center border-white/10 px-3 py-2 border-b h-16">
          {!isCollapsed && (
            <img
              src="/main_logo.svg"
              alt="Party Currency"
              width={120}
              height={40}
            />
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
        <nav className="space-y-2 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="bottom-8 left-0 absolute px-4 w-full">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg w-full text-left transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bluePrimary text-white">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex flex-col items-center justify-center gap-1"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>
    </>
  );
}
