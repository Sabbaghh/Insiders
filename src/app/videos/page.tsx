import BrandingHeader from "@/components/headers/BrandingHeader";
import MinimalFooter from "@/components/footer/MinimalFooter";
import CustomCursor from "@/components/tools/CustomCursor";
import SeoData from "@/components/tools/SeoData";
import VideosGallery from "@/components/videos/VideosGallery";

// Add YouTube video IDs from https://www.youtube.com/@InsidersTourism here.
// A video ID is the 11-char string in URLs like https://www.youtube.com/watch?v=XXXXXXXXXXX
const videoIds: string[] = [
  "kmos4mhXGxE",
  "nfomhxLvZgg",
  "N5eYmHx3xUo",
  "bKqa3BtVcHg",
  "CYat9Qeidtk",
];

const VideosPage = () => {
  return (
    <div className="instrument dark bg-black text-white min-h-screen">
      <SeoData
        title="Our Videos — INSIDERS Tourism"
        description="Watch the moments we've created across the UAE."
      />
      <CustomCursor />
      <BrandingHeader onlyDark showNav />
      <main>
        <section className="bg-black pt-[120px] md:pt-[140px] pb-[260px]">
          <div className="container">
            <VideosGallery videoIds={videoIds} />
          </div>
        </section>
      </main>
      <MinimalFooter />
    </div>
  );
};

export default VideosPage;
