import React from "react";
import { AppContext } from "@src/main";
import { useContext } from "react";
import type MainController from "@src/MainController";
import { Page } from "@src/MainController";
import { WalletMode } from "@paima/providers";
import { middleEllipsis } from "@src/utils";
import type { LoginInfo } from "@paima/sdk/mw-core";
import { useNavigate } from "react-router-dom";

const ConnectWalletButton: React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  const [userAddress, setUserAddress] = React.useState<string | null>(
    mainController.userAddress,
  );
  const navigate = useNavigate();

  const loginInfo: LoginInfo = {
    mode: WalletMode.EvmInjected,
    preferBatchedMode: false,
  };

  return (
    <div>
      {mainController.isWalletConnected() && userAddress ? (
        <div
          className="text-heading5 desktop:text-header font-medium text-black uppercase p-4 hover:cursor-pointer"
          onClick={() => {
            navigate(Page.Account);
          }}
        >
          {" "}
          {middleEllipsis(userAddress)}
        </div>
      ) : (
        <button
          onClick={() => {
            mainController.connectWallet(loginInfo).then((result) => {
              setUserAddress(result);
            });
          }}
          className="text-heading5 desktop:text-header font-medium text-black uppercase p-4 hover:cursor-pointer"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
