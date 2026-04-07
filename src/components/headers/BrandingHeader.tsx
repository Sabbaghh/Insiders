"use client";
import Logo from "@/components/elements/logo/Logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  maxWidth?: string;
  onlyDark?: boolean;
  customLogo?: string;
};

const BrandingHeader = ({ maxWidth, onlyDark = false, customLogo }: Props) => {
  const { theme } = useTheme();
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setIsLight(true);
    } else {
      setIsLight(false);
    }
  }, [theme]);

  return (
    <header className="absolute top-0 inset-x-0 z-50">
      <div className={cn("container", maxWidth)}>
        <div className="flex h-[80px] 2xl:h-[100px] items-center">
          <Logo
            light={!onlyDark && isLight}
            url={customLogo}
            customWidth={customLogo ? 160 : undefined}
            customHeight={customLogo ? 75 : undefined}
          />
        </div>
      </div>
    </header>
  );
};

export default BrandingHeader;
