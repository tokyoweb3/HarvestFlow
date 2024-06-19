import React from "react";
import Headroom from "react-headroom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import ConnectWalletButton from "@src/components/ConnectWalletButton";
import MobileVideoBackground from "./MobileVideoBackground";
import { ApasPortLogo } from "./Footer";
import CloseIcon from "@src/icons/CloseIcon";
import { APAS_PORT_LINK, DISCORD_LINK, TWITTER_LINK } from "@src/utils/links";

import Logo from "../../assets/images/logo.svg";
import MobileMenuLogo from "../../assets/images/mobile-menu-logo.svg";

const DiscordIcon: React.FC = () => (
  <svg
    width="24"
    height="16"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.6018 2.00029C17.7662 -0.0569234 15.0684 0.000310432 15.0684 0.000310432L14.7927 0.304947C18.1403 1.29547 19.6959 2.72403 19.6959 2.72403C17.6482 1.63827 15.6394 1.105 13.7688 0.895448C12.4461 0.754424 11.1108 0.767244 9.79106 0.933451C9.67288 0.933451 9.57442 0.952529 9.45639 0.971607C8.76718 1.02884 7.09323 1.2764 4.98616 2.17169C4.26902 2.49037 3.8381 2.71686 3.82485 2.72388C3.85025 2.70053 5.4865 1.21123 9.00339 0.228788L8.80647 0.000157808C8.80647 0.000157808 6.10865 -0.0569234 3.27307 2.00014C3.27307 2.00014 0.4375 6.97155 0.4375 13.1049C0.4375 13.1049 2.09141 15.8668 6.44347 16C6.44347 16 7.17212 15.143 7.76272 14.419C5.26197 13.6954 4.31667 12.1716 4.31667 12.1716C4.31667 12.1716 4.51374 12.3048 4.86813 12.4953C4.8877 12.5144 4.90758 12.5335 4.94687 12.5524C5.00588 12.5905 5.06505 12.6096 5.12406 12.6478C5.61635 12.9144 6.10865 13.1238 6.56165 13.2954C7.36888 13.6 8.33375 13.9048 9.45639 14.1143C10.9331 14.381 12.6661 14.4762 14.5565 14.1334C15.4819 13.9809 16.4272 13.7143 17.4116 13.3143C18.1009 13.0669 18.869 12.7049 19.6764 12.1905C19.6764 12.1905 18.6918 13.7523 16.1121 14.4571C16.6981 15.1752 17.4001 15.9869 17.4116 16C21.7635 15.8668 23.4375 13.1049 23.4375 13.1049C23.4375 6.97155 20.6018 2.00029 20.6018 2.00029ZM10.2636 9.21908C10.2636 10.381 9.37766 11.3334 8.25501 11.3334C7.13236 11.3334 6.24671 10.381 6.24671 9.21908C6.24671 8.05716 7.13268 7.10494 8.25501 7.10494H8.25517C9.37766 7.10494 10.2833 8.05731 10.2636 9.21908ZM15.4426 11.3334C14.3399 11.3334 13.434 10.381 13.434 9.21908C13.434 8.05716 14.3201 7.10494 15.4426 7.10494C16.5651 7.10494 17.4511 8.05731 17.4511 9.21908C17.4511 10.3809 16.565 11.3334 15.4426 11.3334Z"
      fill="black"
    />
  </svg>
);

const XIcon: React.FC = () => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.0274 7.62171L17.9254 0H16.2908L10.3013 6.61792L5.51755 0H0L7.23398 10.0074L0 18H1.63474L7.95986 11.0113L13.0119 18H18.5294L11.0272 7.62171H11.0277H11.0274ZM8.78843 10.0956L8.05544 9.09915L2.22367 1.16965H4.73438L9.44081 7.56887L10.1738 8.56533L16.2915 16.8833H13.7808L8.78858 10.0957V10.0953L8.78843 10.0956Z"
      fill="black"
    />
  </svg>
);

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { i18n } = useTranslation();

  return (
    <>
      <Headroom disableInlineStyles>
        <header className="flex border-b border-t border-black bg-white z-20 relative">
          <a
            href="/"
            className="flex-1 shrink-0 px-4 py-3 desktop:py-4 desktop:px-10"
          >
            <img
              src={Logo}
              alt="Harvestflow logo"
              className="max-w-[140px] desktop:max-w-[187px] w-full"
            />
          </a>
          <div className="hidden desktop:flex border-l border-r border-black divide-x divide-black">
            <a
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center p-4 hover:cursor-pointer"
            >
              <XIcon />
            </a>
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center p-4 hover:cursor-pointer"
            >
              <DiscordIcon />
            </a>
          </div>
          <div className="hidden desktop:flex items-center justify-center border-r border-black">
            <ConnectWalletButton />
          </div>
          <div className="hidden desktop:flex items-center justify-center p-4">
            <p
              className="text-header font-medium text-black uppercase"
              role="button"
              onClick={() => {
                if (i18n.language === "en") {
                  i18n.changeLanguage("jp");
                } else {
                  i18n.changeLanguage("en");
                }
              }}
            >
              {i18n.language === "en" ? "Japanese" : "English"}
            </p>
          </div>
          <button
            className="flex flex-col justify-center gap-1 border-l border-black p-4 desktop:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <div className="w-4 border-t border-black" />
            <div className="w-4 border-t border-black" />
            <div className="w-2 border-t border-black" />
          </button>
        </header>
      </Headroom>
      <div
        className={clsx(
          "fixed left-0 right-0 top-0 bottom-0 w-screen h-screen flex flex-col",
          menuOpen ? "block z-20" : "hidden",
        )}
      >
        <MobileVideoBackground />
        <div className="flex flex-col items-center justify-center gap-16 relative z-30 px-14 py-20 w-full h-full">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            <CloseIcon />
          </button>
          <img src={MobileMenuLogo} alt="Harvestflow logo" className="" />
          <div className="flex flex-col items-center gap-10">
            <p
              className="text-heading5 font-medium text-black uppercase"
              role="button"
              onClick={() => {
                if (i18n.language === "en") {
                  i18n.changeLanguage("jp");
                } else {
                  i18n.changeLanguage("en");
                }
              }}
            >
              {i18n.language === "en" ? "Japanese" : "English"}
            </p>
            <ConnectWalletButton />
            <div className="flex gap-2">
              <a
                href={TWITTER_LINK}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center p-4"
              >
                <XIcon />
              </a>
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center p-4"
              >
                <DiscordIcon />
              </a>
            </div>
          </div>
          <div className="flex items-end justify-center gap-2 w-full">
            <p className="text-heading5 relative -top-2">Produced by</p>
            <a
              href={APAS_PORT_LINK}
              target="_blank"
              rel="noreferrer noopener"
              className="max-w-[110px] w-full pb-[10px]"
            >
              <ApasPortLogo />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
