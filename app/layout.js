// app/layout.jsx
import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
import { PreloaderProvider } from '../lib/PreloaderContext';
import PageTransition from '../components/PageTransition';
import ConditionalHeader from '../components/ConditionalHeader';
import ConditionalFooter from '../components/ConditionalFooter';
import Footer from '../components/Footer';

export const metadata = {
  title: 'AI Automation & Development | Wheedle Technologies',
  description: 'Scale your business with AI automation, development & consulting services by Wheedle Technologies.',
  metadataBase: new URL('https://www.wheedletechnologies.ai'),
};

const GTM_ID = 'GTM-PLVFXHT3';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={GTM_ID} />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/fevicon.png" />
        <meta name="trustpilot-one-time-domain-verification-id" content="c597699b-cae4-4980-8b4d-082f2074f81e"/>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <PreloaderProvider>
          <ConditionalHeader />
          {/* Only the page BODY slides/blurs — header is untouched */}
          {/* <PageTransition> */}

            {children}
          {/* </PageTransition> */}
          <ConditionalFooter />
        </PreloaderProvider>
      </body>
    </html>
  );
}