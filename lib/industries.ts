// src/lib/industries.ts
import industriesData from "./industries.json";

export type IndustryData = (typeof industriesData)[keyof typeof industriesData];

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function getIndustryBySlug(slug: string): IndustryData | null {
  const normalizedSlug = slug.toLowerCase();
  const entry = Object.entries(industriesData).find(
    ([name]) => slugify(name) === normalizedSlug
  );
  return entry ? entry[1] : null;
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(industriesData).map(slugify);
}