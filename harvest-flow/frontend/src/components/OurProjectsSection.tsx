import React from "react";

import SectionHeader from "./SectionHeader";

import backgroundImage from "../../assets/images/tuktuk.jpg";

const OurProjectsSection: React.FC = () => {
  return (
    <div className="desktop:border-b desktop:border-black px-4 desktop:px-0 pb-16 desktop:pb-0 relative z-10">
      <SectionHeader title="Our projects" />
      <div className="flex flex-col desktop:flex-row desktop:divide-x desktop:divide-black border border-black desktop:border-0">
        <div
          className="w-full desktop:w-1/2 bg-cover bg-no-repeat bg-center min-h-[220px] desktop:min-h-[initial]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="w-full desktop:w-1/2 flex divide-x divide-black">
          <div className="w-full desktop:w-2/3 flex flex-col desktop:pt-24 justify-end">
            <div className="flex flex-col gap-4 desktop:gap-6 px-4 py-8 desktop:p-10">
              <h3 className="text-heading4 desktop:text-heading3 text-center desktop:text-left uppercase font-medium">
                TUK TUK harvest flow future project
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et doloremagna.Lorem ipsum
                dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit,sed do eiusmod tempor
                incididunt ut labore et doloremagna.
              </p>
            </div>
            <div className="border-t border-b border-black divide-x divide-black flex">
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body text-center p-2 border-b border-black border-dashed">
                  APY
                </h4>
                <div className="py-6 desktop:py-8 px-4">
                  <h5 className="text-bodyLarge desktop:text-heading4 text-center uppercase">
                    8%
                  </h5>
                </div>
              </div>
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body text-center p-2 border-b border-black border-dashed">
                  Status
                </h4>
                <div className="py-6 desktop:py-8 px-4">
                  <h5 className="text-bodyLarge desktop:text-heading4 text-center uppercase">
                    Open
                  </h5>
                </div>
              </div>
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body text-center p-2 border-b border-black border-dashed">
                  Asset type
                </h4>
                <div className="py-6 desktop:py-8 px-4">
                  <h5 className="text-bodyLarge desktop:text-heading4 text-center uppercase">
                    Vehicle
                  </h5>
                </div>
              </div>
            </div>
            <button className="p-4 desktop:p-10 uppercase text-center w-full text-caption desktop:text-heading5 font-medium">
              View more
            </button>
          </div>
          <div className="hidden desktop:flex w-1/3 flex-col items-center justify-center p-10">
            <p className="uppercase">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProjectsSection;
