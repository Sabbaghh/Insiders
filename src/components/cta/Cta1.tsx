"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import FlexibleForm from "@/components/form/branding/FlexibleForm";

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
          </div>
          <div className="max-w-[700px] mx-auto mt-[40px] xl:mt-[60px]">
            <FlexibleForm btnText="Send Message" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta1;
