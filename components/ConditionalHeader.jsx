// app/components/ConditionalHeader.jsx
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Routes where header should be hidden
  const hideHeaderRoutes = ['/admin/login', '/admin/dashboard'];
  
  // Check if current path matches any hide routes
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);
  
  return !shouldHideHeader ? <Header /> : null;
}