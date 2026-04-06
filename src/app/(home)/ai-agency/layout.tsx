import React from "react";
import navigation from "@/config/navigation.json";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import Footer3 from "@/components/footer/Footer3";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import AiHeader from "@/components/headers/AiHeader";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="instrument-ai root-layout" theme-setting="style-4">
      <ScrollSmootherComponent />
      <ToolsComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="pb-[15px] 2xl:pb-[50px]">
            <AiHeader />
            <div>{children}</div>
            <Footer3 footerNav={navigation.footer3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
