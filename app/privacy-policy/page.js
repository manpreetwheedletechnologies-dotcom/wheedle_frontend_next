export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Privacy Policy | Wheedle Technologies',
  description: 'Read the Privacy Policy of Wheedle Technologies to understand how we collect, use and protect your personal data and information.',
  alternates: { canonical: 'https://www.wheedletechnologies.ai/privacy-policy' },
};
import PrivacyClient from './PrivacyClient';
export default function PrivacyPage() { return <PrivacyClient />; }
