import React from "react";

import artistImage from "../../assets/images/project-artist-collaboration.jpg";
import { useTranslation } from "react-i18next";

const ProjectArtistCollaborationSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="px-4 my-[100px]">
      <div className="max-w-[1008px] mx-auto bg-white/[.5] rounded-[6px] relative z-10 py-12 px-4 desktop:py-24 desktop:px-28">
        <div className="flex flex-col relative z-10 px-4 desktop:px-0">
          <div className="max-w-[768px] mx-auto flex flex-col gap-6 desktop:gap-[40px]">
            <h2 className="font-functionPro tracking-[0.35em] text-heading5Larger desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem]">
              ARTIST COLLABORATION
            </h2>
            <div className="flex flex-col desktop:hidden gap-[30px]">
              <div className="flex gap-[26px] items-center px-6">
                <img
                  src={artistImage}
                  alt="Artist Collaboration image"
                  className="w-full max-w-[120px]"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-functionPro uppercase text-body15_15 font-normal">
                    Profile
                  </p>
                  <p className="font-functionPro uppercase text-heading5LH22 font-normal">
                    IZUMIDA LEE
                  </p>
                </div>
              </div>
              <p className="text-bodySmaller whitespace-pre-line">
                {t("project.artist_collaboration.text")}
              </p>
            </div>
            <div className="hidden desktop:flex flex-row gap-10 desktop:items-center">
              <img
                src={artistImage}
                alt="Artist Collaboration image"
                className="w-full max-w-[207px]"
              />
              <div className="flex flex-col gap-[18px]">
                <div className="flex flex-col gap-0">
                  <p className="font-functionPro uppercase text-bodySmaller font-medium">
                    Profile
                  </p>
                  <p className="font-functionPro uppercase text-heading5Smaller font-medium">
                    IZUMIDA LEE
                  </p>
                </div>
                <p className="text-bodySmaller whitespace-pre-line">
                  {t("project.artist_collaboration.text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectArtistCollaborationSection;
