import React from "react";
import { AppContext } from "@src/main";
import { useContext } from "react";
import { WalletMode } from "@paima/providers";
import type { LoginInfo } from "@paima/sdk/mw-core";
import { useTranslation } from "react-i18next";

import type MainController from "@src/MainController";

const MobileConnectWalletButton: React.FC = () => {
  const mainController: MainController = useContext(AppContext);
  const [userAddress, setUserAddress] = React.useState<string | null>(
    mainController.userAddress,
  );
  const { t, i18n } = useTranslation();

  const loginInfo: LoginInfo = {
    mode: WalletMode.EvmInjected,
    preferBatchedMode: false,
  };

  if (mainController.isWalletConnected() && userAddress) return null;

  return (
    <button
      onClick={() => {
        mainController
          .connectWallet(loginInfo, i18n.language)
          .then((result) => {
            setUserAddress(result);
          });
      }}
      className="absolute left-[10vw] right-[10vw] top-20 w-[80vw] flex items-center justify-center uppercase text-body bg-white p-4 header-connect-wallet-button font-medium desktop:hidden"
    >
      {t("general.connect_wallet")}
    </button>
  );
};

export default MobileConnectWalletButton;
