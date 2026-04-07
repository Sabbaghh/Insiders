"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import hasPinContent from "@/lib/animation/hasPinContent";
import { TWorkType } from "@/types";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Link from "next/link";
import CarouselCard from "@/components/portfolio/carousel/CarouselCard";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { CarouselSkeletonCard } from "@/components/portfolio/carousel/CarouselSkeletonCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCarousel } from "@/lib/plugins";
import { cn } from "@/lib/utils";

import "@/styles/swiper-slider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  works: TWorkType[];
  title: string;
  description: string;
};

const BrandingWorkCarousel = ({ works, title }: Props) => {
  const pinElement = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    hasPinContent(pinElement.current);
  });

  const carouselData = works.map((w) => ({
    image: w.data.image,
    title: w.data.title,
    tag: w.data.tags?.[0] || "",
    slug: w.slug,
  }));

  return (
    <section
      id="work"
      ref={pinElement}
      className="work-area section-item bg-background mb-[130px] mt-[-130px] rounded-[30px_30px_0_0] lg:rounded-[50px_50px_0_0] xl:rounded-[80px_80px_0_0] relative z-10 overflow-hidden"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[20px]">
            <SectionTitle
              title={title}
              className="whitespace-nowrap leading-[1]"
            />
            <Link
              href="/projects"
              className="inline-block text-[12px] md:text-[13px] uppercase tracking-[0.15em] border border-[#DEDEDE] dark:border-[#434343] rounded-full px-[24px] py-[12px] text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-colors self-start md:self-auto"
            >
              View All →
            </Link>
          </div>
        </div>
      </div>
      <div className="container !max-w-[1850px]">
        <div className="pb-[250px] h-[70vh]">
          <div
            id="app"
            className="relative z-10 h-full flex items-center justify-center"
          >
            {isLoading && (
              <div className="!mx-auto pos-center">
                <CarouselSkeletonCard />
              </div>
            )}
            <Swiper
              className={cn(
                "swiper-carousel !max-w-[1400px] relative !mx-auto !overflow-hidden opacity-100",
                isLoading && "opacity-0"
              )}
              modules={[EffectCarousel, Navigation, Pagination, Autoplay]}
              dir="ltr"
              effect="carousel"
              grabCursor={true}
              loop={true}
              loopAdditionalSlides={1}
              slidesPerView="auto"
              navigation={{
                nextEl: ".portfolio-button-next",
                prevEl: ".portfolio-button-prev",
              }}
              pagination={{
                el: ".portfolio-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 3000,
              }}
              onInit={() => {
                setIsLoading(false);
              }}
            >
              {carouselData.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="swiper-slide !h-[310px] sm:!h-[360px] !w-[600px] xl:!h-[450px] xl:!w-[700px] 2xl:!h-[550px] 2xl:!w-[800px] !max-w-[calc(100%-48px)]"
                >
                  <Link href={`/work/branding/${item.slug}`}>
                    <CarouselCard image={item.image} title={item.title} tag={item.tag} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingWorkCarousel;
