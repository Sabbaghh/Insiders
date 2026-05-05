"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  images: string[];
};

const WheelsGallery = ({ images }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i! + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, images.length]);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".wheel-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 4) * 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="flex flex-col">
        {images.map((src, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className="wheel-card relative cursor-pointer"
          >
            <img
              src={src}
              alt={`Wheel ${i + 1}`}
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>

      {/* Lightbox carousel — portaled */}
      {mounted &&
        activeIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveIndex(null)}
          >
            {/* Close */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-[20px] right-[20px] text-white text-[32px] leading-none hover:text-[#E02379] transition-colors z-10"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Counter */}
            <div className="absolute top-[24px] left-[24px] text-white/60 text-[13px] uppercase tracking-[0.15em]">
              {activeIndex + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i! - 1 + images.length) % images.length);
              }}
              className="absolute left-[20px] top-1/2 -translate-y-1/2 text-white text-[40px] hover:text-[#E02379] transition-colors w-[50px] h-[50px] flex items-center justify-center z-10"
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Image */}
            <div
              className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[activeIndex]}
                alt={`Wheel ${activeIndex + 1}`}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-[8px]"
              />
            </div>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((i) => (i! + 1) % images.length);
              }}
              className="absolute right-[20px] top-1/2 -translate-y-1/2 text-white text-[40px] hover:text-[#E02379] transition-colors w-[50px] h-[50px] flex items-center justify-center z-10"
              aria-label="Next"
            >
              ›
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default WheelsGallery;
