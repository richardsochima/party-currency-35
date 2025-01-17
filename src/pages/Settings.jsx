import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { USER_PROFILE_CONTEXT } from "@/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/components/forms/FormInput";
import { LoadingDisplay } from "@/components/LoadingDisplay";
import { Upload, Save, Trash } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Settings() {
  const { userProfile, setUserProfile } = useContext(USER_PROFILE_CONTEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: userProfile?.firstName || "",
      lastName: userProfile?.lastName || "",
      email: userProfile?.email || "",
      phoneNumber: userProfile?.phoneNumber || "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // API call would go here
      toast.success("Profile updated successfully!");
      setUserProfile({ ...userProfile, ...data });
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // API call for image upload would go here
        setProfileImage(URL.createObjectURL(file));
        toast.success("Profile picture updated!");
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      // API call for image deletion would go here
      setProfileImage(null);
      toast.success("Profile picture removed!");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  if (isLoading) {
    return <LoadingDisplay message="Updating your profile..." />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      {/* Profile Picture Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Profile Picture</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => document.getElementById("profilePicture").click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            {profileImage && (
              <Button variant="destructive" onClick={handleDeleteImage}>
                <Trash className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>

      {/* Personal Information Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            control={register("firstName")}
            error={errors.firstName}
          />
          <FormInput
            label="Last Name"
            name="lastName"
            control={register("lastName")}
            error={errors.lastName}
          />
        </div>

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          control={register("email")}
          error={errors.email}
        />

        <FormInput
          label="Phone Number"
          name="phoneNumber"
          control={register("phoneNumber")}
          error={errors.phoneNumber}
        />

        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            Change Password
          </Button>

          {showPasswordForm && (
            <div className="space-y-4">
              <FormInput
                label="Current Password"
                name="currentPassword"
                type="password"
                control={register("currentPassword")}
                error={errors.currentPassword}
              />
              <FormInput
                label="New Password"
                name="newPassword"
                type="password"
                control={register("newPassword")}
                error={errors.newPassword}
              />
              <FormInput
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                control={register("confirmNewPassword")}
                error={errors.confirmNewPassword}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}