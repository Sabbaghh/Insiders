import { getAllPages } from "@/lib/helper/contentConverter";
import BrandingHeader from "@/components/headers/BrandingHeader";
import MinimalFooter from "@/components/footer/MinimalFooter";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ScrollTop from "@/components/tools/ScrollTop";
import RefreshGsap from "@/components/tools/RefreshGsap";
import SeoData from "@/components/tools/SeoData";
import ProjectsList from "@/components/work/branding/ProjectsList";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import FloatingSocials from "@/components/tools/FloatingSocials";

const ProjectsPage = () => {
  const works = getAllPages("/works/branding").reverse();

  const projects = works.map((w: any) => ({
    slug: w.slug,
    title: w.data.title,
    image: w.data.image,
    date: w.data.date,
    client: w.data.client,
    venue: w.data.venue || "",
    tags: w.data.tags || [],
  }));

  return (
    <div className="instrument">
      <ScrollSmootherComponent />
      <ScrollTop />
      <FloatingSocials />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <BrandingHeader onlyDark customLogo="/assets/imgs/logo/black.png" />
          <main>
            <SeoData
              title="All Projects - INSIDERS Tourism"
              description="Browse all projects delivered by INSIDERS Tourism in the UAE."
            />
            <RefreshGsap />

            {/* Page Header */}
            <section className="bg-[#FAF7F8] dark:bg-[#252525] pt-[140px] xl:pt-[180px] pb-[40px] xl:pb-[60px]">
              <div className="container">
                <div className="flex items-center gap-[12px] md:gap-[16px]">
                  <Link
                    href="/?scrollTo=work"
                    className="group w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-full border border-[#DEDEDE] dark:border-[#434343] flex items-center justify-center text-[#6D6E71] hover:border-[#E02379] hover:text-[#E02379] transition-all duration-300 hover:scale-110 flex-shrink-0"
                  >
                    <FaArrowLeft className="text-[11px] group-hover:-translate-x-[2px] transition-transform duration-300" />
                  </Link>
                  <SectionTitle title="Moments We've Created" heading1 className="!pl-0 !mt-0" />
                </div>
              </div>
            </section>

            {/* Projects Grid with Search */}
            <section className="bg-[#FAF7F8] dark:bg-[#252525] pb-[250px] xl:pb-[300px]">
              <div className="container">
                <ProjectsList projects={projects} />
              </div>
            </section>
          </main>
          <MinimalFooter />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
