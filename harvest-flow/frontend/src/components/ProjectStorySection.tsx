import React, { useState } from "react";

import { IndicatorDot } from "./PartnerSection";

import sliderImage1 from "../../assets/images/project-page-carousel-image.jpg";

const images = [
  sliderImage1,
  sliderImage1,
  sliderImage1,
  sliderImage1,
  sliderImage1,
  sliderImage1,
];

const ProjectStorySection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // previous image index loops back to the last image
  const previousImageIndex =
    currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;

  // next image index loops back to the first image
  const nextImageIndex =
    currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;

  const handleImageClick = () => {
    setCurrentImageIndex(nextImageIndex);
  };

  return (
    <div className="flex flex-col gap-16 desktop:gap-32 pt-[84px] desktop:pt-[93px] relative z-10 px-4 desktop:px-0">
      <div className="flex flex-col gap-6">
        <div className="flex gap-8 desktop:gap-16">
          <div
            className="flex-1 bg-center bg-cover bg-no-repeat hidden desktop:block animate-fade"
            style={{ backgroundImage: `url(${[images[previousImageIndex]]})` }}
            onClick={() => handleImageClick()}
            key={`a${previousImageIndex}`}
          ></div>
          <div
            className="desktop:max-w-[780px] pt-[56.25%] desktop:pt-[32.5%] w-full bg-center bg-cover bg-no-repeat animate-fade"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            onClick={() => handleImageClick()}
            key={`b${currentImageIndex}`}
          ></div>
          <div
            className="flex-1 bg-center bg-cover bg-no-repeat hidden desktop:block animate-fade"
            style={{ backgroundImage: `url(${images[nextImageIndex]})` }}
            onClick={() => handleImageClick()}
            key={`c${nextImageIndex}`}
          ></div>
        </div>
        <div className="flex gap-6 justify-center items-center">
          {Array(images.length)
            .fill(1)
            .map((_, index) => (
              <IndicatorDot
                key={index}
                active={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStorySection;
