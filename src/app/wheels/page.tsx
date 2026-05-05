import BrandingHeader from "@/components/headers/BrandingHeader";
import MinimalFooter from "@/components/footer/MinimalFooter";
import CustomCursor from "@/components/tools/CustomCursor";
import SectionSpotlight from "@/components/tools/SectionSpotlight";
import SeoData from "@/components/tools/SeoData";
import WheelsGallery from "@/components/wheels/WheelsGallery";

const images = [
  "/assets/imgs/Wheels/1.png",
  "/assets/imgs/Wheels/2.png",
  "/assets/imgs/Wheels/3.png",
  "/assets/imgs/Wheels/4.png",
  "/assets/imgs/Wheels/5.png",
  "/assets/imgs/Wheels/6.png",
  "/assets/imgs/Wheels/7.png",
  "/assets/imgs/Wheels/8.png",
];

const WheelsPage = () => {
  return (
    <div className="instrument dark bg-black text-white min-h-screen">
      <SeoData
        title="Our Wheels — INSIDERS Tourism"
        description="The fleet that gets you there in style. Premium vehicles for unforgettable journeys across the UAE."
      />
      <CustomCursor />
      <SectionSpotlight />
      <BrandingHeader onlyDark showNav sticky />
      <main>
        {/* Gallery */}
        <section id="wheels-gallery" className="bg-black pt-[120px] md:pt-[140px] pb-[120px]">
          <WheelsGallery images={images} />
        </section>
      </main>
      <MinimalFooter />
    </div>
  );
};

export default WheelsPage;
