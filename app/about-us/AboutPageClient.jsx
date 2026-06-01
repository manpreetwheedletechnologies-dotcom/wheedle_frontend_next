'use client';
import Header from '../../components/Header';
import AboutHero from '../../components/AboutHero';
import AboutWhyChoose from '../../components/AboutWhyChoose';
import AboutMedia from '../../components/AboutMedia';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import Newsletter from '../../components/Newsletter';
import OurStory from '../../components/OurStory';
import WhatWeDo from '../../components/WhatWeDo';
import WhyWheedle from '../../components/WhyWheedle';
import PageWrapper from '../../components/PageWrapper';
export default function AboutPageClient() {
  return (
    <PageWrapper>
      <div className="w-full min-h-screen">
        <Header />
        <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/BG.png')" }}>
          <AboutHero />
          <AboutWhyChoose />
          <OurStory title="Our Story" description="Our journey started with a simple goal — to help businesses leverage technology to solve real-world problems. Over time, we have grown into a technology partner for companies looking to innovate, automate, and scale their operations.\nWe believe that technology should not be complicated. Our mission is to simplify digital transformation by creating solutions that are reliable, scalable, and easy to use." image="/story.png" reverse={false} />
          <AboutMedia />
          <WhyWheedle />
          <OurStory title="Our Mission" description="To simplify technology adoption by delivering powerful, scalable, and cost-efficient digital and AI solutions that accelerate business growth and elevate customer experiences. Not every organization requires an in-house IT department, but every organization requires exceptional technology leadership." image="/story.png" reverse={true} />
          <OurStory title="Our Vision" description="To be the world's most trusted digital transformation and intelligent automation partner for non-IT enterprises - empowering them to compete, scale, and succeed through connected technology ecosystems." image="/story.png" reverse={false} />
          <WhatWeDo />
          <Newsletter content={{ titleLine1: "Let's Build", titleLine2Primary: '', titleLine2Secondary: 'Something Great Together', description: "Speak with our experts to explore our autonomous platforms and intelligent agents, and discover the right AI-driven solution for your business needs.", inputType: 'tel', inputPlaceholder: '+91 254 568 XXXX', buttonText: 'Request a Call', successMessage: 'Your contact is successfully registered for newsletter' }} />
          <Testimonials />
          <div className="relative"><div className="absolute inset-x-0 -top-16 h-16 bg-black z-50 pointer-events-none"></div></div>
          <Footer />
        </div>
      </div>
    </PageWrapper>
  );
}
