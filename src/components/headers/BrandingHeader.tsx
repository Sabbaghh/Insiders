"use client";
import Logo from "@/components/elements/logo/Logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

type NavLink = { label: string; target: string; href?: string; disabled?: boolean };

const navLinks: NavLink[] = [
  { label: "We Are Insiders", target: "team" },
  { label: "Moments We've Created", target: "work" },
  { label: "Our Edge", target: "process" },
  { label: "Our Global Network", target: "wingman" },
  { label: "Our Videos", target: "videos", disabled: true },
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
            <nav className="hidden lg:flex items-center gap-[10px] xl:gap-[14px] 2xl:gap-[20px] absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link, i) => (
                <span key={link.target} className="flex items-center gap-[10px] xl:gap-[14px] 2xl:gap-[20px]">
                  {i > 0 && <span className="w-[5px] h-[5px] rounded-full bg-white/60 shrink-0" />}
                  {link.disabled ? (
                    <span
                      aria-disabled="true"
                      className="inline-flex items-center leading-none text-white text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold uppercase tracking-[0.1em] cursor-default select-none whitespace-nowrap"
                    >
                      {link.label}
                    </span>
                  ) : link.href ? (
                    <Link
                      href={link.href}
                      className="inline-flex items-center leading-none text-white text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold uppercase tracking-[0.1em] hover:text-[#E02379] transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollTo(link.target)}
                      className="inline-flex items-center leading-none text-white text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold uppercase tracking-[0.1em] hover:text-[#E02379] transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.label}
                    </button>
                  )}
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
