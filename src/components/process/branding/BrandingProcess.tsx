"use client";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import Image from "next/image";
import MainSectionTitle from "@/components/sectionTitle/MainSectionTitle";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  title: string;
  shape: {
    light: string;
    dark: string;
  };
  process_list: {
    serial_no: number;
    image: string;
    title: string;
    subtitle?: string;
    description?: string;
  }[];
};

const formatSerialNo = (serial: number) =>
  serial < 10 ? `0${serial}` : `${serial}`;

const BrandingProcess = ({ title, process_list }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const pinElement = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<HTMLDivElement>(null!);
  const progressLineRef = useRef<HTMLDivElement>(null!);
  const progressLineMobileRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();

      // Animate the progress line height on scroll
      if (progressLineRef.current && timelineRef.current) {
        gsap.to(progressLineRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.3,
          },
        });
      }

      // Mobile progress line
      if (progressLineMobileRef.current && timelineRef.current) {
        gsap.to(progressLineMobileRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.3,
          },
        });
      }

      // Animate each dot border color when reached
      const dots = gsap.utils.toArray<HTMLElement>(".process-dot");
      dots.forEach((dot) => {
        gsap.to(dot, {
          borderColor: "#E02379",
          boxShadow: "none",
          duration: 0.3,
          scrollTrigger: {
            trigger: dot,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    hasPinContent(pinElement.current);
  });

  return (
    <section
      id="process"
      ref={pinElement}
      className="bg-[#F8F2EB] dark:bg-[#252525] main-section-style pb-[250px]"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          <div className="text-center">
            <MainSectionTitle title={title} className="max-w-[700px] mx-auto" />
          </div>

          <div
            ref={timelineRef}
            className="mt-[60px] xl:mt-[100px] relative"
          >
            {/* Lines container — behind everything */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* Center line bg — desktop */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#DEDEDE] dark:bg-[#404040] -translate-x-1/2 hidden md:block" />
              {/* Center line progress — desktop */}
              <div
                ref={progressLineRef}
                className="absolute left-1/2 top-0 w-[2px] bg-[#E02379] -translate-x-1/2 hidden md:block"
                style={{ height: 0 }}
              />

              {/* Left line bg — mobile */}
              <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-[#DEDEDE] dark:bg-[#404040] md:hidden" />
              {/* Left line progress — mobile */}
              <div
                ref={progressLineMobileRef}
                className="absolute left-[20px] top-0 w-[2px] bg-[#E02379] md:hidden"
                style={{ height: 0 }}
              />
            </div>

            <div className="flex flex-col gap-[70px] xl:gap-[90px]">
              {process_list?.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.serial_no}
                    className="has_fade_anim relative"
                    data-fade-from={isLeft ? "left" : "right"}
                    data-delay="0.15"
                  >
                    {/* Image on the dot — desktop */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 z-10">
                      <div className="process-dot w-[70px] h-[70px] rounded-full overflow-hidden border-[4px] border-[#DEDEDE] dark:border-[#404040] shadow-md transition-all duration-300">
                        <Image
                          src={item.image}
                          width={70}
                          height={70}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Image on the dot — mobile */}
                    <div className="md:hidden absolute left-[20px] -translate-x-1/2 top-0 z-10">
                      <div className="process-dot w-[40px] h-[40px] rounded-full overflow-hidden border-[3px] border-[#DEDEDE] dark:border-[#404040] shadow-sm transition-all duration-300">
                        <Image
                          src={item.image}
                          width={40}
                          height={40}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:grid md:grid-cols-2">
                      {isLeft ? (
                        <>
                          <div className="text-end pr-[60px] xl:pr-[80px]">
                            <span className="text-[13px] text-[#6D6E71] dark:text-text-fixed-3 uppercase tracking-[0.2em]">
                              Step {formatSerialNo(item.serial_no)}
                            </span>
                            <h3 className="text-[22px] xl:text-[28px] leading-[1.15] font-semibold mt-[8px]">
                              {item.title}
                            </h3>
                            {item.subtitle && (
                              <p className="mt-[10px] text-[15px] italic text-text-3 leading-[1.5]">
                                {item.subtitle}
                              </p>
                            )}
                            {item.description && (
                              <p className="mt-[8px] text-[14px] text-text-3 leading-[1.6]">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <div />
                        </>
                      ) : (
                        <>
                          <div />
                          <div className="pl-[60px] xl:pl-[80px]">
                            <span className="text-[13px] text-[#6D6E71] dark:text-text-fixed-3 uppercase tracking-[0.2em]">
                              Step {formatSerialNo(item.serial_no)}
                            </span>
                            <h3 className="text-[22px] xl:text-[28px] leading-[1.15] font-semibold mt-[8px]">
                              {item.title}
                            </h3>
                            {item.subtitle && (
                              <p className="mt-[10px] text-[15px] italic text-text-3 leading-[1.5]">
                                {item.subtitle}
                              </p>
                            )}
                            {item.description && (
                              <p className="mt-[8px] text-[14px] text-text-3 leading-[1.6]">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile layout */}
                    <div className="md:hidden pl-[50px]">
                      <span className="text-[12px] text-[#6D6E71] dark:text-text-fixed-3 uppercase tracking-[0.2em]">
                        Step {formatSerialNo(item.serial_no)}
                      </span>
                      <h3 className="text-[18px] leading-[1.2] font-semibold mt-[6px]">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="mt-[8px] text-[13px] italic text-text-3 leading-[1.5]">
                          {item.subtitle}
                        </p>
                      )}
                      {item.description && (
                        <p className="mt-[6px] text-[12px] text-text-3 leading-[1.6]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingProcess;
