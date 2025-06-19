"use client";

import { Google as GoogleIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Landing() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#123524]">
      <Dialog>
        <DialogTrigger>
          <Button
            className="mt-4 text-[#123524] text-[16px]"
            variant="outline"
            size="lg"
          >
            Create Account
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-[#FBF5F3] p-6 rounded-[12px] shadow-lg w-[90%] max-w-md pt-10">
          <DialogTitle className="sr-only">Login Modal</DialogTitle>

          <div>
            <div className="font-Ember font-medium text-[26px] tracking-[0.48px] text-center">
              Log In to PisoWise
            </div>
            <Button
              className="mt-4 w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2 rounded-[12px]"
              variant="outline"
              size="lg"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
            <hr className="my-4 border-t-1 border-[#8B8483]" />
            <div>
              <p>Email</p>
              <Input
                className="w-full mt-1.5 bg-white"
                type="email"
                autoComplete="email"
              />
            </div>
            <div className="mt-2">
              <p>Password</p>
              <Input
                className="w-full mt-1.5 bg-white"
                type="password"
                autoComplete="password"
              />
            </div>
            <Button
              className="mt-4 w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2 rounded-[12px]"
              variant="outline"
              size="lg"
            >
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
