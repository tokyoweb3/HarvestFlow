import React, { useState } from "react";
import clsx from "clsx";
import ReactPlayer from "react-player";

import PlayIcon from "@src/icons/PlayIcon";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const ProjectDriverInterviewSection: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="flex flex-col gap-[45px] relative z-10 desktop:pt-[75px]">
      <p className="desktop:text-body15_26 w-full max-w-[780px] mx-auto">
        ▼Driver Interview Video
      </p>
      <div className="relative z-10 px-4 desktop:px-0">
        <div
          className="max-w-[1008px] mx-auto flex flex-col gap-10 px-4 desktop:px-0 relative hover:cursor-pointer"
          onClick={() => {
            setIsVideoPlaying(true);
          }}
        >
          <img src={tukTukImage} alt="illustration image" />
          <div className="absolute left-0 right-0 top-0 bottom-0 w-[84px] h-[84px] m-auto">
            <PlayIcon />
          </div>
          <div
            className={clsx(
              "absolute left-0 right-0 top-0 bottom-0 w-full h-full flex flex-col items-center justify-center z-10",
              isVideoPlaying ? "block" : "hidden",
            )}
          >
            <ReactPlayer
              url="https://www.youtube.com/watch?v=xrRDlOWR1OU"
              playing={isVideoPlaying}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDriverInterviewSection;
