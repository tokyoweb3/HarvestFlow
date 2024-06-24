import React, { useState } from "react";

import { IndicatorDot } from "./PartnerSection";

import sliderImage1 from "../../assets/images/project-slider-1.jpg";
import sliderImage2 from "../../assets/images/project-slider-2.jpg";
import sliderImage3 from "../../assets/images/project-slider-3.jpg";
import sliderImage4 from "../../assets/images/project-slider-4.jpg";
import sliderImage5 from "../../assets/images/project-slider-5.jpg";
import sliderImage6 from "../../assets/images/project-slider-6.jpg";

const images = [
  sliderImage1,
  sliderImage2,
  sliderImage3,
  sliderImage4,
  sliderImage5,
  sliderImage6,
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
    <div className="flex flex-col gap-16 desktop:gap-32 pt-20 desktop:pt-44 relative z-10 px-4 desktop:px-0">
      <h2 className="text-center text-heading4 desktop:text-heading2 font-medium uppercase">
        Story
      </h2>
      <div className="max-w-[780px] mx-auto flex flex-col gap-4 desktop:gap-20">
        <div className="flex flex-col gap-10">
          <h3 className="text-bodyLarge desktop:text-heading4 font-medium text-center desktop:text-left">
            Impression of Cambodia and Current Situation
          </h3>
          <div className="flex flex-col gap-6">
            <p>
              Adipisicing consequat amet dolore tempor ea consectetur labore
              amet. Nulla ipsum dolor commodo ipsum sit non excepteur ut
              pariatur in occaecat dolore. Veniam deserunt dolore deserunt ex.
              Sunt eiusmod deserunt consequat sunt mollit sint non aliquip
              labore exercitation. Veniam Lorem amet occaecat magna pariatur
              dolor veniam aliquip est fugiat. Nisi qui quis voluptate ad
              consectetur nisi aliqua. Irure elit eu irure deserunt qui et ad
              cupidatat est nisi esse exercitation sit. Non adipisicing elit do
              officia ex ut proident velit in. Deserunt irure Lorem culpa sint
              voluptate. Culpa ullamco culpa esse et laborum pariatur dolor.
            </p>
            <p>
              Laborum tempor sunt dolore reprehenderit fugiat do excepteur sunt
              labore et nulla fugiat ea. Lorem cupidatat ex ex laboris laborum.
              Commodo consectetur elit excepteur aliqua. Mollit eu minim magna
              occaecat ipsum consectetur consequat aute culpa quis. Est irure
              est velit minim. Anim Lorem quis excepteur sint qui cupidatat
              nulla dolore ex dolore ut sint. Labore deserunt velit cillum Lorem
              ipsum velit quis aute non commodo aliqua adipisicing. In esse anim
              ad ea labore irure in anim.
            </p>
            <p>
              Anim ad dolore labore mollit et adipisicing sunt elit consectetur
              ad fugiat amet. Nisi et ea excepteur elit cupidatat ut pariatur
              occaecat irure commodo. Amet commodo irure nisi quis veniam et sit
              amet dolore ipsum quis quis proident do. Non fugiat et deserunt
              adipisicing minim laborum laborum sunt aliqua minim deserunt Lorem
              ut. Ad veniam pariatur proident qui do minim elit irure et ad. Et
              voluptate qui Lorem qui velit duis eiusmod nostrud duis esse et
              ad. Reprehenderit ea exercitation aliqua laborum laboris non
              consectetur eiusmod dolor non et do.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {currentImageIndex}
        <div className="flex gap-8 desktop:gap-16">
          <div
            className="flex-1 bg-center bg-cover bg-no-repeat hidden desktop:block animate-fade"
            style={{ backgroundImage: `url(${[images[previousImageIndex]]})` }}
            onClick={() => handleImageClick()}
            key={`a${previousImageIndex}`}
          ></div>
          <div
            className="desktop:max-w-[780px] pt-[32.5%] w-full bg-center bg-cover bg-no-repeat animate-fade"
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
