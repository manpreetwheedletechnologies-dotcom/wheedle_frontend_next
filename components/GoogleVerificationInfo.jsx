import React from "react";

/* Gradient-border card used across the site (same style as ServicesMission) */
const Card = ({ children, className = "" }) => (
  <div className={`p-[1px] rounded-2xl bg-gradient-to-br from-[#7B92FF] to-[#0B2CC3] ${className}`}>
    <div className="h-full rounded-2xl bg-[#040010] p-6 md:p-8">{children}</div>
  </div>
);

const IconBox = ({ children }) => (
  <div className="w-12 h-12 mb-4 rounded-xl bg-[#171D7E] border border-white/10 flex items-center justify-center shrink-0">
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {children}
    </svg>
  </div>
);

const Check = () => (
  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2934E4]/30 border border-[#7B92FF]/50">
    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-2xl lg:text-3xl font-Gautam text-white mb-6">{children}</h3>
);

const capabilities = [
  "AI Digital Marketing & Marketing Automation",
  "Search Engine Optimization (SEO)",
  "Website Design & Web Application Development",
  "Mobile Application Development",
  "Custom AI Solutions & Business Automation",
  "UI/UX Design & Product Design",
  "CRM & Lead Management Solutions",
  "Content Generation & Digital Strategy",
];

const privacy = [
  "We only collect Google user data required to provide our services.",
  "Google user data is never sold or shared for advertising purposes.",
  "We only access Google account information after your authorization.",
  "Users can revoke Google access at any time from their Google Account settings.",
  "All user information is handled securely in accordance with our Privacy Policy.",
];

const GoogleVerificationInfo = () => {
  return (
    <section className="w-full py-20 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl lg:text-5xl font-Gautam text-white mb-10 leading-tight">
          About{" "}
          <span className="text-white/60 font-normal">WheedleTechnologies.AI</span>
        </h2>

        {/* About */}
        <Card>
          <div className="space-y-6 text-base md:text-lg text-white/80 leading-8">
            <p>
              WheedleTechnologies.AI is an AI-powered digital marketing and business solutions platform that helps businesses streamline their online presence, automate marketing workflows, and accelerate growth through intelligent technology.
            </p>
            <p>
              Our platform provides AI-powered digital marketing services, SEO optimization, content generation, CRM and lead management, LinkedIn marketing, website and mobile application development, business automation, and custom AI solutions. Businesses can use WheedleTechnologies.AI to manage digital operations, improve customer engagement, and optimize marketing performance from a unified platform.
            </p>
            <p className="border-l-2 border-[#2934E4] pl-5 text-white">
              Our mission is to simplify digital transformation by delivering secure, intelligent, and scalable AI-driven solutions that help organizations improve productivity, enhance customer experiences, and achieve sustainable business growth.
            </p>
          </div>
        </Card>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-14" />

        {/* Features */}
        <SectionTitle>Platform Capabilities</SectionTitle>
        <ul className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#171D7E]/20 px-5 py-4 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#7B92FF]/60 hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E] hover:text-white"
            >
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-14" />

        {/* Google Data */}
        <SectionTitle>Why We Request Google Access</SectionTitle>
        <p className="text-white/80 leading-8 max-w-4xl">
          WheedleTechnologies.AI uses Google Sign-In to securely authenticate users and create their account.
          We only request access to your basic Google profile information that is necessary to
          identify your account and provide our services.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card>
            <IconBox>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </IconBox>
            <h4 className="text-lg font-semibold text-white">Basic Profile Information</h4>
            <p className="text-white/70 mt-2 leading-7">
              Your name, email address, and profile picture are used to create and
              personalize your WheedleTechnologies.AI account.
            </p>
          </Card>

          <Card>
            <IconBox>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </IconBox>
            <h4 className="text-lg font-semibold text-white">Secure Authentication</h4>
            <p className="text-white/70 mt-2 leading-7">
              Google Sign-In provides a secure authentication process without requiring
              you to create a separate password for WheedleTechnologies.AI.
            </p>
          </Card>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-14" />

        {/* Privacy */}
        <SectionTitle>Our Privacy Commitment</SectionTitle>
        <Card>
          <div className="flex flex-col md:flex-row gap-6">
            <IconBox>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </IconBox>
            <ul className="space-y-4 text-white/80">
              {privacy.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default GoogleVerificationInfo;