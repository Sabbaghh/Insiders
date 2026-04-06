import React from "react";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import VideoProductionHeader from "@/components/headers/VideoProductionHeader";
import Footer5 from "@/components/footer/Footer5";
import navigation from "@/config/navigation.json";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="khand root-layout">
      <ScrollSmootherComponent />
      <ToolsComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="khand-inner">
            <VideoProductionHeader />
            <div>{children}</div>
            <Footer5 footerNav={navigation.footer4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
