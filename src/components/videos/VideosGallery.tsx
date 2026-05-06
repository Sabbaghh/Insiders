"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  videoIds: string[];
};

const VideosGallery = ({ videoIds }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.videoId;
            if (id) {
              setVisibleIds((prev) => new Set(prev).add(id));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "200px" }
    );

    const cards = containerRef.current?.querySelectorAll(".video-card") ?? [];
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [videoIds]);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".video-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: (i % 3) * 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [videoIds] }
  );

  if (!videoIds.length) {
    return (
      <div className="text-center py-[80px] text-white/50 text-[15px]">
        No videos yet. Add YouTube video IDs to the list.
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px] md:gap-[20px] xl:gap-[24px]">
        {videoIds.map((id, i) => (
          <div
            key={`${id}-${i}`}
            data-video-id={id}
            className="video-card relative aspect-video overflow-hidden rounded-[12px] md:rounded-[16px] bg-[#0c0c0c]"
          >
            {visibleIds.has(id) ? (
              <iframe
                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                title={`Video ${i + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosGallery;
