import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "@src/main";
import type MainController from "@src/MainController";

const FeedbackModal: React.FC = () => {
  const mainController: MainController = useContext(AppContext);

  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    mainController.callback = (
      loadingMessage: string | null,
      successMessage: string | null,
      errorMessage: string | null,
    ) => {
      // Update the local state and show a message to the user
      setLoadingMessage(loadingMessage);
      setSuccessMessage(successMessage);
      setErrorMessage(errorMessage);
    };
  }, []);

  useEffect(() => {
    if (loadingMessage || successMessage || errorMessage) {
      setVisible(true);

      if (!loadingMessage) {
        // close after 3 seconds if not loading
        setTimeout(() => {
          setVisible(false);
        }, 3000);
      }
    }
  }, [loadingMessage, successMessage, errorMessage]);

  if (!visible) return null;

  return (
    <div className="fixed w-screen h-10 bottom-0 right-0 z-[100] p-1 bg-secondary text-white text-caption desktop:text-body text-center flex items-center justify-center uppercase animate-fade">
      <p>{loadingMessage}</p>
      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default FeedbackModal;
