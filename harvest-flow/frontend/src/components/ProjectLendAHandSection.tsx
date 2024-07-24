import React from "react";

const ProjectLendAHandSection: React.FC = () => {
  return (
    <div className="py-10 desktop:py-[150px] relative z-10">
      <div className="max-w-[780px] mx-auto flex flex-col gap-16 desktop:gap-32 px-4 desktop:px-0">
        <button className="bg-primary text-heading5 desktop:text-heading3 font-medium uppercase p-8 desktop:p-10 border border-black tracking-wider">
          Lend a hand
        </button>
      </div>
    </div>
  );
};

export default ProjectLendAHandSection;
