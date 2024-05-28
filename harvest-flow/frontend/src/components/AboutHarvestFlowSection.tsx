import React from "react";

import backgroundImage from "../../assets/images/hero-bg.svg";
import SectionHeader from "./SectionHeader";

const AboutHarvestFlowSection: React.FC = () => {
  return (
    <div className="flex divide-x divide-black border-b border-black">
      <div className="w-1/3">
        <SectionHeader title="About Harvest Flow" />
        <div className="pt-24">
          <div className="flex flex-col gap-6 p-10">
            <h3 className="text-heading4 uppercase font-medium">
              An investment experience that transforms society with emotion.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et doloremagna.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit,sed do eiusmod tempor
              incididunt ut labore et doloremagna.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et doloremagna.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit,sed do eiusmod tempor
              incididunt ut labore et doloremagna.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et doloremagna.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit,sed do eiusmod tempor
              incididunt ut labore et doloremagna.
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-2/3 bg-cover bg-no-repeat bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-heading2 font-medium uppercase tracking-widest text-center">
            About Harvest Flow
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AboutHarvestFlowSection;
