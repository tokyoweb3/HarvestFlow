import React from "react";
import { useTranslation } from "react-i18next";

const ProjectBorrowerSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[30px] desktop:gap-[150px] pt-[60px] desktop:pt-[150px] relative z-10 px-4 desktop:px-0">
      <div className="max-w-[780px] mx-auto flex flex-col gap-10 desktop:gap-10">
        <h4 className="text-body16 desktop:text-heading5Larger23_30 text-center desktop:text-left font-medium">
          {t("project.borrower.title")}
        </h4>
        <p className="text-bodySmaller desktop:text-body15_26 whitespace-pre-line">
          {t("project.borrower.text")}
        </p>
      </div>
    </div>
  );
};

export default ProjectBorrowerSection;
