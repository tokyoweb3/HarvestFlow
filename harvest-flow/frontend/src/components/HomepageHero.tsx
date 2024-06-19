import React from "react";
import { useTranslation } from "react-i18next";

import bgVideo from "../../assets/videos/pc_color_high.mp4";
import bgVideoMobile from "../../assets/videos/sp_color_high.mp4";

const HomepageHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="h-screen bg-center bg-cover bg-no-repeat relative text-white border-b border-black z-10">
      <video
        src={bgVideo}
        className="w-full h-full object-cover relative z-0 hidden desktop:block"
        autoPlay
        loop
        muted
        playsInline
      />
      <video
        src={bgVideoMobile}
        className="w-full h-full object-cover relative z-0 block desktop:hidden"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="w-full h-full absolute left-0 top-0 z-10">
        <div className="container mx-auto min-h-full flex flex-col justify-center gap-12 desktop:gap-32 px-4 desktop:px-0">
          <div className="flex flex-col items-center justify-center max-w-[520px] mx-auto gap-10">
            <h1 className="text-heading2 desktop:text-heading1 font-medium uppercase tracking-widest text-center">
              {t("homepage.hero.title")}
            </h1>
            <div className="flex flex-col gap-6">
              <h2 className="text-heading4 text-center uppercase font-medium">
                {t("homepage.hero.subtitle")}
              </h2>
              <h3 className="text-heading5 text-center">
                {t("homepage.hero.text")}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
