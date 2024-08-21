import React, { useContext, useEffect } from "react";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { NftHistoryEvent } from "@harvest-flow/utils";
import { CHAIN_EXPLORER_URI } from "@src/utils/constants";
import { formatTimestampForHistoryTable, middleEllipsis } from "@src/utils";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";

const ReportsProjectHistorySection: React.FC<{
  projectContractAddress: string;
}> = ({ projectContractAddress }) => {
  const { t } = useTranslation();
  const mainController: MainController = useContext(AppContext);

  const [nftHistory, setNftHistory] = React.useState<NftHistoryEvent[]>([]);

  useEffect(() => {
    mainController
      .getProjectHistory(projectContractAddress)
      .then((response) => {
        if (response.history) {
          setNftHistory(response.history);
        }
      });
  }, [projectContractAddress]);

  // サンプルデータ用
  const generateRandomEventType = () => {
    const eventTypes = ["REPAYMENT", "HARVEST", "MINT"];
    return eventTypes[Math.floor(Math.random() * eventTypes.length)];
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
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now(),
    },
    {
      eventType: generateRandomEventType(),
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000,
    },
    {
      eventType: generateRandomEventType(),
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000 * 2,
    },
    {
      eventType: generateRandomEventType(),
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000 * 3,
    },
    {
      eventType: generateRandomEventType(),
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000 * 4,
    },
    {
      eventType: generateRandomEventType(),
      price: generateRandomBigNumber(),
      transactionHash: generateRandomTransactionHash(),
      timestamp: Date.now() + 86400000 * 5,
    },
  ];

  const displayedData = nftHistory.length > 0 ? nftHistory : sampleData;

  return (
    <div className="flex flex-col gap-[60px] desktop:gap-[114px] pt-[100px] desktop:pt-[150px] desktop:pb-[50px] relative z-10">
      <h2 className="text-center text-heading5SmallerLH28 desktop:text-heading3 font-medium uppercase tracking-[0.35rem]">
        {t("project.history.title")}
      </h2>
      <div className="w-full max-w-[1187px] mx-auto flex flex-col gap-20">
        <div className="overflow-x-scroll">
          <div className="divide-x divide-black">
            <table
              className="font-functionPro w-full border border-black bg-white"
              style={{
                pointerEvents: displayedData === sampleData ? "none" : "auto", // sampleの場合クリック不可
              }}
            >
              <thead>
                <tr className="border-b border-black border-dashed">
                  <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[8px] px-4 border-r border-black last-of-type:border-0">
                    Type
                  </th>
                  <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[8px] px-4 border-r border-black last-of-type:border-0z">
                    Price
                  </th>
                  <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[8px] px-4 border-r border-black last-of-type:border-0">
                    Tx
                  </th>
                  <th className="text-caption desktop:text-body14 uppercase text-center font-normal py-[8px] px-4 border-r border-black last-of-type:border-0">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedData
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-black border-dashed last-of-type:border-0"
                    >
                      <td className="text-body desktop:text-heading5 uppercase text-center py-[20px] px-8 desktop:p-7 border-r border-black last-of-type:border-0 bg-secondary text-white min-w-[55vw] desktop:min-w-[initial]">
                        {row.eventType}
                      </td>
                      <td className="text-body desktop:text-heading5 uppercase text-center py-[20px] px-8 desktop:p-7 border-r border-black last-of-type:border-0">
                        {ethers.utils.formatEther(row.price)} DAI
                      </td>
                      <td className="text-body desktop:text-heading5 uppercase text-center py-[20px] px-8 desktop:p-7 border-r border-black last-of-type:border-0">
                        <a
                          href={`${CHAIN_EXPLORER_URI}/tx/${row.transactionHash}`}
                        >
                          {middleEllipsis(row.transactionHash)}
                        </a>
                      </td>
                      <td className="text-body desktop:text-heading5 uppercase text-center py-[20px] px-8 desktop:p-7 border-r border-black last-of-type:border-0">
                        {formatTimestampForHistoryTable(row.timestamp)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsProjectHistorySection;
