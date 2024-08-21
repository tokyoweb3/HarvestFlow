import React from "react";
import clsx from "clsx";
import gsap from "gsap";

export enum AccountNavigationLink {
  Dashboard = "dashboard",
  ProjectHistory = "project-history",
  Update = "update",
  YourNFT = "your-nft",
  UpcomingProjects = "upcoming-projects",
}

const AccountNavigation: React.FC = () => {
  const getElement = (dataAttribute: string) => {
    return document.getElementById(dataAttribute);
  };

  const handleScrollToElement = (dataAttribute: string) => {
    gsap.to(window, {
      duration: 2,
      scrollTo: {
        y: getElement(dataAttribute),
        offsetY: 120,
      },
      ease: "power4.inOut",
    });
  };

  return (
    <ul className="font-functionPro flex flex-col gap-5">
      <li
        className={clsx(
          "text-heading5Smaller font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountNavigationLink.Dashboard);
        }}
        data-to-scrollspy-id={AccountNavigationLink.Dashboard}
      >
        Dashboard
      </li>
      <li
        className={clsx(
          "text-heading5Smaller font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountNavigationLink.ProjectHistory);
        }}
        data-to-scrollspy-id={AccountNavigationLink.ProjectHistory}
      >
        Project history
      </li>
      <li
        className={clsx(
          "text-heading5Smaller font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountNavigationLink.Update);
        }}
        data-to-scrollspy-id={AccountNavigationLink.Update}
      >
        Update
      </li>
      <li
        className={clsx(
          "text-heading5Smaller font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountNavigationLink.YourNFT);
        }}
        data-to-scrollspy-id={AccountNavigationLink.YourNFT}
      >
        Your NFT
      </li>
      <li
        className={clsx(
          "text-heading5Smaller font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountNavigationLink.UpcomingProjects);
        }}
        data-to-scrollspy-id={AccountNavigationLink.UpcomingProjects}
      >
        Upcoming projects
      </li>
    </ul>
  );
};

export default AccountNavigation;
