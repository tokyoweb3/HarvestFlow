import React from "react";
import clsx from "clsx";
import gsap from "gsap";

export enum AccountProjectNavigationLink {
  YourNFT = "your-nft",
  AssetOverview = "asset-overview",
  Earn = "earn",
  RWA = "rwa",
  Updates = "updates",
}

const AccountProjectNavigation: React.FC = () => {
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
    <ul className="flex flex-col gap-5">
      <li
        className={clsx(
          "text-heading5SmallerLH24 font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountProjectNavigationLink.YourNFT);
        }}
        data-to-scrollspy-id={AccountProjectNavigationLink.YourNFT}
      >
        Proof of support
      </li>
      <li
        className={clsx(
          "text-heading5SmallerLH24 font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountProjectNavigationLink.Earn);
        }}
        data-to-scrollspy-id={AccountProjectNavigationLink.Earn}
      >
        Harvest
      </li>
      <li
        className={clsx(
          "text-heading5SmallerLH24 font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountProjectNavigationLink.AssetOverview);
        }}
        data-to-scrollspy-id={AccountProjectNavigationLink.AssetOverview}
      >
        Asset overview
      </li>
      <li
        className={clsx(
          "text-heading5SmallerLH24 font-medium uppercase account-navigation-link hover:cursor-pointer",
        )}
        onClick={() => {
          handleScrollToElement(AccountProjectNavigationLink.RWA);
        }}
        data-to-scrollspy-id={AccountProjectNavigationLink.RWA}
      >
        RWA Data
      </li>
    </ul>
  );
};

export default AccountProjectNavigation;
