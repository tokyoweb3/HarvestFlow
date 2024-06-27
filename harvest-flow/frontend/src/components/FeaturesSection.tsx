import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";

import SectionHeader from "./SectionHeader";

import backgroundImage from "../../assets/images/hero-bg.svg";
import bgVideo from "../../assets/videos/pc_color_high.mp4";
import bgVideoMobile from "../../assets/videos/sp_color_high.mp4";
import featureImage1 from "../../assets/images/feature1.jpg";
import featureImage2 from "../../assets/images/feature2.jpg";

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();
  const container = useRef();
  const scrollableTextWrapper = useRef<HTMLDivElement>();

  useGSAP(
    () => {
      if (!scrollableTextWrapper.current) return;

      // disable on mobile
      if (window.innerWidth < 1200) return;

      // disable scroll trigger if content is less than window height
      // if (scrollableTextWrapper.current.scrollHeight < window.innerHeight)
      //   return;

      gsap.to(".gsap-features-container", {
        scrollTrigger: {
          trigger: ".gsap-features-inner",
          start: "top top",
          end: `+=${scrollableTextWrapper.current.scrollHeight}px`,
          pin: true,
        },
      });

      gsap.to(".gsap-features-text-scroll-container", {
        scrollTo: scrollableTextWrapper.current.scrollHeight,
        scrollTrigger: {
          trigger: ".gsap-features-inner",
          start: "top top",
          end: `+=${scrollableTextWrapper.current.scrollHeight + window.innerHeight - 160}px`,
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="gsap-features-container">
        <div className="flex flex-col desktop:flex-row divide-x divide-black border-b border-black relative z-10 desktop:h-screen bg-greySuperLight gsap-features-inner">
          <div className="hidden desktop:block w-1/2 bg-cover bg-no-repeat bg-center relative">
            <video
              src={bgVideo}
              className="w-full h-full object-cover object-left"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center">
              <h2 className="text-white text-heading3 desktop:text-heading2 font-medium uppercase tracking-widest text-center">
                {t("homepage.features.title", { lng: "en" })}
              </h2>
            </div>
          </div>
          <div className="w-full desktop:w-1/2 relative desktop:flex desktop:flex-col">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover absolute left-0 right-0 top-0 bottom-0 desktop:hidden"
            >
              <source src={bgVideoMobile} type="video/mp4" />
            </video>
            <div className="relative z-10 text-white desktop:text-black desktop:flex desktop:flex-col desktop:flex-1 desktop:max-h-screen desktop:justify-between">
              <SectionHeader title={t("homepage.features.title")} />
              <div
                className="desktop:pt-96 desktop:flex-1 desktop:overflow-y-hidden desktop:pb-16 gsap-features-text-scroll-container"
                ref={scrollableTextWrapper}
              >
                <div className="px-4 desktop:px-10 flex flex-col gap-10 desktop:gap-[60px] pb-10 desktop:pb-0">
                  <div className="bg-white desktop:bg-transparent text-black py-10 px-8 desktop:p-0 flex gap-8">
                    <div>
                      <h3 className="text-heading5Smaller desktop:text-heading4Smaller text-center desktop:text-left uppercase font-medium desktop:hidden mb-6 desktop:mb-0">
                        {t("homepage.features.feature1_title")}
                      </h3>
                      <img
                        src={featureImage1}
                        alt="background"
                        className="ml-3 mb-1 desktop:ml-8 desktop:mb-4 float-right max-w-[140px] w-full desktop:max-w-[280px]"
                      />
                      <h3 className="text-heading5Smaller desktop:text-heading4Smaller text-center desktop:text-left uppercase font-medium hidden desktop:block">
                        {t("homepage.features.feature1_title")}
                      </h3>
                      <p className="text-bodySmaller desktop:mt-8">
                        {t("homepage.features.feature1_text")}
                      </p>
                      <h3 className="text-heading5Smaller desktop:text-heading4Smaller text-center desktop:text-left uppercase font-medium hidden desktop:block desktop:mt-[60px]">
                        {t("homepage.features.feature2_title")}
                      </h3>
                      <p className="text-bodySmaller hidden desktop:block mt-8">
                        {t("homepage.features.feature2_text")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white desktop:bg-transparent text-black py-10 px-8 desktop:p-0 flex gap-8 desktop:hidden">
                    <div className="flex flex-col gap-6 desktop:w-full">
                      <h3 className="text-heading5Smaller desktop:text-heading4Smaller text-center desktop:text-left uppercase font-medium">
                        {t("homepage.features.feature2_title")}
                      </h3>
                      <div>
                        <p className="text-bodySmaller">
                          {t("homepage.features.feature2_text")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white desktop:bg-transparent text-black py-10 px-8 desktop:p-0 flex gap-8">
                    <div className="flex flex-col gap-6 desktop:w-full">
                      <div>
                        <h3 className="text-heading5Smaller desktop:text-heading4Smaller text-center desktop:text-left uppercase font-medium desktop:hidden mb-6 desktop:mb-0">
                          {t("homepage.features.feature3_title")}
                        </h3>
                        <img
                          src={featureImage2}
                          alt="background"
                          className="ml-3 mb-1 desktop:ml-8 desktop:mb-4 float-right max-w-[140px] w-full desktop:max-w-[280px]"
                        />
                        <h3 className="text-heading5Smaller desktop:text-heading4Smaller text-center desktop:text-left uppercase font-medium hidden desktop:block">
                          {t("homepage.features.feature3_title")}
                        </h3>
                        <p className="text-bodySmaller desktop:mt-8">
                          {t("homepage.features.feature3_text")}
                        </p>
                        <h3 className="text-heading5Smaller desktop:text-heading4Smaller text-center desktop:text-left uppercase font-medium hidden desktop:block desktop:mt-[60px]">
                          {t("homepage.features.feature4_title")}
                        </h3>
                        <p className="text-bodySmaller hidden desktop:block mt-8">
                          {t("homepage.features.feature4_text")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white desktop:bg-transparent text-black py-10 px-8 desktop:p-0 flex gap-8 desktop:hidden">
                    <div className="flex flex-col gap-6 desktop:w-full">
                      <h3 className="text-heading5Smaller desktop:text-heading4Smaller text-center desktop:text-left uppercase font-medium">
                        {t("homepage.features.feature4_title")}
                      </h3>
                      <div>
                        <p className="text-bodySmaller">
                          {t("homepage.features.feature4_text")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
