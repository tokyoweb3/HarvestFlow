import React from "react";
import clsx from "clsx";

const pages = [
  {
    page: "overview",
    name: "Overview",
  },
  {
    page: "reports",
    name: "Reports",
  },
  {
    page: "qa",
    name: "Q & A",
  },
];

export type ProjectTabsProps = {
  activePage: "overview" | "reports" | "qa";
};

const ProjectTabs: React.FC<ProjectTabsProps> = ({ activePage }) => {
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
        >
          <p className="text-heading4 font-medium uppercase">{page.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectTabs;
