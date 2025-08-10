// types/page.ts

export interface BannerSectionData {
    id: string;
    title?: string;
    subtitle?: string;
    imageSrc?: string;
    buttonText?: string;
    ctaLink?: string | null;
    theme?: string;
  }
  
  export interface HighlightSectionData {
    id: string;
    title?: string;
    description?: string[]; // array of HTML/strings
    imageSrc?: string;
    reverse?: boolean;
    buttonText?: string;
    ctaLink?: string | null;
    backgroundClass?: string | null;
    imageWidth?: number;
    imageHeight?: number;
  }
  
  export interface ProgramItem {
    title?: string;
    description?: string;
    iconPath?: string;
    iconAlt?: string;
  }
  
  export interface ProgramsGridSectionData {
    id: string;
    title?: string;
    subtitle?: string;
    images?: string[];
    programs?: ProgramItem[];
  }
  
  export interface StatItem {
    id: string;
    icon?: string;
    value?: number;
    label?: string;
    suffix?: string | null;
    textColor?: string;
  }
  
  export interface StatsSectionData {
    id: string;
    stats?: StatItem[];
  }
  
  export interface DedicatedSectionData {
    id: string;
    title?: string;
    subtitle?: string;
    points?: string[];
    imageSrc?: string;
    commaSrc?: string;
    spiralSrc?: string;
    button1Text?: string;
    button1Link?: string;
    button2Text?: string;
    button2Link?: string;
  }
  
  export interface TestimonialItem {
    id: string;
    name?: string;
    profession?: string;
    comment?: string;
    imgSrc?: string;
    rating?: number;
  }
  
  export interface TestimonialSectionData {
    id: string;
    title?: string;
    subtitle?: string;
    testimonials?: TestimonialItem[];
  }
  
  export interface BeliefsSectionData {
    id: string;
    missionTitle?: string;
    missionText?: string;
    missionPoints?: string[];
    visionTitle?: string;
    visionText?: string;
    visionPoints?: string[];
  }
  
  export interface MentorItem {
    id?: string;
    name?: string;
    profession?: string;
    imgSrc?: string;
    linkedin?: string | null;
  }
  
  export interface WeWorkSectionData {
    id: string;
    title?: string;
    subtitle?: string;
    mentors?: MentorItem[];
  }
  
  export interface FAQItem {
    id: string;
    question?: string;
    answer?: string;
  }
  
  export interface FAQSectionData {
    id: string;
    title?: string;
    items?: FAQItem[];
  }
  
  export type BlockType =
    | "BannerSection"
    | "HighlightSection"
    | "ProgramsGridSection"
    | "StatsSection"
    | "DedicatedSection"
    | "TestimonialSection"
    | "BeliefsSection"
    | "WeWorkSection"
    | "FAQSection";
  
  export interface PageBlock<T = unknown> {
    id: string;
    pageId: string;
    type: BlockType;
    componentId: string;
    sortOrder: number;
    data: T;
  }
  
  export interface PageData {
    id: string;
    slug: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    blocks: PageBlock[];
  }
  