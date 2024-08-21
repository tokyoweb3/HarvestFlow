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

  // サンプルデータ用
  const generateRandomEventType = () => {
    const projectNames = ["REPAYMENT", "HARVEST", "MINT"];
    return projectNames[Math.floor(Math.random() * projectNames.length)];
  };

  const generateRandomBigNumber = () => {
    const randomValue = Math.floor(Math.random() * 1e18).toString();
    return ethers.BigNumber.from(randomValue);
  };

  const generateRandomTransactionHash = () => {
    return (
      "0x" +
      Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join("")
    );
  };

  const sampleData = [
    {
      eventType: generateRandomEventType(),
      projectName: "SAMPLE",
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now(),
    },
    {
      eventType: generateRandomEventType(),
      projectName: "SAMPLE",
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000,
    },
    {
      eventType: generateRandomEventType(),
      projectName: "SAMPLE",
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000 * 2,
    },
    {
      eventType: generateRandomEventType(),
      projectName: "SAMPLE",
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000 * 3,
    },
    {
      eventType: generateRandomEventType(),
      projectName: "SAMPLE",
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000 * 4,
    },
    {
      eventType: generateRandomEventType(),
      projectName: "SAMPLE",
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000 * 5,
    },
  ];

  const displayedData = nftHistory.length > 0 ? nftHistory : sampleData;

  return (
    <div className="flex flex-col gap-[60px]">
      <h2 className="text-heading5Larger desktop:text-heading4_30_30 text-center uppercase font-medium tracking-[0.35rem]">
        {t("account.project_history")}
      </h2>
      <div className="font-functionPro w-full divide-x divide-black bg-white overflow-x-scroll desktop:overflow-x-auto">
        <table className="w-full border border-black">
          <thead>
            <tr className="border-b border-black border-dashed">
              <th className="text-caption uppercase text-center font-normal py-[10px] border-r border-black last-of-type:border-0">
                Type
              </th>
              <th className="text-caption uppercase text-center font-normal py-[10px] border-r border-black last-of-type:border-0">
                Price
              </th>
              <th className="text-caption uppercase text-center font-normal py-[10px] border-r border-black last-of-type:border-0">
                Project
              </th>
              <th className="text-caption uppercase text-center font-normal py-[10px] border-r border-black last-of-type:border-0">
                Tx
              </th>
              <th className="text-caption uppercase text-center font-normal py-[10px] border-r border-black last-of-type:border-0">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((row, index) => (
                <tr
                  className="border-b border-black border-dashed last-of-type:border-0"
                  key={index}
                >
                  <td className="text-body desktop:text-body15 uppercase text-center py-[12px] desktop:py-[26px] border-r border-black last-of-type:border-0 bg-secondary text-white min-w-[40vw] desktop:min-w-[initial]">
                    {row.eventType}
                  </td>
                  <td className="text-body desktop:text-body15 uppercase text-center py-[12px] desktop:py-[26px] border-r border-black last-of-type:border-0">
                    {ethers.utils.formatEther(row.price)} DAI
                  </td>
                  <td className="text-body desktop:text-body15 uppercase text-center py-[12px] desktop:py-[26px] border-r border-black last-of-type:border-0 whitespace-nowrap desktop:whitespace-normal">
                    {row.projectName}
                  </td>
                  <td className="text-body desktop:text-body15 uppercase text-center py-[12px] desktop:py-[26px] border-r border-black last-of-type:border-0">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`${CHAIN_EXPLORER_URI}/tx/${row.transactionHash}`}
                    >
                      {middleEllipsis(row.transactionHash)}
                    </a>
                  </td>
                  <td className="text-body desktop:text-body15 uppercase text-center py-[12px] desktop:py-[26px] border-r border-black last-of-type:border-0">
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
