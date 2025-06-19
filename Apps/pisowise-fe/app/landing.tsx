import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen font-[Ember] text-4xl"
      style={{
        backgroundImage: "url('/assets/bg-lines.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <div className="text-center text-[40px] font-bold leading-[40px] tracking-[-0.4px] text-[#FBF5F3]">
        Snap
        <br />
        Receipts.
        <br />
        Track
        <br />
        Smarter.
      </div>
      <div>
        <Button className="mt-4 text-[#123524]" variant="outline" size="lg">
          Create Account
        </Button>
        <Button className="mt-4 text-[#123524]" variant="default" size="lg">
          Sign in
        </Button>
      </div>
    </div>
  );
}
