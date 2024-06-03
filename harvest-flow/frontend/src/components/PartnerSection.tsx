import React from "react";

import backgroundImage from "../../assets/images/hero-bg.svg";
import clsx from "clsx";

const partnerData = [
  {
    subtitle: "FiNANCiE founde",
    title: "HiRONAO KUNiMiTSU",
    text: "Ex anim ipsum commodo elit non consectetur enim duis laboris. Occaecat nostrud reprehenderit ullamco ex labore elit velit magna cupidatat deserunt amet adipisicing qui. Consequat voluptate tempor exercitation voluptate mollit deserunt excepteur officia commodo do consectetur incididunt sit. Aliquip ad aute elit in ipsum esse aute deserunt adipisicing. Lorem excepteur et excepteur occaecat ut do est culpa proident veniam sit velit elit qui. Et cupidatat ad ad proident. Aliqua amet mollit irure labore incididunt aliquip. Eu voluptate in eu velit id officia velit. Labore elit mollit Lorem officia cupidatat.",
    imageURL: backgroundImage,
  },
  {
    subtitle: "Position 1",
    title: "HiRONAO KUNiMiTSU 2",
    text: "Cillum ut proident qui reprehenderit magna sunt pariatur mollit veniam ullamco. Mollit magna velit aliquip veniam. Culpa reprehenderit commodo amet consectetur deserunt Lorem ut et duis voluptate consectetur non. Elit culpa est ipsum ipsum nisi. Enim id nisi consectetur laboris minim exercitation officia mollit eu. Culpa ex cupidatat ex consectetur ad enim. Occaecat minim anim labore reprehenderit sint ut. Reprehenderit sit Lorem exercitation duis nostrud nisi pariatur. Ullamco elit nostrud elit consectetur est dolor fugiat ullamco velit.",
    imageURL: backgroundImage,
  },
  {
    subtitle: "Position 2",
    title: "HiRONAO KUNiMiTSU 3",
    text: "Labore ad voluptate qui enim do consectetur culpa reprehenderit duis nisi cillum. Veniam nostrud laboris do Lorem cupidatat non. Tempor aute amet duis quis Lorem in reprehenderit anim nulla sunt. Minim reprehenderit nulla sint velit id enim aliquip consequat. Mollit velit aute laborum elit veniam minim tempor in ipsum magna. Ipsum ad duis esse et est qui consequat minim laboris. Veniam nulla eu duis enim duis adipisicing enim Lorem veniam irure veniam proident. Est anim consequat voluptate velit dolore nulla dolor in veniam. Laborum nulla laborum magna mollit veniam aute duis qui. Occaecat ad ipsum enim mollit mollit tempor cillum minim sunt.",
    imageURL: backgroundImage,
  },
  {
    subtitle: "Position 3",
    title: "HiRONAO KUNiMiTSU 4",
    text: "Nulla culpa amet duis nisi ullamco. Est cupidatat dolor sint tempor fugiat. Reprehenderit ipsum id amet in et proident incididunt voluptate. Ea laboris laborum reprehenderit incididunt nisi fugiat quis enim elit magna aliqua cupidatat veniam ut. Proident exercitation eu voluptate do anim exercitation ad. Incididunt magna nisi duis et ad fugiat. Ex labore esse do proident elit quis proident sit eiusmod adipisicing non irure et. Et laborum magna est exercitation eiusmod deserunt laboris. Minim dolore sunt anim occaecat eiusmod ex duis sint laboris ea dolor aliqua elit. Tempor minim deserunt non incididunt veniam anim. Aliquip in consequat id anim esse sint et sint cillum cupidatat enim cupidatat.",
    imageURL: backgroundImage,
  },
  {
    subtitle: "Position 4",
    title: "HiRONAO KUNiMiTSU 5",
    text: "Nulla anim consectetur cillum reprehenderit exercitation ut in in. Occaecat do est dolor incididunt irure ea. Nostrud fugiat in ad occaecat aliquip reprehenderit. Officia voluptate exercitation ea minim anim ad. Quis ad commodo aliqua do est laboris occaecat nulla eu ea enim consequat proident. Do est elit eiusmod ad cillum id quis non sunt. Labore est ut magna sunt veniam est aute Lorem ullamco pariatur nostrud commodo non magna.",
    imageURL: backgroundImage,
  },
];

const IndicatorDot: React.FC<{ active?: boolean; onClick: () => void }> = ({
  active = false,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        "w-4 h-4 rounded-full border hover:cursor-pointer",
        active ? "bg-black border-white" : "bg-white border-black",
      )}
      onClick={onClick}
    ></div>
  );
};

const PartnerSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <div className="pt-32 pb-32">
      <h2 className="text-heading2 text-center uppercase font-medium tracking-widest">
        Partner
      </h2>
      <div className="pt-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col gap-8">
            <div className="border border-black p-8 flex gap-10">
              <div
                className="w-[45%] shrink-0 aspect-square bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${partnerData[currentSlide].imageURL})`,
                }}
              ></div>
              <div className="flex flex-col justify-end gap-20 flex-1 pb-2">
                <div className="flex flex-col gap-2">
                  <p className="text-center">
                    {partnerData[currentSlide].subtitle}
                  </p>
                  <h3 className="text-heading3 uppercase font-medium text-center">
                    {partnerData[currentSlide].title}
                  </h3>
                </div>
                <p>{partnerData[currentSlide].text}</p>
              </div>
            </div>
            <div className="flex gap-6 justify-center items-center">
              {partnerData.map((_, index) => (
                <IndicatorDot
                  key={index}
                  active={index === currentSlide}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
