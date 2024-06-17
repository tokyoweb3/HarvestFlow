import type { ReactElement } from "react";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import SectionHeader from "./SectionHeader";
import MinusIcon from "@src/icons/MinusIcon";
import PlusIcon from "@src/icons/PlusIcon";

import bgVideo from "../../assets/videos/pc_color_high.mp4";

const faqData = [
  {
    question:
      "The vehicle status is displayed as NOT STARTED. When will it be updated?",
    answer: (
      <>
        <p>
          After the lending application period ends, the collected funds will be
          transferred to the operating company, which will use them to purchase
          the vehicle. Once the driver selection, device installation on the
          vehicle, and release process are completed, the data will be linked
          and the status will be updated
        </p>
      </>
    ),
  },
  {
    question: "Where can I purchase DAI on the BASE chain?",
    answer: (
      <>
        <p>
          It can be exchanged for cryptocurrencies like ETH on platforms such as
          Aerodome and Uniswap.
        </p>
      </>
    ),
  },
  {
    question: "I do not own any cryptocurrencies. Can I still use the service?",
    answer: (
      <>
        <p>
          To use HARVEST FLOW, you must own cryptocurrencies in a supported
          wallet. We provide a guide on how to purchase cryptocurrencies here.
        </p>
      </>
    ),
  },
  {
    question: "Can the loan be canceled midway?",
    answer: (
      <>
        <p>
          The interest received at maturity is generally calculated using the
          following formula:
        </p>
        <ul className="list-disc pl-4 pt-4">
          <li>Principal: Lending amount (cryptocurrency)</li>
          <li>
            Interest: Lending amount (cryptocurrency) × Lending period × Annual
            rate ÷ 365 days
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How can I get in touch for questions or inquiries?",
    answer: (
      <>
        <p>All inquiries are accepted in the HARVEST HALL Discord.</p>
      </>
    ),
  },
  {
    question:
      "The vehicle status is displayed as NOT STARTED. When will it be updated?",
    answer: (
      <>
        <p>
          After the lending application period ends, the collected funds will be
          transferred to the operating company, which will use them to purchase
          the vehicle. Once the driver selection, device installation on the
          vehicle, and release process are completed, the data will be linked
          and the status will be updated
        </p>
      </>
    ),
  },
  {
    question: "Where can I purchase DAI on the BASE chain?",
    answer: (
      <>
        <p>
          It can be exchanged for cryptocurrencies like ETH on platforms such as
          Aerodome and Uniswap.
        </p>
      </>
    ),
  },
  {
    question: "I do not own any cryptocurrencies. Can I still use the service?",
    answer: (
      <>
        <p>
          To use HARVEST FLOW, you must own cryptocurrencies in a supported
          wallet. We provide a guide on how to purchase cryptocurrencies here.
        </p>
      </>
    ),
  },
  {
    question: "Can the loan be canceled midway?",
    answer: (
      <>
        <p>
          The interest received at maturity is generally calculated using the
          following formula:
        </p>
        <ul className="list-disc pl-4 pt-4">
          <li>Principal: Lending amount (cryptocurrency)</li>
          <li>
            Interest: Lending amount (cryptocurrency) × Lending period × Annual
            rate ÷ 365 days
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How can I get in touch for questions or inquiries?",
    answer: (
      <>
        <p>All inquiries are accepted in the HARVEST HALL Discord.</p>
      </>
    ),
  },
];

const FAQItem: React.FC<{
  question: string;
  answer: string | ReactElement;
  index: number;
  openByDefault?: boolean;
}> = ({ question, answer, index, openByDefault }) => {
  const [isOpen, setIsOpen] = React.useState(openByDefault);

  return (
    <div className="flex divide-x divide-black border-t border-black">
      <div className="px-3 py-6 desktop:p-10 w-16 desktop:w-28">
        <p className="text-body desktop:text-heading5 text-center">Q{index}</p>
      </div>
      <div className="px-4 desktop:px-10 py-4 desktop:py-6 flex flex-col gap-4 flex-1">
        <div className="flex justify-between flex-1 items-start gap-10">
          <h3 className="text-body desktop:text-heading5">{question}</h3>
          <button onClick={() => setIsOpen(!isOpen)} className="pt-[6px]">
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
  const container = useRef();
  const scrollableTextWrapper = useRef<HTMLDivElement>();

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
        <div className="flex flex-col desktop:flex-row desktop:divide-x desktop:divide-black desktop:border-b desktop:border-black relative z-10 desktop:h-screen bg-white gsap-faq-inner">
          <div className="w-full desktop:w-1/2 desktop:flex desktop:flex-col desktop:justify-between">
            <SectionHeader title="FAQ" />
            <div
              className="desktop:pt-24 desktop:overflow-y-hidden gsap-faq-text-scroll-container"
              ref={scrollableTextWrapper}
            >
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
              <h2 className="text-white text-heading3 desktop:text-heading2 font-medium uppercase tracking-widest text-center">
                FAQ
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
