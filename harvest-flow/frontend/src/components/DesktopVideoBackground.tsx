import React from "react";

import bgVideo from "../../assets/videos/pc_pale_high.mp4";

const DesktopVideoBackground = () => {
  return (
    <div className="h-dvh w-svw hidden desktop:block fixed left-0 right-0 top-0 bottom-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default DesktopVideoBackground;
