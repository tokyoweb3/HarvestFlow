import React from "react";
import { useTranslation } from "react-i18next";

const ProjectLendAHandSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-[100px] pb-[150px] desktop:py-[150px] relative z-10">
      <div className="max-w-[780px] mx-auto flex flex-col gap-16 desktop:gap-32 px-4 desktop:px-0">
        <button className="bg-primary text-heading5 desktop:text-heading3 font-medium uppercase p-8 desktop:p-10 border border-black tracking-wider">
          {t("project.start_lending")}
        </button>
      </div>
    </div>
  );
};

export default ProjectLendAHandSection;
