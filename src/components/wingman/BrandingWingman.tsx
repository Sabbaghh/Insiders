"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import MainSectionTitle from "@/components/sectionTitle/MainSectionTitle";

type WingmanPartner = {
  company: string;
  contact: string;
  email: string;
  country: string;
};

const partners: WingmanPartner[] = [
  {
    company: "Match Point",
    contact: "Olga Kharlenok",
    email: "olga@matchpoints.ru",
    country: "Russia",
  },
  {
    company: "Cashel Representation",
    contact: "Alia Saunders",
    email: "alia@cashelrepresentation.com",
    country: "United Kingdom",
  },
  {
    company: "The Collection",
    contact: "Eliane Taunay",
    email: "eliane@thecollectiondestinations.com",
    country: "Brazil",
  },
  {
    company: "EDP Global",
    contact: "Wim Crabbe",
    email: "wim@edpglobal.com",
    country: "United States",
  },
];

const BrandingWingman = () => {
  const pinElement = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasPinContent(pinElement.current);
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="wingman"
      ref={pinElement}
      className="main-section-style bg-background"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          <MainSectionTitle
            title="Our Global Network"
            className="max-w-[600px]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] xl:gap-[50px] mt-[50px] xl:mt-[90px]">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="has_fade_anim border border-border rounded-[20px] p-[30px] xl:p-[40px]"
                data-delay={index * 0.15}
              >
                <span className="text-[12px] uppercase tracking-[2px] text-text-4 font-medium">
                  {partner.country}
                </span>
                <h3 className="text-[24px] xl:text-[30px] font-semibold mt-[10px] leading-[1.2]">
                  {partner.company}
                </h3>
                <p className="text-text-3 mt-[15px] text-[16px] xl:text-[18px]">
                  {partner.contact}
                </p>
                <a
                  href={`mailto:${partner.email}`}
                  className="text-text-3 text-[14px] xl:text-[16px] hover:text-primary transition-colors mt-[5px] inline-block"
                >
                  {partner.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingWingman;
