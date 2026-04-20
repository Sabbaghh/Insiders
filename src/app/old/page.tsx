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
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ScrollTop from "@/components/tools/ScrollTop";
import BrandingHeader from "@/components/headers/BrandingHeader";
import MinimalFooter from "@/components/footer/MinimalFooter";
import CustomCursor from "@/components/tools/CustomCursor";
import ScrollToSection from "@/components/tools/ScrollToSection";
import FloatingSocials from "@/components/tools/FloatingSocials";
import SectionSpotlight from "@/components/tools/SectionSpotlight";

const OldHome = () => {
  const { data: hero } = getMainPage("/heros/branding-hero.mdx");
  const works = getAllPages("/works/branding").reverse();
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
    <div className="instrument">
      <ScrollSmootherComponent />
      <ScrollTop />
      <CustomCursor />
      <FloatingSocials />
      <SectionSpotlight />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <BrandingHeader onlyDark showNav />
          <ScrollToSection />
          <main>
            <SeoData
              title="INSIDERS Tourism — Destination Management Insider | UAE"
              description="We are not your typical DMC. We are the DMI — Destination Management Insider. Take advantage of having your own insider in the Middle East."
            />
            <RefreshGsap />
            <BrandingHero {...hero} />
            <BrandingFunFact {...funFact} />
            <BrandingClients brands={brands?.brands} />
            <BrandingWorkCarousel works={works} {...work} />
            <BrandingTeam {...team} teamMembers={teamMembers} />
            <BrandingProcess {...process} />
            <BrandingTestimonial {...testimonial} brands={brands?.brands} />
            <BrandingWingman />
            <Cta1 {...cta} />
          </main>
          <MinimalFooter />
        </div>
      </div>
    </div>
  );
};

export default OldHome;
