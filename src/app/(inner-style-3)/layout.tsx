import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import InnerHeader1 from "@/components/headers/InnerHeader1";
import Footer4 from "@/components/footer/Footer4";
import BindBtnMoveEffect from "@/components/tools/BindBtnMoveEffect";
import navigation from "@/config/navigation.json";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="teko-font root-layout" theme-setting="style-3">
      <ScrollSmootherComponent />
      <ToolsComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <BindBtnMoveEffect />
          <InnerHeader1 />
          <div>{children}</div>
          <Footer4 footerNav={navigation.footer4} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
