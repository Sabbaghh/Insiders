"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasTextMovAnim from "@/lib/animation/hasTextMovAnim";
import { useDirection } from "@/context/app.context";
import { ActionBtnType } from "@/types";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";

type Props = {
  aboutData: {
    sub_title: string;
    description: string;
    action_btn?: ActionBtnType;
  };
};

const BranAboutArea = ({ aboutData }: Props) => {
  const { sub_title, description } = aboutData;
  const containerRef = useRef<HTMLDivElement>(null!);

  const { direction } = useDirection();

  useGSAP(
    () => {
      hasTextMovAnim();
      hasFadeAnim();
    },
    { dependencies: [direction], scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div>
        <div>
          <p
            className="leading-none text-[12px] mt-0 md:text-[18px] lg:text-[20px] xl:text-[25px] xl:mt-[-8px]
              2xl:text-[35px] 2xl:-mt-3 text-white has_text_mov_anim"
          >
            {description}
          </p>
          {/* Quick Links */}
          <div className="mt-8 xl:mt-[40px] has_fade_anim flex items-center gap-[8px] md:gap-0 flex-wrap" data-fade-from="left">
            {[
              { label: "Clients", target: "clients" },
              { label: "Our Work", target: "work" },
              { label: "About Us", target: "team" },
              { label: "Our Edge", target: "process" },
              { label: "Partners", target: "wingman" },
            ].map((link, i) => (
              <span key={link.target} className="flex items-center">
                {i > 0 && <span className="text-white/30 hidden md:inline mx-[16px]">|</span>}
                <button
                  onClick={() => {
                    const el = document.getElementById(link.target);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset;
                      document.body.scrollTop = y;
                      document.documentElement.scrollTop = y;
                    }
                  }}
                  className="text-white/60 text-[11px] md:text-[14px] uppercase tracking-[0.1em] hover:text-white transition-colors duration-200 border border-white/20 md:border-0 rounded-full px-[14px] py-[6px] md:px-0 md:py-0"
                >
                  {link.label}
                </button>
              </span>
            ))}
          </div>

          {aboutData.action_btn?.enable && (
            <div
              className="mt-6 xl:mt-[30px] has_fade_anim"
              data-fade-from="left"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("cta");
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset;
                    document.body.scrollTop = y;
                    document.documentElement.scrollTop = y;
                  }
                }}
                className="inline-block text-white text-[14px] md:text-[16px] uppercase tracking-[0.15em] border border-white/40 rounded-full px-[30px] py-[14px] hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              >
                {aboutData.action_btn.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranAboutArea;
