import React from "react";

import ProjectMintPanel from "./ProjectMintPanel";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const ProjectHero: React.FC<{projectContractAddress: string}> = ({projectContractAddress}) => {
  return (
    <div
      className="h-[calc(100svh-63px)] bg-center bg-cover bg-no-repeat relative text-white border-b border-black"
      style={{ backgroundImage: `url(${tukTukImage})` }}
    >
      <div className="container mx-auto min-h-full flex flex-col justify-end pb-14 gap-32">
        <div className="flex justify-between items-end gap-24">
          <div className="w-1/2">
            <h1 className="text-heading1 font-medium uppercase">
              TUK TUK harvest flow future project
            </h1>
          </div>
          <div className="w-1/3">
            <ProjectMintPanel projectContractAddress={projectContractAddress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
