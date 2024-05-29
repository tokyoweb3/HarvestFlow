import React from "react";
import { Page } from "@src/MainController";
import Account from "./Account";
import Project from "./Project";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import DummyProjectList from "@src/components/DummyProjectList";
import OwnedNft from "@src/components/OwnedNft";
import Reports from "./Reports";

const PageCoordinator: React.FC = () => {
  return (
    <Routes>
      <Route path={Page.Homepage} element={<Homepage />} />
      <Route path={Page.Account} element={<Account />} />
      <Route path={Page.Project} element={<Project />} />
      <Route path="nft" element={<OwnedNft />} />
      <Route path="*" element={<DummyProjectList/>} />
      <Route path={Page.Reports} element={<Reports />} />
    </Routes>
  );
};

export default PageCoordinator;
