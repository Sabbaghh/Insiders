"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import { FaWhatsapp, FaPhone, FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa6";
import siteConfig from "@/config/siteConfig.json";

type Props = {
  title: string;
  sub_title: string;
};

const Cta1 = ({ title, sub_title }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const pinElement = useRef<HTMLDivElement>(null!);

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
      id="cta"
      ref={pinElement}
      className="cta_area main-section-style bg-[#FAF7F8] dark:bg-[#252525]"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          <div className="text-center">
            <span className="hero-title has_fade_anim text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] uppercase !leading-none font-normal text-text-3" style={{ fontFamily: "'Boldonse', sans-serif" }}>
              {sub_title}
            </span>
            <div className="mt-5 xl:mt-[30px]">
              <h2
                className="hero-title has_fade_anim text-[30px] sm:text-[35px] lg:text-[50px] xl:text-[60px] 2xl:text-[75px] !font-normal uppercase max-w-[900px] mx-auto bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift !leading-[1.5]"
                style={{ fontFamily: "'Boldonse', sans-serif" }}>
                {title}
              </h2>
            </div>
            {/* Social Icons */}
            <div className="has_fade_anim flex items-center justify-center gap-[12px] mt-[30px] xl:mt-[40px]">
              <a
                href={`https://wa.me/${(siteConfig.footer_info?.mobile || "").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-[44px] h-[44px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
              >
                <FaWhatsapp className="text-[16px]" />
              </a>
              <a
                href={`tel:${siteConfig.footer_info?.mobile || ""}`}
                aria-label="Phone"
                className="w-[44px] h-[44px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
              >
                <FaPhone className="text-[14px]" />
              </a>
              <a
                href={`mailto:${siteConfig.footer_info?.email || ""}`}
                aria-label="Email"
                className="w-[44px] h-[44px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
              >
                <FaEnvelope className="text-[15px]" />
              </a>
              <a
                href="https://www.facebook.com/insiderstourism"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-[44px] h-[44px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
              >
                <FaFacebookF className="text-[15px]" />
              </a>
              <a
                href="https://www.instagram.com/insiderstourism"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-[44px] h-[44px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
              >
                <FaInstagram className="text-[16px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta1;
