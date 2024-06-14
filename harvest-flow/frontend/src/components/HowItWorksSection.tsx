import React from "react";

import SectionHeader from "./SectionHeader";

import howItWorksImage from "../../assets/images/how-it-works.jpg";

const HowItWorksSection: React.FC = () => {
  return (
    <div className="relative z-10 desktop:h-screen border-b border-black flex flex-col">
      <SectionHeader title="How it works" />
      <div className="py-16 desktop:py-32 flex-1 desktop:flex desktop:flex-col desktop:justify-center">
        <div className="max-w-[1188px] px-4 desktop:px-0 w-full mx-auto border border-black">
          <img src={howItWorksImage} alt="How it works" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
