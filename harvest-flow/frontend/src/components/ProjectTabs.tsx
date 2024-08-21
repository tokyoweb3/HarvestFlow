import React from "react";
import clsx from "clsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Page } from "@src/MainController";

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
    name: "FAQ",
  },
];

export type ProjectTabsProps = {
  activePage: "overview" | "reports" | "qa";
};

const ProjectTabs: React.FC<ProjectTabsProps> = ({ activePage }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contractAddress = searchParams.get("address") || "";

  const navigateTo = (page: string) => {
    const searchParam = "?address=" + contractAddress;

    switch (page) {
      case "overview":
        navigate({ pathname: Page.Project, search: searchParam });
        break;
      case "reports":
        navigate({ pathname: Page.Reports, search: searchParam });
        break;
      case "qa":
        navigate({ pathname: Page.FAQ, search: searchParam });
        break;
    }
  };

  return (
    <div className="w-full flex">
      {pages.map((page) => (
        <div
          key={page.page}
          className={clsx(
            "w-1/3 border-b-[3px] flex items-center justify-center p-4 desktop:p-6 hover:cursor-pointer",
            page.page === activePage
              ? "border-primary"
              : "border-black hover:border-primary",
          )}
          onClick={() => navigateTo(page.page)}
        >
          <p className="font-functionPro tracking-[0.2em] text-body desktop:text-heading4 font-medium uppercase tracking-widest">
            {page.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectTabs;
