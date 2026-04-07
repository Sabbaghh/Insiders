import { getAllPages } from "@/lib/helper/contentConverter";
import BrandingHeader from "@/components/headers/BrandingHeader";
import MinimalFooter from "@/components/footer/MinimalFooter";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ScrollTop from "@/components/tools/ScrollTop";
import RefreshGsap from "@/components/tools/RefreshGsap";
import SeoData from "@/components/tools/SeoData";
import ProjectsList from "@/components/work/branding/ProjectsList";
import SectionTitle from "@/components/sectionTitle/SectionTitle";

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
          <BrandingHeader onlyDark customLogo="/assets/imgs/logo/black.png" />
          <main>
            <SeoData
              title="All Projects - INSIDERS Tourism"
              description="Browse all projects delivered by INSIDERS Tourism in the UAE."
            />
            <RefreshGsap />

            {/* Page Header */}
            <section className="bg-[#FAF7F8] dark:bg-[#252525] pt-[140px] xl:pt-[180px] pb-[60px] xl:pb-[80px]">
              <div className="container">
                <div className="flex justify-center">
                  <SectionTitle title="Moments We've Created" heading1 />
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
