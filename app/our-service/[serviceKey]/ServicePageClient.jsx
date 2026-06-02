'use client';
import servicesData from '../../../lib/ServicesData';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Newsletter from '../../../components/Newsletter';
import Businesses from '../../../components/Businesses';
import ServicesPagesHero from '../../../components/ServicesPagesHero';
import ServicesPagesServices from '../../../components/ServicesPagesServices';
import PageWrapper from '../../../components/PageWrapper';
import { AnimatePresence, motion } from 'framer-motion';


export default function ServicePageClient({ serviceKey }) {
  const service = Object.values(servicesData).find((item) => item.slug === serviceKey);
  if (!service) return <p className="text-center mt-10 text-white">Service not found.</p>;
  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
          
            <motion.div
              key="landing-content"
              initial={{
                opacity: 0,
                y: 40,
                filter: 'blur(10px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
      <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/BG.png')" }}>
        {/* <Header /> */}
        <ServicesPagesHero badgeText={service.hero.title_main} title={service.hero.title} description={service.hero.description} />
        <ServicesPagesServices heading={service.services.heading} subHeading={service.services.subheading} description={service.services.subText} jobs={service.services.jobs} />
        <ServicesPagesServices heading={service.lifecycle.heading} subHeading={service.lifecycle.subheading} description={service.lifecycle.subText} jobs={service.lifecycle.jobs} />
        <Newsletter content={{ titleLine1: "Let's Build", titleLine2Primary: '', titleLine2Secondary: 'Something Great Together', description: "Speak with our experts to explore our autonomous platforms and intelligent agents, and discover the right AI-driven solution for your business needs.", inputType: 'tel', inputPlaceholder: '+91 254 568 XXXX', buttonText: 'Request a Call', successMessage: 'Your contact is successfully registered for newsletter' }} />
        <Businesses />
        {/* <Footer /> */}
      </div>
      </motion.div>

</AnimatePresence>
    </PageWrapper>
  );
}
