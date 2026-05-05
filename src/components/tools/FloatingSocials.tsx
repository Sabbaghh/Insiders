"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import siteConfig from "@/config/siteConfig.json";

const socialLink = (name: string) =>
  siteConfig.social.find((s) => s.name === name)?.link || "#";

const links = [
  { icon: FaWhatsapp, getHref: (info: any) => `https://wa.me/${(info?.mobile || "").replace(/[^0-9]/g, "")}`, label: "WhatsApp", size: "text-[15px]" },
  { icon: FaPhone, getHref: (info: any) => `tel:${info?.mobile || ""}`, label: "Phone", size: "text-[12px]" },
  { icon: FaEnvelope, getHref: (info: any) => `mailto:${info?.email || ""}`, label: "Email", size: "text-[13px]" },
  { icon: FaFacebookF, getHref: () => socialLink("Fb"), label: "Facebook", size: "text-[13px]" },
  { icon: FaInstagram, getHref: () => socialLink("Ig"), label: "Instagram", size: "text-[14px]" },
  { icon: FaLinkedinIn, getHref: () => socialLink("Li"), label: "LinkedIn", size: "text-[13px]" },
  { icon: FaYoutube, getHref: () => socialLink("Yt"), label: "YouTube", size: "text-[14px]" },
];

const FloatingSocials = () => {
  const { footer_info } = siteConfig;
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed right-[5px] md:right-[10px] lg:right-[20px] bottom-[120px] md:bottom-[130px] xl:bottom-[80px] z-[998] flex flex-col items-center gap-[8px] transition-all duration-500 ${!pastHero ? "hidden md:flex" : "flex"}`}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.getHref(footer_info)}
            target={link.label === "Phone" || link.label === "Email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={link.label}
            className={`w-[34px] h-[34px] md:w-[50px] md:h-[50px] rounded-full border flex items-center justify-center transition-all duration-500 ${
              pastHero
                ? "border-[#DEDEDE] dark:border-[#434343] bg-white/80 dark:bg-black/50 backdrop-blur-sm text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379]"
                : "border-white/30 bg-transparent text-white/50 hover:border-white hover:text-white"
            }`}
          >
            <Icon className={link.size} />
          </a>
        );
      })}
    </div>
  );
};

export default FloatingSocials;
