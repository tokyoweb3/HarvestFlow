import { useContext, useEffect, useState } from "react";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { NftContract } from "@harvest-flow/utils";

/**
 * This whitelist should be in the backend in the future, but for now it's in the frontend
 */
const frontendWhitelist = [
  // testnet NFT
  "0x303117a03305b1c67a62eeef04fb096d9b67af9f".toLowerCase(),
  // localhost NFT (old)
  "0xCafac3dD18aC6c6e92c921884f9E4176737C052c".toLowerCase(),
  // localhost NFT (new)
  "0x1FD90814e46bc3f62EC9A6E3e672b6Ed8d87BA31".toLowerCase(),
];
export const useProjects = () => {
  const mainController: MainController = useContext(AppContext);
  const [projects, setProjects] = useState<NftContract[]>([]);

  useEffect(() => {
    mainController.getAllNft(false).then((projects) => {
      const filteredProjects: NftContract[] = [];
      for (const project of projects) {
        if (!frontendWhitelist.includes(project.address.toLowerCase())) {
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
