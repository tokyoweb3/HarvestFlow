import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import SectionHeader from "./SectionHeader";

import backgroundImage from "../../assets/images/hero-bg.svg";
import bgVideo from "../../assets/videos/pc_color_high.mp4";

const FeaturesSection: React.FC = () => {
  const container = useRef();
  const scrollableTextWrapper = useRef<HTMLDivElement>();

  useGSAP(
    () => {
      if (!scrollableTextWrapper.current) return;

      // disable scroll trigger if content is less than window height
      // if (scrollableTextWrapper.current.scrollHeight < window.innerHeight)
      //   return;

      gsap.to(".gsap-features-container", {
        scrollTrigger: {
          trigger: ".gsap-features-inner",
          start: "top top",
          end: `+=${scrollableTextWrapper.current.scrollHeight}px`,
          pin: true,
          markers: true,
        },
      });

      gsap.to(".gsap-features-text-scroll-container", {
        scrollTo: scrollableTextWrapper.current.scrollHeight,
        scrollTrigger: {
          trigger: ".gsap-features-inner",
          start: "top top",
          end: `+=${scrollableTextWrapper.current.scrollHeight + window.innerHeight - 160}px`,
          markers: true,
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="gsap-features-container">
        <div className="flex flex-col desktop:flex-row divide-x divide-black border-b border-black relative z-10 desktop:h-screen bg-white gsap-features-inner">
          <div className="hidden desktop:block w-1/2 bg-cover bg-no-repeat bg-center relative">
            <video
              src={bgVideo}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center">
              <h2 className="text-white text-heading2 font-medium uppercase tracking-widest text-center">
                Features
              </h2>
            </div>
          </div>
          <div className="w-full desktop:w-1/2 relative desktop:flex desktop:flex-col">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover absolute left-0 right-0 top-0 bottom-0 desktop:hidden"
            >
              <source src={bgVideo} type="video/mp4" />
            </video>
            <div className="relative z-10 text-white desktop:text-black desktop:flex desktop:flex-col desktop:flex-1 desktop:max-h-screen">
              <SectionHeader title="Features" />
              <div
                className="desktop:pt-24 desktop:flex-1 desktop:overflow-y-hidden desktop:pb-16 gsap-features-text-scroll-container"
                ref={scrollableTextWrapper}
              >
                <div className="px-4 desktop:px-10 flex flex-col gap-10 desktop:gap-16">
                  <div className="bg-white desktop:bg-transparent text-black py-10 px-8 desktop:p-0 flex gap-8">
                    <div className="flex flex-col gap-6 desktop:w-1/2">
                      <h3 className="text-heading5 desktop:text-heading4 text-center desktop:text-left uppercase font-medium">
                        An investment experience that transforms society with
                        emotion.
                      </h3>
                      <div>
                        <img
                          src={backgroundImage}
                          alt="background"
                          className="ml-3 mb-3 float-right desktop:hidden max-w-[150px] desktop:max-w-full"
                        />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          doloremagna.Lorem ipsum dolor sit amet, consectetur
                          adipisicing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna. Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit,sed do eiusmod tempor
                          incididunt ut labore et doloremagna.
                        </p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        doloremagna.Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit,sed do eiusmod tempor
                        incididunt ut labore et doloremagna.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        doloremagna.Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit,sed do eiusmod tempor
                        incididunt ut labore et doloremagna.
                      </p>
                    </div>
                    <div className="w-1/2 hidden desktop:block">
                      <img src={backgroundImage} alt="background" />
                    </div>
                  </div>
                  <div className="bg-white desktop:bg-transparent text-black py-10 px-8 desktop:p-0 flex gap-8">
                    <div className="flex flex-col gap-6 desktop:w-1/2">
                      <h3 className="text-heading5 desktop:text-heading4 text-center desktop:text-left uppercase font-medium">
                        An investment experience that transforms society with
                        emotion.
                      </h3>
                      <div>
                        <img
                          src={backgroundImage}
                          alt="background"
                          className="ml-3 mb-3 float-right desktop:hidden max-w-[150px] desktop:max-w-full"
                        />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          doloremagna.Lorem ipsum dolor sit amet, consectetur
                          adipisicing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna. Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit,sed do eiusmod tempor
                          incididunt ut labore et doloremagna.
                        </p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        doloremagna.Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit,sed do eiusmod tempor
                        incididunt ut labore et doloremagna.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        doloremagna.Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit,sed do eiusmod tempor
                        incididunt ut labore et doloremagna.
                      </p>
                    </div>
                    <div className="w-1/2 hidden desktop:block">
                      <img src={backgroundImage} alt="background" />
                    </div>
                  </div>
                  <div className="bg-white desktop:bg-transparent text-black py-10 px-8 desktop:p-0 flex gap-8">
                    <div className="flex flex-col gap-6 desktop:w-1/2">
                      <h3 className="text-heading5 desktop:text-heading4 text-center desktop:text-left uppercase font-medium">
                        An investment experience that transforms society with
                        emotion.
                      </h3>
                      <div>
                        <img
                          src={backgroundImage}
                          alt="background"
                          className="ml-3 mb-3 float-right desktop:hidden max-w-[150px] desktop:max-w-full"
                        />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          doloremagna.Lorem ipsum dolor sit amet, consectetur
                          adipisicing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna. Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit,sed do eiusmod tempor
                          incididunt ut labore et doloremagna.
                        </p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        doloremagna.Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit,sed do eiusmod tempor
                        incididunt ut labore et doloremagna.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        doloremagna.Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit,sed do eiusmod tempor
                        incididunt ut labore et doloremagna.
                      </p>
                    </div>
                    <div className="w-1/2 hidden desktop:block">
                      <img src={backgroundImage} alt="background" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
