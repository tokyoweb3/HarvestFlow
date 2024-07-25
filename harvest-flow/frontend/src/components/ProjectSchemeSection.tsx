import React from "react";
import { useTranslation } from "react-i18next";

const ProjectSchemeSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16 desktop:gap-[70px] desktop:pt-[150px] relative z-10 px-4 desktop:px-0">
      <h2 className="text-bodyLarge desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem]">
        {t("project.about_the_scheme.title")}
      </h2>
      <div className="max-w-[780px] mx-auto flex flex-col gap-10">
        <p className="whitespace-pre-line">
          {t("project.about_the_scheme.text")}
        </p>
      </div>
    </div>
  );
};

export default ProjectSchemeSection;
