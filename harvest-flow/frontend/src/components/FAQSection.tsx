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
import bgVideoPoster from "../../assets/videos/pc_color_high.jpg";
import clsx from "clsx";

const FAQItem: React.FC<{
  question: string;
  answer: string | ReactElement;
  index: number;
  isOpen: boolean;
  toggleOpen: () => void;
}> = ({ question, answer, index, isOpen, toggleOpen }) => {
  const handleQuestionToggle = () => {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
    toggleOpen();
  };

  return (
    <div
      className={clsx(
        "flex divide-x divide-black border-t border-black",
        isOpen && "bg-white",
      )}
    >
      <div className="px-3 py-6 desktop:px-10 desktop:py-7 w-16 desktop:w-28">
        <p className="text-body desktop:text-body17 text-center">Q{index}</p>
      </div>
      <div
        className="px-4 desktop:px-10 py-4 desktop:py-7 flex flex-col gap-4 flex-1 cursor-pointer"
        onClick={handleQuestionToggle}
      >
        <div className="flex justify-between flex-1 items-start gap-10">
          <h3 className="text-body desktop:text-body17">{question}</h3>
          <button className="pt-[6px]">
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
        {isOpen && (
          <div className="text-caption desktop:text-bodySmaller">{answer}</div>
        )}
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          <p>{t("faq.answer6")}</p>
        </>
      ),
    },
    {
      question: t("faq.question7"),
      answer: (
        <>
          <p>
            <Trans
              i18nKey="faq.answer7"
              components={[
                // eslint-disable-next-line react/jsx-key
                <a
                  href="https://discord.gg/harvesthall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                />,
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
          end: `+=${
            scrollableTextWrapper.current.scrollHeight +
            window.innerHeight -
            160
          }px`,
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
                    question={faqItem.question}
                    answer={faqItem.answer}
                    index={index + 1}
                    isOpen={openIndex === index + 1}
                    toggleOpen={() => toggleOpen(index + 1)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="hidden desktop:block w-1/2 bg-cover bg-no-repeat bg-center relative">
            <video
              src={bgVideo}
              poster={bgVideoPoster}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center z-10">
              <h2 className="text-white text-heading3 desktop:text-heading2AnimationTitle uppercase tracking-[0.85rem] text-center whitespace-pre-line  font-normal font-functionPro">
                {t("homepage.faq.title", { lng: "en" })}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
