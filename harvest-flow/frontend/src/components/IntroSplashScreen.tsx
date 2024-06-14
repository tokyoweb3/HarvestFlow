import React, { useEffect, useState } from "react";
import clsx from "clsx";

import bgVideo from "../../assets/videos/pc_color_high.mp4";

const IntroSplashScreen: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isFadingOut) return;

    const timeout = setTimeout(() => {
      setIsFadingOut(true);

      setTimeout(() => {
        setIsHidden(true);
      }, 5000);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isFadingOut]);

  // useEffect(() => {
  //   if (isHidden) return;

  //   if (!isFadingOut) return;

  //   const timeout = setTimeout(() => {
  //     setIsHidden(true);
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, [isFadingOut, isHidden]);

  if (isHidden) return null;

  return (
    <div
      className={clsx(
        "w-screen h-screen fixed top-0 bottom-0 left-0 right-0 z-50",
        isFadingOut && "animate-fadeOut",
      )}
    >
      <video
        src={bgVideo}
        className="w-full h-full object-cover relative z-50"
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default IntroSplashScreen;
