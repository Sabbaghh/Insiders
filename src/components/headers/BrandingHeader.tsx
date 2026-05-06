"use client";
import Logo from "@/components/elements/logo/Logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type NavLink = { label: string; target: string; href?: string; disabled?: boolean };

const navLinks: NavLink[] = [
  { label: "We Are Insiders", target: "team" },
  { label: "Moments We've Created", target: "work" },
  { label: "Our Edge", target: "process" },
  { label: "Our Global Network", target: "wingman" },
  { label: "Our Videos", target: "videos", href: "/videos" },
  { label: "Our Wheels", target: "wheels", href: "/wheels" },
  { label: "Contact Us", target: "footer" },
];

type Props = {
  maxWidth?: string;
  onlyDark?: boolean;
  customLogo?: string;
  showNav?: boolean;
  sticky?: boolean;
};

const BrandingHeader = ({ maxWidth, onlyDark = false, customLogo, showNav = false, sticky = false }: Props) => {
  const { theme } = useTheme();
  const [isLight, setIsLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      setIsLight(true);
    } else {
      setIsLight(false);
    }
  }, [theme]);

  // Body scroll lock + ESC to close while menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const scrollTo = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset;
      document.body.scrollTop = y;
      document.documentElement.scrollTop = y;
    }
  };

  const handleScrollClick = (target: string) => {
    setMenuOpen(false);
    // small delay so the overlay can dismiss before we jump
    setTimeout(() => scrollTo(target), 50);
  };

  return (
    <header className={cn(sticky ? "fixed bg-black/70 backdrop-blur-md" : "absolute", "top-0 inset-x-0 z-50")}>
      <div className={cn("container", maxWidth)}>
        <div className="flex h-[80px] 2xl:h-[100px] items-center justify-between">
          <Logo
            light={!onlyDark && isLight}
            url={customLogo}
            customWidth={customLogo ? 155 : undefined}
            customHeight={customLogo ? 72 : undefined}
          />
          {showNav && (
            <>
              {/* Desktop horizontal nav (2xl+) */}
              <nav className="hidden 2xl:flex items-center gap-[14px] 2xl:gap-[20px] absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link, i) => (
                  <span key={link.target} className="flex items-center gap-[14px] 2xl:gap-[20px]">
                    {i > 0 && <span className="w-[5px] h-[5px] rounded-full bg-white/60 shrink-0" />}
                    {link.disabled ? (
                      <span
                        aria-disabled="true"
                        className="inline-flex items-center leading-none text-white text-[12px] 2xl:text-[13px] font-bold uppercase tracking-[0.1em] cursor-default select-none whitespace-nowrap"
                      >
                        {link.label}
                      </span>
                    ) : link.href ? (
                      <Link
                        href={link.href}
                        className="inline-flex items-center leading-none text-white text-[12px] 2xl:text-[13px] font-bold uppercase tracking-[0.1em] hover:text-[#E02379] transition-colors duration-200 whitespace-nowrap"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollTo(link.target)}
                        className="inline-flex items-center leading-none text-white text-[12px] 2xl:text-[13px] font-bold uppercase tracking-[0.1em] hover:text-[#E02379] transition-colors duration-200 whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                    )}
                  </span>
                ))}
              </nav>

              {/* Hamburger button (below xl) */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="2xl:hidden relative w-[40px] h-[40px] flex flex-col items-center justify-center gap-[5px] group"
              >
                <span className="block w-[22px] h-[2px] bg-white transition-all duration-300 group-hover:w-[26px]" />
                <span className="block w-[22px] h-[2px] bg-white transition-all duration-300 group-hover:w-[18px]" />
                <span className="block w-[22px] h-[2px] bg-white transition-all duration-300 group-hover:w-[26px]" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Full-screen mobile/tablet overlay menu — portaled to escape transformed ancestors (ScrollSmoother) */}
      {showNav && mounted && createPortal(
        <div
          className={cn(
            "2xl:hidden fixed inset-0 z-[2147483645] bg-black/95 backdrop-blur-md transition-opacity duration-300",
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMenuOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-[20px] right-[20px] md:top-[28px] md:right-[28px] w-[44px] h-[44px] flex items-center justify-center text-white text-[28px] hover:text-[#E02379] transition-colors"
          >
            ✕
          </button>

          {/* Links */}
          <nav
            className="h-full flex flex-col items-center justify-center gap-[18px] md:gap-[22px] px-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link, i) => {
              const baseClasses =
                "block text-center text-white text-[20px] sm:text-[24px] md:text-[28px] font-bold uppercase tracking-[0.08em] hover:text-[#E02379] transition-all duration-300";
              const transitionStyle: React.CSSProperties = {
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transitionProperty: "opacity, transform",
                transitionDuration: "500ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              };

              if (link.disabled) {
                return (
                  <span
                    key={link.target}
                    aria-disabled="true"
                    className={cn(baseClasses, "text-white/40 cursor-default")}
                    style={transitionStyle}
                  >
                    {link.label}
                  </span>
                );
              }
              if (link.href) {
                return (
                  <Link
                    key={link.target}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={baseClasses}
                    style={transitionStyle}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => handleScrollClick(link.target)}
                  className={baseClasses}
                  style={transitionStyle}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
};

export default BrandingHeader;
