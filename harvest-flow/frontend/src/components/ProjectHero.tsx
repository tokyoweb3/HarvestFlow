import React from "react";
import { useTranslation } from "react-i18next";

import ProjectMintPanel from "./ProjectMintPanel";
import type { ProjectMintPanelProps } from "./ProjectMintPanel";
import { useScreenDetector } from "@src/utils/useScreenDetector";

import tukTukImage from "../../assets/images/project-page-hero-image.jpg";
import tukTukImageMobile from "../../assets/images/project-hero-mobile.jpg";

const ProjectHero: React.FC<ProjectMintPanelProps> = ({
  projectContractDetails,
  refreshData,
}) => {
  const { isDesktop } = useScreenDetector();
  const { t } = useTranslation();

  return (
    <div
      className="desktop:min-h-[770px] desktop:bg-center desktop:bg-cover desktop:bg-no-repeat relative text-black desktop:text-white desktop:border-b desktop:border-black z-10 mt-[49px] desktop:mt-[63px] desktop:flex desktop:items-end"
      style={{ backgroundImage: isDesktop ? `url(${tukTukImage})` : "" }}
    >
      <div className="desktop:hidden mb-6 desktop:mb-0">
        <img src={tukTukImageMobile} alt="Tuk Tuk" />
      </div>
      <div className="max-w-[1300px] w-full mx-auto min-h-full flex flex-col justify-end desktop:pb-[60px] desktop:pt-20 gap-32 px-4 desktop:px-0">
        <div className="flex flex-col desktop:flex-row desktop:justify-between desktop:items-end gap-[58px] desktop:gap-10">
          <div className="w-full desktop:w-full flex-1">
            <div className="flex flex-col gap-[18px] desktop:gap-3">
              <h2 className="font-functionPro text-heading4SmallerLH34 desktop:text-heading3_34 font-normal desktop:font-medium uppercase">
                RWA 001
              </h2>
              <h1 className="text-heading4SmallerLH34 desktop:text-heading1Smaller font-normal desktop:font-medium uppercase whitespace-pre-line">
                {t("project.hero.title")}
              </h1>
            </div>
          </div>
          <div className="w-full desktop:w-[400px]">
            <ProjectMintPanel
              projectContractDetails={projectContractDetails}
              refreshData={refreshData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
