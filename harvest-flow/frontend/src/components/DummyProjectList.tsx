import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import { NftContract } from "@harvest-flow/utils";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DummyProjectList: React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  const [projects, setProjects] = useState<NftContract[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    mainController.getAllNft(false).then((projects) => {
      setProjects(projects);
    });
  });

  return (
    <>
      <h1>Projects</h1>
      {/* {projects.map((project) => (
        <div key={project.address}>
          <span
            onClick={() => {
              navigate(`project?address=${project.address}`);
            }}
          >{project.name}</span>
        </div>
      ))} */}
    </>
  );
};

export default DummyProjectList;
