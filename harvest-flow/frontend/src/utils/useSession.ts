import React, { useContext, useEffect } from 'react';
import { AppContext } from "@src/main";
import type MainController from "@src/MainController";
import type { LoginInfo, Wallet } from '@paima/sdk/mw-core';

export const useSession = () => {
  const controller: MainController = useContext(AppContext);
  const [isConnectingWallet, setIsConnectingWallet] = React.useState<boolean>(true);
  const [connectedWallet, setConnectedWallet] = React.useState<Wallet | null>(controller.connectedWallet);
  const [connectWalletError, setConnectWalletError] = React.useState<string | null>(controller.connectWalletError);

  if (!controller) {
    throw new Error('useSession must be used within AppContext.Provider');
  }

  useEffect(() => {
    setIsConnectingWallet(true);
    const tryReconnect = async () => {
      try {
        if (controller.connectedWallet == null) {
          await controller.tryReconnect();
          setConnectedWallet(controller.connectedWallet);
          setConnectWalletError(controller.connectWalletError);
        }
      } finally {
        setIsConnectingWallet(false);
      }
    }
    void tryReconnect();
  }, [controller]);

  const initializeSession = React.useCallback(async (loginInfo: LoginInfo, locale?: string) => {
    try {
      setIsConnectingWallet(true);
      await controller.connectWallet(loginInfo, locale);
      setConnectedWallet(controller.connectedWallet);
      setConnectWalletError(controller.connectWalletError);
    } finally {
      setIsConnectingWallet(false);
    }
  }, [controller]);

  const disconnectSession = React.useCallback(() => {
    controller.disconnect();
    setConnectedWallet(null);
    setConnectWalletError(null);
  }, [controller]);

  return {
    userSession: connectedWallet,
    isInitialized: connectedWallet != null,
    initializationError: connectWalletError,
    isInitializing: isConnectingWallet,
    initializeSession: initializeSession,
    disconnectSession,
  };
};