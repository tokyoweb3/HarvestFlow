import React from "react";
import { useTranslation } from "react-i18next";

import SectionHeader from "./SectionHeader";
import FocusAreaUseCases from "@src/icons/FocusAreaUseCases";
import FocusAreaFinancial from "@src/icons/FocusAreaFinancial";
import FocusAreaGrowth from "@src/icons/FocusAreaGrowth";
import FocusAreaTransparency from "@src/icons/FocusAreaTransparency";
import FocusAreaCulture from "@src/icons/FocusAreaCulture";

const POSSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative z-10 desktop:h-screen border-b border-black flex flex-col desktop:flex-row">
      <div className="w-full desktop:w-1/2 flex flex-col">
        <SectionHeader title={t("homepage.pos.title")} />
        <div className="flex-1 flex items-center justify-center desktop:max-w-[427px] desktop:mx-auto p-4">
          <p className="text-bodySmaller text-justify">
            {t("homepage.pos.text")}
          </p>
        </div>
      </div>
      <div className="w-full desktop:w-1/2 flex flex-col desktop:border-l desktop:border-black">
        <SectionHeader title={t("homepage.social_action.title")} />
        <div className="flex-1 flex flex-col gap-6 desktop:gap-12 items-center justify-center desktop:max-w-[500px] desktop:mx-auto p-4">
          <p className="text-bodySmaller text-justify">
            {t("homepage.social_action.text")}
          </p>
          <div className="flex flex-col gap-4 desktop:gap-6">
            <h2 className="text-heading5 desktop:text-heading4 text-center uppercase font-medium">
              {t("homepage.social_action.subtitle")}
            </h2>
            <div className="flex flex-wrap desktop:flex-nowrap gap-4 justify-center">
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-10 h-10 desktop:w-[70px] desktop:h-[70px] flex items-center justify-center">
                  <FocusAreaUseCases />
                </div>
                <h3 className="text-caption font-normal text-center uppercase">
                  {t("homepage.social_action.usecase")}
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-10 h-10 desktop:w-[70px] desktop:h-[70px] flex items-center justify-center">
                  <FocusAreaFinancial />
                </div>
                <h3 className="text-caption font-normal text-center uppercase">
                  {t("homepage.social_action.financial")}
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-10 h-10 desktop:w-[70px] desktop:h-[70px] flex items-center justify-center">
                  <FocusAreaGrowth />
                </div>
                <h3 className="text-caption font-normal text-center uppercase">
                  {t("homepage.social_action.growth")}
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-10 h-10 desktop:w-[70px] desktop:h-[70px] flex items-center justify-center">
                  <FocusAreaTransparency />
                </div>
                <h3 className="text-caption font-normal text-center uppercase">
                  {t("homepage.social_action.transparency")}
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-10 h-10 desktop:w-[70px] desktop:h-[70px] flex items-center justify-center">
                  <FocusAreaCulture />
                </div>
                <h3 className="text-caption font-normal text-center uppercase">
                  {t("homepage.social_action.culture")}
                </h3>
              </div>
            </div>
          </div>
          {/* <button className="w-full bg-greySuperLight text-body py-4 desktop:py-6 uppercase font-medium text-center border border-black">
            {t("homepage.social_action.learn_more")}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default POSSection;
