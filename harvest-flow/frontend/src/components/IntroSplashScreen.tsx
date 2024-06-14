import React from "react";

import bgVideo from "../../assets/videos/pc_color_high.mp4";
import logo from "../../assets/images/splashscreen-logo.svg";

const IntroSplashScreen: React.FC = () => {
  return (
    <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center">
      <video
        src={bgVideo}
        className="w-full h-full object-cover absolute left-0 right-0 top-0 bottom-0"
        autoPlay
        loop
        muted
      />
      <div className="relative flex items-center justify-center p-20 w-full max-w-[1000px] mx-auto">
        <img src={logo} alt="Harvestflow logo" className="w-full" />
      </div>
    </div>
  );
};

export default IntroSplashScreen;
