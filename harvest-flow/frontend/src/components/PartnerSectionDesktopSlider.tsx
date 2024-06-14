import React from "react";
import { IndicatorDot, PartnerCard } from "./PartnerSection";

export type PartnerData = {
  subtitle: string;
  title: string;
  imageURL: string;
};

const PartnerSectionDesktopSlider: React.FC<{
  partnerData: PartnerData[];
}> = ({ partnerData }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const visiblePartnerData = partnerData.slice(currentSlide, currentSlide + 3);

  const handleCardClick = () => {
    if (currentSlide + 3 < partnerData.length) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  return (
    <div className="flex flex-col gap-16 relative">
      <div className="relative grid grid-cols-1 desktop:grid-cols-3 desktop:gap-10">
        {visiblePartnerData.map((data, index) => (
          <PartnerCard
            key={`${index}${currentSlide}`}
            subtitle={data.subtitle}
            title={data.title}
            imageURL={data.imageURL}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <div className="flex gap-6 justify-center items-center">
        {Array(partnerData.length - 3 + 1)
          .fill(1)
          .map((_, index) => (
            <IndicatorDot
              key={index}
              active={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default PartnerSectionDesktopSlider;
