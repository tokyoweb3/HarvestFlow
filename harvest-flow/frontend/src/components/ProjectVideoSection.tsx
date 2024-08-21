import React, { useState } from "react";
import clsx from "clsx";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";

import PlayIcon from "@src/icons/PlayIcon";
import tukTukImage from "../../assets/images/tuktuk.jpg";

const ProjectVideoSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const videoUrl =
    currentLanguage === "jp"
      ? "https://youtu.be/S9fXklbwYEY?si=LwOAu-63Z-iypmk5"
      : "https://youtu.be/PsAe8A4Dles?si=P2EQ8IjkGS6Il3zY";

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="pt-[57px] desktop:pt-[100px] relative z-10 px-4 desktop:px-0">
      <div
        className="max-w-[1008px] mx-auto flex flex-col gap-10 relative hover:cursor-pointer rounded-[6px] aspect-video overflow-hidden"
        onClick={() => {
          setIsVideoPlaying(true);
        }}
      >
        <div className="absolute left-0 right-0 top-0 bottom-0 w-[84px] h-[84px] m-auto">
          <PlayIcon />
        </div>
        <div
          className={clsx(
            "absolute left-0 right-0 top-0 bottom-0 w-full h-full flex flex-col items-center justify-center z-10",
            //isVideoPlaying ? "block" : "hidden",
          )}
        >
          <ReactPlayer
            url={videoUrl}
            playing={isVideoPlaying}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectVideoSection;
