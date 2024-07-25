import React from "react";

import PlusIcon from "@src/icons/PlusIcon";
import MinusIcon from "@src/icons/MinusIcon";
import { useTranslation } from "react-i18next";

const FAQItem: React.FC<{
  openByDefault?: boolean;
  question: string;
  answer: string;
  index: number;
}> = ({ question, answer, index, openByDefault = false }) => {
  const [isOpen, setIsOpen] = React.useState(openByDefault);

  return (
    <div className="border border-black px-10 py-[34px] bg-white">
      <div className="flex gap-6 desktop:gap-10">
        <div className="w-4 desktop:w-10">
          <p className="text-body desktop:text-heading5SmallerLH24">Q{index}</p>
        </div>
        <div
          className="flex justify-between flex-1 items-center hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-body desktop:text-body17">{question}</p>
          <button>{isOpen ? <MinusIcon /> : <PlusIcon />}</button>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-black border-dashed mt-[35px] pt-[32px]">
          <p className="text-caption desktop:text-bodySmaller">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPageFAQSection: React.FC = () => {
  const { t } = useTranslation();

  const faqData = [
    {
      question: t("project.faq.question1.question"),
      answer: t("project.faq.question1.answer"),
    },
    {
      question: t("project.faq.question2.question"),
      answer: t("project.faq.question2.answer"),
    },
    {
      question: t("project.faq.question3.question"),
      answer: t("project.faq.question3.answer"),
    },
    {
      question: t("project.faq.question4.question"),
      answer: t("project.faq.question4.answer"),
    },
    {
      question: t("project.faq.question5.question"),
      answer: t("project.faq.question5.answer"),
    },
    {
      question: t("project.faq.question6.question"),
      answer: t("project.faq.question6.answer"),
    },
  ];
  return (
    <div className="flex flex-col gap-16 desktop:gap-[110px] pb-24 destkop:pb-[50px] relative z-10">
      <h2 className="text-center text-heading4 desktop:text-heading3 font-medium uppercase tracking-[0.35rem]">
        Q & A
      </h2>
      <div className="w-full max-w-[1008px] mx-auto flex flex-col gap-[20px] px-4 desktop:px-0">
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
