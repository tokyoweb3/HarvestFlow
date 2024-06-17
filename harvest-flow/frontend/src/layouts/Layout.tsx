import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Header from "@src/components/Header";
import FeedbackModal from "@src/components/FeedbackModal";
import Footer from "@src/components/Footer";
import IntroSplashScreen from "@src/components/IntroSplashScreen";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  useGSAP(() => {
    gsap.to(".gsap-splashscreen-container", {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(".gsap-splashscreen-container", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 5,
    });

    gsap.to(".gsap-content-container", {
      opacity: 1,
      duration: 1,
      ease: "power2.in",
      delay: 5,
    });
  }, {});

  return (
    <>
      <div style={{ opacity: 0 }} className="gsap-splashscreen-container">
        <IntroSplashScreen />
      </div>
      <div style={{ opacity: 0 }} className="gsap-content-container">
        <Header />
        <main className="relative">{children}</main>
        <Footer />
      </div>
      <FeedbackModal />
    </>
  );
};

export default Layout;
