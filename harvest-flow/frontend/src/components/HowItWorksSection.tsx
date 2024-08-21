import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useScreenDetector } from "@src/utils/useScreenDetector";

import SectionHeader from "./SectionHeader";

import videoDesktopJa from "../../assets/videos/flow_jpn.mp4";
import videoDesktopEn from "../../assets/videos/flow_eng.mp4";
import videoMobileJa from "../../assets/videos/flow_jpn_mobile.mp4";
import videoMobileEn from "../../assets/videos/flow_eng_mobile.mp4";

const HowItWorksSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isJapanese =
    i18n.language === "ja" ||
    i18n.language === "jp" ||
    i18n.language.startsWith("ja");

  const { isMobile, isDesktop } = useScreenDetector();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative z-10 desktop:h-screen border-b border-black flex flex-col bg-[#e6edf4]">
      <SectionHeader title={t("homepage.how_it_works.title")} />
      <div className="flex-1 desktop:flex desktop:flex-col desktop:justify-center">
        {isDesktop && (
          <div className="max-w-[100%] max-h-[80vh] w-full mx-auto">
            <video
              ref={videoRef}
              src={isJapanese ? videoDesktopJa : videoDesktopEn}
              muted
              playsInline
              className="h-full w-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {isMobile && (
          <div className="max-w-[100%] max-h-[100vh] w-full mx-auto">
            <video
              ref={videoRef}
              src={isJapanese ? videoMobileJa : videoMobileEn}
              muted
              playsInline
              className="h-full w-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default HowItWorksSection;
