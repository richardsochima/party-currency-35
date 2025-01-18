import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import { ProfileSection } from "../components/settings/ProfileSection";
import { SecuritySection } from "../components/settings/SecuritySection";
import { useAuthenticated } from "../lib/hooks";
import { LoadingDisplay } from "../components/LoadingDisplay";
import toast from "react-hot-toast";

export default function Settings() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const authenticated = useAuthenticated();

  const handleProfileUpdate = async (profileData) => {
    try {
      // API call to update profile
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordUpdate = async (passwordData) => {
    try {
      // API call to update password
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  if (!authenticated) {
    return <LoadingDisplay />;
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="md:pl-64">
        <DashboardHeader toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <ProfileSection onUpdate={handleProfileUpdate} />
            <SecuritySection onUpdatePassword={handlePasswordUpdate} />
          </div>
        </main>
      </div>
    </div>
  );
}
