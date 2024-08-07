import React from "react";

import logo from "../../assets/images/project-borrower-logo.jpg";
import { useTranslation } from "react-i18next";

const ProjectAboutTheBorrowerSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16 desktop:gap-[150px] pt-[100px] desktop:pt-[150px] relative z-10">
      <div className="max-w-[780px] mx-auto flex flex-col gap-10 desktop:gap-[50px]">
        <h2 className="text-heading5SmallerLH28 desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem] px-4 desktop:px-0">
          {t("project.about_the_borrower.title")}
        </h2>
        <div className="max-w-[580px] w-full mx-auto bg-white border border-black px-[15px] py-[10px]">
          <p className="text-bodySmaller_13_20 desktop:text-body15_26 whitespace-pre-line">
            {t("project.about_the_borrower.note")}
            &nbsp;
            <a
              href="https://discord.gg/harvesthall"
              target="_blank"
              rel="noreferrer"
            >
              discord.gg/harvesthall
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-10 desktop:gap-[30px] px-4 desktop:px-0">
          <div className="flex flex-row gap-[20px] desktop:gap-[30px] desktop:items-center px-4 desktop:px-0">
            <img
              src={logo}
              alt="Logo"
              className="w-full max-w-[80px] max-h-[80px] desktop:max-w-[91px] desktop:max-h-[91px]"
            />
            <div className="flex flex-col items-start gap-[14px] desktop:gap-[16px] w-full max-w-[240px]">
              <p className="text-body15_20">
                {t("project.about_the_borrower.company.title")}
              </p>
              <button className="bg-white rounded-[15px] flex gap-[12px] items-center py-[3px] px-[22px] border border-black">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 13.9242V0H5.3175V1.54713H1.5V12.377H12V8.43958H13.5V13.9242H0ZM5.6895 6.96208L10.9395 1.54713H7.5V0H13.5V6.18851H12V2.64095L6.75 8.0559L5.6895 6.96208Z"
                    fill="black"
                  />
                </svg>
                <p className="font-medium text-body14 desktop:text-body">
                  Website
                </p>
              </button>
            </div>
          </div>
          <div className="text-bodySmaller desktop:text-body15_26 whitespace-pre-line">
            {t("project.about_the_borrower.company.text")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAboutTheBorrowerSection;
