import React from "react";
import { useTranslation } from "react-i18next";

const ProjectBorrowerSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="px-4 my-[100px]">
      <div className="max-w-[1008px] mx-auto bg-white/[.5] rounded-[6px] relative z-10 py-12 px-4 desktop:py-24 desktop:px-28">
        <div className="max-w-[780px] mx-auto flex flex-col gap-10 desktop:gap-10">
          <h4 className="text-body16 desktop:text-heading5Larger23_30 text-center desktop:text-left font-medium">
            {t("project.borrower.title")}
          </h4>
          <p className="text-bodySmaller desktop:text-body15_26 whitespace-pre-line">
            {t("project.borrower.text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectBorrowerSection;
