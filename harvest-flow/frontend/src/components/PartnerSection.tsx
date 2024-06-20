import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import SectionHeader from "./SectionHeader";
import type { PartnerData } from "./PartnerSectionDesktopSlider";
import PartnerSectionDesktopSlider from "./PartnerSectionDesktopSlider";
import PartnerSectionMobileSlider from "./PartnerSectionMobileSlider";

import peopleImageKunimitsu from "../../assets/images/people_kunimitsu.jpg";
import peopleImageMasakazu from "../../assets/images/people_masakazu.jpg";
import peopleImageKanemoto from "../../assets/images/people_kanemoto.jpg";
import peopleImageNagase from "../../assets/images/people_nagase.jpg";
import peopleImageYamashita from "../../assets/images/people_yamashita.jpg";
import peopleImageNarimoto from "../../assets/images/people_narimoto.jpg";
import peopleImageShieldify from "../../assets/images/people_shieldify.jpg";
import peopleImageDeform from "../../assets/images/people_deform.jpg";

export const IndicatorDot: React.FC<{
  active?: boolean;
  onClick: () => void;
}> = ({ active = false, onClick }) => {
  return (
    <div
      className={clsx(
        "w-3 h-3 desktop:w-4 desktop:h-4 rounded-full border hover:cursor-pointer",
        active ? "bg-black border-white" : "bg-white border-black",
      )}
      onClick={onClick}
    ></div>
  );
};

export const PartnerCard: React.FC<
  PartnerData & {
    onClick?: () => void;
  }
> = ({ subtitle, title, imageURL, onClick }) => {
  return (
    <div
      className="border border-black p-8 flex flex-col gap-6 desktop:gap-10 bg-white relative z-40 hover:cursor-pointer"
      onClick={onClick}
    >
      <div
        className="shrink-0 aspect-square bg-cover bg-no-repeat bg-center animate-fade"
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
      ></div>
      <div className="flex flex-col justify-end gap-6 desktop:gap-20 flex-1 pb-2">
        <div className="flex flex-col gap-1 desktop:gap-2">
          <p className="text-center uppercase text-caption desktop:text-body animate-fade">
            {subtitle}
          </p>
          <h3 className="text-bodyLarge desktop:text-heading4 uppercase font-medium text-center animate-fade">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

const PartnerSection: React.FC = () => {
  const { t } = useTranslation();

  const partnerData = [
    {
      subtitle: t("partners.kunimitsu.position"),
      title: t("partners.kunimitsu.name"),
      imageURL: peopleImageKunimitsu,
    },
    {
      subtitle: t("partners.nagase.position"),
      title: t("partners.nagase.name"),
      imageURL: peopleImageNagase,
    },
    {
      subtitle: t("partners.narimoto.position"),
      title: t("partners.narimoto.name"),
      imageURL: peopleImageNarimoto,
    },
    {
      subtitle: t("partners.yamashita.position"),
      title: t("partners.yamashita.name"),
      imageURL: peopleImageYamashita,
    },
    {
      subtitle: t("partners.masakazu.position"),
      title: t("partners.masakazu.name"),
      imageURL: peopleImageMasakazu,
    },
    {
      subtitle: t("partners.kanemoto.position"),
      title: t("partners.kanemoto.name"),
      imageURL: peopleImageKanemoto,
    },
    {
      subtitle: t("partners.shieldify.position"),
      title: t("partners.shieldify.name"),
      imageURL: peopleImageShieldify,
    },
    {
      subtitle: t("partners.deform.position"),
      title: t("partners.deform.name"),
      imageURL: peopleImageDeform,
    },
  ];

  return (
    <div className="relative z-10 border-b border-black desktop:h-screen flex flex-col pb-16 desktop:pb-0">
      <SectionHeader title="Partner" />
      <div className="desktop:py-16 px-4 desktop:px-0 flex-1 flex flex-col justify-center">
        <div className="max-w-[1188px] mx-auto relative z-10 px-4 desktop:px-0 w-full">
          <div className="hidden desktop:block">
            <PartnerSectionDesktopSlider partnerData={partnerData} />
          </div>
          <div className="block desktop:hidden">
            <PartnerSectionMobileSlider partnerData={partnerData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
