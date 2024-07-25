import React, { useContext, useEffect, useState } from "react";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { NftContractDetails } from "@harvest-flow/utils";
import {
  calculateTotalRewards,
  formatTime,
  formatTimeReturnJSONValues,
} from "@src/utils";
import { ethers } from "ethers";
import MintedModal from "@src/components/MintedModal";
import { useTranslation } from "react-i18next";

const TotalSupplyProgressBar: React.FC<{
  totalSupply: number;
  currentSupply: number;
}> = ({ totalSupply, currentSupply }) => {
  const { t } = useTranslation();

  const percentage = (currentSupply / totalSupply) * 100;
  const roundedPercentage = Math.round(percentage);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-caption font-medium">{t("project.total_supply")}</p>
        <p className="text-caption">
          <span className="font-medium">{roundedPercentage}%</span> (
          {currentSupply}/{totalSupply})
        </p>
      </div>
      <div className="relative w-full h-5 border border-black">
        <div
          className="absolute top-0 left-0 bottom-0 bg-grey"
          style={{ width: `${roundedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface AmountInputProps {
  amount: number;
  maxAmount?: number;
  setAmount: (amount: number) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  maxAmount,
  setAmount,
}) => {
  return (
    <div className="pb-2">
      <div className="border border-black flex divide-x divide-black">
        <button
          className="p-1 w-6 h-6 flex items-center justify-center"
          onClick={() => {
            if (amount > 0) {
              setAmount(amount - 1);
            }
          }}
        >
          —
        </button>
        <div className="p-1 h-6 flex items-center justify-center flex-1 min-w-[80px]">
          <p>{amount}</p>
        </div>
        <button
          className="p-1 w-6 h-6 flex items-center justify-center"
          onClick={() => {
            if (maxAmount && amount < maxAmount) {
              setAmount(amount + 1);
            } else if (!maxAmount) {
              setAmount(amount + 1);
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export interface ProjectMintPanelProps {
  projectContractDetails: NftContractDetails;
  refreshData: () => void;
}

const ProjectMintPanel: React.FC<ProjectMintPanelProps> = ({
  projectContractDetails,
  refreshData,
}) => {
  const { t } = useTranslation();

  const mainController: MainController = useContext(AppContext);

  const [amountToBuy, setAmountToBuy] = React.useState<number>(1);
  const [endingIn, setEndingIn] = React.useState<string>(
    t("project.ending_in", { days: 0, hours: 0, minutes: 0, seconds: 0 }),
  );
  const [totalRewards, setTotalRewards] = React.useState<string>("0");

  const [mintModalVisible, setMintModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (projectContractDetails) {
        const now = new Date();
        const ending = new Date(projectContractDetails.leaseEnd);
        const diff = ending.getTime() - now.getTime();

        if (diff < 0) {
          setEndingIn(t('project.ended'));
        } else {
          const timeRemaining = formatTimeReturnJSONValues(diff);
          setEndingIn(t("project.ending_in", timeRemaining));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [projectContractDetails]);

  useEffect(() => {
    if (projectContractDetails) {
      setTotalRewards(
        calculateTotalRewards(projectContractDetails, amountToBuy).toFixed(2),
      );
    }
  }, [projectContractDetails, amountToBuy]);

  const buyNft = (amountToBuy: number) => {
    if (!mainController.isWalletConnected()) {
      console.error("Wallet is not connected");
    }

    mainController
      .buyNft(
        projectContractDetails.address,
        amountToBuy,
        BigInt(projectContractDetails.price),
      )
      .then((success) => {
        if (success) {
          setMintModalVisible(true);
          refreshData();
        }
      });
  };

  return (
    <>
      <div>
        <div className="w-full bg-white border border-black text-black">
          <div className="border-b border-black pt-[16px] pb-[13px] px-6 flex flex-col gap-[4px]">
            <p className="text-bodyLarge desktop:text-body15_18 uppercase font-medium text-center">
              Phase: Allow list
            </p>
            <p className="text-captionMedium text-center">{endingIn}</p>
          </div>
          <div className="pt-[20px] pb-[17px] px-10 border-b border-black flex flex-col gap-[22px]">
            <TotalSupplyProgressBar
              totalSupply={Number(projectContractDetails?.supplyCap) ?? 0}
              currentSupply={Number(projectContractDetails?.mintedAmount) ?? 0}
            />
            <p className="text-center uppercase">
              {t("project.you_can_mint")}: 2 NFTs
            </p>
            <div className="flex justify-center items-end gap-6 px-6">
              <div className="flex flex-col">
                <p className="text-caption font-medium">{t("project.price")}</p>
                <p className="text-heading3_36 font-medium">
                  {!projectContractDetails
                    ? "----"
                    : Number(
                        ethers.utils.formatEther(projectContractDetails.price),
                      ) * amountToBuy}{" "}
                  <span className="text-body">DAI</span>
                </p>
              </div>
              <AmountInput amount={amountToBuy} setAmount={setAmountToBuy} />
            </div>
            <div className="border-t border-b border-black divide-y divide-black divide-dashed">
              <p className="text-center text-body15_18 uppercase py-[6px]">
                {t("project.expected_apr")}:&nbsp;
                <span className="font-medium">
                  {projectContractDetails
                    ? Number(
                        ethers.utils.formatEther(
                          projectContractDetails.minYield,
                        ),
                      ) * 100
                    : "-"}{" "}
                  %
                </span>
              </p>
              <p className="text-center text-body15_18 uppercase py-[6px]">
                {t("project.redemption")}:{" "}
                <span className="font-medium">April, 2027</span>
              </p>
              <p className="text-center text-body15_18 uppercase py-[6px]">
                {t("project.remaining_term")}:{" "}
                <span className="font-medium">24 months</span>
              </p>
            </div>
            <div>
              <p className="text-center uppercase py-3">
                {t("project.total_interest")}{" "}
                <span className="font-medium text-heading3_36">
                  {totalRewards}
                </span>{" "}
                <span className="font-medium">DAI</span>
              </p>
            </div>
          </div>
          <div>
            <button
              className="bg-primary text-black text-body17 desktop:text-heading5 font-medium text-center px-8 py-4 desktop:py-6 uppercase w-full"
              onClick={() => buyNft(amountToBuy)}
            >
              Mint
            </button>
          </div>
        </div>

        <MintedModal
          visible={mintModalVisible}
          onClose={() => setMintModalVisible(false)}
        />
      </div>
    </>
  );
};

export default ProjectMintPanel;
