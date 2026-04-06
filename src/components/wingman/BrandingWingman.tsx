"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import MainSectionTitle from "@/components/sectionTitle/MainSectionTitle";
import { FaEnvelope, FaPhone, FaLinkedinIn } from "react-icons/fa6";

type WingmanPartner = {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  linkedin?: string;
  country: string;
  flag: string;
};

const partners: WingmanPartner[] = [
  {
    company: "Match Point",
    contact: "Olga Kharlenok",
    email: "olga@matchpoints.ru",
    country: "Russia",
    flag: "🇷🇺",
  },
  {
    company: "Cashel Representation",
    contact: "Alia Saunders",
    email: "alia@cashelrepresentation.com",
    country: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    company: "The Collection",
    contact: "Eliane Taunay",
    email: "eliane@thecollectiondestinations.com",
    country: "Brazil",
    flag: "🇧🇷",
  },
  {
    company: "EDP Global",
    contact: "Wim Crabbe",
    email: "wim@edpglobal.com",
    country: "United States",
    flag: "🇺🇸",
  },
];

const BrandingWingman = () => {
  const pinElement = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    hasPinContent(pinElement.current);
  });

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
            className="whitespace-nowrap"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] xl:gap-[30px] mt-[50px] xl:mt-[90px]">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="has_fade_anim text-center"
                data-fade-from="bottom"
                data-delay={index * 0.15}
              >
                {/* Flag */}
                <div className="text-[50px] xl:text-[64px] leading-none">
                  {partner.flag}
                </div>

                {/* Country */}
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D6E71] mt-[12px]">
                  {partner.country}
                </p>

                {/* Company */}
                <h3 className="text-[18px] xl:text-[22px] font-semibold mt-[8px] leading-[1.2]">
                  {partner.company}
                </h3>

                {/* Contact */}
                <p className="text-[14px] mt-[6px] bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift">
                  {partner.contact}
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-[8px] mt-[14px]">
                  <a
                    href={`mailto:${partner.email}`}
                    className="w-[32px] h-[32px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
                  >
                    <FaEnvelope className="text-[11px]" />
                  </a>
                  <a
                    href={partner.phone ? `tel:${partner.phone}` : "#"}
                    className="w-[32px] h-[32px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
                  >
                    <FaPhone className="text-[9px]" />
                  </a>
                  <a
                    href={partner.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[32px] h-[32px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
                  >
                    <FaLinkedinIn className="text-[11px]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingWingman;
