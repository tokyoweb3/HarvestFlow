import React from "react";
import { useTranslation } from "react-i18next";

const ProjectSchemeSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="px-4 my-[100px]">
      <div className="max-w-[1008px] mx-auto bg-white/[.5] rounded-[6px] relative z-10 py-12 px-4 desktop:py-24 desktop:px-28 flex flex-col gap-10">
        <h2 className="text-heading5SmallerLH28 desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem]">
          {t("project.about_the_scheme.title")}
        </h2>
        <div className="max-w-[780px] mx-auto">
          <p className="text-bodySmaller desktop:text-body15_26 whitespace-pre-line">
            {t("project.about_the_scheme.text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSchemeSection;
