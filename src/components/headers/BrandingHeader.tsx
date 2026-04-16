"use client";
import Logo from "@/components/elements/logo/Logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "We Are Insiders", target: "team" },
  { label: "Moments We've Created", target: "work" },
  { label: "Our Edge", target: "process" },
  { label: "Our Global Network", target: "wingman" },
  { label: "Contact", target: "cta" },
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
            <nav className="hidden lg:flex items-center gap-[24px] xl:gap-[32px] absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link, i) => (
                <span key={link.target} className="flex items-center gap-[24px] xl:gap-[32px]">
                  {i > 0 && <span className="w-[4px] h-[4px] rounded-full bg-white/30" />}
                  <button
                    onClick={() => scrollTo(link.target)}
                    className="text-white/60 text-[11px] xl:text-[12px] uppercase tracking-[0.1em] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </span>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default BrandingHeader;
