"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import hasPinContent from "@/lib/animation/hasPinContent";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import TestimonialSliderNav from "@/components/testimonial/TestimonialSliderNav";
import BranTestimonialCard from "@/components/testimonial/branding/BranTestimonialCard";
import BranTestimonialInfo from "@/components/testimonial/branding/BranTestimonialInfo";
import { TTestimonialList } from "@/types";
import MainSectionTitle from "@/components/sectionTitle/MainSectionTitle";

type Props = {
  title: string;
  info: {
    rating: number;
    reviews: number;
    text: string;
  };
  testimonial_list: TTestimonialList[];
  brands?: {
    image: {
      dark: string;
      light: string;
    };
  }[];
};

const BrandingTestimonial = ({
  title,
  info,
  testimonial_list,
}: Props) => {
  const pinElement = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  useGSAP(
    () => {
      hasPinContent(pinElement.current);
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  const handlePrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <div
      id="testimonials"
      ref={pinElement}
      className="bg-[#FAF7F8] dark:bg-[#1a1a1a] main-section-style"
    >
      <div ref={containerRef} className="container">
        <div className="main-section-spacing">
          <MainSectionTitle title={title} className="whitespace-nowrap" />

          <div className="grid gap-5 relative mt-[50px] md:grid-cols-[1fr,54%] lg:grid-cols-[1fr,65%] xl:grid-cols-[1fr,71%] xl:mt-[90px]">
            <BranTestimonialInfo {...info} />
            <div className="bg-[#FDFAF8] dark:bg-[#1B1B1B] overflow-hidden rounded-[20px] cursor-grab">
              <Carousel
                className="w-full"
                dir="ltr"
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setApi}
              >
                <CarouselContent>
                  {testimonial_list.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-full xl:basis-1/2 me-[50px]"
                    >
                      <BranTestimonialCard {...item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <TestimonialSliderNav
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingTestimonial;
