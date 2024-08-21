import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PlusIcon from "@src/icons/PlusIcon";
import MinusIcon from "@src/icons/MinusIcon";

const FAQItem: React.FC<{
  openByDefault?: boolean;
  question: string;
  answer: React.ReactNode;
  index: number;
}> = ({ question, answer, index, openByDefault = false }) => {
  const [isOpen, setIsOpen] = React.useState(openByDefault);

  return (
    <div
      className="border border-black px-[22px] py-[25px] desktop:px-10 desktop:py-[34px] bg-white hover:cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex gap-2 desktop:gap-10">
        <div className="w-8 desktop:w-10">
          <p className="text-body desktop:text-heading5SmallerLH24">Q{index}</p>
        </div>
        <div className="flex justify-between flex-1 items-center gap-[14px]">
          <p className="text-bodySmaller_13_18 desktop:text-body17">
            {question}
          </p>
          <button>{isOpen ? <MinusIcon /> : <PlusIcon />}</button>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-black border-dashed mt-[15px] desktop:mt-[35px] pt-[23px] desktop:pt-[32px]">
          <p className="text-captionMedium_11_20 desktop:text-bodySmaller">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQPageFAQSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [faqData, setFaqData] = React.useState<
    { question: string; answer: React.ReactNode }[]
  >([]);

  useEffect(() => {
    setFaqData([]);

    const isEnglish =
      i18n.language === "en" || window.location.search.includes("lng=en");
    const faqCount = isEnglish ? 12 : 12;

    const generatedFaqData = Array.from({ length: faqCount }, (_, index) => {
      const questionKey = `project.faq.question${index + 1}.question`;
      const answerKey = `project.faq.question${index + 1}.answer`;

      const questionText = t(questionKey);
      const answerText = t(answerKey);

      if (questionText === questionKey || answerText === answerKey) {
        return null;
      }

      const formattedAnswer =
        index + 1 === 5 ? (
          <div
            dangerouslySetInnerHTML={{
              __html: answerText,
            }}
          />
        ) : (
          answerText
        );

      return { question: questionText, answer: formattedAnswer };
    }).filter(Boolean);

    setFaqData(generatedFaqData);
  }, [i18n.language, t]);

  return (
    <div className="flex flex-col gap-[60px] desktop:gap-[110px] pb-[50px] relative z-10">
      <h2 className="font-functionPro text-center text-heading5Larger desktop:text-heading3 font-medium uppercase tracking-[0.35rem]">
        FAQ
      </h2>
      <div className="w-full max-w-[1008px] mx-auto flex flex-col gap-[14px] desktop:gap-[20px] px-4 desktop:px-0">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            openByDefault={index === 0}
            question={faq!.question}
            answer={faq!.answer}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQPageFAQSection;
