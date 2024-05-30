import React from "react";

import tukTukImage from "../../assets/images/tuktuk.jpg";

const ProjectStorySection: React.FC = () => {
  return (
    <div className="flex flex-col gap-32 pt-44">
      <h2 className="text-center text-heading2 font-medium uppercase">Story</h2>
      <div className="max-w-[780px] mx-auto flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <h3 className="text-heading4 font-medium">
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
        <div>
          <img src={tukTukImage} alt="illustration image" />
        </div>
      </div>
    </div>
  );
};

export default ProjectStorySection;
