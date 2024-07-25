import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import howItWorksENImage from "../../assets/images/how-it-works-en.png";
import howItWorksJPImage from "../../assets/images/how-it-works-jp.png";

const ProjectHowItWorksSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-[1188px] w-full mx-auto border border-black overflow-x-auto relative z-10 mt-[50px] desktop:mt-[150px]">
      <img
        src={howItWorksJPImage}
        alt={t("homepage.how_it_works.title")}
        className={clsx(
          "min-h-[30vh] max-w-[inherit] desktop:min-h-[initial] desktop:max-w-full desktop:w-full",
          i18n.language === "en" ? "hidden" : "block",
        )}
      />
      <img
        src={howItWorksENImage}
        alt={t("homepage.how_it_works.title")}
        className={clsx(
          "min-h-[30vh] max-w-[inherit] desktop:min-h-[initial] desktop:max-w-full desktop:w-full",
          i18n.language === "jp" ? "hidden" : "block",
        )}
      />
    </div>
  );
};

export default ProjectHowItWorksSection;
