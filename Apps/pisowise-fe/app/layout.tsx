import "./globals.css";
import ConditionalNavbar from "@/components/wrappers/ConditionalNav";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#123524]">
        {/* Renders Navbar only on non-landing pages */}
        <ConditionalNavbar />
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
