import React, { useContext } from "react";
import { Page } from "@src/MainController";
import Account from "./Account";
import Project from "./Project";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import DummyProjectList from "@src/components/DummyProjectList";
import OwnedNft from "@src/components/OwnedNft";

const PageCoordinator: React.FC = () => {
    return (
        <Box>
            <Routes>
                <Route path={Page.Account} element={<Account />} />
                <Route path="nft" element={<OwnedNft />} />
                <Route path={Page.Project} element={<Project />} />
                <Route path="*" element={<DummyProjectList/>} />
            </Routes>
        </Box>
    );
};

export default PageCoordinator;