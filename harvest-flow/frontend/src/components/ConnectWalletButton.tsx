import React from "react";
import {AppContext} from "@src/main";
import {useContext} from "react";
import MainController, {Page} from "@src/MainController";
import { WalletMode } from '@paima/providers';
import {middleEllipsis} from "@src/utils";
import {LoginInfo} from "@paima/sdk/mw-core";
import {useNavigate} from "react-router-dom";


const ConnectWalletButton: React.FC = () => {
    const mainController: MainController = useContext(AppContext);
    const [userAddress, setUserAddress] = React.useState<string | null>(mainController.userAddress);
    const navigate = useNavigate();

    const loginInfo : LoginInfo = {
        mode: WalletMode.EvmInjected,
        preferBatchedMode: false,
    };

    return (
        <div>
            { mainController.isWalletConnected() ? (
                    <div
                        onClick={() => {navigate(Page.Account)}}
                    > {middleEllipsis(userAddress)}</div>
                ) : (
                    <button onClick={() => {
                        mainController.connectWallet(loginInfo).then((result) => {
                            setUserAddress(result);
                        });
                    }}>Connect Wallet</button>
                )
            }
        </div>
    );
}

export default ConnectWalletButton;