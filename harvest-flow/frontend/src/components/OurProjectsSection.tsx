import React from "react";

import SectionHeader from "./SectionHeader";

import backgroundImage from "../../assets/images/tuktuk.jpg";

const OurProjectsSection: React.FC = () => {
  return (
    <div className="border-b border-black">
      <SectionHeader title="Our projects" />
      <div className="flex divide-x divide-black">
        <div
          className="w-1/2 bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="w-1/2 flex divide-x divide-black">
          <div className="w-2/3 flex flex-col pt-24 justify-end">
            <div className="flex flex-col gap-6 p-10">
              <h3 className="text-heading3 uppercase font-medium">
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
                <h4 className="uppercase text-center p-2 border-b border-black border-dashed">
                  APY
                </h4>
                <div className="py-8 px-4">
                  <h5 className="text-heading4 text-center uppercase">8%</h5>
                </div>
              </div>
              <div className="w-full">
                <h4 className="uppercase text-center p-2 border-b border-black border-dashed">
                  Status
                </h4>
                <div className="py-8 px-4">
                  <h5 className="text-heading4 text-center uppercase">Open</h5>
                </div>
              </div>
              <div className="w-full">
                <h4 className="uppercase text-center p-2 border-b border-black border-dashed">
                  Asset type
                </h4>
                <div className="py-8 px-4">
                  <h5 className="text-heading4 text-center uppercase">
                    Vehicle
                  </h5>
                </div>
              </div>
            </div>
            <button className="p-10 uppercase text-center w-full text-heading5 font-medium">
              View more
            </button>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center p-10">
            <p className="uppercase">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProjectsSection;
