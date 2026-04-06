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
            <span className="has_fade_anim text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[30px] uppercase !font-getaway !leading-none font-normal">
              {sub_title}
            </span>
            <div className="mt-5 xl:mt-[30px]">
              <h2 className="has_fade_anim text-[60px] sm:text-[70px] lg:text-[100px] xl:text-[120px] 2xl:text-[150px] !font-normal !font-getaway uppercase max-w-[900px] mx-auto bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift">
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
