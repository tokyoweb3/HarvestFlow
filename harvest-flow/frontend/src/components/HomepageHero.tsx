import React from "react";
import { useTranslation } from "react-i18next";

import { useScreenDetector } from "@src/utils/useScreenDetector";

import bgVideo from "../../assets/videos/pc_color_high.mp4";
import bgVideoMobile from "../../assets/videos/sp_color_high.mp4";

const VectorTitle = () => {
  return (
    <svg viewBox="0 0 583 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.3915 21.9268H32.9209V1.20435H43.3124V54.7809H32.9209V30.924H10.3915V54.7809H0V1.20435H10.3915V21.9268Z"
        fill="white"
      />
      <path
        d="M90.4792 43.5345H68.989L64.2695 54.7809H52.9976L75.9311 1.20435H84.0855L106.37 54.7809H95.1842L90.4647 43.5345H90.4792ZM87.4483 35.0162L79.8567 15.7304L72.2652 35.0162H87.4483Z"
        fill="white"
      />
      <path
        d="M131.496 1.20435C138.842 1.20435 142.594 3.13438 145.077 5.22404C149.147 8.67779 150.345 13.2634 150.345 17.2686C150.345 22.4928 148.266 27.0639 144.11 29.8791C142.753 30.8369 140.834 31.7221 138.279 32.2155L154.891 54.7954H141.945L127.729 33.2603H126.444V54.7954H116.053V1.20435H131.467H131.496ZM126.459 25.8594H129.417C131.409 25.8594 139.65 25.6127 139.65 17.7475C139.65 9.88224 131.496 9.7081 129.591 9.7081H126.473V25.8594H126.459Z"
        fill="white"
      />
      <path
        d="M168.674 1.20435L182.891 37.1929L197.107 1.20435H208.451L185.921 54.7809H179.687L157.316 1.20435H168.66H168.674Z"
        fill="white"
      />
      <path
        d="M247.723 10.2015H228.542V22.1735H246.914V31.1707H228.542V45.7983H247.723V54.7954H218.165V1.20435H247.723V10.2015Z"
        fill="white"
      />
      <path
        d="M287.153 13.4087C284.036 9.22933 280.355 8.82301 278.45 8.82301C272.85 8.82301 271.104 12.3638 271.104 15.092C271.104 16.3835 271.508 17.588 272.778 18.7054C274.063 19.9098 275.809 20.5483 279.172 21.7528C283.328 23.2039 287.24 24.6406 289.953 27.1366C292.349 29.2988 294.514 32.9267 294.514 38.383C294.514 48.8313 287.009 55.971 275.982 55.971C266.154 55.971 260.409 49.9487 257.609 45.8419L264.393 39.3408C266.947 44.5649 271.826 46.4949 275.578 46.4949C280.298 46.4949 283.805 43.6072 283.805 39.1086C283.805 37.1785 283.17 35.6548 281.726 34.2907C279.735 32.4478 276.531 31.403 273.5 30.3581C270.7 29.4004 267.351 28.1088 264.638 25.6999C262.877 24.1762 260.409 21.2013 260.409 15.745C260.409 7.87976 265.677 0 277.512 0C280.875 0 287.182 0.638507 292.609 6.26898L287.182 13.4232L287.153 13.4087Z"
        fill="white"
      />
      <path
        d="M324.245 10.2015V54.7809H313.853V10.2015H301.874V1.20435H336.224V10.2015H324.245Z"
        fill="white"
      />
      <path
        d="M397.664 10.2015H379.767V22.1735H396.538V31.1707H379.767V54.7954H369.375V1.20435H397.664V10.2015Z"
        fill="white"
      />
      <path
        d="M418.517 2.18921V46.7686H434.971V55.7658H408.126V2.18921H418.517Z"
        fill="white"
      />
      <path
        d="M499.861 28.0363C499.861 44.3472 488.2 56 471.415 56C454.629 56 442.968 44.3472 442.968 28.0363C442.968 11.7253 454.629 0 471.415 0C488.2 0 499.861 11.7253 499.861 28.0363ZM489.152 28.0363C489.152 17.1962 481.806 9.47603 471.415 9.47603C461.023 9.47603 453.677 17.1817 453.677 28.0363C453.677 38.8909 461.023 46.5095 471.415 46.5095C481.806 46.5095 489.152 38.8764 489.152 28.0363Z"
        fill="white"
      />
      <path
        d="M531.295 54.7811H523.458L504.927 1.20457H515.953L527.86 37.6721L540.879 0.711182H546.637L558.934 37.6721L571.721 1.20457H582.748L563.018 54.7811H555.181L543.52 20.7951L531.295 54.7811Z"
        fill="white"
      />
    </svg>
  );
};

const HomepageHero: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile, isDesktop } = useScreenDetector();

  return (
    <div className="h-screen bg-center bg-cover bg-no-repeat relative text-white border-b border-black z-10">
      {isDesktop && (
        <video
          src={bgVideo}
          className="w-full h-full object-cover relative z-0 hidden animate-fade desktop:block"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {isMobile && (
        <video
          src={bgVideoMobile}
          className="w-full h-full object-cover relative z-0 block animate-fade desktop:hidden"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <div className="w-full h-full absolute left-0 top-0 z-10">
        <div className="container mx-auto min-h-full flex flex-col justify-center gap-12 desktop:gap-32 px-4 desktop:px-0 pt-16">
          <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto gap-10 w-full">
            <h1 className="sr-only">{t("homepage.hero.title")}</h1>
            <div className="w-full">
              <VectorTitle />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-heading4 text-center uppercase font-medium">
                {t("homepage.hero.subtitle")}
              </h2>
              <h3 className="text-heading5 text-center whitespace-pre-line">
                {t("homepage.hero.text")}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
