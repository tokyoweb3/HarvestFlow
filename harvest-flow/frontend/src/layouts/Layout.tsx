import React, { useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { HeadProvider, Link, Meta } from "react-head";

import Header from "@src/components/Header";
import FeedbackModal from "@src/components/FeedbackModal";
import Footer from "@src/components/Footer";
import IntroSplashScreen from "@src/components/IntroSplashScreen";

import faviconAppleIcon57x57 from "../../assets/favicon/apple-icon-57x57.png";
import faviconAppleIcon60x60 from "../../assets/favicon/apple-icon-60x60.png";
import faviconAppleIcon72x72 from "../../assets/favicon/apple-icon-72x72.png";
import faviconAppleIcon76x76 from "../../assets/favicon/apple-icon-76x76.png";
import faviconAppleIcon114x114 from "../../assets/favicon/apple-icon-114x114.png";
import faviconAppleIcon120x120 from "../../assets/favicon/apple-icon-120x120.png";
import faviconAppleIcon144x144 from "../../assets/favicon/apple-icon-144x144.png";
import faviconAppleIcon152x152 from "../../assets/favicon/apple-icon-152x152.png";
import faviconAppleIcon180x180 from "../../assets/favicon/apple-icon-180x180.png";
import faviconAndroid192x192 from "../../assets/favicon/android-icon-192x192.png";
import favicon32x32 from "../../assets/favicon/favicon-32x32.png";
import favicon96x96 from "../../assets/favicon/favicon-96x96.png";
import favicon16x16 from "../../assets/favicon/favicon-16x16.png";
import msIcon144x144 from "../../assets/favicon/ms-icon-144x144.png";

const ENABLE_INTRO_ANIMATION = true;

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  const { i18n } = useTranslation();

  const [introVideosLoaded, setIntroVideosLoaded] = useState(false);

  useGSAP(
    () => {
      if (!ENABLE_INTRO_ANIMATION) return;

      if (!introVideosLoaded) return;

      gsap.to(".gsap-splashscreen-container", {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(".gsap-splashscreen-container", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 3,
      });

      gsap.to(".gsap-content-container", {
        opacity: 1,
        duration: 1,
        ease: "power2.in",
        delay: 3,
      });
    },
    {
      dependencies: [introVideosLoaded],
    },
  );

  const mainPageContent = (
    <>
      <Header />
      <main
        className={clsx(
          "relative",
          i18n.language === "en" ? "font-sans" : "font-noto",
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <HeadProvider>
        <Link
          rel="apple-touch-icon"
          sizes="57x57"
          href={faviconAppleIcon57x57}
        />
        <Link
          rel="apple-touch-icon"
          sizes="60x60"
          href={faviconAppleIcon60x60}
        />
        <Link
          rel="apple-touch-icon"
          sizes="72x72"
          href={faviconAppleIcon72x72}
        />
        <Link
          rel="apple-touch-icon"
          sizes="76x76"
          href={faviconAppleIcon76x76}
        />
        <Link
          rel="apple-touch-icon"
          sizes="114x114"
          href={faviconAppleIcon114x114}
        />
        <Link
          rel="apple-touch-icon"
          sizes="120x120"
          href={faviconAppleIcon120x120}
        />
        <Link
          rel="apple-touch-icon"
          sizes="144x144"
          href={faviconAppleIcon144x144}
        />
        <Link
          rel="apple-touch-icon"
          sizes="152x152"
          href={faviconAppleIcon152x152}
        />
        <Link
          rel="apple-touch-icon"
          sizes="180x180"
          href={faviconAppleIcon180x180}
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={faviconAndroid192x192}
        />
        <Link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
        <Link rel="icon" type="image/png" sizes="96x96" href={favicon96x96} />
        <Link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
        <Meta name="msapplication-TileColor" content="#ffffff" />
        <Meta name="msapplication-TileImage" content={msIcon144x144} />
        <Meta name="theme-color" content="#ffffff" />
      </HeadProvider>
      {ENABLE_INTRO_ANIMATION && (
        <div style={{ opacity: 0 }} className="gsap-splashscreen-container">
          <IntroSplashScreen onVideoLoaded={() => setIntroVideosLoaded(true)} />
        </div>
      )}
      {ENABLE_INTRO_ANIMATION ? (
        <div style={{ opacity: 0 }} className="gsap-content-container">
          {mainPageContent}
        </div>
      ) : (
        mainPageContent
      )}
      <FeedbackModal />
    </>
  );
};

export default Layout;
