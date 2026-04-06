"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import ImageAutoSlider from "@/components/tools/ImageAutoSlider";
import MainSectionTitle from "@/components/sectionTitle/MainSectionTitle";

type Props = {
  brands: {
    image: {
      dark: string;
      light: string;
    };
  }[];
};

const BrandingClients = ({ brands }: Props) => {
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
      id="clients"
      ref={pinElement}
      className="main-section-style bg-[#FAF7F8] dark:bg-[#252525]"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          <MainSectionTitle
            title="PEOPLE WHO BET THEIR MONEY ON US"
            className="max-w-[1000px]"
          />
          <div className="clients_area_inner py-[29px] mt-[50px] xl:py-[49px] xl:mt-[90px]">
            <ImageAutoSlider
              slides={brands || []}
              imageClassName="opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingClients;
