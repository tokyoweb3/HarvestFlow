import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useScreenDetector } from "@src/utils/useScreenDetector";
import { useProjects } from "@src/utils/useProjects";

import SectionHeader from "./SectionHeader";
import {
  OUR_PROJECTS_REGISTER_EN,
  OUR_PROJECTS_REGISTER_JP,
} from "@src/utils/links";

import backgroundImageDesktop from "../../assets/images/our-projects-desktop.jpg";
import backgroundImageMobile from "../../assets/images/our-projects-mobile.jpg";
import backgroundImageNext from "../../assets/images/our_projects_next_bg.jpg";
import { useNavigate } from "react-router-dom";
import { Page } from "@src/MainController";
import clsx from "clsx";

const OurProjectsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isMobile } = useScreenDetector();
  const projects = useProjects();
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    if (projects.length > 0) {
      navigate(`${Page.Project}?address=${projects[0].address}`);
    }
  };

  return (
    <div className="desktop:border-b desktop:border-black px-4 desktop:px-0 pb-16 desktop:pb-0 relative z-10 desktop:h-screen flex flex-col">
      <SectionHeader title={t("homepage.our_projects.title")} />
      <div className="flex flex-col desktop:flex-row desktop:divide-x desktop:divide-black border border-black desktop:border-0 flex-1">
        <div
          className="w-full desktop:w-1/2 bg-cover bg-no-repeat bg-center min-h-[220px] desktop:min-h-[initial]"
          style={{
            backgroundImage: `url(${isMobile ? backgroundImageMobile : backgroundImageDesktop})`,
          }}
        ></div>
        <div className="w-full desktop:w-1/2 flex divide-x divide-black">
          <div className="w-full desktop:w-2/3 flex flex-col desktop:pt-8 justify-end">
            <div className="flex flex-col gap-4 desktop:gap-6 px-4 py-8 desktop:p-10 desktop:pt-0">
              <div className="flex flex-col gap-2">
                <h4 className="text-caption desktop:text-body text-center desktop:text-left uppercase font-normal">
                  RWA-001
                </h4>
                <h3 className="text-heading5Smaller desktop:text-heading4 text-center desktop:text-left uppercase font-medium whitespace-pre-line">
                  {t("homepage.our_projects.heading")}
                </h3>
              </div>
              <p className="text-bodySmaller">
                {t("homepage.our_projects.text")}
              </p>
            </div>
            <div className="border-t border-b border-black divide-x divide-black flex font-[500]">
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body14 text-center p-2 border-b border-black border-dashed">
                  {t("general.apy")}
                </h4>
                <div className="py-4 desktop:py-8 px-4">
                  <h5 className="text-center uppercase font-functionPro text-[36px]">
                    8%
                  </h5>
                </div>
              </div>
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body14 text-center p-2 border-b border-black border-dashed">
                  {t("general.status")}
                </h4>
                <div className="py-4 desktop:py-8 px-4">
                  <h5 className="text-bodyLarge desktop:text-heading3Smaller text-center uppercase">
                    {t("homepage.our_projects.coming_soon")}
                  </h5>
                </div>
              </div>
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body14 text-center p-2 border-b border-black border-dashed">
                  {t("general.asset_type")}
                </h4>
                <div className="py-4 desktop:py-8 px-4 desktop:px-2">
                  <h5 className="text-bodyLarge desktop:text-heading4Smaller text-center uppercase">
                    {t("homepage.our_projects.vehicle")}
                  </h5>
                </div>
              </div>
            </div>
            <button
              className={clsx(
                "p-4 desktop:p-8 uppercase text-center w-full text-caption desktop:text-heading5SmallerLH26 font-medium bg-[#E6B95F]",
                projects.length > 0
                  ? "hover:cursor-pointer"
                  : "hover:cursor-not-allowed",
              )}
              onClick={handleViewMoreClick}
            >
              {t("general.view_more")}
            </button>
          </div>
          <div
            className="hidden desktop:flex w-1/3 flex-col gap-4 items-center justify-center p-8 bg-center bg-cover bg-no-repeat text-white"
            style={{ backgroundImage: `url(${backgroundImageNext})` }}
          >
            <p className="uppercase text-center text-heading5 desktop:text-heading4Smaller font-functionPro font-normal">
              {t("general.next_project")}
            </p>
            <p className="uppercase text-center tracking-widest font-functionPro font-normal">
              {t("general.coming_soon")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProjectsSection;
