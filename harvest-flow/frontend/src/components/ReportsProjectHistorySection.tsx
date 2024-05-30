import React, { useContext, useEffect } from "react";
import MainController from "@src/MainController";
import { AppContext } from "@src/main";
import { NftHistoryEvent } from "@harvest-flow/utils";
import { CHAIN_EXPLORER_URI } from "@src/utils/constants";
import { formatTimestampForHistoryTable, middleEllipsis } from "@src/utils";
import { ethers } from "ethers";

const ReportsProjectHistorySection: React.FC<{projectContractAddress: string}> = ({projectContractAddress}) => {

  const mainController: MainController = useContext(AppContext);

  const [nftHistory, setNftHistory] = React.useState<NftHistoryEvent[]>([]);

  useEffect(() => {
      mainController.getProjectHistory(projectContractAddress).then((response) => {
        if (response.history) {
          setNftHistory(response.history);
        }
      });
  },[projectContractAddress]);

  return (
    <div className="flex flex-col gap-32 py-44">
      <h2 className="text-center text-heading2 font-medium uppercase">
        Project history
      </h2>
      <div className="w-full max-w-[1187px] mx-auto flex flex-col gap-20">
        <div className="w-full border border-black divide-x divide-black">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black border-dashed">
                <th className="uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0 w-1/4">
                  Type
                </th>
                <th className="uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0 w-1/4">
                  Price
                </th>
                <th className="uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0 w-1/4">
                  Tx
                </th>
                <th className="uppercase text-center font-normal p-4 border-r border-black last-of-type:border-0 w-1/4">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {nftHistory.sort((a, b) => b.timestamp - a.timestamp)
                .map((row, index) => (
                  <tr key={index} className="border-b border-black border-dashed last-of-type:border-0">
                    <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 bg-secondary text-white w-1/4">
                      {row.eventType}
                    </td>
                    <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                      {ethers.utils.formatEther(row.price)}
                    </td>
                    <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                      <a href={`${CHAIN_EXPLORER_URI}/tx/${row.transactionHash}`}>{middleEllipsis(row.transactionHash)}</a>
                    </td>
                    <td className="text-heading5 uppercase text-center p-8 border-r border-black last-of-type:border-0 w-1/4">
                      {formatTimestampForHistoryTable(row.timestamp)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsProjectHistorySection;
