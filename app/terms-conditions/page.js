export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Terms & Conditions | Wheedle Technologies',
  description: 'Read the Terms & Conditions of Wheedle Technologies to understand the terms that govern the use of our services.',
  alternates: { canonical: 'https://www.wheedletechnologies.ai/terms-conditions' },
};
import TermsClient from './TermsClient';
export default function TermsPage() { return <TermsClient />; }
