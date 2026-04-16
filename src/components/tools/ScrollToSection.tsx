"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ScrollToSection = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const target = searchParams.get("scrollTo");
    if (!target) return;

    // Wait for GSAP/ScrollSmoother to initialize
    const timer = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset;
        document.body.scrollTop = y;
        document.documentElement.scrollTop = y;
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return null;
};

export default ScrollToSection;
