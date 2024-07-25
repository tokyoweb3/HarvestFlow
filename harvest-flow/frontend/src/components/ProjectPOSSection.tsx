import React from "react";

import NFTCardImage from "../../assets/images/project-pos-nft-card.jpg";
import { useTranslation } from "react-i18next";

const ProjectPOSSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16 desktop:gap-[150px] pt-20 desktop:pt-[150px] relative z-10 px-4 desktop:px-0">
      <div className="max-w-[768px] mx-auto flex flex-col gap-10 desktop:gap-[71px]">
        <div>
          <h2 className="text-bodyLarge desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem]">
            {t("project.pos.title")}
          </h2>
          <h3 className="text-bodyLarge desktop:text-heading4_28_44 text-center uppercase font-medium tracking-[0.35rem] whitespace-pre-line">
            {t("project.pos.subtitle")}
          </h3>
        </div>
        <div className="flex flex-col desktop:flex-row gap-10 desktop:items-center">
          <img
            src={NFTCardImage}
            alt="NFT Card"
            className="w-full max-w-[253px] desktop:max-w-[208px]"
          />
          <p className="text-bodySmaller whitespace-pre-line">
            {t("project.pos.text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPOSSection;
