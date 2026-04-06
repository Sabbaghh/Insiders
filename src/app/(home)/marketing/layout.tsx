import React from "react";
import navigation from "@/config/navigation.json";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import MarketingHeader from "@/components/headers/MarketingHeader";
import Footer6 from "@/components/footer/Footer6";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="plus-jakarta root-layout" theme-setting="style-5">
      <ScrollSmootherComponent />
      <ToolsComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <MarketingHeader />
          <div className=" ">{children}</div>
          <Footer6 data={navigation.footer2} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
