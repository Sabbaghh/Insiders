"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null!);
  const circleRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    // Track mouse position using left/top to avoid transform conflicts
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(circle, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    // Hover on interactive elements — grow circle + invert
    const onMouseEnter = () => {
      gsap.to(circle, {
        scale: 2.5,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        opacity: 0,
        duration: 0.2,
      });
    };

    const onMouseLeave = () => {
      gsap.to(circle, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, {
        opacity: 1,
        duration: 0.2,
      });
    };

    // Hide on mouse leave window
    const onDocLeave = () => {
      gsap.to([dot, circle], { opacity: 0, duration: 0.2 });
    };
    const onDocEnter = () => {
      gsap.to([dot, circle], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    // Attach hover listeners to interactive elements
    const interactiveSelectors = "a, button, input, textarea, [role='button'], .cursor-hover";
    const addHoverListeners = () => {
      const elements = document.querySelectorAll(interactiveSelectors);
      elements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
      return elements;
    };

    // Initial attach + observe DOM changes for dynamically added elements
    let elements = addHoverListeners();
    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
      elements = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed z-[2147483647] pointer-events-none"
        style={{ top: 0, left: 0 }}
      >
        <div
          className="w-[8px] h-[8px] rounded-full bg-white"
          style={{
            marginLeft: -4,
            marginTop: -4,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.55), 0 0 8px rgba(0,0,0,0.35)",
          }}
        />
      </div>
      {/* Outer circle */}
      <div
        ref={circleRef}
        className="fixed z-[2147483646] pointer-events-none"
        style={{ top: 0, left: 0 }}
      >
        <div
          className="w-[40px] h-[40px] rounded-full"
          style={{
            marginLeft: -20,
            marginTop: -20,
            border: "1px solid rgba(255,255,255,0.85)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.45), 0 0 14px rgba(0,0,0,0.25)",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
