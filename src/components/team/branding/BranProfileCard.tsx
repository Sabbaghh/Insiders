"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TTeamMemberType } from "@/types";
import { FaLinkedinIn, FaPhone, FaEnvelope } from "react-icons/fa6";

const BranProfileCard = ({ data }: TTeamMemberType) => {
  const { name, post, avatar, nickname, social_link, description } = data;
  const [showBio, setShowBio] = useState(false);

  const bio =
    description ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

  useEffect(() => {
    if (showBio) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showBio]);

  return (
    <>
      <div
        className="has_fade_anim text-center py-[40px] cursor-pointer group"
        data-fade-from="bottom"
        data-delay="0.15"
        onClick={() => setShowBio(true)}
      >
        <div className="rounded-full overflow-hidden w-[160px] h-[160px] xl:w-[200px] xl:h-[200px] mx-auto">
          <Image
            src={avatar}
            height={200}
            width={200}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-[1.1] transition-transform duration-300"
          />
        </div>
        <div className="mt-[20px]">
          {nickname && (
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#6D6E71] dark:text-text-fixed-3 mb-[8px]">
              {nickname}
            </p>
          )}
          <h3 className="text-[20px] xl:text-[24px] leading-[1.1] font-semibold">
            {name}
          </h3>
          <p className="text-[14px] mt-[8px] leading-none bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift">
            {post}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); setShowBio(true); }}
            className="mt-[12px] text-[11px] uppercase tracking-[0.1em] px-[16px] py-[7px] rounded-full border border-[#DEDEDE] dark:border-[#434343] text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
          >
            View
          </button>
        </div>
      </div>

      {/* Bio Modal */}
      {showBio && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowBio(false)}
        >
          <div
            className="bg-white dark:bg-[#1a1a1a] rounded-[20px] max-w-[500px] w-full p-[30px] md:p-[40px] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowBio(false)}
              className="absolute top-[16px] right-[16px] text-[#6D6E71] hover:text-[#E02379] transition-colors text-[24px] leading-none"
            >
              &times;
            </button>

            {/* Header */}
            <div className="flex items-center gap-[16px] mb-[24px]">
              <div className="rounded-full overflow-hidden w-[70px] h-[70px] flex-shrink-0">
                <Image
                  src={avatar}
                  height={70}
                  width={70}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                {nickname && (
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#6D6E71] mb-[4px]">
                    {nickname}
                  </p>
                )}
                <h3 className="text-[20px] font-semibold leading-[1.1]">
                  {name}
                </h3>
                <p className="text-[13px] mt-[4px] bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift">
                  {post}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div
              className="text-[14px] leading-[1.7] text-[#6D6E71] dark:text-[#aaa]"
              dangerouslySetInnerHTML={{ __html: bio }}
            />

            {/* Contact */}
            <div className="mt-[24px] pt-[20px] border-t border-[#EBEBEB] dark:border-[#333]">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#6D6E71] mb-[12px]">
                Contact
              </p>
              <div className="flex flex-wrap gap-[10px]">
                {social_link && (
                  <a
                    href={social_link === "#" ? "#" : social_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[8px] text-[12px] uppercase tracking-[0.1em] px-[16px] py-[8px] rounded-full border border-[#DEDEDE] dark:border-[#434343] text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
                  >
                    <FaLinkedinIn className="text-[12px]" />
                    LinkedIn
                  </a>
                )}
                <a
                  href={`mailto:info@insiderstourism.com`}
                  className="inline-flex items-center gap-[8px] text-[12px] uppercase tracking-[0.1em] px-[16px] py-[8px] rounded-full border border-[#DEDEDE] dark:border-[#434343] text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
                >
                  <FaEnvelope className="text-[12px]" />
                  Email
                </a>
                <a
                  href="tel:+971000000000"
                  className="inline-flex items-center gap-[8px] text-[12px] uppercase tracking-[0.1em] px-[16px] py-[8px] rounded-full border border-[#DEDEDE] dark:border-[#434343] text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors"
                >
                  <FaPhone className="text-[10px]" />
                  Phone
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BranProfileCard;
