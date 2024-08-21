import React, { useState } from "react";
import { WalletMode } from "@paima/providers";
import type { LoginInfo } from "@paima/sdk/mw-core";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { middleEllipsis } from "@src/utils";
import { Page } from "@src/MainController";
import { useSession } from "@src/utils/useSession";

const ConnectWalletButton: React.FC = () => {
  const { userSession, initializeSession, disconnectSession, isInitializing } =
    useSession();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // TODO: if you want the user to pick the wallet, see `getWalletOptions`
  // https://docs.paimastudios.com/home/multichain-support/wallet-layer/introduction
  const loginInfo: LoginInfo = {
    mode: WalletMode.EvmInjected,
    preferBatchedMode: false,
  };

  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsHovered(false), 100);
    setTimeoutId(id);
  };

  const handleLogin = async () => {
    if (!isInitializing) {
      try {
        await initializeSession(loginInfo, i18n.language);
      } catch (error) {
        console.error("Initialization failed:", error);
      }
    }
  };

  const handleDisconnect = () => {
    disconnectSession();
  };

  return (
    <div>
      {userSession != null ? (
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="text-heading5 desktop:text-header font-medium text-black uppercase p-4 px-8 hover:cursor-pointer"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(Page.Account);
            }}
          >
            {middleEllipsis(userSession.walletAddress)}
          </div>

          {isHovered && (
            <div className="bg-white absolute top-14 w-full">
              <button
                className="text-heading5 desktop:text-header font-medium text-black uppercase py-4 hover:cursor-pointer w-full"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(Page.Account);
                }}
              >
                {t("general.connect_wallet_account")}
              </button>
              <button
                className="border-t-[1px] border-black text-heading5 desktop:text-header font-medium text-black uppercase py-4 hover:cursor-pointer w-full"
                onClick={() => {
                  handleDisconnect();
                }}
              >
                {t("general.disconnect_wallet")}
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="text-heading5 desktop:text-header font-medium text-black uppercase p-4 hover:cursor-pointer"
        >
          {t("general.connect_wallet")}
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
