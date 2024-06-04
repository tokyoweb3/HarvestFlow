import React from "react";

import HomepageHeroStatistics from "./HomepageHeroStatistics";

import bgVideo from "../../assets/videos/pc_color_high.mp4";

const HomepageHero: React.FC = () => {
  return (
    <div className="h-[calc(100svh-63px)] bg-center bg-cover bg-no-repeat relative text-white border-b border-black">
      <video
        src={bgVideo}
        className="w-full h-full object-cover relative z-0"
        autoPlay
        loop
        muted
      />
      <div className="w-full h-full absolute left-0 top-0 z-10">
        <div className="container mx-auto min-h-full flex flex-col justify-end pb-14 gap-32">
          <div className="flex flex-col items-center justify-center max-w-[520px] mx-auto gap-10">
            <h1 className="text-heading2 font-medium uppercase tracking-widest text-center">
              Harvest flow
            </h1>
            <div className="flex flex-col gap-6">
              <h2 className="text-heading4 text-center uppercase font-medium">
                Helping the world bear fruit with the help of the latest
                technology Investment Platform for a New Era
              </h2>
              <h3 className="text-heading5 text-center">
                &apos;Feel, think, and grow the world with your
                investments.&apos;
              </h3>
            </div>
          </div>
          <div>
            <HomepageHeroStatistics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
