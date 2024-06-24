import React from "react";
import { useTranslation } from "react-i18next";

import SectionHeader from "./SectionHeader";

import backgroundImage from "../../assets/images/about.jpg";

const AboutHarvestFlowSection: React.FC = () => {
  const { t } = useTranslation();
  // const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="flex flex-col-reverse desktop:flex-row divide-x divide-black border-b border-black relative z-10 desktop:h-screen bg-greySuperLight">
      <div className="w-full desktop:w-[40%] desktop:flex desktop:flex-col">
        <div className="hidden desktop:block">
          <SectionHeader title={t("homepage.about.title")} />
        </div>
        <div className="py-16 desktop:flex-1 desktop:flex desktop:flex-col desktop:justify-end">
          <div className="flex flex-col gap-6 px-4 desktop:p-10">
            <h3 className="text-bodyLarge desktop:text-heading4 text-center desktop:text-left uppercase font-medium whitespace-pre-line">
              {t("homepage.about.heading")}
            </h3>
            <div className="whitespace-pre-line">
              {t("homepage.about.text")}
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full desktop:w-[60%] bg-cover bg-no-repeat bg-center relative min-h-[220px] desktop:min-h-[initial]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex flex-col items-center justify-center p-10">
          <div className="h-20 hidden desktop:block"></div>
          <h2 className="text-white text-heading3 desktop:text-heading2 font-medium uppercase tracking-widest text-center whitespace-pre-line">
            {t("homepage.about.title", { lng: "en" })}
          </h2>
          {/* <div className="absolute desktop:relative -bottom-10 desktop:bottom-0 h-20 flex items-center justify-center desktop:justify-end w-full">
            <button
              className={clsx(
                "bg-white p-6 uppercase font-medium tracking-widest text-body hover:cursor-pointer border border-black desktop:border-0",
                isVideoModalOpen && "hidden",
              )}
              onClick={() => setIsVideoModalOpen(true)}
            >
              {t("general.play_movie")}
            </button>
          </div> */}
        </div>
        {/* <div
          className={clsx(
            "absolute left-0 right-0 top-0 bottom-0 w-full h-full flex flex-col items-center justify-center",
            isVideoModalOpen ? "block" : "hidden",
          )}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=xrRDlOWR1OU"
            playing={isVideoModalOpen}
            controls
            width="100%"
            height="100%"
          />
        </div> */}
      </div>
    </div>
  );
};

export default AboutHarvestFlowSection;
