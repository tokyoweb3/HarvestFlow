import React from "react";
import clsx from "clsx";

const pages = [
  {
    page: "overview" as ProjectPageTabsOptions,
    name: "Overview",
  },
  {
    page: "reports" as ProjectPageTabsOptions,
    name: "Reports",
  },
  {
    page: "qa" as ProjectPageTabsOptions,
    name: "Q & A",
  }
];

export type ProjectPageTabsOptions = "overview" | "reports" | "qa";

export type ProjectTabsProps = {
  activePage: ProjectPageTabsOptions;
  changeTab: (selectedTab: ProjectPageTabsOptions) => void;
};

const ProjectTabs: React.FC<ProjectTabsProps> = ({ activePage, changeTab }) => {
  return (
    <div className="w-full flex">
      {pages.map((page) => (
        <div
          key={page.page}
          className={clsx(
            "w-1/3 border-b-[3px] flex items-center justify-center p-6 hover:cursor-pointer",
            page.page === activePage
              ? "border-primary"
              : "border-black hover:border-primary",
          )}
          onClick={() => changeTab(page.page)}
        >
          <p className="text-heading4 font-medium uppercase">{page.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectTabs;
