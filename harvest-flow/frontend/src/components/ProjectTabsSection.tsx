import React from "react";

import type { ProjectTabsProps } from "./ProjectTabs";
import ProjectTabs from "./ProjectTabs";

type ProjectTabsSectionProps = ProjectTabsProps;

const ProjectTabsSection: React.FC<ProjectTabsSectionProps> = ({
  activePage,
}) => {
  return (
    <div className="pt-[70px] pb-[90px] desktop:pt-[64px] desktop:pb-[64px] relative z-10 px-4 desktop:px-0">
      <div className="max-w-[780px] mx-auto">
        <ProjectTabs activePage={activePage} />
      </div>
    </div>
  );
};

export default ProjectTabsSection;
