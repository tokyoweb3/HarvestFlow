import React from "react";

import SectionHeader from "./SectionHeader";
import MinusIcon from "@src/icons/MinusIcon";
import PlusIcon from "@src/icons/PlusIcon";

import bgVideo from "../../assets/videos/pc_color_high.mp4";

const faqData = [
  {
    question:
      "Dolor ullamco officia ad ex dolor consequat ex sunt excepteur id eu nulla nisi laboris.",
    answer:
      "Sit duis quis est officia nostrud magna. Duis sint reprehenderit eiusmod deserunt sit irure pariatur et. Ullamco laborum esse et sunt minim labore do laboris aliquip commodo cillum velit.",
  },
  {
    question: "Tempor cillum esse adipisicing sit sint consequat fugiat id.",
    answer:
      "Minim esse magna sunt Lorem ad incididunt esse. Id deserunt ut sint id occaecat duis cillum voluptate velit. Fugiat reprehenderit culpa est consectetur sit reprehenderit deserunt ex exercitation sunt est ullamco cupidatat laborum. In anim esse adipisicing cillum. Consequat enim aliqua aliquip nulla.",
  },
  {
    question:
      "Adipisicing commodo officia excepteur consequat in do irure laborum pariatur.",
    answer:
      "Et commodo est officia consequat officia pariatur veniam minim dolor consectetur ut veniam est. Deserunt eiusmod duis in duis dolor. Officia elit esse labore consectetur et reprehenderit. Commodo qui dolor eu id consectetur irure qui et tempor. Duis ex sint in proident ut laborum occaecat duis consectetur dolor. Aute deserunt sit mollit esse proident nulla est incididunt irure. Sint sint consequat qui consequat dolore in ullamco duis nostrud.",
  },
  {
    question: "Consectetur culpa id voluptate culpa irure mollit in.",
    answer:
      "Ex dolore id non tempor nisi labore laboris adipisicing consequat deserunt cupidatat voluptate esse. Sint deserunt anim cupidatat sunt labore est pariatur ad nostrud exercitation ea. In labore ea duis laborum minim deserunt ut ea commodo veniam.",
  },
  {
    question: "Non officia Lorem dolore nostrud do reprehenderit.",
    answer:
      "Voluptate amet incididunt ea consectetur ut reprehenderit sit culpa aliqua voluptate incididunt et irure. Occaecat sit do excepteur exercitation sit cupidatat aute anim voluptate consequat elit. Eu ipsum ullamco non qui ex. Officia mollit veniam commodo id eiusmod dolore laborum officia nostrud. Nostrud nisi magna sit exercitation deserunt aliquip deserunt exercitation elit nostrud do.",
  },
];

const FAQItem: React.FC<{
  question: string;
  answer: string;
  index: number;
  openByDefault?: boolean;
}> = ({ question, answer, index, openByDefault }) => {
  const [isOpen, setIsOpen] = React.useState(openByDefault);

  return (
    <div className="flex divide-x divide-black border-t border-black">
      <div className="px-3 py-6 desktop:p-10">
        <p className="text-body desktop:text-heading5">Q{index}</p>
      </div>
      <div className="px-4 desktop:px-10 py-4 desktop:py-6 flex flex-col gap-4 flex-1">
        <div className="flex justify-between flex-1 items-start gap-10">
          <h3 className="text-body desktop:text-heading5">{question}</h3>
          <button onClick={() => setIsOpen(!isOpen)} className="pt-[6px]">
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
        {isOpen && <p className="text-caption desktop:text-body">{answer}</p>}
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  return (
    <div className="flex flex-col desktop:flex-row desktop:divide-x desktop:divide-black desktop:border-b desktop:border-black relative z-10 desktop:h-screen">
      <div className="w-full desktop:w-1/2 desktop:flex desktop:flex-col desktop:justify-between">
        <SectionHeader title="FAQ" />
        <div className="desktop:pt-24">
          <div className="px-10 pb-10">
            <h3 className="text-heading5 desktop:text-heading4 text-center desktop:text-left uppercase font-medium">
              An investment experience that transforms society with emotion.
            </h3>
          </div>
          <div className="border-b border-black desktop:border-0">
            {faqData.map((faqItem, index) => (
              <FAQItem
                key={index}
                index={index + 1}
                question={faqItem.question}
                answer={faqItem.answer}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden desktop:block w-1/2 bg-cover bg-no-repeat bg-center relative">
        <video
          src={bgVideo}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center z-10">
          <h2 className="text-white text-heading2 font-medium uppercase tracking-widest text-center">
            FAQ
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
