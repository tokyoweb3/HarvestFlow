import React from "react";
import { Trans, useTranslation } from "react-i18next";

import SectionHeader from "./SectionHeader";
import FocusAreaUseCases from "@src/icons/FocusAreaUseCases";
import FocusAreaFinancial from "@src/icons/FocusAreaFinancial";
import FocusAreaGrowth from "@src/icons/FocusAreaGrowth";
import FocusAreaTransparency from "@src/icons/FocusAreaTransparency";
import FocusAreaCulture from "@src/icons/FocusAreaCulture";

const POSSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative z-10 desktop:h-screen border-b border-black flex flex-col desktop:flex-row pb-16 desktop:pb-0">
      <div className="w-full desktop:w-1/2 flex flex-col">
        <div className="flex items-center justify-center desktop:border-b desktop:border-black px-6 pt-28 pb-16 desktop:p-6">
          <h2 className="text-heading5 desktop:text-body font-medium uppercase text-center tracking-[0.35rem] whitespace-pre-line">
            <Trans
              i18nKey="homepage.pos.title"
              components={[
                // eslint-disable-next-line react/jsx-key
                <span className="block desktop:inline text-bodyLarge24 desktop:text-body" />,
              ]}
            ></Trans>
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center desktop:max-w-[459px] desktop:mx-auto px-4">
          <p className="text-bodySmaller text-justify">
            {t("homepage.pos.text")}
          </p>
        </div>
      </div>
      <div className="w-full desktop:w-1/2 flex flex-col desktop:border-l desktop:border-black">
        <SectionHeader title={t("homepage.social_action.title")} />
        <div className="flex-1 flex flex-col gap-12 items-center justify-center desktop:max-w-[571px] desktop:mx-auto px-4">
          <p className="text-bodySmaller text-justify">
            {t("homepage.social_action.text")}
          </p>
          <div className="flex flex-col gap-8 desktop:gap-6 w-full">
            <h2 className="text-bodyLarge desktop:text-heading4SmallerLH34 text-center uppercase font-medium whitespace-pre-line">
              {t("homepage.social_action.subtitle")}
            </h2>
            <div className="flex flex-wrap desktop:flex-nowrap gap-4 justify-center">
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-[70px] h-[70px] flex items-center justify-center">
                  <FocusAreaUseCases />
                </div>
                <h3 className="text-captionMedium font-normal text-center uppercase">
                  {t("homepage.social_action.usecase")}
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-[70px] h-[70px] flex items-center justify-center">
                  <FocusAreaFinancial />
                </div>
                <h3 className="text-captionMedium font-normal text-center uppercase">
                  {t("homepage.social_action.financial")}
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-[70px] h-[70px] flex items-center justify-center">
                  <FocusAreaGrowth />
                </div>
                <h3 className="text-captionMedium font-normal text-center uppercase">
                  {t("homepage.social_action.growth")}
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-[70px] h-[70px] flex items-center justify-center">
                  <FocusAreaTransparency />
                </div>
                <h3 className="text-captionMedium font-normal text-center uppercase">
                  {t("homepage.social_action.transparency")}
                </h3>
              </div>
              <div className="w-[30%] desktop:w-[18%] flex flex-col gap-[10px] items-center">
                <div className="w-[70px] h-[70px] flex items-center justify-center">
                  <FocusAreaCulture />
                </div>
                <h3 className="text-captionMedium font-normal text-center uppercase">
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
