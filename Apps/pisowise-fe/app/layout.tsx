import "./globals.css";
import ConditionalNavbar from "@/components/wrappers/ConditionalNav";


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
      </body>
    </html>
  );
}
