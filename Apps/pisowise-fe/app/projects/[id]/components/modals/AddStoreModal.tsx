"use client";

import { useState } from "react";
import { Google as GoogleIcon } from "@mui/icons-material";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/store/authStore";

export default function AddStoreModal() {
  return (
    <form className="flex flex-col p-4 bg-[#FBF5F3] text-[#1B1212] rounded-[12px] m-3">
      <div className="font-Ember font-medium text-[24px] tracking-[0.48px] text-left mb-2">
        Add Store
      </div>

      <div>
        <p>Name</p>
        <Input
          className="w-full mt-1.5 bg-white"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <Button
        type="submit"
        className="mt-4 w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2 rounded-[12px]"
        variant="outline"
        size="lg"
      >Done</Button> 
    </form>
  );
}
