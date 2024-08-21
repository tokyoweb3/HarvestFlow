import React from "react";
import { useTranslation } from "react-i18next";

const UserTermSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16 desktop:gap-[150px] pt-[100px] pb-[100px] desktop:pt-[150px] relative z-10">
      <div className="max-w-[780px] mx-auto flex flex-col gap-10 desktop:gap-[50px]">
        <h2 className="text-heading5SmallerLH28 desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem] px-4 desktop:px-0">
          {t("terms.heading")}
        </h2>
        <div className="flex flex-col gap-10 desktop:gap-[30px] px-4 desktop:px-0">
          <div className="text-bodySmaller desktop:text-body15_26 whitespace-pre-line">
            {t("terms.text1")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTermSection;
