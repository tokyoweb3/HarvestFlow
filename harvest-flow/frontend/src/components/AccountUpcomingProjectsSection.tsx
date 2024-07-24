import React from "react";

import type { NFTProjectCardProps } from "./NFTProjectCard";
import NFTProjectCard, { NFTProjectComingSoonCard } from "./NFTProjectCard";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const nftProjectsData: NFTProjectCardProps[] = [
  {
    imageURL: tukTukImage,
    title: "Dec. 24th 2025",
    text: "Release on",
  },
];

const AccountUpcomingProjectsSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 desktop:gap-[40px]">
      <h3 className="text-heading5 desktop:text-heading5Larger24_30 uppercase font-medium">
        Upcoming projects
      </h3>
      <div className="overflow-x-auto">
        <div className="flex desktop:grid desktop:grid-cols-3 gap-6 desktop:gap-[40px]">
          {/* {nftProjectsData.map((data, index) => (
            <div
              key={index}
              className="w-[80vw] max-w-[300px] desktop:w-full desktop:max-w-[initial] shrink-0"
            >
              <NFTProjectCard
                imageURL={data.imageURL}
                text={data.text}
                title={data.title}
              />
            </div>
          ))} */}
          <div className="w-[80vw] max-w-[300px] min-h-[380px] desktop:w-full desktop:max-w-[initial] shrink-0 flex">
            <NFTProjectComingSoonCard />
          </div>
          <div className="w-[80vw] max-w-[300px] min-h-[380px] desktop:w-full desktop:max-w-[initial] shrink-0 flex">
            <NFTProjectComingSoonCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUpcomingProjectsSection;
