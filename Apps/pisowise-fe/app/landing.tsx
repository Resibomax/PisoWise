export default function Landing() {
  return (
    <div
      className="flex items-center justify-center h-screen font-[Ember] text-white text-4xl"
      style={{
        backgroundImage: "url('/assets/bg-lines.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      {/* Landing Page Navbar/Logo Only */}
      <div className="flex fixed top-0 items-center justify-center pt-6 z-50 w-full">
        <div className="text-white text-lg font-medium">Logo</div>
      </div>
      Hello PisoWise
    </div>
  );
}
