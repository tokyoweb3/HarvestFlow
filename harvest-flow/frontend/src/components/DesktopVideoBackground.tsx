import React, { useEffect, useRef } from "react";

import bgVideo from "../../assets/videos/pc_pale_high.mp4";
import bgVideoLow from "../../assets/videos/pc_pale_low.mp4";
import bgVideoPoster from "../../assets/videos/pc_pale_high.jpg";

const DesktopVideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;

    if (width >= 1920 && videoRef.current) {
      videoRef.current.src = bgVideo;
    } else if (videoRef.current) {
      videoRef.current.src = bgVideoLow;
    }

    videoRef.current.load();
  }, []);

  return (
    <div className="h-dvh w-svw hidden desktop:block fixed left-0 right-0 top-0 bottom-0">
      <video
        ref={videoRef}
        poster={bgVideoPoster}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default DesktopVideoBackground;
