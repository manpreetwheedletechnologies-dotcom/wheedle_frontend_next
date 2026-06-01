import './globals.css';
import PageTransition from '../components/PageTransition';

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
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}