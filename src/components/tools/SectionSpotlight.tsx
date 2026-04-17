"use client";

import { useEffect } from "react";

const SectionSpotlight = () => {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".main-section-style");

    const handlers: { el: HTMLElement; fn: (e: MouseEvent) => void }[] = [];

    sections.forEach((el) => {
      const fn = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      };
      el.addEventListener("mousemove", fn);
      handlers.push({ el, fn });
    });

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("mousemove", fn));
    };
  }, []);

  return null;
};

export default SectionSpotlight;
