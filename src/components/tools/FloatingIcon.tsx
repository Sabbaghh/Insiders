"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FloatingIcon = () => {
  const iconRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;

    // Entry animation
    gsap.fromTo(
      el,
      { scale: 0, opacity: 0, rotation: -30 },
      { scale: 1, opacity: 0.8, rotation: 0, duration: 1.2, delay: 0.8, ease: "back.out(1.7)" }
    );

    // Shrink as user scrolls down
    gsap.to(el, {
      scale: 0.3,
      opacity: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "3000px top",
        scrub: 0.5,
      },
    });

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = ((e.clientX / window.innerWidth) - 0.5) * 30;
      const moveY = ((e.clientY / window.innerHeight) - 0.5) * 30;
      gsap.to(el, {
        x: moveX,
        y: moveY,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={iconRef}
      className="fixed top-[15vh] right-[5vw] z-[999] pointer-events-none opacity-0"
      style={{ transformOrigin: "center center" }}
    >
      <Image
        src="/assets/imgs/logoicon.png"
        width={1000}
        height={1000}
        alt="INSIDERS icon"
        unoptimized
        className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] xl:w-[450px] xl:h-[450px] drop-shadow-lg"
      />
    </div>
  );
};

export default FloatingIcon;
