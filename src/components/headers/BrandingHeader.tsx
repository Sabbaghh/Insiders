"use client";
import Logo from "@/components/elements/logo/Logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type NavLink = { label: string; target: string; disabled?: boolean };

const navLinks: NavLink[] = [
  { label: "We Are Insiders", target: "team" },
  { label: "Moments We've Created", target: "work" },
  { label: "Our Edge", target: "process" },
  { label: "Our Global Network", target: "wingman" },
  { label: "Contact Us", target: "cta" },
  { label: "Our Videos", target: "videos", disabled: true },
  { label: "Our Wheels", target: "wheels", disabled: true },
];

type Props = {
  maxWidth?: string;
  onlyDark?: boolean;
  customLogo?: string;
  showNav?: boolean;
};

const BrandingHeader = ({ maxWidth, onlyDark = false, customLogo, showNav = false }: Props) => {
  const { theme } = useTheme();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setIsLight(true);
    } else {
      setIsLight(false);
    }
  }, [theme]);

  const scrollTo = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset;
      document.body.scrollTop = y;
      document.documentElement.scrollTop = y;
    }
  };

  return (
    <header className="absolute top-0 inset-x-0 z-50">
      <div className={cn("container", maxWidth)}>
        <div className="flex h-[80px] 2xl:h-[100px] items-center justify-between">
          <Logo
            light={!onlyDark && isLight}
            url={customLogo}
            customWidth={customLogo ? 155 : undefined}
            customHeight={customLogo ? 72 : undefined}
          />
          {showNav && (
            <nav className="hidden lg:flex items-center gap-[16px] xl:gap-[24px] 2xl:gap-[32px] absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link, i) => {
                const words = link.label.split(" ");
                const half = Math.ceil(words.length / 2);
                const lines =
                  words.length <= 2
                    ? words
                    : [words.slice(0, half).join(" "), words.slice(half).join(" ")];
                const stacked = (
                  <span className="flex flex-col items-center leading-[1.15]">
                    {lines.map((w, wi) => (
                      <span key={wi}>{w}</span>
                    ))}
                  </span>
                );
                return (
                  <span key={link.target} className="flex items-center gap-[16px] xl:gap-[24px] 2xl:gap-[32px]">
                    {i > 0 && <span className="w-[4px] h-[4px] rounded-full bg-white/30 shrink-0" />}
                    {link.disabled ? (
                      <span
                        aria-disabled="true"
                        className="text-white/80 text-[11px] xl:text-[12px] font-semibold uppercase tracking-[0.1em] cursor-default select-none"
                      >
                        {stacked}
                      </span>
                    ) : (
                      <button
                        onClick={() => scrollTo(link.target)}
                        className="text-white/80 text-[11px] xl:text-[12px] font-semibold uppercase tracking-[0.1em] hover:text-white transition-colors duration-200"
                      >
                        {stacked}
                      </button>
                    )}
                  </span>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default BrandingHeader;
