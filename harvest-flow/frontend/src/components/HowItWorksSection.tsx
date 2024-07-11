import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import SectionHeader from "./SectionHeader";

import howItWorksENImage from "../../assets/images/how-it-works-en.png";
import howItWorksJPImage from "../../assets/images/how-it-works-jp.png";

const HowItWorksSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative z-10 desktop:h-screen border-b border-black flex flex-col">
      <SectionHeader title={t("homepage.how_it_works.title")} />
      <div className="pb-16 desktop:py-32 flex-1 desktop:flex desktop:flex-col desktop:justify-center pl-4 desktop:pl-0">
        <div className="max-w-[1188px] w-full mx-auto border border-black overflow-x-auto">
          <img
            src={howItWorksJPImage}
            alt={t("homepage.how_it_works.title")}
            className={clsx(
              "min-h-[40vh] max-w-[inherit] desktop:min-h-[initial] desktop:max-w-full desktop:w-full",
              i18n.language === "en" ? "hidden" : "block",
            )}
          />
          <img
            src={howItWorksENImage}
            alt={t("homepage.how_it_works.title")}
            className={clsx(
              "min-h-[40vh] max-w-[inherit] desktop:min-h-[initial] desktop:max-w-full desktop:w-full",
              i18n.language === "jp" ? "hidden" : "block",
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
