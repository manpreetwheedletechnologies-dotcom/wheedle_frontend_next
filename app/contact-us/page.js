import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Wheedle Technologies",
  description:
    "Contact Wheedle Technologies for website development, software development, mobile applications, digital solutions, and business technology services.",
  alternates: {
    canonical: "/contact-us",
  },
};

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    description: "For general and business enquiries",
    value: "info@wheedletechnologies.ai",
    href: "mailto:info@wheedletechnologies.ai",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    value: "+91 8130622635",
    href: "tel:+91 8130622635",
  },
  {
    icon: MapPin,
    title: "Our Offices",
    description: "Visit us at either of our locations",
    value: "Greater Noida & Kolkata, India",
    href: "#our-offices",
  },
  {
    icon: Clock3,
    title: "Business Hours",
    description: "Our usual support hours",
    value: "Monday – Saturday, 9:30 AM – 7:00 PM",
    href: null,
  },
];

const offices = [
  {
    name: "Greater Noida (Head Office)",
    lines: ["Greater Noida", "Uttar Pradesh, India"],
    mapQuery: "Greater Noida, Uttar Pradesh, India",
  },
  {
    name: "Kolkata Office",
    lines: [
      "M211, 2nd Floor, Webel IT Park,",
      "Phase 1, DH Block, New Town,",
      "Kolkata \u2013 700156, India",
    ],
    mapQuery: "Webel IT Park, DH Block, New Town, Kolkata 700156, India",
  },
];

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-300">
              <MessageSquare size={16} />
              Contact Wheedle Technologies
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s Build Something
              <span className="block text-blue-400">Great Together</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Have a project, business requirement, partnership enquiry, or
              technical question? Connect with Wheedle Technologies and our
              team will help you find the right digital solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Get In Touch
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We&apos;re here to help
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Use the contact information below to reach our team. We aim to
            respond to genuine business enquiries as soon as possible during
            our normal working hours.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item) => {
            const Icon = item.icon;

            const content = (
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <p className="mt-4 break-words text-sm font-medium leading-6 text-slate-800">
                  {item.value}
                </p>
              </div>
            );

            return item.href ? (
              <a key={item.title} href={item.href} className="block h-full">
                {content}
              </a>
            ) : (
              <div key={item.title} className="h-full">
                {content}
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Offices */}
      <section id="our-offices" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Offices
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find us in two cities
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {offices.map((office) => (
            <div
              key={office.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MapPin size={22} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{office.name}</h3>
              <address className="mt-3 text-sm not-italic leading-6 text-slate-700">
                {office.lines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View on Google Maps
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Business Enquiry */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Business Enquiries
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tell us about your requirement
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              Whether you need a business website, custom software, mobile
              application, AI-powered solution, cloud integration, or digital
              transformation support, you can contact our team with your
              requirements.
            </p>

            <a
              href="mailto:info@wheedletechnologies.ai?subject=Business%20Enquiry%20-%20Wheedle%20Technologies"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Send Business Enquiry
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={23} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Transparent Communication
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              We respect your privacy. Information shared with us through
              email, phone, or other communication channels is used only for
              responding to your enquiry and providing requested services,
              subject to our privacy practices.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/privacy-policy.html"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Privacy Policy
              </Link>

              <span className="text-slate-300">•</span>

              <Link
                href="/cookie-policy"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Cookie Policy
              </Link>

              <span className="text-slate-300">•</span>

              <Link
                href="/terms-conditions.html"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {/* <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="rounded-3xl bg-slate-950 px-7 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to discuss your next project?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Connect with Wheedle Technologies and discover how the right
            technology solution can support your business goals.
          </p>

          <a
            href="mailto:info@wheedletechnologies.com"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Contact Our Team
            <ArrowRight size={17} />
          </a>
        </div>
      </section> */}
    </main>
  );
}