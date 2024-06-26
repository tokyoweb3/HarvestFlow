import React from "react";
import { Trans, useTranslation } from "react-i18next";

import SectionHeader from "./SectionHeader";

const HowToStartSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative z-10 desktop:h-screen border-b border-black flex flex-col">
      <SectionHeader title={t("homepage.how_to_start.title")} />
      <div className="pb-16 flex-1 desktop:flex desktop:flex-col desktop:justify-center">
        <div className="max-w-[1188px] px-4 desktop:px-0 w-full mx-auto overflow-x-auto">
          <div className="grid grid-cols-[65vw_65vw_65vw_65vw_5vw] desktop:grid-cols-4 grid-rows-1">
            <div className="relative">
              <div className="absolute h-[calc(100%-24px)] desktop:h-[calc(100%-40px)] right-0 bottom-0 w-[1px] border-r border-dashed border-black" />
              <div className="w-full h-12 desktop:h-20 bg-[#E6B95F] relative px-8 py-4 desktop:p-8 flex items-center rounded-tr-full rounded-br-full border border-black">
                <p className="text-bodyLarge desktop:text-heading5 tracking-widest uppercase font-medium">
                  Step 1
                </p>
              </div>
              <div className="w-full h-12 desktop:h-20 bg-[#325AB4] border-l border-black border-b"></div>
              <div className="w-full h-12 desktop:h-20 bg-[#5A7ED0] border-l border-black border-b"></div>
              <div className="w-full h-12 desktop:h-20 bg-[#1C1C64] border-l border-black border-b"></div>
              <div className="px-10 py-8 flex flex-col gap-8 border-l border-black">
                <h3 className="text-body16 desktop:text-bodyLarge uppercase font-medium">
                  {t("homepage.how_to_start.step1.title")}
                </h3>
                <div className="flex flex-col gap-6 text-bodySmaller">
                  <Trans
                    i18nKey="homepage.how_to_start.step1.text"
                    components={[
                      // eslint-disable-next-line react/jsx-key
                      <p className="text-captionSmall"></p>,
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute h-[calc(100%-72px)] desktop:h-[calc(100%-120px)] right-0 bottom-0 w-[1px] border-r border-dashed border-black" />
              <div className="w-full h-12 desktop:h-20 bg-transparent"></div>
              <div className="w-full h-12 desktop:h-20 bg-[#325AB4] relative px-8 py-4 desktop:p-8 flex items-center rounded-tr-full rounded-br-full border border-black border-l-0">
                <p className="text-bodyLarge desktop:text-heading5 tracking-widest uppercase font-medium text-white">
                  Step 2
                </p>
              </div>
              <div className="w-full h-12 desktop:h-20 bg-[#5A7ED0] border-b border-black"></div>
              <div className="w-full h-12 desktop:h-20 bg-[#1C1C64] border-t border-black"></div>
              <div className="px-10 py-8 flex flex-col gap-8">
                <h3 className="text-body16 desktop:text-bodyLarge uppercase font-medium">
                  {t("homepage.how_to_start.step2.title")}
                </h3>
                <div className="flex flex-col gap-6">
                  <p className="text-bodySmaller">
                    {t("homepage.how_to_start.step2.text")}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute h-[calc(100%-120px)] desktop:h-[calc(100%-200px)] right-0 bottom-0 w-[1px] border-r border-dashed border-black" />
              <div className="w-full h-12 desktop:h-20 bg-transparent"></div>
              <div className="w-full h-12 desktop:h-20 bg-transparent"></div>
              <div className="w-full h-12 desktop:h-20 bg-[#5A7ED0] relative px-8 py-4 desktop:p-8 flex items-center rounded-tr-full rounded-br-full border border-black border-l-0">
                <p className="text-bodyLarge desktop:text-heading5 tracking-widest uppercase font-medium text-white">
                  Step 3
                </p>
              </div>
              <div className="w-full h-12 desktop:h-20 bg-[#1C1C64]"></div>
              <div className="px-10 py-8 flex flex-col gap-8">
                <h3 className="text-body16 desktop:text-bodyLarge uppercase font-medium">
                  {t("homepage.how_to_start.step3.title")}
                </h3>
                <div className="flex flex-col gap-6">
                  <p className="text-bodySmaller">
                    {t("homepage.how_to_start.step3.text")}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute h-[calc(100%-280px)] right-0 bottom-0 w-[1px]" />
              <div className="w-full h-12 desktop:h-20 bg-transparent"></div>
              <div className="w-full h-12 desktop:h-20 bg-transparent"></div>
              <div className="w-full h-12 desktop:h-20 bg-transparent"></div>
              <div className="w-full h-12 desktop:h-20 bg-[#1C1C64] relative px-8 py-4 desktop:p-8 flex items-center rounded-tr-full rounded-br-full border border-black border-l-0">
                <p className="text-bodyLarge desktop:text-heading5 tracking-widest uppercase font-medium text-white">
                  Step 4
                </p>
              </div>
              <div className="px-10 py-8 flex flex-col gap-8">
                <h3 className="text-body16 desktop:text-bodyLarge uppercase font-medium">
                  {t("homepage.how_to_start.step4.title")}
                </h3>
                <div className="flex flex-col gap-6">
                  <p className="text-bodySmaller">
                    {t("homepage.how_to_start.step4.text")}
                  </p>
                </div>
              </div>
            </div>
            <div className="block desktop:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToStartSection;
