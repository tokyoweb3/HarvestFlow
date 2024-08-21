import React from "react";

import NFTCardImage from "../../assets/images/nft-card-image.png";
import { useTranslation } from "react-i18next";

const ProjectPOSSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="px-4 my-[100px]">
      <div className="max-w-[1008px] mx-auto bg-white/[.5] rounded-[6px] relative z-10 py-12 px-4 desktop:py-24 desktop:px-28">
        <div className="flex flex-col gap-[60px] desktop:gap-[150px] relative z-10 px-4 desktop:px-0">
          <div className="max-w-[768px] mx-auto flex flex-col gap-10 desktop:gap-[32px]">
            <div className="flex flex-col gap-[12px] desktop:gap-4">
              <h2 className="text-heading5LH22 desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem]">
                {t("project.pos.title")}
              </h2>
              <h3 className="desktop:text-bodySmaller text-center uppercase tracking-[0.35rem] whitespace-pre-line">
                {t("project.pos.subtitle")}
              </h3>
            </div>
            <div className="flex flex-col desktop:flex-row gap-10 desktop:items-center">
              <div className="max-w-[60%] w-full mx-auto effect-shine">
                <img src={NFTCardImage} alt="NFT Card" className="w-full" />
              </div>
              <p className="desktop:max-w-[510px] text-bodySmaller whitespace-pre-line">
                {t("project.pos.text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPOSSection;
