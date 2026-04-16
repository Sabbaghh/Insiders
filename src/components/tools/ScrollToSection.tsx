"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ScrollHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const target = searchParams.get("scrollTo");
    if (!target) return;

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

const ScrollToSection = () => {
  return (
    <Suspense fallback={null}>
      <ScrollHandler />
    </Suspense>
  );
};

export default ScrollToSection;
