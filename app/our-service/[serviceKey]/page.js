export const dynamic = 'force-dynamic';

import servicesData from '../../../lib/ServicesData';
import ServicePageClient from './ServicePageClient';

export async function generateStaticParams() {
  return Object.values(servicesData).map((s) => ({ serviceKey: s.slug }));
}

export async function generateMetadata({ params }) {
  const service = Object.values(servicesData).find((item) => item.slug === params.serviceKey);
  if (!service) return { title: 'Service Not Found | Wheedle Technologies' };
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: service.seo.url },
  };
}

export default function ServicePage({ params }) {
  return <ServicePageClient serviceKey={params.serviceKey} />;
}
