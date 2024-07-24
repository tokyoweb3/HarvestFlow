import React from "react";

import ProjectMintPanel from "./ProjectMintPanel";
import type { ProjectMintPanelProps } from "./ProjectMintPanel";
import { useScreenDetector } from "@src/utils/useScreenDetector";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const ProjectHero: React.FC<ProjectMintPanelProps> = ({
  projectContractDetails,
  refreshData,
}) => {
  const { isDesktop } = useScreenDetector();

  return (
    <div
      className="desktop:min-h-[770px] desktop:bg-center desktop:bg-cover desktop:bg-no-repeat relative text-black desktop:text-white desktop:border-b desktop:border-black z-10 mt-[49px] desktop:mt-[63px] desktop:flex desktop:items-end"
      style={{ backgroundImage: isDesktop ? `url(${tukTukImage})` : "" }}
    >
      <div className="desktop:hidden mb-6 desktop:mb-0">
        <img src={tukTukImage} alt="Tuk Tuk" />
      </div>
      <div className="container mx-auto min-h-full flex flex-col justify-end desktop:pb-[60px] desktop:pt-20 gap-32 px-4 desktop:px-0">
        <div className="flex flex-col desktop:flex-row desktop:justify-between desktop:items-end gap-16 desktop:gap-24">
          <div className="w-full desktop:w-1/2">
            <h1 className="text-heading3 desktop:text-heading1Smaller font-medium uppercase">
              TUK TUK harvest flow future project
            </h1>
          </div>
          <div className="w-full desktop:w-1/3">
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
