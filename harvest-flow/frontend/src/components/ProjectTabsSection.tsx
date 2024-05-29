import React from "react";

import type { ProjectTabsProps } from "./ProjectTabs";
import ProjectTabs from "./ProjectTabs";

type ProjectTabsSectionProps = ProjectTabsProps;

const ProjectTabsSection: React.FC<ProjectTabsSectionProps> = ({
  activePage,
}) => {
  return (
    <div className="pt-32 pb-56">
      <div className="max-w-[780px] mx-auto">
        <ProjectTabs activePage={activePage} />
      </div>
    </div>
  );
};

export default ProjectTabsSection;
