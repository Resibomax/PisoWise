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
            className="mt-4 text-[#FBF5F3] text-[16px]"
            variant="soft"
            size="lg"
          >
            Sign In
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-[#FBF5F3] p-6 rounded-[12px] shadow-lg w-[90%] max-w-md pt-10">
          <DialogTitle className="sr-only">Login Modal</DialogTitle>

          <div>
            <div className="font-Ember font-medium text-[26px] tracking-[0.48px] text-left mb-2">
              Create Account
            </div>
            <p className="font-roboto-light text-[16px] text-[#8B8483] leading-5 mb-2">
              Enter your email and password or continue with your google
              account.
            </p>

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
              Create
            </Button>
            <div className="flex items-center gap-4 my-1">
              <hr className="flex-grow border-t border-[#8B8483]" />
              <span className="text-[#8B8483] text-[16px] font-medium">or</span>
              <hr className="flex-grow border-t border-[#8B8483]" />
            </div>
            <Button
              className="w-full bg-[#246A49] text-white text-[16px] font-normal font-Ember gap-2 rounded-[12px]"
              variant="outline"
              size="lg"
            >
              <GoogleIcon />
              Create with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
