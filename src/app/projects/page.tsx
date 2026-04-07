import { getAllPages } from "@/lib/helper/contentConverter";
import BrandingHeader from "@/components/headers/BrandingHeader";
import MinimalFooter from "@/components/footer/MinimalFooter";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ScrollTop from "@/components/tools/ScrollTop";
import RefreshGsap from "@/components/tools/RefreshGsap";
import SeoData from "@/components/tools/SeoData";
import ProjectsList from "@/components/work/branding/ProjectsList";

const ProjectsPage = () => {
  const works = getAllPages("/works/branding");

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
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <BrandingHeader onlyDark />
          <main>
            <SeoData
              title="All Projects - INSIDERS Tourism"
              description="Browse all projects delivered by INSIDERS Tourism in the UAE."
            />
            <RefreshGsap />

            {/* Page Header */}
            <section className="bg-[#FAF7F8] dark:bg-[#252525] pt-[140px] xl:pt-[180px] pb-[60px] xl:pb-[80px]">
              <div className="container">
                <div className="text-center">
                  <h1
                    className="hero-title text-[32px] md:text-[48px] xl:text-[64px] !font-normal uppercase !leading-[1.4] bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift"
                    style={{ fontFamily: "'Boldonse', sans-serif" }}
                  >
                    Moments We&apos;ve Created
                  </h1>
                </div>
              </div>
            </section>

            {/* Projects List with Search & Lazy Load */}
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
