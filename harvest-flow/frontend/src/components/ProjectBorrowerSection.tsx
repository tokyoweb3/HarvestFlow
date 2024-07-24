import React from "react";

const ProjectBorrowerSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 desktop:gap-[150px] pt-20 desktop:pt-[150px] relative z-10 px-4 desktop:px-0">
      <div className="max-w-[780px] mx-auto flex flex-col gap-10 desktop:gap-10">
        <h4 className="text-bodyLarge desktop:text-heading5Larger23_30 text-center desktop:text-left font-medium">
          The Tuk Tuk Market and Driver Loans in Cambodia
        </h4>
        <div className="flex flex-col gap-6 desktop:text-body15_26">
          <p>
            Tuk tuks, three-wheeled taxis modified from motorcycles or bicycles,
            are widely used as a vital mode of transportation in major cities
            across Cambodia. They are popular among locals and tourists alike
            for their convenience in short-distance travel and affordable fares.
            In the capital city of Phnom Penh alone, there are approximately
            12,000 tuk tuks, accounting for about 20% of the city&apos;s
            transportation and becoming an integral part of citizens&apos; daily
            lives.
          </p>

          <p>
            Many tuk tuk drivers in Cambodia, who form the backbone of the
            country&apos;s transportation infrastructure, come from low-income
            backgrounds or rural areas seeking employment opportunities.
            However, securing funds to purchase their own tuk-tuk remains a
            major challenge. This is primarily due to the reluctance of banks
            and major microfinance institutions to provide loans to individual
            entrepreneurs.
          </p>

          <p>
            While the total loan portfolio of microfinance institutions in
            Cambodia exceeds $8 billion, most of it is directed towards small
            and medium enterprises, making it difficult for individual drivers
            striving for self-sufficiency to access these services.
          </p>

          <p>
            Phnom Penh, with over 5 million annual tourists, offers tuk tuk
            drivers an opportunity to earn up to $400, triple the average
            monthly income, which can be a significant stepping stone for them
            to escape poverty, provided they have the motivation to work. Many
            drivers we interviewed expressed joy in being able to send their
            children to school with their earnings, highlighting the
            transformative impact of their income.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectBorrowerSection;
