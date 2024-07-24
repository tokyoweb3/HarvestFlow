import React from "react";

import logo from "../../assets/images/project-borrower-logo.jpg";

const ProjectAboutTheBorrowerSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 desktop:gap-[150px] pt-20 desktop:pt-[150px] relative z-10 px-4 desktop:px-0">
      <div className="max-w-[780px] mx-auto flex flex-col gap-10 desktop:gap-[50px]">
        <h2 className="text-bodyLarge desktop:text-heading3_32_44 text-center uppercase font-medium tracking-[0.35rem]">
          About the borrower
        </h2>
        <div className="max-w-[580px] w-full mx-auto bg-white border border-black px-[15px] py-[10px]">
          <p className="text-body15_26">
            For RWA-001, the actual borrower will be Apas Port Inc. Please refer
            to the project scheme for more details. For any inquiries regarding
            this project, please contact the community. Discord:
            discord.gg/harvesthall
          </p>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col desktop:flex-row gap-[30px] desktop:items-center">
            <img src={logo} alt="Logo" className="w-full max-w-[91px]" />
            <div className="flex flex-col items-start gap-[16px] w-full max-w-[240px]">
              <p className="text-body">
                Global Mobility Service Inc. Japanese Fintech Company
              </p>
              <button className="bg-white rounded-[15px] flex gap-[12px] items-center py-[3px] px-[22px] border border-black">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 13.9242V0H5.3175V1.54713H1.5V12.377H12V8.43958H13.5V13.9242H0ZM5.6895 6.96208L10.9395 1.54713H7.5V0H13.5V6.18851H12V2.64095L6.75 8.0559L5.6895 6.96208Z"
                    fill="black"
                  />
                </svg>
                <p className="font-medium text-body">Website</p>
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-6 desktop:text-body15_26">
              <p>
                Global Mobility Service (GMS), a leading Japanese FinTech
                company, specializes in providing mobility-related services
                leveraging IoT and cloud technologies.
                <br />
                GMS operates two key systems, namely the Mobility-Cloud
                Connecting System (MCCS) and the Mobility Service Financial
                Platform (MFPS):
                <br />
                1. Mobility-Cloud Connecting System (MCCS): MCCS is a platform
                that combines GMS&apos;s proprietary IoT devices with cloud
                systems. IoT devices installed in vehicles transmit real-time
                location and driving data to the cloud system. This enables
                efficient vehicle management, operation optimization, and
                enhanced safety.
                <br />
                Key features include: - Real-time vehicle tracking - Driver
                behavior analysis - Detection of accidents and theft - Remote
                vehicle control (such as engine shutdown) - Maintenance schedule
                management
                <br />
                2. Mobility Service Financial Platform (MFPS): MFPS is a
                cloud-based finance platform provided by GMS. This system
                leverages vehicle data collected from MCCS to construct a credit
                risk assessment model, enabling the provision of financial
                services for vehicle purchase or leasing to underserved segments
                (such as individuals or small businesses with low credit scores)
                that are often overlooked by traditional financial services.
                <br />
                Key features include: - Construction of credit risk assessment
                models - Evaluation and provision of vehicle loans or leases -
                Management of loan or lease payments - Oversight of
                delinquencies and defaults
                <br />
                GMS has released over 15,000 vehicles using these systems,
                primarily focusing on emerging markets to promote
                mobility-related services and financial inclusion. The
                company&apos;s services are deployed in Southeast Asian
                countries such as the Philippines, Cambodia, and Indonesia,
                contributing to local economic development and addressing
                societal challenges.
                <br />
                The tuk tuk loan offering in Cambodia commenced in October 2023,
                and it has already successfully released over 100 vehicles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAboutTheBorrowerSection;
