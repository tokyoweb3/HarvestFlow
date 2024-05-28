import React, { useContext } from "react";
import type MainController from "@src/MainController";
import { Page } from "@src/MainController";
import Account from "./Account";
import Project from "./Project";
import { Box } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppContext } from "@src/main";
import DummyProjectList from "@src/components/DummyProjectList";

const PageCoordinator: React.FC = () => {
    return (
        <Box>
            <Routes>
                <Route path={Page.Account} element={<Account />} />
                <Route path={Page.Project} element={<Project />} />
                <Route path="*" element={<DummyProjectList/>} />
            </Routes>
        </Box>
    );
};

export default PageCoordinator;