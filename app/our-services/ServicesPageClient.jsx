'use client';
import Header from '../../components/Header';
import ServicesHero from '../../components/ServicesHero';
import ServicesBento from '../../components/ServicesBento';
import ServiceOfferings from '../../components/ServiceOfferings';
import ServicesMission from '../../components/ServicesMission';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import Businesses from '../../components/Businesses';
import Newsletter from '../../components/Newsletter';
import PageWrapper from '../../components/PageWrapper';
import { AnimatePresence, motion } from 'framer-motion';

export default function ServicesPageClient() {
  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
          
            <motion.div
              key="landing-content"
              initial={{
                opacity: 0,
                y: 150,
                filter: 'blur(10px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
      <div className="w-full min-h-screen">
        {/* <Header /> */}
        <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/BG.png')" }}>
          <ServicesHero />
          <ServicesBento />
          <ServiceOfferings />
          <ServicesMission title1="End-to-End Agentic AI Platforms & Digital Services for Business" title2="Growth: Our Complete Portfolio" description="Wheedle Technologies presents you a fully integrated AI Agents, Agentic Platforms, and Digital Service Suite under one roof." />
          <Newsletter content={{ titleLine1: "Let's Build", titleLine2Primary: '', titleLine2Secondary: 'Something Great Together', description: "Speak with our experts to explore our autonomous platforms and intelligent agents, and discover the right AI-driven solution for your business needs.", inputType: 'tel', inputPlaceholder: '+91 254 568 XXXX', buttonText: 'Request a Call', successMessage: 'Your contact is successfully registered for newsletter' }} />
          <Businesses />
          <Testimonials />
          {/* <Footer /> */}
        </div>
      </div>
      </motion.div>

</AnimatePresence>
    </PageWrapper>
  );
}
