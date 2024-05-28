import React from "react";

import backgroundImage from "../../assets/images/hero-bg.svg";
import SectionHeader from "./SectionHeader";

const FeaturesSection: React.FC = () => {
  return (
    <div className="flex divide-x divide-black border-b border-black">
      <div
        className="w-1/2 bg-cover bg-no-repeat bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-heading2 font-medium uppercase tracking-widest text-center">
            Features
          </h2>
        </div>
      </div>
      <div className="w-1/2">
        <SectionHeader title="Features" />
        <div className="pt-24">
          <div className="px-10 flex flex-col gap-16">
            <div className="flex gap-8">
              <div className="flex flex-col gap-6 w-1/2">
                <h3 className="text-heading4 uppercase font-medium">
                  An investment experience that transforms society with emotion.
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et doloremagna.Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit,sed do
                  eiusmod tempor incididunt ut labore et doloremagna.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et doloremagna.Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit,sed do
                  eiusmod tempor incididunt ut labore et doloremagna.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et doloremagna.Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit,sed do
                  eiusmod tempor incididunt ut labore et doloremagna.
                </p>
              </div>
              <div className="w-1/2">
                <img src={backgroundImage} alt="background" />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-heading4 uppercase font-medium">
                An investment experience that transforms society with emotion.
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et doloremagna.Lorem ipsum
                dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit,sed do eiusmod tempor
                incididunt ut labore et doloremagna.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et doloremagna.Lorem ipsum
                dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit,sed do eiusmod tempor
                incididunt ut labore et doloremagna.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et doloremagna.Lorem ipsum
                dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit,sed do eiusmod tempor
                incididunt ut labore et doloremagna.
              </p>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-6 w-1/2">
                <h3 className="text-heading4 uppercase font-medium">
                  An investment experience that transforms society with emotion.
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et doloremagna.Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit,sed do
                  eiusmod tempor incididunt ut labore et doloremagna.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et doloremagna.Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit,sed do
                  eiusmod tempor incididunt ut labore et doloremagna.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et doloremagna.Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit,sed do
                  eiusmod tempor incididunt ut labore et doloremagna.
                </p>
              </div>
              <div className="w-1/2">
                <img src={backgroundImage} alt="background" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
