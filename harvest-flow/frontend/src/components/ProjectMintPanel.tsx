import React, { useContext, useEffect, useState } from "react";
import type MainController from "@src/MainController";
import { AppContext } from "@src/main";
import type { NftContractDetails } from "@harvest-flow/utils";
import {
  calculateTotalRewards,
  currentPrice,
  formatTime,
  formatTimeReturnJSONValues,
  getMonthDifference,
} from "@src/utils";
import { ethers } from "ethers";
import MintedModal from "@src/components/MintedModal";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

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

function getTokenTicker(addr?: string): string {
  if (addr == null) return ''; // temporary while loading
  return 'DAI'; // TODO: fetch this
}
function getLeaseEndString(leaseEnd?: number): string {
  if (leaseEnd == null) return ''; // it's still loading
  const formattedDate = new Date(leaseEnd).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  return formattedDate;
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
  projectContractDetails: null | NftContractDetails;
  refreshData: () => void;
}

function getPhase(details: NftContractDetails): string {
  // TODO: should any of this be translated?
  if (details == null) return ''; // this will be resolved when loading is done
  const now = new Date().getTime();
  if (now > details.leaseEnd) {
    return "Ended";
  }
  if (now > details.leaseStart) {
    return "Lease ongoing";
  }
  
  if (details.isPublicsale) {
    return "Public Sale"
  }
  if (details.isPresale) {
    return "Allow list";
  }
  // TODO: not sure what to show in this scenario
  // This is when the sale is over, but the lease hasn't started yet
  return "Processing";
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
        
        // TODO: do we want to show a countdown until leaseStart?
        const starting = new Date(projectContractDetails.leaseStart);
        const timeToStart = starting.getTime() - now.getTime();
        if (timeToStart > 0) {
          const timeRemaining = formatTimeReturnJSONValues(timeToStart);
          setEndingIn(t("project.ending_in", timeRemaining));
          return;
        }

        const ending = new Date(projectContractDetails.leaseEnd);
        const timeToEnd = ending.getTime() - now.getTime();

        if (timeToEnd < 0) {
          setEndingIn(t('project.ended'));
          return;
        } else {
          const timeRemaining = formatTimeReturnJSONValues(timeToEnd);
          setEndingIn(t("project.ending_in", timeRemaining));
          return;
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
    if (projectContractDetails == null) return;
    if (!mainController.isWalletConnected()) {
      console.error("Wallet is not connected");
    }

    mainController
      .buyNft(
        projectContractDetails.address,
        amountToBuy,
        BigInt(currentPrice(projectContractDetails)),
      )
      .then((success) => {
        if (success) {
          setMintModalVisible(true);
          refreshData();
        }
      });
  };

  const mintDisabled = projectContractDetails == null || new Date().getTime() > (projectContractDetails?.leaseStart);
  return (
    <>
      <div>
        <div className="w-full bg-white border border-black text-black">
          <div className="border-b border-black pt-[16px] pb-[13px] px-6 flex flex-col gap-[4px]">
            <p className="text-bodyLarge desktop:text-body15_18 uppercase font-medium text-center">
              Phase: {getPhase(projectContractDetails)}
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
                        ethers.utils.formatEther(currentPrice(projectContractDetails)),
                      ) * amountToBuy}{" "}
                  <span className="text-body">{getTokenTicker(projectContractDetails?.accepted_token)}</span>
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
                <span className="font-medium">{getLeaseEndString(projectContractDetails?.leaseEnd)}</span>
              </p>
              <p className="text-center text-body15_18 uppercase py-[6px]">
                {t("project.remaining_term")}:{" "}
                
                <span className="font-medium">{getMonthDifference(
                  projectContractDetails?.leaseStart,
                  projectContractDetails?.leaseEnd,
                )} Months</span>
              </p>
            </div>
            <div>
              <p className="text-center uppercase py-3">
                {t("project.total_interest")}{" "}
                <span className="font-medium text-heading3_36">
                  {totalRewards}
                </span>{" "}
                <span className="font-medium">{getTokenTicker(projectContractDetails?.accepted_token)}</span>
              </p>
            </div>
          </div>
          <div>
            <button
              disabled={mintDisabled}
              className={clsx("bg-primary text-black text-body17 desktop:text-heading5 font-medium text-center px-8 py-4 desktop:py-6 uppercase w-full", mintDisabled ? "hover:cursor-not-allowed" : "hover:cursor-pointer")}
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
