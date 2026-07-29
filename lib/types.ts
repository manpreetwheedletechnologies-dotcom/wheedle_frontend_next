// src/lib/types.ts
import type { ChallengesData } from "../components/Challenges";
import type { BusinessData } from "../components/Business";
import type { ServicesData } from "../components/Services";
import type { WhyChooseData } from "../components/WhyChoose";
import type { AiImpactData } from "../components/AiImpact";
import type { AboutData } from "../components/About";
import type { CtaData } from "../components/Cta";

export interface HeroButton {
  label: string;
  url: string;
  style: "primary" | "secondary";
}

export interface HeroSectionData {
  bannerImage: string;
  badge: string;
  titleMain: string;
  titlePrefix?: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  buttons: HeroButton[];
}

export interface IndustryData {
  heroSection: HeroSectionData;
  challengesSection?: ChallengesData;
  businessSection?: BusinessData;
  servicesGridSection?: ServicesData;
  whyChooseSection?: WhyChooseData;
  aiImpactSection?: AiImpactData;
  aboutSection?: AboutData;
  ctaCardSection?: CtaData;
  aiChatbotSection : any;
  aiAgentsSection : any;
}