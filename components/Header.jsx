'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import servicesData from '../lib/ServicesData';
import LogosData from '../lib/LogosData';
import dynamic from 'next/dynamic';

const ContactModal = dynamic(() => import('./ContactModal'), { ssr: true });

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesRef = useRef(null);

  const services = Object.keys(servicesData).map((key) => ({
    label: servicesData[key].hero.title_main,
    path: `/our-service/${servicesData[key].slug}`,
  }));

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Services', path: '/our-services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about-us' },
    { name: 'Careers', path: '/career' },
  ];

  // Scroll effect - hide header when scrolling down, show with blur when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for background blur
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
        setServicesOpen(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close services dropdown on scroll
  useEffect(() => {
    if (!servicesOpen) return;
    const handleScroll = () => setServicesOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [servicesOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesOpen && servicesRef.current && !servicesRef.current.contains(e.target))
        setServicesOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || openContact ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, openContact]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') { setMobileMenuOpen(false); setOpenContact(false); }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 h-[82px] lg:h-[100px] transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? 'bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="h-full flex items-center justify-between px-4 lg:px-[100px]">
          <Link href="/" className="flex items-center">
            <img src={LogosData.mainLogo} alt="Wheedle Technologies" className="h-12 w-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-5 font-semibold">
            {navLinks.map((link, index) => (
              <div key={link.name} className="flex items-center gap-5 relative">
                {link.name === 'Our Services' ? (
                  <div ref={servicesRef} className="relative flex items-center group/services">
                    <button type="button" onClick={() => setServicesOpen((prev) => !prev)}
                      className={`group relative h-6 overflow-hidden text-[14px] transition-all duration-300 ${isActive('/our-services') ? 'border-b-2 border-[#2934E4] rounded' : 'text-white/90'}`}>
                      <span className="block translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">{link.name}</span>
                      <span className="absolute left-0 top-0 block translate-y-[150%] text-[#2934E4] transition duration-300 group-hover:translate-y-0">{link.name}</span>
                    </button>
                    <button onClick={() => setServicesOpen((v) => !v)} className="ml-1 opacity-0 group-hover/services:opacity-100 transition">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div initial={{ opacity: 0, scale: 0.75, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.75, y: -10 }} transition={{ duration: 0.25, ease: 'easeOut' }} style={{ transformOrigin: 'top left' }}
                          className="absolute top-full left-0 mt-4 w-[440px] xl:w-[480px] bg-[#010509]/95 backdrop-blur-xl border border-[#0B2CC3]/50 rounded-2xl p-6 z-50 shadow-2xl shadow-blue-900/20">
                          <div className="flex justify-start mb-5">
                            <Link href="/our-services" onClick={() => setServicesOpen(false)} className="relative group">
                              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C6D0FF] via-[#002EFF] to-[#6D87FF] p-[1.5px]" />
                              <span className="relative z-10 flex items-center justify-center px-6 py-2 rounded-xl bg-gradient-to-r from-[#0B2CC3] via-[#4D6DFF] to-[#0B2CC3] text-white text-sm font-semibold group-hover:shadow-[0_0_20px_rgba(77,109,255,0.9)]">Our Services</span>
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                            {services.map((service, i) => (
                              <Link key={i} href={service.path} onClick={() => setServicesOpen(false)} className="relative inline-flex h-5 overflow-hidden text-sm font-medium text-white group">
                                <span className="absolute left-0 top-0 transition duration-300 group-hover:-translate-y-[150%]">{service.label}</span>
                                <span className="absolute left-0 top-0 translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">{service.label}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={link.path} className={`group relative h-6 overflow-hidden text-[14px] transition-all duration-300 ${isActive(link.path) ? 'border-b-2 border-[#2934E4] rounded' : 'text-white/90'}`}>
                    <span className="block translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">{link.name}</span>
                    <span className="absolute left-0 top-0 block translate-y-[150%] text-[#2934E4] transition duration-300 group-hover:translate-y-0">{link.name}</span>
                  </Link>
                )}
                {index < navLinks.length - 1 && <span className="text-white/30">|</span>}
              </div>
            ))}
          </nav>

          <div className="flex items-center">
            <button onClick={() => setOpenContact(true)}
              className="group relative hidden lg:flex h-12 w-[126px] flex-shrink-0 items-center justify-center gap-2 overflow-hidden isolate rounded-full border border-white/80 bg-white/10 backdrop-blur-md text-sm text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.35)] hover:shadow-neutral-600 hover:bg-white hover:text-black transition-all duration-300">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute left-0 h-full w-full translate-x-full rounded-full bg-white transition-all duration-500 group-hover:translate-x-0 group-hover:scale-150" />
              </span>
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Contact Us</span>
              <span className="relative z-10 hidden items-center transition-all duration-300 group-hover:flex">
                <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3l2 5-2 2a16 16 0 006 6l2-2 5 2v3a2 2 0 01-2 2A18 18 0 013 5z" />
                </svg>
              </span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center cursor-pointer">
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              ) : (
                <img src="/Hmaburger.png" alt="Menu" className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {openContact && (
        <ContactModal onClose={() => setOpenContact(false)} title="Contact Us"
          description="Tell us about your goals, and we'll get in touch. Let us grow together!!"
          contactEmail="info@wheedletechnologies.ai" contactPhone="+91 9717672561"
          messagePlaceholder="Tell us about your requirement" />
      )}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="h-full lg:hidden fixed left-0 right-0 z-40 bg-[#0a0f1a]/95 backdrop-blur-xl">
            <nav className="flex flex-col items-center justify-center h-full gap-4">
              {navLinks.map((link) =>
                link.name === 'Our Services' ? (
                  <div key={link.name} className="flex flex-col items-center">
                    <button onClick={() => setServicesOpen((v) => !v)} className="text-white text-lg py-3">{link.name}</button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="mt-2 flex flex-col items-center gap-3">
                          <Link href="/our-services" onClick={() => { setServicesOpen(false); setMobileMenuOpen(false); }} className="text-white font-semibold text-base border-b border-white/30 pb-2">Our Services</Link>
                          {services.map((service, i) => (
                            <Link key={i} href={service.path} onClick={() => { setServicesOpen(false); setMobileMenuOpen(false); }} className="text-white/80 text-sm">{service.label}</Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={link.name} href={link.path} onClick={() => setMobileMenuOpen(false)} className="text-white text-lg py-3">{link.name}</Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}