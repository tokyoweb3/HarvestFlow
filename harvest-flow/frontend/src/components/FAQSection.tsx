import type { ReactElement } from "react";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Trans, useTranslation } from "react-i18next";

import SectionHeader from "./SectionHeader";
import MinusIcon from "@src/icons/MinusIcon";
import PlusIcon from "@src/icons/PlusIcon";

import bgVideo from "../../assets/videos/pc_color_high.mp4";
import clsx from "clsx";

const FAQItem: React.FC<{
  question: string;
  answer: string | ReactElement;
  index: number;
  openByDefault?: boolean;
}> = ({ question, answer, index, openByDefault }) => {
  const [isOpen, setIsOpen] = React.useState(openByDefault);

  const handleQuestionToggle = () => {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={clsx(
        "flex divide-x divide-black border-t border-black",
        isOpen && "bg-white",
      )}
    >
      <div className="px-3 py-6 desktop:p-10 w-16 desktop:w-28">
        <p className="text-body desktop:text-heading5 text-center">Q{index}</p>
      </div>
      <div className="px-4 desktop:px-10 py-4 desktop:py-6 flex flex-col gap-4 flex-1">
        <div className="flex justify-between flex-1 items-start gap-10">
          <h3 className="text-body desktop:text-heading5">{question}</h3>
          <button onClick={() => handleQuestionToggle()} className="pt-[6px]">
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
        {isOpen && (
          <div className="text-caption desktop:text-body">{answer}</div>
        )}
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const { t } = useTranslation();

  const container = useRef();
  const scrollableTextWrapper = useRef<HTMLDivElement>();

  const faqData = [
    {
      question: t("faq.question1"),
      answer: (
        <>
          <p>{t("faq.answer1")}</p>
        </>
      ),
    },
    {
      question: t("faq.question2"),
      answer: (
        <>
          <p>{t("faq.answer2")}</p>
        </>
      ),
    },
    {
      question: t("faq.question3"),
      answer: (
        <>
          <p>
            <Trans
              i18nKey="faq.answer3"
              components={[
                // eslint-disable-next-line react/jsx-key
                <a href="#" className="underline" />,
              ]}
            ></Trans>
          </p>
        </>
      ),
    },
    {
      question: t("faq.question4"),
      answer: (
        <>
          <p>{t("faq.answer4")}</p>
        </>
      ),
    },
    {
      question: t("faq.question5"),
      answer: (
        <>
          <p
            className="*:list-disc *:pl-4 *:py-4"
            dangerouslySetInnerHTML={{
              __html: t("faq.answer5", {
                interpolation: { escapeValue: false },
              }),
            }}
          ></p>
        </>
      ),
    },
    {
      question: t("faq.question6"),
      answer: (
        <>
          <p>
            <Trans
              i18nKey="faq.answer6"
              components={[
                // eslint-disable-next-line react/jsx-key
                <a href="#" className="underline" />,
              ]}
            ></Trans>
          </p>
        </>
      ),
    },
  ];

  useGSAP(
    () => {
      if (!scrollableTextWrapper.current) return;

      // disable on mobile
      if (window.innerWidth < 1200) return;

      // disable scroll trigger if content is less than window height
      // if (scrollableTextWrapper.current.scrollHeight < window.innerHeight)
      //   return;

      gsap.to(".gsap-faq-container", {
        scrollTrigger: {
          trigger: ".gsap-faq-inner",
          start: "top top",
          end: `+=${scrollableTextWrapper.current.scrollHeight}px`,
          pin: true,
        },
      });

      gsap.to(".gsap-faq-text-scroll-container", {
        scrollTo: scrollableTextWrapper.current.scrollHeight,
        scrollTrigger: {
          trigger: ".gsap-faq-inner",
          start: "top top",
          end: `+=${scrollableTextWrapper.current.scrollHeight + window.innerHeight - 160}px`,
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="gsap-faq-container">
        <div className="flex flex-col desktop:flex-row desktop:divide-x desktop:divide-black desktop:border-b desktop:border-black relative z-10 desktop:h-screen bg-greySuperLight gsap-faq-inner">
          <div className="w-full desktop:w-1/2 desktop:flex desktop:flex-col desktop:justify-between">
            <SectionHeader title={t("homepage.faq.title")} />
            <div
              className="desktop:pt-96 desktop:overflow-y-hidden gsap-faq-text-scroll-container"
              ref={scrollableTextWrapper}
            >
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
              <h2 className="text-white text-heading3 desktop:text-heading2 font-medium uppercase tracking-widest text-center">
                {t("homepage.faq.title")}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
