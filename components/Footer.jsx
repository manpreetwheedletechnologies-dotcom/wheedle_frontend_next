"use client";

import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import servicesData from '../lib/ServicesData';
import LogosData from '../lib/LogosData';
import Image from 'next/image';

const ContactModal = dynamic(() => import('./ContactModal'), { ssr: true });

function Footer() {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/our-services" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about-us" },
    { label: "Careers", path: "/career" },
  ];

  const services = Object.keys(servicesData).map((key) => {
    const service = servicesData[key];
    return {
      label: service.hero.title_main,
      path: `/our-service/${service.slug}`,
    };
  });

  const [openContact, setOpenContact] = useState(false);

  return (
     <>
    <footer className="w-full bg-[#010509] text-white flex justify-center">
      <div className="w-full flex flex-col items-center px-6 pb-8 sm:pb-10">
        <div className="w-full max-w-[1240px] min-h-[401px] px-6 sm:px-10 lg:px-[60px] py-[40px] flex flex-col gap-[35px]">

          {/* TOP ROW */}
          <div className="flex flex-col items-center text-center gap-5 sm:flex-row sm:items-start sm:justify-between sm:text-left">
            <div className="relative h-16 lg:h-20 w-[150px] lg:w-[340px]">
              <Image
                src={LogosData.mainLogo}
                alt="Wheedle Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <button
              onClick={() => setOpenContact(true)}
              className="w-[158px] h-[45px] flex items-center justify-center text-sm font-medium text-white rounded-[10px] border-[1.5px] bg-gradient-to-r from-[#0B2CC3] via-[#4D6DFF] to-[#0B2CC3] border-t-[#C6D0FF] border-l-[#002EFF] border-r-[#6D87FF] border-b-[#6D87FF] transition-all duration-300 ease-in-out hover:bg-[#0524ac] hover:bg-none hover:shadow-[0_0_22px_rgba(77,109,255,0.85)]"
            >
              Talk To An Expert
            </button>
            
          </div>



          

          {/* LINKS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[35px] text-center md:text-left">

            {/* IMPORTANT LINKS */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Important Links</h4>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                {navLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="group relative inline-flex h-5 overflow-hidden text-sm font-medium"
                    >
                      <span className="translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">
                        {item.label}
                      </span>
                      <span className="absolute translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICE SUITE */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Service Suite</h4>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                {services.map((service, i) => (
                  <li key={i}>
                    <Link
                      href={service.path}
                      className="group relative inline-flex h-5 overflow-hidden text-sm font-medium"
                    >
                      <span className="translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">
                        {service.label}
                      </span>
                      <span className="absolute translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">
                        {service.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* OTHER LINKS + SOCIAL ICONS */}
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-4">Other Links</h4>

                <ul className="space-y-2 flex flex-col items-center md:items-start">

                  <li>
                    <a
                      href="/privacy-policy.html"
                      className="group relative inline-flex h-5 overflow-hidden text-sm font-medium"
                    >
                      <span className="translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">
                        Privacy Policy
                      </span>

                      <span className="absolute translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">
                        Privacy Policy
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="/delete-account.html"
                      className="group relative inline-flex h-5 overflow-hidden text-sm font-medium"
                    >
                      <span className="translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">
                        User Data Deletion
                      </span>

                      <span className="absolute translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">
                        User Data Deletion
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="/terms-conditions.html"
                      className="group relative inline-flex h-5 overflow-hidden text-sm font-medium"
                    >
                      <span className="translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">
                        Terms & Conditions
                      </span>

                      <span className="absolute translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">
                        Terms & Conditions
                      </span>
                    </a>
                  </li>

                </ul>
              </div>
              {/* <div>
                <h4 className="text-sm font-semibold mb-4">Other Links</h4>
                <ul className="space-y-2 flex flex-col items-center md:items-start">
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="group relative inline-flex h-5 overflow-hidden text-sm font-medium"
                    >
                      <span className="translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">
                        Privacy Policy
                      </span>
                      <span className="absolute translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">
                        Privacy Policy
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/delete-account"
                      className="group relative inline-flex h-5 overflow-hidden text-sm font-medium"
                    >
                      <span className="translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">
                        User Data Deletion
                      </span>
                      <span className="absolute translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">
                        User Data Deletion
                      </span>
                    </Link>
                  </li>


                  <li>
                    <Link
                      to="/terms-conditions"
                      className="group relative inline-flex h-5 overflow-hidden text-sm font-medium"
                    >
                      <span className="translate-y-0 transition duration-300 group-hover:-translate-y-[150%]">
                        Terms & Conditions
                      </span>
                      <span className="absolute translate-y-[150%] text-[#0B2CC3] transition duration-300 group-hover:translate-y-0">
                        Terms & Conditions
                      </span>
                    </Link>
                  </li>
                </ul>


               
              </div> */}

              {/* SOCIAL ICONS */}
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://x.com/WheedleTechno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0B2CC333] border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                >
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="55.3333" height="55.3333" rx="10" fill="#0B2CC3" fillOpacity="0.2" />
                    <path d="M36.8 18H32.9L27.9 24.3L22.9 18H18.5L25.8 27.4L18.9 36H22.8L27.9 29.8L33 36H37.4L30 26.7L36.8 18Z" fill="white" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/company/wheedle-technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0B2CC333] border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                >
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="55.3333" height="55.3333" rx="10" fill="#0B2CC3" fillOpacity="0.2" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M39 39H34.6V31.3011C34.6 29.1891 33.6683 28.0107 31.9974 28.0107C30.1791 28.0107 29.1 29.2386 29.1 31.3011V39H24.7V24.7H29.1V26.3081C29.1 26.3081 30.4805 23.8857 33.5913 23.8857C36.7032 23.8857 39 25.7847 39 29.7139V39ZM19.6862 22.413C18.2023 22.413 17 21.2009 17 19.706C17 18.2122 18.2023 17 19.6862 17C21.169 17 22.3713 18.2122 22.3713 19.706C22.3724 21.2009 21.169 22.413 19.6862 22.413ZM17 39H22.5V24.7H17V39Z"
                      fill="white"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/wheedletechnologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0B2CC333] border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                >
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="55.3333" height="55.3333" rx="10" fill="#0B2CC3" fillOpacity="0.2" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M27.4998 34.2306C31.2171 34.2306 34.2306 31.2171 34.2306 27.4998C34.2306 23.7825 31.2171 20.769 27.4998 20.769C23.7825 20.769 20.769 23.7825 20.769 27.4998C20.769 31.2171 23.7825 34.2306 27.4998 34.2306ZM27.4998 31.987C29.978 31.987 31.987 29.978 31.987 27.4998C31.987 25.0216 29.978 23.0126 27.4998 23.0126C25.0216 23.0126 23.0126 25.0216 23.0126 27.4998C23.0126 29.978 25.0216 31.987 27.4998 31.987Z" fill="white" />
                    <path d="M34.2306 19.8076C33.6995 19.8076 33.269 20.2381 33.269 20.7692C33.269 21.3002 33.6995 21.7307 34.2306 21.7307C34.7616 21.7307 35.1921 21.3002 35.1921 20.7692C35.1921 20.2381 34.7616 19.8076 34.2306 19.8076Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.7431 18.7228C15 20.1813 15 22.0906 15 25.9091V29.0909C15 32.9094 15 34.8188 15.7431 36.2772C16.3968 37.5601 17.4399 38.6032 18.7228 39.2568C20.1813 40 22.0906 40 25.9091 40H29.0909C32.9094 40 34.8188 40 36.2772 39.2568C37.5601 38.6032 38.6032 37.5601 39.2568 36.2772C40 34.8188 40 32.9094 40 29.0909V25.9091C40 22.0906 40 20.1813 39.2568 18.7228C38.6032 17.4399 37.5601 16.3968 36.2772 15.7431C34.8188 15 32.9094 15 29.0909 15H25.9091C22.0906 15 20.1813 15 18.7228 15.7431C17.4399 16.3968 16.3968 17.4399 15.7431 18.7228ZM29.0909 17.2727H25.9091C23.9623 17.2727 22.6389 17.2745 21.616 17.3581C20.6196 17.4395 20.11 17.587 19.7546 17.7681C18.8993 18.2039 18.2039 18.8993 17.7681 19.7546C17.587 20.11 17.4395 20.6196 17.3581 21.616C17.2745 22.6389 17.2727 23.9623 17.2727 25.9091V29.0909C17.2727 31.0377 17.2745 32.361 17.3581 33.384C17.4395 34.3805 17.587 34.89 17.7681 35.2455C18.2039 36.1007 18.8993 36.796 19.7546 37.2318C20.11 37.413 20.6196 37.5606 21.616 37.6419C22.6389 37.7255 23.9623 37.7273 25.9091 37.7273H29.0909C31.0377 37.7273 32.361 37.7255 33.384 37.6419C34.3805 37.5606 34.89 37.413 35.2455 37.2318C36.1007 36.796 36.796 36.1007 37.2318 35.2455C37.413 34.89 37.5606 34.3805 37.6419 33.384C37.7255 32.361 37.7273 31.0377 37.7273 29.0909V25.9091C37.7273 23.9623 37.7255 22.6389 37.6419 21.616C37.5606 20.6196 37.413 20.11 37.2318 19.7546C36.796 18.8993 36.1007 18.2039 35.2455 17.7681C34.89 17.587 34.3805 17.4395 33.384 17.3581C32.361 17.2745 31.0377 17.2727 29.0909 17.2727Z" fill="white" />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@wheedletechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0B2CC333] border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                >
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="55.3333" height="55.3333" rx="10" fill="#0B2CC3" fillOpacity="0.2" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M38.5 21.2C38.5 21.2 38.1 18.9 37.1 17.9C35.8 16.5 34.4 16.5 33.7 16.4C31.1 16.2 27.2 16.2 27.2 16.2H27.1C27.1 16.2 23.2 16.2 20.6 16.4C19.9 16.5 18.5 16.5 17.2 17.9C16.2 18.9 15.8 21.2 15.8 21.2C15.8 21.2 15.5 23.9 15.5 26.5V29C15.5 31.6 15.8 34.2 15.8 34.2C15.8 34.2 16.2 36.5 17.2 37.5C18.5 38.9 20.1 38.8 20.9 38.9C23.5 39.1 27.2 39.2 27.2 39.2C27.2 39.2 31.1 39.2 33.7 39C34.4 38.9 35.8 38.9 37.1 37.5C38.1 36.5 38.5 34.2 38.5 34.2C38.5 34.2 38.8 31.6 38.8 29V26.5C38.8 23.9 38.5 21.2 38.5 21.2ZM24.6 31.5V22.5L32.5 27L24.6 31.5Z"
                      fill="white"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61588224459976"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#0B2CC333] border border-white/10 flex items-center justify-center transition-all hover:scale-105"
                >
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="55.3333" height="55.3333" rx="10" fill="#0B2CC3" fillOpacity="0.2" />
                    <path
                      d="M30.5 29.5H33L34 25.5H30.5V23.5C30.5 22.5 30.5 21.5 32.5 21.5H34V18.1C33.7 18.1 32.6 18 31.4 18C28.6 18 26.5 19.7 26.5 22.9V25.5H23.5V29.5H26.5V39H30.5V29.5Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="w-full max-w-[1240px] h-px bg-white/30 my-10" />

        <p className="text-center text-xs mb-4 sm:mb-6">
          © 2025 <span className="text-blue-400">Wheedle Technologies</span>.
          All Rights Reserved.
        </p>
      </div>
               
    </footer>
   
     {openContact && (
            <ContactModal
              onClose={() => setOpenContact(false)}
              title="Talk To An Expert"
              description=""
              contactEmail="info@wheedletechnologies.ai"
              contactPhone="+91 9717672561"
              messagePlaceholder="Tell us your message"
            />
          )}
    </>
  );
}

export default Footer;