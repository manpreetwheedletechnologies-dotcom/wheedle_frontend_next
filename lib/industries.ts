// src/lib/industries.ts
import industriesRaw from "./industries.json";
import type { IndustryData } from "./types";

// Cast once here — JSON has no literal types, so this is where we
// tell TS "trust me, this matches the real shape."
const industriesData = industriesRaw as unknown as Record<string, IndustryData>;

export type { IndustryData };

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