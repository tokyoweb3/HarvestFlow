import { useContext, useEffect, useState } from "react";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { NftContract } from "@harvest-flow/utils";

export const useProjects = () => {
  const mainController: MainController = useContext(AppContext);
  const [projects, setProjects] = useState<NftContract[]>([]);

  useEffect(() => {
    mainController.getAllNft(false).then((projects) => {
      setProjects(projects);
    });
  }, []);

  return projects;
};
