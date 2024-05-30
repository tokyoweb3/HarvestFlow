import React from "react";

import backgroundImage from "../../assets/images/hero-bg.svg";
import SectionHeader from "./SectionHeader";

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
}> = ({ question, answer, index }) => {
  return (
    <div className="flex divide-x divide-black border-t border-black">
      <div className="p-10">
        <p className="text-heading5">Q{index}</p>
      </div>
      <div className="px-10 py-6 flex flex-col gap-4">
        <h3 className="text-heading5">{question}</h3>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  return (
    <div className="flex divide-x divide-black border-b border-black">
      <div className="w-1/2">
        <SectionHeader title="FAQ" />
        <div className="pt-24">
          <div className="px-10 pb-10">
            <h3 className="text-heading4 uppercase font-medium">
              An investment experience that transforms society with emotion.
            </h3>
          </div>
          <div>
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
      <div
        className="w-1/2 bg-cover bg-no-repeat bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-heading2 font-medium uppercase tracking-widest text-center">
            FAQ
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
