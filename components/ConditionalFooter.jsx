// app/components/ConditionalFooter.jsx
'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Routes where footer should be hidden
  const hideFooterRoutes = ['/admin/login', '/admin/dashboard'];
  
  // Check if current path matches any hide routes
  const shouldHideFooter = hideFooterRoutes.includes(pathname);
  
  return !shouldHideFooter ? <Footer /> : null;
}