import React from "react";
import { Routes, Route } from "react-router-dom";

import { Page } from "@src/MainController";
import Homepage from "./Homepage";
import Account from "./Account";
import Project from "./Project";
import Reports from "./Reports";
import FAQ from "./FAQ";
import AccountProject from "./AccountProject";
import ProtectedRoute from "@src/pages/ProtectedRoute";

const PageCoordinator: React.FC = () => {

  return (
    <Routes>
      <Route path={Page.Homepage} element={<Homepage />} />
      <Route path={Page.Project} element={<Project />} />
      <Route path={Page.Reports} element={<Reports />} />
      <Route path={Page.FAQ} element={<FAQ />} />
      <Route
        element={
          <ProtectedRoute/>
        }
      >
        <Route path={Page.Account} element={<Account />} />
        <Route path={Page.AccountProject} element={<AccountProject />} />
      </Route>
      <Route element={<div>There was something wrong...</div>} />
    </Routes>
  );
};

export default PageCoordinator;
