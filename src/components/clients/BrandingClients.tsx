"use client";

import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import MainSectionTitle from "@/components/sectionTitle/MainSectionTitle";

type Brand = { image: { dark: string; light: string } };

type Props = {
  brands: Brand[];
};

const renderLogo = (b: Brand, i: number) => (
  <div key={i} className="me-[140px] flex items-center">
    <img
      src={b?.image?.dark}
      alt={`client-${i + 1}`}
      className="h-[50px] w-auto max-w-[120px] object-contain opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
    />
  </div>
);

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

  const list = brands || [];
  const mid = Math.ceil(list.length / 2);
  const rowA = list.slice(0, mid);
  const rowB = list.slice(mid);

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
          <div className="clients_area_inner py-[29px] mt-[50px] xl:py-[49px] xl:mt-[90px] clients-marquee space-y-[40px] xl:space-y-[60px]" dir="ltr">
            <Marquee speed={55} direction="left" pauseOnHover>
              {rowA.map(renderLogo)}
            </Marquee>
            <Marquee speed={45} direction="right" pauseOnHover>
              {rowB.map(renderLogo)}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingClients;
