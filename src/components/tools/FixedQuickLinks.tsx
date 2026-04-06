"use client";
import { useEffect, useState } from "react";

const links = [
  { label: "Clients", target: "clients" },
  { label: "Our Work", target: "work" },
  { label: "About Us", target: "team" },
  { label: "Our Edge", target: "process" },
  { label: "Partners", target: "wingman" },
  { label: "Contact", target: "cta" },
];

const FixedQuickLinks = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`hidden lg:flex fixed right-[30px] xl:right-[50px] top-1/2 -translate-y-1/2 z-[999] transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[30px] pointer-events-none"
      }`}
    >
      <div className="rotate-90 flex items-center gap-[24px] origin-center">
        {links.map((link, i) => (
          <span key={link.target} className="flex items-center">
            {i > 0 && <span className="text-[#6D6E71]/30 mr-[24px]">—</span>}
            <button
              onClick={() => {
                const el = document.getElementById(link.target);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset;
                  document.body.scrollTop = y;
                  document.documentElement.scrollTop = y;
                }
              }}
              className="text-[#6D6E71]/60 text-[11px] uppercase tracking-[0.2em] hover:text-[#E02379] transition-colors duration-300 whitespace-nowrap"
            >
              {link.label}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FixedQuickLinks;
