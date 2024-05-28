import React from "react";

import backgroundImage from "../../assets/images/hero-bg.svg";

const PartnerSection: React.FC = () => {
  return (
    <div className="pt-32 pb-32">
      <h2 className="text-heading2 text-center uppercase font-medium tracking-widest">
        Partner
      </h2>
      <div className="pt-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="border border-black p-8 flex gap-10">
            <div
              className="w-[45%] shrink-0 aspect-square bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
            <div className="flex flex-col justify-end gap-20 flex-1 pb-2">
              <div className="flex flex-col gap-2">
                <p className="text-center">FiNANCiE founder</p>
                <h3 className="text-heading3 uppercase font-medium text-center">
                  hironao kunimitsu
                </h3>
              </div>
              <p>
                Commodo cillum consectetur id consequat officia reprehenderit
                cillum ea consectetur nostrud exercitation elit ullamco. Nulla
                aliquip nostrud est nisi esse esse nulla consectetur ea est
                nulla ullamco officia. Exercitation tempor adipisicing aliqua
                culpa eu esse consequat mollit adipisicing. Id adipisicing eu
                culpa amet veniam qui ut ut. Eiusmod sint magna qui elit Lorem
                exercitation ex ipsum dolor dolore sunt aliquip exercitation do.
                Laboris veniam eiusmod pariatur qui ipsum pariatur labore ut
                laborum sit duis ut cupidatat ea. Sit tempor ullamco magna
                reprehenderit labore ea pariatur. Duis enim ut incididunt elit.
                Culpa ad incididunt fugiat ea incididunt magna consectetur
                mollit elit nisi fugiat consectetur anim quis. Aute aute
                excepteur culpa eiusmod officia occaecat ex laboris fugiat est
                duis culpa. Fugiat officia et tempor excepteur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
