'use client';

// Conditional Navbar Wrapper (Custom Nav for Landing Page)

import { usePathname } from 'next/navigation';
import Navbar from '@/app/navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  // does not render the Navbar if the pathname is the root (landing page)
  if (pathname === '/') {
    return null;
  }

  return <Navbar />;
}
