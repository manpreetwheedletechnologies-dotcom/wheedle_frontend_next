// app/layout.jsx
import './globals.css';
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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