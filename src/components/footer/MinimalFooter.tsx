import Logo from "@/components/elements/logo/Logo";
import siteConfig from "@/config/siteConfig.json";
import { SocialShare1 } from "../tools/Social";

const MinimalFooter = () => {
  const { site_info, footer_info, social } = siteConfig;
  const { label, company } = footer_info?.copyright || {};

  return (
    <footer className="main-section-style !pb-0 bg-background-fixed">
      <div className="container">
        <div className="section-spacing-top pb-[54px] xl:pb-[94px]">
          {/* Top row: Logo */}
          <div className="pb-[40px] xl:pb-[60px] border-b border-[#202020]">
            <Logo
              light={true}
              url={site_info?.logo_light_2}
              customWidth={200}
              customHeight={54}
              className="max-h-[34px] xl:max-h-[54px] !w-auto"
            />
          </div>

          {/* Bottom row: Location + Contact + Follow */}
          <div className="pt-[40px] xl:pt-[60px] grid gap-y-[40px] gap-x-[80px] sm:grid-cols-2 lg:grid-cols-3">
            {/* Location */}
            <div>
              <h3 className="text-text-fixed-2 text-[16px] uppercase tracking-[0.15em] font-semibold">
                Location
              </h3>
              <p className="mt-[16px] text-text-fixed-3 text-[15px] leading-[1.7]">
                {footer_info?.address?.name}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-text-fixed-2 text-[16px] uppercase tracking-[0.15em] font-semibold">
                Contact
              </h3>
              <div className="mt-[16px] text-text-fixed-3 text-[15px] leading-[1.7] space-y-[4px]">
                <p>
                  <a
                    href={`mailto:${footer_info?.email}`}
                    className="hover:text-text-fixed-2 transition-colors"
                  >
                    {footer_info?.email}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${footer_info?.mobile}`}
                    className="hover:text-text-fixed-2 transition-colors"
                  >
                    {footer_info?.mobile}
                  </a>
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-text-fixed-2 text-[16px] uppercase tracking-[0.15em] font-semibold">
                Follow Us
              </h3>
              <ul className="flex gap-5 mt-[16px]">
                {social.map((item, i) => (
                  <li key={`social_share-${i}`}>
                    {SocialShare1(
                      item,
                      " text-text-fixed-3 hover:text-text-fixed-2 transition-colors"
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#202020]">
        <div className="container">
          <div className="py-[22px] xl:py-8">
            <p className="text-center text-[14px] font-medium text-text-fixed-3">
              {label}
              <span className="text-text-fixed-2">{company}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;
