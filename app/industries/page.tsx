'use client';
import IndustriesHero from '../../components/IndustriesHero';
import Testimonials from '../../components/Testimonials';
import Newsletter from '../../components/Newsletter';
import PageWrapper from '../../components/PageWrapper';
import { AnimatePresence, motion } from 'framer-motion';
import IndustriesCards from '../../components/Industrycards';
export default function IndustriesPage() {
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
                            <IndustriesHero />
                            <IndustriesCards/>
                            <Testimonials />
                            <Newsletter
                                content={{
                                    titleLine1: "Subscribe to Our",
                                    titleLine2Primary: "Industry",
                                    titleLine2Secondary: " Newsletter",
                                    description:
                                        "Stay updated with the latest insights, trends, and expert opinions in technology, design, and digital transformation.",
                                    inputType: "email",
                                    inputPlaceholder: "Enter your email",
                                    buttonText: "Subscribe",
                                    successMessage: "Thanks for subscribing 🎉",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

            </AnimatePresence>
        </PageWrapper>
    );
}
