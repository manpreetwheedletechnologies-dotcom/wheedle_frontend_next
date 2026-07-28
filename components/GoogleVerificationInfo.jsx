import React from "react";

const GoogleVerificationInfo = () => {
  return (
    <section className="w-full py-20 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl lg:text-5xl font-Gautam text-white mb-8">
          About{" "}
          <span className="text-white/60 font-normal">
            WheedleTechnologies.AI
          </span>
        </h2>

        {/* About */}
        <p className="text-base md:text-lg text-white/80 leading-8">
          WheedleTechnologies.AI is an AI-powered digital marketing and business solutions platform that helps businesses streamline their online presence, automate marketing workflows, and accelerate growth through intelligent technology.

Our platform provides AI-powered digital marketing services, SEO optimization, content generation, CRM and lead management, LinkedIn marketing, website and mobile application development, business automation, and custom AI solutions. Businesses can use WheedleTechnologies.AI to manage digital operations, improve customer engagement, and optimize marketing performance from a unified platform.
        </p>

        <p className="text-base md:text-lg text-white/80 leading-8 mt-6">
          Our mission is to simplify digital transformation by delivering secure, intelligent, and scalable AI-driven solutions that help organizations improve productivity, enhance customer experiences, and achieve sustainable business growth.
        </p>

        {/* Divider */}

        <div className="w-full h-px bg-white/10 my-14"></div>

        {/* Features */}

        <h3 className="text-2xl font-semibold text-white mb-6">
  Platform Capabilities
</h3>

<ul className="grid md:grid-cols-2 gap-y-4 gap-x-10 text-white/80">
  <li>• AI Digital Marketing & Marketing Automation</li>
  <li>• Search Engine Optimization (SEO)</li>

  <li>• Website Design & Web Application Development</li>
  <li>• Mobile Application Development</li>

  <li>• Custom AI Solutions & Business Automation</li>
  <li>• UI/UX Design & Product Design</li>

  <li>• CRM & Lead Management Solutions</li>
  <li>• Content Generation & Digital Strategy</li>
</ul>        {/* Divider */}

        <div className="w-full h-px bg-white/10 my-14"></div>

        {/* Google Data */}

       <h3 className="text-2xl font-semibold text-white mb-6">
  Why We Request Google Access
</h3>

<p className="text-white/80 leading-8">
  WheedleTechnologies.AI uses Google Sign-In to securely authenticate users and create their account.
  We only request access to your basic Google profile information that is necessary to
  identify your account and provide our services.
</p>

<div className="mt-8 space-y-6">

  <div>
    <h4 className="text-lg font-semibold text-white">
      Basic Profile Information
    </h4>

    <p className="text-white/70 mt-2 leading-7">
      Your name, email address, and profile picture are used to create and
      personalize your WheedleTechnologies.AI account.
    </p>
  </div>

  <div>
    <h4 className="text-lg font-semibold text-white">
      Secure Authentication
    </h4>

    <p className="text-white/70 mt-2 leading-7">
      Google Sign-In provides a secure authentication process without requiring
      you to create a separate password for WheedleTechnologies.AI.
    </p>
  </div>

</div>

        {/* Divider */}

        <div className="w-full h-px bg-white/10 my-14"></div>

        {/* Privacy */}

        <h3 className="text-2xl font-semibold text-white mb-6">
  Our Privacy Commitment
</h3>

<ul className="space-y-4 text-white/80">

  <li>• We only collect Google user data required to provide our services.</li>

  <li>• Google user data is never sold or shared for advertising purposes.</li>

  <li>• We only access Google account information after your authorization.</li>

  <li>• Users can revoke Google access at any time from their Google Account settings.</li>

  <li>• All user information is handled securely in accordance with our Privacy Policy.</li>

</ul>

      </div>
    </section>
  );
};

export default GoogleVerificationInfo;