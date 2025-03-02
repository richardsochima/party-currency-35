
import React from "react";
import { Button } from "@/components/ui/button";

export function SignupSubmitButton({ loading, text = "Create an account" }) {
  return (
    <Button
      type="submit"
      className="bg-footer hover:bg-[#2D2D2D] w-full"
      disabled={loading}
    >
      {loading ? "Creating account..." : text}
    </Button>
  );
}
