"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasTextMovAnim from "@/lib/animation/hasTextMovAnim";
import { useDirection } from "@/context/app.context";
import { FaWhatsapp, FaPhone, FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa6";
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
          {aboutData.action_btn?.enable && (
            <div
              className="mt-3 xl:mt-[14px] has_fade_anim"
              data-fade-from="left"
            >
              <div className="flex items-center gap-[12px] flex-wrap">
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
                {/* Mobile social icons */}
                <div className="flex items-center gap-[8px] md:hidden">
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-[34px] h-[34px] rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-white hover:text-white transition-colors">
                    <FaWhatsapp className="text-[15px]" />
                  </a>
                  <a href="tel:" aria-label="Phone" className="w-[34px] h-[34px] rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-white hover:text-white transition-colors">
                    <FaPhone className="text-[12px]" />
                  </a>
                  <a href="mailto:info@insiderstourism.com" aria-label="Email" className="w-[34px] h-[34px] rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-white hover:text-white transition-colors">
                    <FaEnvelope className="text-[13px]" />
                  </a>
                  <a href="https://www.instagram.com/insiderstourism" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-[34px] h-[34px] rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-white hover:text-white transition-colors">
                    <FaInstagram className="text-[14px]" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranAboutArea;
