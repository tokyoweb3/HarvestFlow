import React from "react";
import clsx from "clsx";

import SectionHeader from "./SectionHeader";
import type { PartnerData } from "./PartnerSectionDesktopSlider";
import PartnerSectionDesktopSlider from "./PartnerSectionDesktopSlider";

import backgroundImage from "../../assets/images/hero-bg.svg";
import PartnerSectionMobileSlider from "./PartnerSectionMobileSlider";

const partnerData = [
  {
    subtitle: "FiNANCiE founde",
    title: "HiRONAO KUNiMiTSU",
    imageURL: backgroundImage,
  },
  {
    subtitle: "Position 1",
    title: "HiRONAO KUNiMiTSU 2",
    imageURL: backgroundImage,
  },
  {
    subtitle: "Position 2",
    title: "HiRONAO KUNiMiTSU 3",
    imageURL: backgroundImage,
  },
  {
    subtitle: "Position 3",
    title: "HiRONAO KUNiMiTSU 4",
    imageURL: backgroundImage,
  },
  {
    subtitle: "Position 4",
    title: "HiRONAO KUNiMiTSU 5",
    imageURL: backgroundImage,
  },
];

export const IndicatorDot: React.FC<{
  active?: boolean;
  onClick: () => void;
}> = ({ active = false, onClick }) => {
  return (
    <div
      className={clsx(
        "w-3 h-3 desktop:w-4 desktop:h-4 rounded-full border hover:cursor-pointer",
        active ? "bg-black border-white" : "bg-white border-black",
      )}
      onClick={onClick}
    ></div>
  );
};

export const PartnerCard: React.FC<
  PartnerData & {
    onClick?: () => void;
  }
> = ({ subtitle, title, imageURL, onClick }) => {
  return (
    <div
      className="border border-black p-8 flex flex-col gap-6 desktop:gap-10 bg-white relative z-40 hover:cursor-pointer"
      onClick={onClick}
    >
      <div
        className="shrink-0 aspect-square bg-cover bg-no-repeat bg-center animate-fade"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      ></div>
      <div className="flex flex-col justify-end gap-6 desktop:gap-20 flex-1 pb-2">
        <div className="flex flex-col gap-1 desktop:gap-2">
          <p className="text-center uppercase text-caption desktop:text-body animate-fade">
            {subtitle}
          </p>
          <h3 className="text-bodyLarge desktop:text-heading4 uppercase font-medium text-center animate-fade">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

const PartnerSection: React.FC = () => {
  return (
    <div className="relative z-10 border-b border-black desktop:h-screen flex flex-col pb-16 desktop:pb-0">
      <SectionHeader title="Partner" />
      <div className="desktop:py-16 px-4 desktop:px-0 flex-1 flex flex-col justify-center">
        <div className="max-w-[1188px] mx-auto relative z-10 px-4 desktop:px-0 w-full">
          <div className="hidden desktop:block">
            <PartnerSectionDesktopSlider partnerData={partnerData} />
          </div>
          <div className="block desktop:hidden">
            <PartnerSectionMobileSlider partnerData={partnerData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
