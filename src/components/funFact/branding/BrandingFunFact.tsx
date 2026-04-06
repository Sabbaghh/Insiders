"use client";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasCountAnim from "@/lib/animation/hasCountAnim";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import MainSectionTitle from "@/components/sectionTitle/MainSectionTitle";

type Props = {
  title: string;
};

const stats = [
  { value: 35, suffix: "", label: "Years Collective Experience" },
  { value: 7, suffix: "", label: "Emirates Covered" },
  { value: 250, suffix: "+", label: "Events Delivered" },
  { value: 10000, suffix: "", label: "Guests Hosted" },
  { value: 11, suffix: "+", label: "Years of Trusted Partnerships" },
];

const BrandingFunFact = ({ title }: Props) => {
  const pinElement = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasCountAnim();
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    hasPinContent(pinElement.current);
  });

  return (
    <section
      id="trust"
      ref={pinElement}
      className="main-section-style bg-[#F8F2EB] dark:bg-[#252525]"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          <MainSectionTitle title={title} className="max-w-[840px]" />
          <div className="mt-[50px] xl:mt-[90px]">
            <div className="grid gap-y-[50px] gap-x-[40px] grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="has_fade_anim text-center"
                  data-delay={0.15 * (i + 1)}
                >
                  <h3 className="text-[40px] md:text-[50px] xl:text-[60px] 2xl:text-[80px] font-semibold leading-none">
                    <span
                      data-count={stat.value}
                      className="has_count_anim"
                    >
                      {stat.value}
                    </span>
                    {stat.suffix}
                  </h3>
                  <p className="text-[16px] xl:text-[20px] leading-none font-medium mt-[15px] uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingFunFact;
