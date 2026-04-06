"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { TTeamMemberType } from "@/types";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import BranProfileCard from "@/components/team/branding/BranProfileCard";
import MainSectionTitle from "@/components/sectionTitle/MainSectionTitle";
import ImageComponent from "@/components/tools/ImageComponent";

type teamProps = {
  title: string;
  text: string;
  teamMembers: TTeamMemberType[];
};

const BrandingTeam = ({ title, text, teamMembers }: teamProps) => {
  const pinElement = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    hasPinContent(pinElement.current);
  });

  const gm = teamMembers?.find((m) => m.data.id === 1);
  const restOfTeam = teamMembers?.filter((m) => m.data.id !== 1);

  return (
    <section
      id="team"
      ref={pinElement}
      className="team_area main-section-style bg-[#F8F2EB] dark:bg-[#252525]"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          {/* Section Header */}
          <div className="relative">
            <MainSectionTitle title={title} />
            {/* Corner quote */}
            <div className="has_fade_anim hidden lg:block absolute top-0 end-0 max-w-[280px] text-end">
              <div className="border-e-[2px] border-[#1C1C1C] dark:border-white pe-[20px]">
                <p className="text-[15px] leading-[1.5] text-text-3 italic">
                  &ldquo;{text}&rdquo;
                </p>
              </div>
            </div>
            {/* Mobile: show below title */}
            <div className="has_fade_anim lg:hidden mt-[20px]">
              <p className="text-[15px] leading-[1.5] text-text-3 italic border-s-[2px] border-[#1C1C1C] dark:border-white ps-[16px]">
                &ldquo;{text}&rdquo;
              </p>
            </div>
          </div>

          {/* GM Spotlight — same style as TeamMemberDetails */}
          {gm && (
            <div className="mt-[60px] xl:mt-[100px]">
              <div className="grid gap-x-[60px] gap-y-10 lg:grid-cols-[350px,1fr] xl:grid-cols-[400px,1fr] items-stretch">
                {/* Image */}
                <div
                  className="has_fade_anim inline-block relative z-10"
                  data-fade-from="left"
                >
                  <div className="hidden start-0 sm:block absolute top-0 w-[62%] -z-[1]">
                    <ImageComponent
                      className="h-full w-full"
                      src="/assets/imgs/shape/img-s-86.png"
                      darkSrc="/assets/imgs/shape/img-s-86-dark.png"
                      width={377}
                      height={755}
                      alt="shape"
                    />
                  </div>
                  <Image
                    src="/assets/imgs/team/Ahmed shelleh.png"
                    width={400}
                    height={480}
                    alt={gm.data.name}
                    className="object-cover w-full h-full rounded-[10px]"
                  />
                </div>
                {/* Content */}
                <div className="md:pt-[20px]">
                  <span className="has_fade_anim text-[14px] uppercase tracking-[0.2em] text-text-3 inline-block mb-[10px]">
                    The Mastermind
                  </span>
                  <h3 className="has_fade_anim text-[36px] sm:text-[40px] md:text-[50px] xl:text-[70px] 2xl:text-[80px] leading-[1.08]">
                    {gm.data.name.split(" ").map((word, index) => (
                      <span key={`gm-name-${index}`}>
                        {word}
                        {index === 0 && <br />}
                      </span>
                    ))}
                  </h3>
                  <span className="has_fade_anim text-[20px] inline-block text-text-3 mt-[12px]">
                    {gm.data.post}
                  </span>
                  <div className="has_fade_anim mt-[30px] space-y-[16px] text-[16px] xl:text-[17px] leading-[1.6] text-text-3">
                    <p>
                      At just 16, Ahmed had a clear vision: to build a hotel,
                      live on its top floor, and welcome the world.
                    </p>
                    <p>
                      That vision led him to study airport management and gain
                      hands-on experience across restaurants and hotels. Along
                      the way, he came to understand something simple but
                      powerful: people travel to feel good, to create memories,
                      and to return with stories worth telling.
                    </p>
                    <p>
                      This belief became the foundation of INSIDERS Tourism.
                      More than a DMC, it&apos;s a company built on genuine care
                      and a very hands-on approach. Every programme is created
                      from scratch, responses are fast and personal, and
                      everything is taken care of by our own team on the ground
                      — from our fleet to our guides — so every experience feels
                      seamless and truly ours.
                    </p>
                  </div>
                  <div className="mt-[30px] has_fade_anim">
                    <div className="flex flex-wrap gap-[10px]">
                      {[
                        "Own fleet & certified guides — no middlemen",
                        "All 7 Emirates + Oman, Jordan & Bahrain",
                        "4 global markets: LATAM, Russia, UK & USA",
                        "Available 24/7",
                      ].map((item, i) => (
                        <span
                          key={i}
                          className="text-[13px] py-[8px] px-[16px] border border-[#DEDEDE] dark:border-[#434343] rounded-[30px] inline-block text-text-3 uppercase"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rest of the Team */}
          <div className="mt-[60px] xl:mt-[100px]">
            <span className="has_fade_anim text-[14px] uppercase tracking-[0.2em] text-text-3 inline-block mb-[20px]">
              The Team
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-[30px] gap-y-[40px]">
              {restOfTeam?.slice(0, 6)?.map((profile) => (
                <BranProfileCard key={profile.data.id} {...profile} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingTeam;
