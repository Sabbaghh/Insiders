import { getMainPage, getAllPages } from "@/lib/helper/contentConverter";

import BrandingHero from "@/components/hero/BrandingHero";
import BrandingFunFact from "@/components/funFact/branding/BrandingFunFact";
import BrandingClients from "@/components/clients/BrandingClients";
import BrandingWorkCarousel from "@/components/work/branding/BrandingWorkCarousel";
import BrandingTeam from "@/components/team/branding/BrandingTeam";
import BrandingProcess from "@/components/process/branding/BrandingProcess";
import BrandingTestimonial from "@/components/testimonial/branding/BrandingTestimonial";
import BrandingWingman from "@/components/wingman/BrandingWingman";
import Cta1 from "@/components/cta/Cta1";
import SeoData from "@/components/tools/SeoData";
import RefreshGsap from "@/components/tools/RefreshGsap";

const Branding = () => {
  const { data: hero } = getMainPage("/heros/branding-hero.mdx");
  const works = getAllPages("/works/branding");
  const { data: work } = getMainPage("/works/branding/_main.mdx");
  const { data: funFact } = getMainPage("/funFact/branding-fun-fact.mdx");
  const { data: process } = getMainPage("/process/branding-process.mdx");
  const { data: testimonial } = getMainPage(
    "/testimonial/branding-testimonial.mdx"
  );
  const { data: brands } = getMainPage("/brands/brands1.mdx");
  const { data: team } = getMainPage("/team/branding/_main.mdx");
  const teamMembers = getAllPages("/team/main");
  const { data: cta } = getMainPage("/ctas/cta1.mdx");

  return (
    <main>
      <SeoData
        title="INSIDERS Tourism — Destination Management Insider | UAE"
        description="We are not your typical DMC. We are the DMI — Destination Management Insider. Take advantage of having your own insider in the Middle East."
      />
      <RefreshGsap />
      {/* 1. Hero Page */}
      <BrandingHero {...hero} />
      {/* 2. Trust Us / Proof Section */}
      <BrandingFunFact {...funFact} />
      {/* 3. Brands Who Trust Us (Clients) */}
      <BrandingClients brands={brands?.brands} />
      {/* 4. Moments We've Created (Projects) */}
      <BrandingWorkCarousel works={works} {...work} />
      {/* 5. We Are Insiders (About / Team) */}
      <BrandingTeam {...team} teamMembers={teamMembers} />
      {/* 6. Our Edge (Process / Insiders Passport) */}
      <BrandingProcess {...process} />
      {/* 7. Spill The Tea (Testimonials) */}
      <BrandingTestimonial {...testimonial} brands={brands?.brands} />
      {/* 8. Insiders Wingman (Representation Companies) */}
      <BrandingWingman />
      {/* 9. Show Me What's Inside (CTA) */}
      <Cta1 {...cta} />
    </main>
  );
};

export default Branding;
