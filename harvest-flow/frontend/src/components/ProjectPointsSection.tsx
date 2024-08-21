import React from "react";

import point1Image from "../../assets/images/key-point-1.jpg";
import point2Image from "../../assets/images/key-point-2.jpg";
import point3Image from "../../assets/images/key-point-3.jpg";
import { useTranslation } from "react-i18next";

const ProjectPointsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[30px] desktop:gap-[64px] relative z-10 max-w-[1280px] mx-auto">
      <h2 className="text-center text-heading5SmallerLH24 desktop:text-heading3 font-medium uppercase">
        {t("project.overview.title")}
      </h2>
      <div className="flex border border-black divide-x divide-black overflow-x-scroll desktop:overflow-x-auto">
        <div className="flex-1 flex flex-col gap-[19px] desktop:gap-[23px] pt-[21px] pb-[32px] px-[25px] desktop:p-8 bg-white min-w-[66vw] desktop:min-w-[initial]">
          <h3 className="font-functionPro text-center text-bodyLarge24 desktop:text-heading4Smaller font-medium uppercase">
            Key point 1
          </h3>
          <div className="flex flex-col gap-[15px] desktop:gap-[18px] items-center">
            <img
              src={point1Image}
              alt="illustration image"
              className="rounded-full max-w-[106px] max-h-[106px] desktop:max-w-[151px] desktop:max-h-[151px] w-full"
            />
            <p className="text-caption desktop:text-bodySmaller">
              {t("project.point1.text")}
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[19px] desktop:gap-[23px] pt-[21px] pb-[32px] px-[25px] desktop:p-8 bg-white min-w-[66vw] desktop:min-w-[initial]">
          <h3 className="font-functionPro text-center text-bodyLarge24 desktop:text-heading4Smaller font-medium uppercase">
            Key point 2
          </h3>
          <div className="flex flex-col gap-[15px] desktop:gap-[18px] items-center">
            <img
              src={point2Image}
              alt="illustration image"
              className="rounded-full max-w-[106px] max-h-[106px] desktop:max-w-[151px] desktop:max-h-[151px] w-full"
            />
            <p className="text-caption desktop:text-bodySmaller">
              {t("project.point2.text")}
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[19px] desktop:gap-[23px] pt-[21px] pb-[32px] px-[25px] desktop:p-8 bg-white min-w-[66vw] desktop:min-w-[initial]">
          <h3 className="font-functionPro text-center text-bodyLarge24 desktop:text-heading4Smaller font-medium uppercase">
            Key point 3
          </h3>
          <div className="flex flex-col gap-[15px] desktop:gap-[18px] items-center">
            <img
              src={point3Image}
              alt="illustration image"
              className="rounded-full max-w-[106px] max-h-[106px] desktop:max-w-[151px] desktop:max-h-[151px] w-full"
            />
            <p className="text-caption desktop:text-bodySmaller">
              {t("project.point3.text")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPointsSection;
