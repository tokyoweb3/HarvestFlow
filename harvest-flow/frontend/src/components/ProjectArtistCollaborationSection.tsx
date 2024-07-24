import React from "react";

import artistImage from "../../assets/images/project-artist-collaboration.jpg";

const ProjectArtistCollaborationSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 desktop:gap-[150px] pt-20 desktop:pt-[250px] relative z-10 px-4 desktop:px-0">
      <div className="max-w-[768px] mx-auto flex flex-col gap-10 desktop:gap-[70px]">
        <h2 className="text-bodyLarge desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem]">
          ARTIST COLLABORATION
        </h2>
        <div className="flex flex-col desktop:flex-row gap-10 desktop:items-center">
          <img
            src={artistImage}
            alt="Artist Collaboration image"
            className="w-full max-w-[207px]"
          />
          <div className="flex flex-col gap-[18px]">
            <div className="flex flex-col gap-0">
              <p className="uppercase text-bodySmaller font-medium">Profile</p>
              <p className="uppercase text-heading5Smaller font-medium">
                IZUMIDA LEE
              </p>
            </div>
            <p className="text-bodySmaller">
              Artist
              <br />
              Born in Hokkaido in 1986. Izumida Lee began drawing at a young age
              and studied art while living in the United States. In 2015, she
              relocated to Tokyo and launched her career as an artist in 2019.
              Her work primarily focuses on acrylic paintings, signboards,
              advertising art, and illustrations and text for window displays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectArtistCollaborationSection;
