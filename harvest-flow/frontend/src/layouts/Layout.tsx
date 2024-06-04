import React from "react";
import Header from "@src/components/Header";
import FeedbackModal from "@src/components/FeedbackModal";
import Footer from "@src/components/Footer";

type LayoutProps = {
  children?: React.ReactNode;
  overlayingFooter?: boolean;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  overlayingFooter = false,
}) => {
  return (
    <>
      <Header />
      <main className="relative">{children}</main>
      <FeedbackModal />
      <Footer overlayingFooter={overlayingFooter} />
    </>
  );
};

export default Layout;
