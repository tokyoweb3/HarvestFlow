import React from "react";

import PlusIcon from "@src/icons/PlusIcon";
import MinusIcon from "@src/icons/MinusIcon";

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
  openByDefault?: boolean;
  question: string;
  answer: string;
  index: number;
}> = ({ question, answer, index, openByDefault = false }) => {
  const [isOpen, setIsOpen] = React.useState(openByDefault);

  return (
    <div className="border border-black px-10 py-8 bg-white">
      <div className="flex gap-6 desktop:gap-10">
        <div className="w-4 desktop:w-10">
          <p className="text-body desktop:text-heading5">Q{index}</p>
        </div>
        <div className="flex justify-between flex-1 items-center">
          <p className="text-body desktop:text-heading5">{question}</p>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-black border-dashed mt-6 pt-6">
          <p className="text-caption desktop:text-body">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPageFAQSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 desktop:gap-28 pb-24 destkop:pb-56 relative z-10">
      <h2 className="text-center text-heading4 desktop:text-heading2 font-medium uppercase">
        Q & A
      </h2>
      <div className="w-full max-w-[1008px] mx-auto flex flex-col gap-6 px-4 desktop:px-0">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            openByDefault={index === 0}
            question={faq.question}
            answer={faq.answer}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQPageFAQSection;
