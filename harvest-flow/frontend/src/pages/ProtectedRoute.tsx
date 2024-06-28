import React, { useContext } from "react";
import MainController, { Page } from "@src/MainController";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "@src/main";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const mainController: MainController = useContext(AppContext);

  if (!mainController.isWalletConnected()) {
    return <Navigate to={Page.Homepage} />;
  }

  return children ? <>{ children }</> : <Outlet />;
};

export default ProtectedRoute;