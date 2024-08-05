import React from "react";
import { WalletMode } from "@paima/providers";
import type { LoginInfo } from "@paima/sdk/mw-core";
import { useTranslation } from "react-i18next";

import { useSession } from "@src/utils/useSession";

const MobileConnectWalletButton: React.FC = () => {
  const { isInitialized, initializeSession } = useSession();
  const { t, i18n } = useTranslation();

  // TODO: if you want the user to pick the wallet, see `getWalletOptions`
  // https://docs.paimastudios.com/home/multichain-support/wallet-layer/introduction
  const loginInfo: LoginInfo = {
    mode: WalletMode.EvmInjected,
    preferBatchedMode: false,
  };

  if (isInitialized) return null;

  return (
    <button
      onClick={() => {
        void initializeSession(loginInfo, i18n.language)
      }}
      className="absolute left-[10vw] right-[10vw] top-16 w-[80vw] flex items-center justify-center uppercase text-bodySmaller_13_15 bg-white px-4 py-[14px] header-connect-wallet-button font-medium desktop:hidden"
    >
      {t("general.connect_wallet")}
    </button>
  );
};

export default MobileConnectWalletButton;
