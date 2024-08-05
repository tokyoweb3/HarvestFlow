import React from "react";
import { WalletMode } from "@paima/providers";
import type { LoginInfo } from "@paima/sdk/mw-core";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { middleEllipsis } from "@src/utils";
import { Page } from "@src/MainController";
import { useSession } from "@src/utils/useSession";

const ConnectWalletButton: React.FC = () => {
  const { userSession, initializeSession } = useSession();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // TODO: if you want the user to pick the wallet, see `getWalletOptions`
  // https://docs.paimastudios.com/home/multichain-support/wallet-layer/introduction
  const loginInfo: LoginInfo = {
    mode: WalletMode.EvmInjected,
    preferBatchedMode: false,
  };

  return (
    <div>
      {userSession != null ? (
        <div
          className="text-heading5 desktop:text-header font-medium text-black uppercase p-4 hover:cursor-pointer"
          onClick={() => {
            navigate(Page.Account);
          }}
        >
          {" "}
          {middleEllipsis(userSession.walletAddress)}
        </div>
      ) : (
        <button
          onClick={() => {
            void initializeSession(loginInfo, i18n.language);
          }}
          className="text-heading5 desktop:text-header font-medium text-black uppercase p-4 hover:cursor-pointer"
        >
          {t("general.connect_wallet")}
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
