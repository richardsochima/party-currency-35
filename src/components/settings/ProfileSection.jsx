import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ProfileSection({ user, onUpdate }) {
  const [firstName, setFirstName] = React.useState(user?.firstname || "");
  const [lastName, setLastName] = React.useState(user?.lastname || "");
  const [email, setEmail] = React.useState(user?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ firstName, lastName, email });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}