import Banner from './_components/Banner/index';
import Dedicated from './_components/Dedicated/index';
import Beliefs from './_components/Beliefs/index';
import Wework from './_components/Wework/index';
import FAQ from './_components/FAQ/index';
import Testimonials from './_components/Testimonials/index';

import Joinus from './_components/Joinus/index';

import StatsSection from './_components/Stats';
import HighlightSection from './_components/HighlightedSection';
import ProgramsGridSection from './_components/ProgramsGridSection';
import Image from "next/image";
import { programsGrid } from './_components/ProgramsGridSection/fallback'
import { fallbackHighlights } from './_components/HighlightedSection/fallback';
import { getPageData, pickBlock } from '@/lib/api'
import type { PageData } from '@/lib/api' 
import { getBannerFallback, getBeliefsFallback, getDedicatedFallback, getFAQFallback, getHighlightFallback, getProgramsFallback, getStatsFallback, getTestimonialFallback, getWeWorkFallback } from '@/lib/fallbacks';


export const revalidate = 0 // optional: always fresh

export async function generateMetadata() {
  const page = await getPageData('/')
  return {
    title: page?.title ?? 'Altitude Aviation Academy',
    description:
      pickBlock<any>(page, 'BannerSection')?.subtitle ??
      'Comprehensive aviation training for aspiring pilots.',
  }
}


const componentMap: Record<
  string,
  { component: React.ComponentType<any>; fallback: (data?: any) => any }
> = {
  BannerSection: { component: Banner, fallback: getBannerFallback },
  HighlightSection: { component: HighlightSection, fallback: getHighlightFallback },
  ProgramsGridSection: { component: ProgramsGridSection, fallback: getProgramsFallback },
  StatsSection: { component: StatsSection, fallback: getStatsFallback },
  DedicatedSection: { component: Dedicated, fallback: getDedicatedFallback },
  TestimonialSection: { component: Testimonials, fallback: getTestimonialFallback },
  BeliefsSection: { component: Beliefs, fallback: getBeliefsFallback },
  WeWorkSection: { component: Wework, fallback: getWeWorkFallback },
  FAQSection: { component: FAQ, fallback: getFAQFallback }
};

function mergeWithFallback<T extends object>(apiData: T | null, fallbackData?: T): T {
  const merged = { ...fallbackData, ...apiData } as any;

  // normalize reverse to boolean if present
  if ('reverse' in merged) {
    merged.reverse = merged.reverse === true || merged.reverse == 'true';
  }

  // // If testimonials exist in API and items exist in fallback → merge by id
  // if ((apiData as any)?.testimonials && Array.isArray((fallbackData as any)?.items)) {
  //   const apiTestimonials = (apiData as any).testimonials;
  //   const fallbackItems = (fallbackData as any).items;

  //   // Replace or keep
  //   const updatedItems = fallbackItems.map((fbItem: any) => {
  //     const apiMatch = apiTestimonials.find((apiItem: any) => apiItem.id && apiItem.id === fbItem.id);
  //     return apiMatch ? apiMatch : fbItem;
  //   });

  //   // Add new API testimonials that weren’t in fallback
  //   apiTestimonials.forEach((apiItem: any) => {
  //     const exists = updatedItems.some((item: any) => item.id && item.id === apiItem.id);
  //     if (!exists) updatedItems.push(apiItem);
  //   });

  //   merged.items = updatedItems;
  // }
  if (apiData && (apiData as any).testimonials) {
    merged.items = (apiData as any).testimonials;
  }


  return merged as T;
}

 function HomePage({ page }: { page: PageData }) {
  return (
    <main>
      {page.blocks.map((block) => {
        
        const mapping = componentMap[block.type];
        if (!mapping) return null;

        const BlockComponent = mapping.component;
        const mergedData = mergeWithFallback(block.data,  mapping.fallback?.(page));
   // Debug only for TestimonialSection
   if (block.type === 'FAQSection') {
    console.log('[FAQSection] API data:', JSON.stringify(block.data, null, 2));
    console.log('[FAQSection] Merged props:', JSON.stringify(mergedData, null, 2));
  }
        return <BlockComponent key={block.id} {...mergedData} />;
      })} 
       <Joinus />
    </main>
  );
}
export default async function Home() {
  const page: any = await getPageData("/");

  // If nothing from API, give an empty structure so Home can still render fallbacks
  return <HomePage page={page ?? { id: "", slug: "/", blocks: [] }} />;
}