'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import servicesData from '../lib/ServicesData';
import industriesData from "../lib/industries.json"; // your JSON file
import LogosData from '../lib/LogosData';
import dynamic from 'next/dynamic';

const ContactModal = dynamic(() => import('./ContactModal'), { ssr: true });

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);

  const services = Object.keys(servicesData).map((key) => ({
    label: servicesData[key].hero.title_main,
    path: `/our-service/${servicesData[key].slug}`,
  }));

  // Build industries list from your JSON keys
  const industries = Object.keys(industriesData).map((key) => ({
    label: key.replace(/-/g, ' '), // "Healthcare-Industry" → "Healthcare Industry"
    path: `/industry/${key}`,
  }));

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-us' },
    { name: 'Our Services', path: '/our-services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Industries', path: '/industries' },
    { name: 'Careers', path: '/career' },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setServicesOpen(false);
        setIndustriesOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdowns on scroll
  useEffect(() => {
    if (!servicesOpen && !industriesOpen) return;
    const handleScroll = () => {
      setServicesOpen(false);
      setIndustriesOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [servicesOpen, industriesOpen]);

  // Click outside — services
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesOpen && servicesRef.current && !servicesRef.current.contains(e.target))
        setServicesOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesOpen]);

  // Click outside — industries
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (industriesOpen && industriesRef.current && !industriesRef.current.contains(e.target))
        setIndustriesOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [industriesOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || openContact ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, openContact]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenContact(false);
        setServicesOpen(false);
        setIndustriesOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Shared dropdown panel motion
  const dropdownMotion = {
    initial: { opacity: 0, scale: 0.96, y: -8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: -6 },
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  };

  // Stagger container for dropdown items
  const listContainer = {
    animate: {
      transition: { staggerChildren: 0.035, delayChildren: 0.05 },
    },
  };
  const listItem = {
    initial: { opacity: 0, x: -6 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
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
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src={LogosData.mainLogo} alt="Wheedle Technologies" className="h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 font-semibold">
            {navLinks.map((link, index) => (
              <div key={link.name} className="flex items-center gap-5 relative">

                {/* ── Our Services dropdown ── */}
                {link.name === 'Our Services' ? (
                  <div ref={servicesRef} className="relative flex items-center group/services">
                    <button
                      type="button"
                      onClick={() => { setServicesOpen((v) => !v); setIndustriesOpen(false); }}
                      className={`group relative h-6 overflow-hidden text-[14px] transition-all duration-300 ${
                        isActive('/our-services') ? 'border-b-2 border-[#2934E4] rounded' : 'text-white/90'
                      }`}
                    >
                      <span className="block translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">{link.name}</span>
                      <span className="absolute left-0 top-0 block translate-y-[150%] text-[#2934E4] transition duration-300 group-hover:translate-y-0">{link.name}</span>
                    </button>
                    <button
                      onClick={() => { setServicesOpen((v) => !v); setIndustriesOpen(false); }}
                      className="ml-1 opacity-0 group-hover/services:opacity-100 transition"
                      aria-label="Toggle services menu"
                    >
                      <svg
                        className={`w-3 h-3 text-white transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          {...dropdownMotion}
                          style={{ transformOrigin: 'top left' }}
                          className="absolute top-full left-0 mt-5 w-[520px] xl:w-[580px] rounded-[22px] p-[1px] bg-gradient-to-br from-white/15 via-[#0B2CC3]/40 to-white/5 shadow-[0_25px_60px_-15px_rgba(0,10,60,0.7)] z-50"
                        >
                          <div className="relative rounded-[21px] bg-[#040814] backdrop-blur-2xl overflow-hidden">
                            {/* ambient glow */}
                            <div className="pointer-events-none absolute -top-24 -left-16 w-64 h-64 bg-[#0B2CC3] rounded-full blur-[80px]" />
                            <div className="pointer-events-none absolute -bottom-20 -right-10 w-56 h-56 bg-[#4D6DFF] rounded-full blur-[80px]" />

                            <div className="relative flex">
                              {/* Left rail */}
                              <div className="w-[38%] border-r border-white/10 p-6 flex flex-col justify-between bg-white/[0.02]">
                                <div>
                                  <span className="text-[11px] tracking-[0.18em] uppercase text-[#7C8DFF] font-semibold">Capabilities</span>
                                  <h3 className="text-white text-lg font-bold mt-2 leading-snug">What we build for you</h3>
                                  <p className="text-white/50 text-xs mt-2 leading-relaxed">
                                    End-to-end product, design &amp; engineering support tailored to your goals.
                                  </p>
                                </div>
                                <Link
                                  href="/our-services"
                                  onClick={() => setServicesOpen(false)}
                                  className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
                                >
                                  <span className="relative">
                                    View all services
                                    <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-[#4D6DFF] scale-x-0 origin-left transition-transform duration-300 group-hover/cta:scale-x-100" />
                                  </span>
                                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              </div>

                              {/* Right list */}
                              <motion.div
                                variants={listContainer}
                                initial="initial"
                                animate="animate"
                                className="w-[62%] p-4 max-h-[360px] overflow-y-auto"
                              >
                                {services.map((service, i) => (
                                  <motion.div key={i} variants={listItem}>
                                    <Link
                                      href={service.path}
                                      onClick={() => setServicesOpen(false)}
                                      className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.06]"
                                    >
                                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/25 transition-all duration-200 group-hover/item:bg-[#4D6DFF] group-hover/item:scale-125" />
                                      <span className="text-sm text-white/85 transition-colors duration-200 group-hover/item:text-white">
                                        {service.label}
                                      </span>
                                      <svg
                                        className="ml-auto w-3.5 h-3.5 text-[#4D6DFF] opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                      </svg>
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                /* ── Industries dropdown ── */
                ) : link.name === 'Industries' ? (
                  <div ref={industriesRef} className="relative flex items-center group/industries">
                    <button
                      type="button"
                      onClick={() => { setIndustriesOpen((v) => !v); setServicesOpen(false); }}
                      className={`group relative h-6 overflow-hidden text-[14px] transition-all duration-300 ${
                        isActive('/industry') ? 'border-b-2 border-[#2934E4] rounded' : 'text-white/90'
                      }`}
                    >
                      <span className="block translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">{link.name}</span>
                      <span className="absolute left-0 top-0 block translate-y-[150%] text-[#2934E4] transition duration-300 group-hover:translate-y-0">{link.name}</span>
                    </button>
                    <button
                      onClick={() => { setIndustriesOpen((v) => !v); setServicesOpen(false); }}
                      className="ml-1 opacity-0 group-hover/industries:opacity-100 transition"
                      aria-label="Toggle industries menu"
                    >
                      <svg
                        className={`w-3 h-3 text-white transition-transform duration-300 ${industriesOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {industriesOpen && (
                        <motion.div
                          {...dropdownMotion}
                          style={{ transformOrigin: 'top left' }}
                          className="absolute top-full left-0 mt-5 w-[360px] rounded-[22px] p-[1px] bg-gradient-to-br from-white/15 via-[#0B2CC3]/40 to-white/5 shadow-[0_25px_60px_-15px_rgba(0,10,60,0.7)] z-50"
                        >
                          <div className="relative rounded-[21px] bg-[#040814] backdrop-blur-2xl overflow-hidden">
                            <div className="pointer-events-none absolute -top-20 -right-14 w-56 h-56 bg-[#0B2CC3] rounded-full blur-[70px]" />

                            <div className="relative p-5">
                              <div className="px-2 pb-3 mb-2 border-b border-white/10">
                                <span className="text-[11px] tracking-[0.18em] uppercase text-[#7C8DFF] font-semibold">Industries</span>
                                <p className="text-white/50 text-xs mt-1">Sectors we partner with</p>
                              </div>

                              <motion.div variants={listContainer} initial="initial" animate="animate" className="flex flex-col max-h-[300px] overflow-y-auto">
                                {industries.map((industry, i) => (
                                  <motion.div key={i} variants={listItem}>
                                    <Link
                                      href={industry.path}
                                      onClick={() => setIndustriesOpen(false)}
                                      className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.06] capitalize"
                                    >
                                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/25 transition-all duration-200 group-hover/item:bg-[#4D6DFF] group-hover/item:scale-125" />
                                      <span className="text-sm text-white/85 transition-colors duration-200 group-hover/item:text-white">
                                        {industry.label}
                                      </span>
                                      <svg
                                        className="ml-auto w-3.5 h-3.5 text-[#4D6DFF] opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                      </svg>
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>

                              {/* <Link
                                href="/industries"
                                onClick={() => setIndustriesOpen(false)}
                                className="group/cta mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/[0.06]"
                              >
                                View all industries
                                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                                </svg>
                              </Link> */}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                /* ── Regular link ── */
                ) : (
                  <Link href={link.path}
                    className={`group relative h-6 overflow-hidden text-[14px] transition-all duration-300 ${
                      isActive(link.path) ? 'border-b-2 border-[#2934E4] rounded' : 'text-white/90'
                    }`}
                  >
                    <span className="block translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">{link.name}</span>
                    <span className="absolute left-0 top-0 block translate-y-[150%] text-[#2934E4] transition duration-300 group-hover:translate-y-0">{link.name}</span>
                  </Link>
                )}

                {index < navLinks.length - 1 && <span className="text-white/30">|</span>}
              </div>
            ))}
          </nav>

          {/* CTA + Hamburger */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="h-full lg:hidden fixed left-0 right-0 z-40 bg-[#0a0f1a]/95 backdrop-blur-xl overflow-y-auto">
            <nav className="flex flex-col items-center justify-center min-h-full gap-4 py-20">
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
                ) : link.name === 'Industries' ? (
                  <div key={link.name} className="flex flex-col items-center">
                    <button onClick={() => setIndustriesOpen((v) => !v)} className="text-white text-lg py-3">{link.name}</button>
                    <AnimatePresence>
                      {industriesOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="mt-2 flex flex-col items-center gap-3">
                          <Link href="/industries" onClick={() => { setIndustriesOpen(false); setMobileMenuOpen(false); }} className="text-white font-semibold text-base border-b border-white/30 pb-2">All Industries</Link>
                          {industries.map((industry, i) => (
                            <Link key={i} href={industry.path} onClick={() => { setIndustriesOpen(false); setMobileMenuOpen(false); }} className="text-white/80 text-sm">{industry.label}</Link>
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