import React, { useContext, useEffect } from "react";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { NftHistoryEvent } from "@harvest-flow/utils";
import { CHAIN_EXPLORER_URI } from "@src/utils/constants";
import { formatTimestampForHistoryTable, middleEllipsis } from "@src/utils";
import { ethers } from "ethers/lib";
import { useTranslation } from "react-i18next";

const AccountProjectHistorySection: React.FC = () => {
  const { t } = useTranslation();

  const mainController: MainController = useContext(AppContext);

  const [nftHistory, setNftHistory] = React.useState<NftHistoryEvent[]>([]);

  useEffect(() => {
    mainController.getNftHistoryForUser().then((response) => {
      if (response.history) {
        setNftHistory(response.history);
      }
    });
  }, [mainController]);
  return (
    <div className="flex flex-col gap-[60px]">
      <h2 className="text-bodyLarge desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        {t("account.project_history")}
      </h2>
      <div className="w-full divide-x divide-black bg-white">
        <table className="w-full border border-black">
          <thead>
            <tr className="border-b border-black border-dashed">
              <th className="text-caption uppercase text-center font-normal px-4 py-[10px] border-r border-black last-of-type:border-0 w-1/4">
                Type
              </th>
              <th className="text-caption uppercase text-center font-normal px-4 py-[10px] border-r border-black last-of-type:border-0 w-1/4">
                Price
              </th>
              <th className="text-caption uppercase text-center font-normal px-4 py-[10px] border-r border-black last-of-type:border-0 w-1/4">
                Project
              </th>
              <th className="text-caption uppercase text-center font-normal px-4 py-[10px] border-r border-black last-of-type:border-0 w-1/4">
                Tx
              </th>
              <th className="text-caption uppercase text-center font-normal px-4 py-[10px] border-r border-black last-of-type:border-0 w-1/4">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {nftHistory
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((row, index) => (
                <tr
                  className="border-b border-black border-dashed last-of-type:border-0"
                  key={index}
                >
                  <td className="text-body desktop:text-body17 uppercase text-center px-8 py-[26px] border-r border-black last-of-type:border-0 bg-secondary text-white w-1/4">
                    {row.eventType}
                  </td>
                  <td className="text-body desktop:text-body17 uppercase text-center px-8 py-[26px] border-r border-black last-of-type:border-0 w-1/4">
                    {ethers.utils.formatEther(row.price)} DAI
                  </td>
                  <td className="text-body desktop:text-body17 uppercase text-center px-8 py-[26px] border-r border-black last-of-type:border-0 w-1/4">
                    {row.projectName}
                  </td>
                  <td className="text-body desktop:text-body17 uppercase text-center px-8 py-[26px] border-r border-black last-of-type:border-0 w-1/4">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`${CHAIN_EXPLORER_URI}/tx/${row.transactionHash}`}
                    >
                      {middleEllipsis(row.transactionHash)}
                    </a>
                  </td>
                  <td className="text-body desktop:text-body17 uppercase text-center px-8 py-[26px] border-r border-black last-of-type:border-0 w-1/4">
                    {formatTimestampForHistoryTable(row.timestamp)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountProjectHistorySection;
