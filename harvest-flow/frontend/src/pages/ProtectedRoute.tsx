import React from "react";
import { Page } from "@src/MainController";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@src/utils/useSession";
import Layout from "@src/layouts/Layout";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isInitializing, isInitialized } = useSession();

  // TODO: should maybe show some kind of "connecting to wallet" message on the page
  if (isInitializing) return <Layout enableIntroAnimation />
  if (!isInitialized) {
    return <Navigate to={Page.Homepage} />;
  }

  return children ? <>{ children }</> : <Outlet />;
};

export default ProtectedRoute;