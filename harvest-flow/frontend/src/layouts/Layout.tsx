import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Header from "@src/components/Header";
import FeedbackModal from "@src/components/FeedbackModal";
import Footer from "@src/components/Footer";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  return (
    <>
      <Header />
      <main className="relative">{children}</main>
      <FeedbackModal />
      <Footer />
    </>
  );
};

export default Layout;
