"use client";

import { Google as GoogleIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#123524]">
      <Dialog>
        <DialogTrigger className="text-white border px-4 py-2 rounded">
          Sign In
        </DialogTrigger>

        <DialogContent className="bg-[#FBF5F3] p-4 rounded-[12px] shadow-lg text-center w-[90%] max-w-md pt-10">
          {/* Required accessible title */}
          <DialogTitle className="sr-only">Login Modal</DialogTitle>

          <div>
            <div className="font-Ember font-medium text-[26px] tracking-[0.48px]">
              Log In to PisoWise
            </div>
            <Button
              className="mt-4 w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2"
              variant="outline"
              size="lg"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}