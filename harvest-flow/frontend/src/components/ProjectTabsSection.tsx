import React from "react";

import type { ProjectTabsProps } from "./ProjectTabs";
import ProjectTabs from "./ProjectTabs";

type ProjectTabsSectionProps = ProjectTabsProps;

const ProjectTabsSection: React.FC<ProjectTabsSectionProps> = ({
  activePage,
}) => {
  return (
    <div className="pt-20 pb-32 desktop:pt-28 desktop:pb-40 relative z-10 px-4 desktop:px-0">
      <div className="max-w-[780px] mx-auto">
        <ProjectTabs activePage={activePage} />
      </div>
    </div>
  );
};

export default ProjectTabsSection;
