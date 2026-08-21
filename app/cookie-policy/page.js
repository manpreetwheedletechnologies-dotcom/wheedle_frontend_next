import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  BarChart3,
  Settings,
  Megaphone,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Wheedle Technologies",
  description:
    "Read the Wheedle Technologies Cookie Policy to understand how cookies and similar technologies may be used on our website.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

const cookieTypes = [
  {
    icon: ShieldCheck,
    title: "Essential Cookies",
    description:
      "These cookies support core website functionality, security, navigation, session management, and other features necessary for the website to operate correctly.",
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    description:
      "Where enabled, analytics cookies help us understand how visitors interact with our website, such as pages visited, traffic patterns, and website performance.",
  },
  {
    icon: Settings,
    title: "Preference Cookies",
    description:
      "These cookies may remember choices such as language, region, consent preferences, or other settings to provide a more convenient browsing experience.",
  },
  {
    icon: Megaphone,
    title: "Advertising Cookies",
    description:
      "Where advertising services are used and consent is required, advertising cookies may help measure campaigns, limit repeated advertisements, or provide relevant advertising.",
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Cookie size={27} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Cookie Policy
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            This Cookie Policy explains how Wheedle Technologies uses, or may
            use, cookies and similar technologies when you visit our website.
            It also explains the choices available to you regarding these
            technologies.
          </p>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Last updated: August 21, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="space-y-12">
          <PolicySection title="1. What Are Cookies?">
            <p>
              Cookies are small text files that websites may place on your
              device when you visit them. Cookies can help websites function
              properly, remember preferences, understand how visitors use a
              website, improve performance, and support certain advertising or
              analytics services.
            </p>

            <p>
              Similar technologies, such as local storage, pixels, tags, and
              scripts, may perform functions similar to cookies. In this
              policy, references to cookies may also include these similar
              technologies where appropriate.
            </p>
          </PolicySection>

          <PolicySection title="2. How We Use Cookies">
            <p>
              Wheedle Technologies may use cookies to maintain website
              functionality, protect the website, understand website usage,
              remember visitor choices, improve user experience, and measure
              the effectiveness of our digital services.
            </p>

            <p>
              The exact cookies used may depend on the website features,
              analytics services, advertising technologies, and integrations
              that are active at the time of your visit.
            </p>
          </PolicySection>

          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-950">
              3. Types of Cookies We May Use
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {cookieTypes.map((cookie) => {
                const Icon = cookie.icon;

                return (
                  <div
                    key={cookie.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={21} />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-950">
                      {cookie.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {cookie.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <PolicySection title="4. Essential Cookies">
            <p>
              Some cookies may be necessary for the website to function
              properly. These may support security, network management,
              accessibility, session handling, fraud prevention, or other
              essential functionality.
            </p>

            <p>
              Because these cookies are required to provide core website
              functionality, they may not always be disabled through a cookie
              preference tool. You may still be able to restrict them through
              your browser, although doing so can affect website functionality.
            </p>
          </PolicySection>

          <PolicySection title="5. Google Analytics and Measurement Services">
            <p>
              Where Google Analytics or similar measurement services are
              enabled, these services may use cookies or related technologies
              to provide information about website usage, visitor interactions,
              device information, approximate location, traffic sources, and
              website performance.
            </p>

            <p>
              This information helps us understand how our website is being
              used and identify areas where the website experience can be
              improved.
            </p>

            <p>
              The collection and processing of information by Google services
              is also subject to Google&apos;s applicable privacy terms and
              policies.
            </p>
          </PolicySection>

          <PolicySection title="6. Google Advertising Services">
            <p>
              If Wheedle Technologies uses Google Ads, remarketing, conversion
              tracking, or other advertising technologies, Google and its
              partners may use cookies or similar technologies to measure
              advertising performance and, where permitted, provide more
              relevant advertising.
            </p>

            <p>
              Non-essential advertising technologies should only be activated
              where permitted by applicable law and based on the consent
              choices available to the visitor.
            </p>
          </PolicySection>

          <PolicySection title="7. Third-Party Cookies">
            <p>
              Certain website features may be provided by third-party service
              providers. These services may place or access cookies according
              to their own policies.
            </p>

            <p>
              Examples may include website analytics, embedded media, maps,
              customer communication tools, security services, payment
              services, or advertising platforms.
            </p>

            <p>
              Wheedle Technologies does not control the privacy practices of
              independent third-party providers. We recommend reviewing their
              respective privacy and cookie policies for further information.
            </p>
          </PolicySection>

          <PolicySection title="8. Your Cookie Choices">
            <p>
              Where required, visitors may be provided with options to accept,
              reject, or manage non-essential cookies. Your preferences may be
              stored so the website can remember your selection.
            </p>

            <p>
              You can also manage cookies through your browser settings. Most
              browsers allow you to delete existing cookies, block cookies,
              receive notifications before cookies are stored, or configure
              different cookie permissions.
            </p>

            <p>
              Restricting certain cookies may affect website functionality or
              prevent some website features from operating as intended.
            </p>
          </PolicySection>

          <PolicySection title="9. Consent and Google Consent Mode">
            <p>
              Where applicable, our website may use a consent management
              mechanism to communicate a visitor&apos;s consent choices to
              services such as Google Analytics and Google Ads.
            </p>

            <p>
              Consent-related signals can help supported services adjust how
              information is collected or processed based on the choices made
              by the visitor.
            </p>
          </PolicySection>

          <PolicySection title="10. Data Retention">
            <p>
              Cookie retention periods vary depending on their purpose and the
              service provider responsible for the cookie. Some cookies expire
              when you close your browser, while others may remain on your
              device for a defined period.
            </p>
          </PolicySection>

          <PolicySection title="11. Changes to This Cookie Policy">
            <p>
              We may update this Cookie Policy periodically to reflect changes
              in our website, technology, legal requirements, or third-party
              services.
            </p>

            <p>
              When material changes are made, the updated version will be
              published on this page and the &quot;Last updated&quot; date may
              be revised.
            </p>
          </PolicySection>

          <PolicySection title="12. Contact Us">
            <p>
              If you have questions about this Cookie Policy or the way cookies
              are used on our website, please contact Wheedle Technologies.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-950">
                Wheedle Technologies
              </p>

              <p className="mt-2 text-slate-600">
                Greater Noida, Uttar Pradesh, India
              </p>

              <a
                href="mailto:info@wheedletechnologies.ai"
                className="mt-2 inline-block font-medium text-blue-600 hover:text-blue-700"
              >
                info@wheedletechnologies.ai
              </a>
            </div>
          </PolicySection>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="font-semibold text-slate-950">
              Related Policies
            </h2>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="/privacy-policy.html"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                Privacy Policy
                <ExternalLink size={14} />
              </Link>

              <Link
                href="/terms-conditions.html"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                Terms & Conditions
                <ExternalLink size={14} />
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                Contact Us
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PolicySection({ title, children }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>

      <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
        {children}
      </div>
    </section>
  );
}