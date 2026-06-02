'use client';
import Header from '../../components/Header';
import BlogHero from '../../components/BlogHero';
import BlogCategories from '../../components/BlogCategories';
import BlogLatest from '../../components/BlogLatest';
import BlogCollection from '../../components/BlogCollection';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import Newsletter from '../../components/Newsletter';
import PageWrapper from '../../components/PageWrapper';
import { AnimatePresence, motion } from 'framer-motion';

export default function BlogPageClient() {
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
          <BlogHero />
          <BlogCollection />
          <BlogCategories />
          <BlogLatest />
          <Testimonials />
          <Newsletter content={{ titleLine1: 'Subscribe to Our', titleLine2Primary: '', titleLine2Secondary: 'Blog Newsletter', description: 'Stay updated with the latest insights, trends, and expert opinions in technology, design, and digital transformation.', inputType: 'email', inputPlaceholder: 'Enter your email', buttonText: 'Subscribe', successMessage: 'Thanks for subscribing 🎉' }} />
          {/* <Footer /> */}
        </div>
      </div>
      </motion.div>

</AnimatePresence>
    </PageWrapper>
  );
}
