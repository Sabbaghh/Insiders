"use client";
import { useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import hasPinContent from "@/lib/animation/hasPinContent";
import { ActionBtnType } from "@/types";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import { useLayout } from "@/context/app.context";
import { cn } from "@/lib/utils";
import BranAboutArea from "../about/BranAboutArea";

type Props = {
  title: string;
  sub_title: string;
  description: string;
  image: string;
  video: string;
  action_btn?: ActionBtnType;
};

const BrandingHero = ({
  title,
  sub_title,
  description,
  action_btn,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const iconRef = useRef<HTMLDivElement>(null!);
  const heroRef = useRef<HTMLElement>(null!);

  const { layout } = useLayout();

  const pinElement = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasPinContent(pinElement.current);
      hasFadeAnim();

      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      tl.from(
        iconRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -30,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );
    },
    { scope: containerRef }
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!iconRef.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = ((e.clientX - rect.left - centerX) / centerX) * 25;
    const moveY = ((e.clientY - rect.top - centerY) / centerY) * 25;
    gsap.to(iconRef.current, {
      x: moveX,
      y: moveY,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!iconRef.current) return;
    gsap.to(iconRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  const titleHtml = title
    .replace(/<br\s*\/?>/gi, "<br />")
    .replace(/\{|\}/g, "");

  const titleClasses = cn(
    "hero-title text-white uppercase !leading-[1.4] !font-normal text-[32px] mt-0 mb-0 sm:text-[32px] md:text-[50px] xl:text-[68px] 2xl:text-[68px]",
    layout === "box" &&
      "2xl:max-w-[900px]"
  );

  return (
    <section
      ref={(el) => {
        pinElement.current = el!;
        heroRef.current = el!;
      }}
      className="hero-area z-10 pb-[250px] relative min-h-screen"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* YouTube Background Video */}
      <div className="absolute w-full h-full -z-10 top-0 start-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/ahy5o5nT4oI?version=3&amp;controls=0&amp;autoplay=1&amp;mute=1&amp;hd=1&amp;loop=1&amp;playlist=ahy5o5nT4oI"
          frameBorder="0"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vh] h-[140vh] min-w-full min-h-full pointer-events-none"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      {/* Dark Overlay */}
      <div className="absolute w-full h-full -z-[5] top-0 start-0 bg-black/60" />

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[90%] max-w-[900px] mx-auto relative">
          <div
            ref={containerRef}
            className="pb-[10px] md:pb-[12px] lg:pb-[14px] xl:pb-[16px] 2xl:pb-[16px] relative"
          >
            {/* Logo Icon — parallax, behind "INSIDE" */}
            <div
              ref={iconRef}
              className="absolute left-[-5%] top-[-110%] md:left-[25%] md:top-[-80%] z-0 pointer-events-none"
            >
              <Image
                src="/assets/imgs/logoicon.png"
                width={1000}
                height={1000}
                alt="INSIDERS icon"
                unoptimized
                className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] xl:w-[450px] xl:h-[450px] drop-shadow-lg opacity-80"
              />
            </div>
            <h1
              className={`${titleClasses} font-boldonse relative z-[1]`}
              style={{ fontFamily: "'Boldonse', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          </div>
          <BranAboutArea aboutData={{ sub_title, description, action_btn }} />
        </div>
      </div>
    </section>
  );
};

export default BrandingHero;
