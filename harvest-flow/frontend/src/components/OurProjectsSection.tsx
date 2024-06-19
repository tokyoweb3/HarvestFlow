import React from "react";
import { Trans, useTranslation } from "react-i18next";

import SectionHeader from "./SectionHeader";

import backgroundImage from "../../assets/images/our_projects.jpg";
import backgroundImageNext from "../../assets/images/our_projects_next_bg.jpg";

const OurProjectsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="desktop:border-b desktop:border-black px-4 desktop:px-0 pb-16 desktop:pb-0 relative z-10 desktop:h-screen flex flex-col">
      <SectionHeader title={t("homepage.our_projects.title")} />
      <div className="flex flex-col desktop:flex-row desktop:divide-x desktop:divide-black border border-black desktop:border-0 flex-1">
        <div
          className="w-full desktop:w-1/2 bg-cover bg-no-repeat bg-center min-h-[220px] desktop:min-h-[initial]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="w-full desktop:w-1/2 flex divide-x divide-black">
          <div className="w-full desktop:w-2/3 flex flex-col desktop:pt-12 justify-end">
            <div className="flex flex-col gap-4 desktop:gap-6 px-4 py-8 desktop:p-10">
              <h3 className="text-heading4 desktop:text-heading3 text-center desktop:text-left uppercase font-medium">
                {t("homepage.our_projects.heading")}
              </h3>
              <p>{t("homepage.our_projects.text")}</p>
              <div className="py-2 px-4 bg-greySuperLight border border-black">
                <p className="font-medium uppercase text-center whitespace-pre-line">
                  <Trans
                    i18nKey="homepage.our_projects.note"
                    components={[
                      // eslint-disable-next-line react/jsx-key
                      <a href="#" className="underline" />,
                    ]}
                  ></Trans>
                </p>
              </div>
            </div>
            <div className="border-t border-b border-black divide-x divide-black flex">
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body text-center p-2 border-b border-black border-dashed">
                  {t("general.apy")}
                </h4>
                <div className="py-6 desktop:py-8 px-4">
                  <h5 className="text-bodyLarge desktop:text-heading4 text-center uppercase">
                    8%
                  </h5>
                </div>
              </div>
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body text-center p-2 border-b border-black border-dashed">
                  {t("general.status")}
                </h4>
                <div className="py-6 desktop:py-8 px-4">
                  <h5 className="text-bodyLarge desktop:text-heading4 text-center uppercase">
                    Open
                  </h5>
                </div>
              </div>
              <div className="w-full">
                <h4 className="uppercase text-caption desktop:text-body text-center p-2 border-b border-black border-dashed">
                  {t("general.asset_type")}
                </h4>
                <div className="py-6 desktop:py-8 px-4">
                  <h5 className="text-bodyLarge desktop:text-heading4 text-center uppercase">
                    Vehicle
                  </h5>
                </div>
              </div>
            </div>
            <button className="p-4 desktop:p-10 uppercase text-center w-full text-caption desktop:text-heading5 font-medium">
              {t("general.view_more")}
            </button>
          </div>
          <div
            className="hidden desktop:flex w-1/3 flex-col gap-4 items-center justify-center p-10 bg-center bg-cover bg-no-repeat text-white"
            style={{ backgroundImage: `url(${backgroundImageNext})` }}
          >
            <p className="uppercase text-center text-heading5 desktop:text-heading4">
              {t("general.next_project")}
            </p>
            <p className="uppercase text-center">{t("general.coming_soon")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProjectsSection;
