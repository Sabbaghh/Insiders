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
            className="!leading-[1.3] text-[14px] mt-0 md:text-[14px] lg:text-[16px] xl:text-[20px] xl:mt-[-8px]
              2xl:text-[20px] 2xl:mt-[-8px] text-white/50 !font-extralight has_text_mov_anim"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {/* Quick Links */}
          {/* Quick Links — grid on mobile, inline on desktop */}
          <div className="mt-10 xl:mt-[40px] has_fade_anim" data-fade-from="left">
            {/* Mobile grid */}
            <div className="grid grid-cols-3 gap-[10px] md:hidden">
              {[
                { label: "We Are Insiders", target: "team" },
                { label: "Moments We've Created", target: "work" },
                { label: "Our Edge", target: "process" },
                { label: "Our Global Network", target: "wingman" },
                { label: "Show Me What's Inside", target: "cta" },
              ].map((link) => (
                <button
                  key={link.target}
                  onClick={() => {
                    const el = document.getElementById(link.target);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset;
                      document.body.scrollTop = y;
                      document.documentElement.scrollTop = y;
                    }
                  }}
                  className="text-white/60 text-[11px] uppercase tracking-[0.05em] hover:text-white transition-colors duration-200 leading-[1.3] text-center border border-white/20 rounded-[8px] py-[8px] px-[6px]"
                >
                  {link.label}
                </button>
              ))}
            </div>
            {/* Desktop inline */}
            <div className="hidden md:flex items-center gap-0 flex-wrap">
              {[
                { label: "We Are\nInsiders", target: "team" },
                { label: "Moments We've\nCreated", target: "work" },
                { label: "Our\nEdge", target: "process" },
                { label: "Our Global\nNetwork", target: "wingman" },
                { label: "Show Me\nWhat's Inside", target: "cta" },
              ].map((link, i) => (
                <span key={link.target} className="flex items-center">
                  {i > 0 && <span className="text-white/30 mx-[20px] md:mx-[28px]">|</span>}
                  <button
                    onClick={() => {
                      const el = document.getElementById(link.target);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.pageYOffset;
                        document.body.scrollTop = y;
                        document.documentElement.scrollTop = y;
                      }
                    }}
                    className="text-white/60 text-[12px] md:text-[13px] uppercase tracking-[0.1em] hover:text-white transition-colors duration-200 leading-[1.4] whitespace-pre-line text-center min-w-[80px] md:min-w-[90px]"
                  >
                    {link.label}
                  </button>
                </span>
              ))}
            </div>
          </div>

          {aboutData.action_btn?.enable && (
            <div
              className="mt-3 xl:mt-[14px] has_fade_anim"
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
