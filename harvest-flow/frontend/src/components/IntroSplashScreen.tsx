import React, { useState } from "react";
import clsx from "clsx";

import { useScreenDetector } from "@src/utils/useScreenDetector";

import bgVideo from "../../assets/videos/pc_color_high.mp4";
import bgVideoMobile from "../../assets/videos/sp_color_high.mp4";
import logo from "../../assets/images/splashscreen-logo.svg";
import mobileLogo from "../../assets/images/splashscreen-logo-mobile.svg";

type IntroSplashScreenProps = {
  onVideoLoaded?: () => void;
};

const IntroSplashScreen: React.FC<IntroSplashScreenProps> = ({
  onVideoLoaded,
}) => {
  const { isMobile, isDesktop } = useScreenDetector();

  const [mobileVideoLoaded, setMobileVideoLoaded] = useState(false);
  const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false);

  return (
    <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center">
      {isDesktop && (
        <video
          className="w-full h-full object-cover absolute left-0 right-0 top-0 bottom-0 hidden desktop:block"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => {
            setDesktopVideoLoaded(true);
            onVideoLoaded?.();
          }}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      )}
      {isMobile && (
        <video
          className="w-full h-full object-cover absolute left-0 right-0 top-0 bottom-0 block desktop:hidden"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => {
            setMobileVideoLoaded(true);
            onVideoLoaded?.();
          }}
        >
          <source src={bgVideoMobile} type="video/mp4" />
        </video>
      )}
      <div
        className={clsx(
          "relative flex items-center justify-center p-20 w-full max-w-[1000px] mx-auto opacity-0 transition-opacity duration-300",
          isMobile && mobileVideoLoaded && "opacity-100",
          isDesktop && desktopVideoLoaded && "opacity-100",
        )}
      >
        <img
          src={isMobile ? mobileLogo : logo}
          alt="Harvestflow logo"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default IntroSplashScreen;
