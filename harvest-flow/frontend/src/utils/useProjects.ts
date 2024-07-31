import { useContext, useEffect, useState } from "react";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { NftContract } from "@harvest-flow/utils";

/**
 * This whitelist should be in the backend in the future, but for now it's in the frontend
 */
const frontendWhitelist = [
  '0x303117a03305b1c67a62eeef04fb096d9b67af9f'
];
export const useProjects = () => {
  const mainController: MainController = useContext(AppContext);
  const [projects, setProjects] = useState<NftContract[]>([]);

  useEffect(() => {
    mainController.getAllNft(false).then((projects) => {
      const filteredProjects: NftContract[] = [];
      for (const project of projects) {
        if (!frontendWhitelist.includes(project.address)) {
          console.log(`Filtered NFT ${project.address}`);
          continue;
        }
        filteredProjects.push(project);
      }
      setProjects(filteredProjects);
    });
  }, []);

  return projects;
};
