"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const ProjectGallery = ({ images, title }: { images: string[]; title: string }) => {
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
      if (e.key === "ArrowRight") setActiveIndex((i) => (i! + 1) % images.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="columns-2 md:columns-3 xl:columns-4 gap-[16px] xl:gap-[20px]">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className="mb-[16px] xl:mb-[20px] break-inside-avoid overflow-hidden rounded-[12px] cursor-pointer"
          >
            <Image
              src={img}
              alt={`${title} - ${i + 1}`}
              width={600}
              height={800}
              className="w-full h-auto object-cover hover:scale-[1.05] transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Lightbox — rendered via portal to escape ScrollSmoother transform */}
      {mounted && activeIndex !== null && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-[20px] right-[20px] text-white text-[32px] leading-none hover:text-[#E02379] transition-colors z-10"
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
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} - ${activeIndex + 1}`}
              width={1600}
              height={1200}
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
          >
            ›
          </button>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProjectGallery;
