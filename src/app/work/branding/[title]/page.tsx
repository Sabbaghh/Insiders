import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPages } from "@/lib/helper/contentConverter";
import SeoData from "@/components/tools/SeoData";
import BrandingHeader from "@/components/headers/BrandingHeader";
import MinimalFooter from "@/components/footer/MinimalFooter";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ScrollTop from "@/components/tools/ScrollTop";
import RefreshGsap from "@/components/tools/RefreshGsap";
import ProjectGallery from "@/components/work/branding/ProjectGallery";

type Props = {
  params: {
    title: string;
  };
};

export const generateStaticParams = () => {
  const works = getAllPages("/works/branding");
  return works.map((p) => ({ title: p.slug }));
};

const ProjectPage = ({ params }: Props) => {
  const works = getAllPages("/works/branding");
  if (!works?.length) notFound();

  const work = works.find((w) => w.slug === params.title);
  if (!work?.data) notFound();

  const { title, image, gallery, date, client, venue, meta }: any = work.data;
  const galleryImages: string[] = gallery || [];

  return (
    <div className="instrument">
      <ScrollSmootherComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <BrandingHeader onlyDark />
          <main>
            <SeoData
              title={title}
              meta_title={meta?.meta_title}
              description={meta?.meta_description}
            />
            <RefreshGsap />

            {/* Hero — same style as home hero */}
            <section className="relative min-h-screen z-10 overflow-hidden">
              {/* Background cover image */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              {/* Dark Overlay */}
              <div className="absolute inset-0 -z-[5] bg-black/60" />

              <div className="container flex items-center justify-center min-h-screen">
                <div className="w-full lg:w-[70%] relative mx-auto lg:ml-[20%] text-center lg:text-left">
                  {/* Title */}
                  <h1
                    className="hero-title text-white uppercase !leading-[1.4] !font-normal text-[32px] sm:text-[32px] md:text-[50px] xl:text-[68px] 2xl:text-[100px] mt-0 mb-0"
                    style={{ fontFamily: "'Boldonse', sans-serif" }}
                  >
                    {title}
                  </h1>

                  {/* Meta info */}
                  <div className="mt-[20px] xl:mt-[30px] flex flex-wrap items-center justify-center lg:justify-start gap-[12px] md:gap-[20px] text-white/60 text-[12px] md:text-[14px] uppercase tracking-[0.1em]">
                    {client && <span>{client}</span>}
                    {date && (
                      <>
                        <span className="text-white/30">|</span>
                        <span>{date}</span>
                      </>
                    )}
                    {venue && (
                      <>
                        <span className="text-white/30">|</span>
                        <span>{venue}</span>
                      </>
                    )}
                  </div>

                  {/* Back button */}
                  <div className="mt-6 xl:mt-[30px]">
                    <Link
                      href="/"
                      className="inline-block text-white text-[12px] md:text-[14px] uppercase tracking-[0.15em] border border-white/40 rounded-full px-[24px] py-[12px] hover:bg-white hover:text-black transition-all duration-300"
                    >
                      ← Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <section className="bg-[#FAF7F8] dark:bg-[#252525] pt-[80px] xl:pt-[120px] pb-[250px] xl:pb-[300px]">
                <div className="container">
                  <div className="text-center mb-[40px] xl:mb-[60px]">
                    <h2 className="text-[24px] md:text-[32px] xl:text-[40px] !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift">
                      Gallery
                    </h2>
                    <p className="text-[#6D6E71] text-[13px] md:text-[14px] mt-[8px]">
                      {galleryImages.length} photos
                    </p>
                  </div>

                  <ProjectGallery images={galleryImages} title={title} />
                </div>
              </section>
            )}
          </main>
          <MinimalFooter />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
