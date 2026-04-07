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
      className="team_area main-section-style bg-[#FAF7F8] dark:bg-[#252525]"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          {/* Section Header */}
          <div className="relative">
            <MainSectionTitle title={title} />
            {/* Corner quote */}
            <div className="has_fade_anim hidden lg:block absolute top-0 end-0 max-w-[280px] text-end">
              <div className="flex gap-[20px] justify-end">
                <p className="text-[15px] leading-[1.5] text-text-3 italic">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="w-[2px] flex-shrink-0 bg-gradient-to-b from-[#95298C] via-[#E02379] to-[#95298C] bg-[length:100%_200%] animate-gradient-shift" />
              </div>
            </div>
            {/* Mobile: show below title */}
            <div className="has_fade_anim lg:hidden mt-[20px]">
              <div className="flex gap-[16px]">
                <div className="w-[2px] flex-shrink-0 bg-gradient-to-b from-[#95298C] via-[#E02379] to-[#95298C] bg-[length:100%_200%] animate-gradient-shift" />
                <p className="text-[15px] leading-[1.5] text-text-3 italic">
                  &ldquo;{text}&rdquo;
                </p>
              </div>
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
                  <h3 className="has_fade_anim text-[24px] sm:text-[28px] md:text-[32px] xl:text-[40px] 2xl:text-[48px] leading-[1.08] whitespace-nowrap">
                    {gm.data.name.split(" ").map((word, index) => (
                      <span key={`gm-name-${index}`}>
                        {word}{index === 0 && " "}
                      </span>
                    ))}
                  </h3>
                  <span className="has_fade_anim text-[20px] inline-block mt-[12px] bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift">
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
                      everything is taken care of by our own team on the ground,
                      from our fleet to our guides, so every experience feels
                      seamless and truly ours. From arrival to farewell, we stay
                      fully involved in every detail.
                    </p>
                    <p>
                      The dream hotel remains Ahmed&apos;s goal, but his vision
                      has grown. He&apos;s now building a network of 8–10
                      INSIDERS destinations worldwide, the journey is already
                      well underway.
                    </p>
                  </div>
                  <div className="mt-[30px] has_fade_anim">
                    <div className="flex flex-wrap gap-[10px]">
                      {[
                        "Own fleet & certified local guides — no middlemen",
                        "All 7 Emirates, plus Oman, Jordan & Bahrain",
                        "4 global markets: Latin America, Russia, UK & USA",
                        "Available 24/7 — from first enquiry to final goodbye",
                      ].map((item, i) => (
                        <span
                          key={i}
                          className="inline-block rounded-[30px] p-[1px] bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-[length:200%_100%] animate-gradient-shift"
                        >
                          <span className="block text-[13px] py-[8px] px-[16px] rounded-[30px] bg-[#FAF7F8] dark:bg-[#252525] uppercase">
                            <span className="bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift">
                              {item}
                            </span>
                          </span>
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
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-[30px] gap-y-[40px]">
              {restOfTeam?.slice(0, 8)?.map((profile) => (
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
