import React from "react";
import { useSwipeable } from "react-swipeable";

import { IndicatorDot, PartnerCard } from "./PartnerSection";

export type PartnerData = {
  subtitle: string;
  title: string;
  imageURL: string;
};

const PartnerSectionMobileSlider: React.FC<{
  partnerData: PartnerData[];
}> = ({ partnerData }) => {
  const handleCardClick = () => {
    if (currentSlide + 1 < partnerData.length) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const handleGoToNext = () => {
    if (currentSlide + 1 < partnerData.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleGoToPrevious = () => {
    if (currentSlide - 1 >= 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const config = {
    onSwipedLeft: () => {
      handleGoToNext();
    },
    onSwipedRight: () => {
      handleGoToPrevious();
    },
  };

  const handlers = useSwipeable({
    ...config,
  });

  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <div className="flex flex-col gap-16 relative w-full">
      <div className="relative grid grid-cols-1" {...handlers}>
        <PartnerCard
          subtitle={partnerData[currentSlide].subtitle}
          title={partnerData[currentSlide].title}
          imageURL={partnerData[currentSlide].imageURL}
          onClick={handleCardClick}
        />
      </div>
      <div className="flex gap-6 justify-center items-center">
        {Array(partnerData.length)
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

export default PartnerSectionMobileSlider;
