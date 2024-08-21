import React, { createContext } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { createRoot } from "react-dom/client";
import PageCoordinator from "./pages/PageCoordinator";
import MainController from "./MainController";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import TagManager from "react-gtm-module";

import "./main.css";

console.log("[ERWT]: Renderer execution started");
export const AppContext = createContext(null);
const mainController = new MainController();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "homepage.hero.title": "Harvest Flow",
          "homepage.hero.subtitle": "Ride the current of a new world.",
          "homepage.hero.text":
            "Engage in Social Action with an 8% Interest.\nConnecting with the world through cryptocurrency lending.",
          "homepage.our_projects.title": "Our projects",
          "homepage.our_projects.heading":
            "Driving the Future of Emerging Countries TUK TUK Loan Business in Cambodia",
          "homepage.our_projects.text":
            "The inaugural project RWA-001 involves crypto asset lending to a company that operates a tuk tuk loan business in Cambodia, a country that has experienced remarkable growth with a 7% GDP growth rate over the past five years and has attracted over 5 million tourists.",
          "homepage.our_projects.note":
            "<0>Release on August 26\nApply for the Evangelist Campaign Here.</0>",
          "homepage.our_projects.btn":
            "<0>Release on August 26\nApply for the Evangelist Campaign Here.</0>",
          "homepage.our_projects.coming_soon": "Coming soon",
          "homepage.our_projects.vehicle": "Vehicle",
          "general.play_movie": "Play movie",
          "general.apy": "APY",
          "general.status": "Status",
          "general.asset_type": "Asset type",
          "general.view_more": "View more",
          "general.coming_soon": "Coming soon",
          "general.next_project": "Next project",
          "general.connect_wallet": "Connect wallet",
          "general.disconnect_wallet": "DISCONNECT WALLET",
          "general.connect_wallet_account": "ACCOUNT PAGE",
          "homepage.about.title": "About\nHarvest Flow",
          "homepage.about.heading":
            "Engage in Social Action with an 8% Interest.\nConnecting with the world through cryptocurrency lending.",
          "homepage.about.text":
            "HARVEST FLOW is a service that enables social contribution by lending cryptocurrency to businesses dedicated to improving the world, thereby earning stable income gains while supporting impactful initiatives. Beyond financial returns, it offers a new form of social action by harvesting global prosperity (Harvest) and creating economic and social impact through the flow of funds (Flow).\n\nThe gathered funds are invested in real-world assets (RWA) that generate revenue over time, allowing users to tangibly see how their support is making a positive impact on society through the visualization of social actions.",
          "homepage.how_it_works.title": "How it works",
          "homepage.features.title": "Features",
          "homepage.features.feature1_title":
            "Steady interest with micro-investment in cryptocurrency lending",
          "homepage.features.feature1_text":
            "By enabling cryptocurrency lending from micro-investments, more people can achieve steady income gains. Traditional corporate financing often requires high minimum loan amounts because of significant platform fees and management costs, creating barriers for small investors. By leveraging cryptocurrency, we drastically reduce costs, making it accessible to anyone with cryptocurrency holdings.",
          "homepage.features.feature2_title":
            "Transparent operations through partnerships with reputable local companies",
          "homepage.features.feature2_text":
            "Through strategic partnerships with reputable local companies in emerging markets, we ensure secure and transparent operations. This approach allows us to deeply understand local needs and carefully select reliable partner companies, ensuring the integrity and sustainability of the businesses we support. Additionally, by leveraging blockchain and IoT technologies to visualize the flow of funds, we maintain exceptional transparency.",
          "homepage.features.feature3_title":
            "Simple and accessible for everyone, anywhere",
          "homepage.features.feature3_text":
            "Our user-friendly interface makes the platform intuitive and easy to use for everyone. We collaborate with cryptocurrency exchanges and ecosystem partners to provide an environment where even beginners without expertise in cryptocurrency or blockchain can easily participate in lending.",
          "homepage.features.feature4_title":
            "Easy DAI transactions without KYC",
          "homepage.features.feature4_text":
            "By utilizing the stablecoin $DAI, price fluctuation risks are mitigated, making the service safer and more accessible. Additionally, without complex KYC procedures, getting started is quick and easy.",
          "homepage.faq.title": "FAQ",
          "faq.question1": "How does HARVEST FLOW operate?",
          "faq.answer1":
            "HARVEST FLOW allows our company to borrow your cryptocurrency for a fixed period. After the contract period ends, we return the same type and amount of cryptocurrency that was borrowed, along with a lending fee calculated at a fixed rate, paid in the same type of cryptocurrency.",
          "faq.question2":
            "How does using HARVEST FLOW contribute to social good?",
          "faq.answer2":
            "The cryptocurrency lent through HARVEST FLOW is intended to be used for initiatives that improve the world, such as vehicle loan businesses or renewable energy projects. We refer to earning income while contributing to social good as a 'Social Action.' aiming for both economic and social success. Please see 'SOCIAL ACTION' for more details. The specific impact varies by project, so please also check the project page for further information.",
          "faq.question3":
            "I don't own any cryptocurrency. Can I still use the service?",
          "faq.answer3":
            "To use HARVEST FLOW, you need to own the cryptocurrency DAI.",
          "faq.question4": "Can the loan be canceled midway?",
          "faq.answer4":
            "In principle, mid-term cancellation of the loan is not allowed. However, since Proof of Support is issued as an NFT, it can be bought and sold on marketplaces such as OpenSea or MagicEden. While we are involved in creating collection pages and setting royalties on external marketplaces, we are not involved in the buying and selling process itself. Please refer to our Cryptocurrency Loan Agreement for more details.",
          "faq.question5": "How is the lending fee calculated?",
          "faq.answer5":
            "The lending fee is generally calculated based on the following formula:<ul><li>Interest: (Quantity of the same type of cryptocurrency corresponding to the number of loan units × lending rate × number of seconds from the time the lending was executed to the time our company receives the claim from the customer holding Proof of Support (if this time is after the three-year mark from execution, then the three-year mark)) / (60×60×24×365) - any lending fees already paid to the customer holding the Proof of Support.</li></ul>The frequency and timing of payments, as well as the lending rate, vary by project. Please refer to the project page for more details.",
          "faq.question6":
            "Are there any costs associated with using this service?",
          "faq.answer6":
            "There are no charges from us for using this service. However, users are responsible for covering the gas fees. When lending cryptocurrency to us, requesting the return of the lent cryptocurrency, or claiming the lending fee, you will need to pay the gas fees. Gas fees are transaction fees on the blockchain network and can vary based on transaction speed and network congestion. Please make sure to check the gas fees before proceeding with any transactions.",
          "faq.question7": "How can I get in touch for questions or inquiries?",
          "faq.answer7":
            "All inquiries are accepted in the HARVEST HALL <0>Discord.</0>",
          "homepage.pos.title": "POS<0>（Proof of Support)</0>",
          "homepage.pos.text":
            "When lending cryptocurrency to a project, you'll receive a POS (Proof of Support) as a digital certificate. This POS utilizes NFT (Non-Fungible Token) blockchain technology, ensuring both high transparency and resistance to tampering. By partnering with unique artists and brands for every project, we ensure that each certificate is one-of-a-kind and exclusively yours. Holding a POS enables your wallet to earn interest/principal and grants access to the Owner Page. You also have the option to sell it on external markets.",
          "homepage.social_action.title": "Social action",
          "homepage.social_action.text":
            "HARVEST FLOW centers its project on social actions that not only solve societal issues but also enhance the economic prosperity of those involved. By proactively utilizing cryptocurrencies with large market capitalizations globally, we aim to deliver sustainable benefits to both the world and our users.",
          "homepage.social_action.subtitle":
            "Key Focus Areas for HARVEST FLOW\nTo Enhance the World",
          "homepage.social_action.usecase": "Solving Social Issues",
          "homepage.social_action.financial": "Sharing Prosperity",
          "homepage.social_action.growth": "The Future of Emerging Countries",
          "homepage.social_action.transparency": "Tranparency in Fund Usage",
          "homepage.social_action.culture": "Supporting Art & Culture",
          "homepage.social_action.learn_more": "Learn more",
          "homepage.how_to_start.title": "How to start",
          "homepage.how_to_start.step1.title": "Lending Application",
          "homepage.how_to_start.step1.text":
            "After agreeing to the terms of use on the project page that is currently accepting applications, select the amount and apply (MINT).<0>*Please ensure that you hold the cryptocurrency accepted by the project on the supported blockchain.</0>",
          "homepage.how_to_start.step2.title":
            "Proof of Support (POS) NFT Issuance",
          "homepage.how_to_start.step2.text":
            "A POS NFT will be issued to the wallet used for lending.",
          "homepage.how_to_start.step3.title":
            "Receiving Interest and Principal",
          "homepage.how_to_start.step3.text":
            "To claim the interest and principal, connect the wallet holding the POS and access the account page.",
          "homepage.how_to_start.step4.title": "Checking Project Details",
          "homepage.how_to_start.step4.text":
            "You can view project and/or RWA details via the <0>Owner Page.</0>",
          "partners.title": "SUPPORTER",
          "partners.kunimitsu.name": "Hironao Kunimitsu",
          "partners.kunimitsu.position": "FiNANCiE CEO",
          "partners.masakazu.name": "Masakazu Kikuchi",
          "partners.masakazu.position": "Secured Finance AG Founder & CEO",
          "partners.kanemoto.name": "Kaneto Kanemoto",
          "partners.kanemoto.position": "HEART SHAKER Association",
          "partners.nagase.name": "Takeshi Nagase",
          "partners.nagase.position": "AMT Partner Legal Counsel",
          "partners.yamashita.name": "Takumi Yamashita",
          "partners.yamashita.position": "Astar Network Co-Founder",
          "partners.narimoto.name": "Haruo Narimoto",
          "partners.narimoto.position": "TMI Partner Legal Counsel",
          "partners.shieldify.name": "Shieldify",
          "partners.shieldify.position": "",
          "partners.watanabe.name": "Sota Watanabe",
          "partners.watanabe.position": "Astar Network Founder",
          "partners.deform.name": "Deform",
          "partners.deform.position": "",
          "footer.claim":
            "We provide the latest updates and support through our community.",
          "project.hero.title":
            "Driving the Future of\nEmerging Countries TUK TUK\nLoan Business in Cambodia",
          "project.overview.title": "Project Overview",
          "project.point1.text":
            "Phnom Penh, the capital of Cambodia, has achieved a high economic growth rate of 7% (GDP).",
          "project.point2.text":
            "Advanced IoT technology is utilized for managing tuk tuk vehicles, and a scholarship program is introduced to support drivers.",
          "project.point3.text":
            "An official partnership established with Global Mobility Service, a prominent FinTech company in Japan.",
          "project.table.interest": "Interest (Annual Rate)",
          "project.table.loan_period": "Lending Period",
          "project.table.max_lending": "Max Lending Amount",
          "project.table.amount_per_share": "Amount per Share",
          "project.table.total_shares": "Total Shares For Sale",
          "project.table.collateral": "Collateral",
          "project.table.category": "Category",
          "project.table.region": "Region",
          "project.table.repayment": "Principal Repayment Method",
          "project.table.bullet_repayment": "Bullet Repayment at Maturity",
          "project.table.repayment_frequency": "Repayment Frequency",
          "project.table.monthly": "Monthly",
          "project.table.total_repayments": "Total Number of Repayments",
          "project.table.times": "times",
          "project.table.vehicle": "Vehicle",
          "project.table.vehicle_leasing": "Vehicle leasing",
          "project.table.cambodia": "Cambodia",
          "project.table.month": "month",
          "project.collateralText":
            'Please refer to "・Collateral" in the later section "About the Scheme."',
          "project.schedule.title": "Schedule",
          "project.schedule.about_project.title": "About the project",
          "project.schedule.about_project.text":
            'The inaugural project, "Cambodia Tuk Tuk Loan Business Driving the Future of Emerging Countries," was born from a collaboration with Global Mobility Service Inc. (hereafter referred to as GMS), specializing in loan services for tuk tuk drivers in Southeast Asia.\n\nGMS successfully implemented an innovative IoT-based vehicle operation management system, enabling real-time monitoring of drivers\' income and vehicle operation status, making various operational responses possible and achieving an almost zero default rate.\n\nThrough the use of this technology, we can now offer fair lending opportunities to individuals who were previously underserved, especially those from disadvantaged backgrounds.\n\nThe cryptocurrency assets borrowed by GMS from us will be used to purchase tuk tuks (three-wheeled taxis) in Phnom Penh, Cambodia, providing opportunities for economic independence to local drivers who are full of labor capacity and enthusiasm.\n\nWe invite you to participate in this economically and socially meaningful social action, where you can earn income while contributing to global prosperity through small lending.',
          "project.schedule.story.title": "Story",
          "project.schedule.story.subtitle":
            "The Current State of Cambodia's Remarkable Economic Growth",
          "project.schedule.story.text":
            "Cambodia is currently experiencing remarkable economic growth, particularly prominent among Southeast Asian nations. Its capital, Phnom Penh, has transformed into a vibrant city with a continuous construction boom.\n\nSuburban areas witness ongoing developments, including housing projects catering to the middle and upper class. With a GDP growth rate of 7% over the past five years, Cambodia has made significant strides, halving its poverty rate in eight years.\n\nOn the other hand, some regions do not benefit from economic growth, leading to a serious social problem of urban-rural disparities. Focusing on areas where funds do not reach, Cambodia has gained global attention in recent years as a promising destination for microfinance investments.\n\nCambodia ranks second in investment volume in the country portfolio of major microfinance investment vehicles in the Western world, trailing only behind India. Microfinance is a financial service that provides small-scale loans to marginalized low-income individuals and small businesses often left behind by traditional financial services. It plays a significant role in improving the livelihoods of people who do not benefit from economic growth and supporting the growth of small businesses.\n\nHARVEST FLOW will lend the cryptocurrency assets borrowed from lenders to GMS. In turn, GMS provides vehicle loans to tuk-tuk drivers in Cambodia, a market with attractive growth potential. Through this lending process, we offer you an opportunity to engage in a social action that combines high growth potential with significant social impact.",

          "project.borrower.title":
            "The Tuk Tuk Market and Driver Loans in Cambodia",
          "project.borrower.text":
            "Tuk tuks, three-wheeled taxis modified from motorcycles or bicycles, are widely used as a vital mode of transportation in major cities across Cambodia. They are popular among locals and tourists alike for their convenience in short-distance travel and affordable fares. In the capital city of Phnom Penh alone, there are approximately 12,000 tuk tuks, accounting for about 20% of the city's transportation and becoming an integral part of citizens' daily lives.\n\nMany tuk tuk drivers in Cambodia, who form the backbone of the country's transportation infrastructure, come from low-income backgrounds or rural areas seeking employment opportunities. However, securing funds to purchase their own tuk-tuk remains a major challenge. This is primarily due to the reluctance of banks and major microfinance institutions to provide loans to individual entrepreneurs.\n\nWhile the total loan portfolio of microfinance institutions in Cambodia exceeds $8 billion, most of it is directed towards small and medium enterprises, making it difficult for individual drivers striving for self-sufficiency to access these services.\n\nPhnom Penh, with over 5 million annual tourists, offers tuk tuk drivers an opportunity to earn up to $400, triple the average monthly income, which can be a significant stepping stone for them to escape poverty, provided they have the motivation to work.Many drivers we interviewed expressed joy in being able to send their children to school with their earnings, highlighting the transformative impact of their income.",
          "project.driver_interview_video": "Driver Interview Video",
          "project.pos.title": "About POS",
          "project.pos.subtitle": "(Proof of Support)",
          "project.pos.text":
            "When lending cryptocurrency to a project, you'll receive a POS (Proof of Support) as a digital certificate. This POS utilizes NFT (Non-Fungible Token) blockchain technology, ensuring both high transparency and resistance to tampering.\nBy partnering with unique artists and brands for every project, we ensure that each certificate is one-of-a-kind and exclusively yours.\nHolding a POS enables your wallet to earn interest/principal and grants access to the Owner Page. You also have the option to buy/sell it on external markets.\nWe are not involved in or responsible for transactions on external marketplaces for POS. For more details, please refer to our Terms of Use.",
          "project.artist_collaboration.text":
            "Artist\nBorn in Hokkaido in 1986. Izumida Lee began drawing at a young age and studied art while living in the United States.  In 2015, she relocated to Tokyo and launched her career as an artist in 2019. Her work primarily focuses on acrylic paintings, signboards, advertising art, and illustrations and text for window displays.",
          "project.about_the_borrower.title": "About the Borrower",
          "project.about_the_borrower.note":
            "For RWA-001, the actual borrower will be Apas Port Inc.\nPlease refer to the project scheme for more details.\nFor any inquiries regarding this project, please contact the community.",
          "project.about_the_borrower.company.title":
            "Global Mobility Service Inc.\nJapanese Fintech Company",
          "project.about_the_borrower.company.text":
            "Global Mobility Service (GMS), a leading Japanese FinTech company, specializes in providing mobility-related services leveraging IoT and cloud technologies.\n\nGMS operates two key systems, namely the Mobility-Cloud Connecting System (MCCS) and the Mobility Service Financial Platform (MFPS):\n\n1. Mobility-Cloud Connecting System (MCCS):\nMCCS is a platform that combines GMS's proprietary IoT devices with cloud systems. IoT devices installed in vehicles transmit real-time location and driving data to the cloud system. This enables efficient vehicle management, operation optimization, and enhanced safety.\n\nKey features include:\n- Real-time vehicle tracking\n- Driver behavior analysis\n- Detection of accidents and theft\n- Remote vehicle control (such as engine shutdown)\n- Maintenance schedule management\n\n\n2. Mobility Service Financial Platform (MFPS):\nMFPS is a cloud-based finance platform provided by GMS. This system leverages vehicle data collected from MCCS to construct a credit risk assessment model, enabling the provision of financial services for vehicle purchase or leasing to underserved segments (such as individuals or small businesses with low credit scores) that are often overlooked by traditional financial services.\n\nKey features include:\n- Construction of credit risk assessment models\n- Evaluation and provision of vehicle loans or leases\n- Management of loan or lease payments\n- Oversight of delinquencies and defaults\n\n\nGMS has released over 15,000 vehicles using these systems, primarily focusing on emerging markets to promote mobility-related services and financial inclusion. The company's services are deployed in Southeast Asian countries such as the Philippines, Cambodia, and Indonesia, contributing to local economic development and addressing societal challenges.\n\nThe tuk tuk loan offering in Cambodia commenced in October 2023, and it has already successfully released over 100 vehicles.",
          "project.about_the_scheme.title": "About the Scheme",
          "project.about_the_scheme.text":
            "HARVEST FLOW is a cryptocurrency lending service that connects businesses seeking support from around the world with users looking for investment opportunities in cryptocurrencies. By lending (lending) the cryptocurrency assets you hold through HARVEST FLOW for a certain period, you can receive interest corresponding to the type of cryptocurrency, quantity, and lending period.\n\nIn this inaugural project, Apas Port Inc., the operating company of HARVEST FLOW, will be the borrower. The collected assets ($DAI) will be lent to Apas Port, which will ultimately use the funds for the purchase of four tuk-tuk vehicles by GMS's local subsidiary in Cambodia. By making Apas Port the direct borrower, even if repayments from the lending destination do not proceed as initially expected due to driver defaults, economic conditions, or any other circumstances leading to a deterioration in the financial status of the aforementioned companies, we are obligated to return the principal and pay the interest to our customers.\n\n・Collateral\nTo secure the funds for repayment to our customers, we will set the four tuk-tuk vehicles to be purchased as collateral when lending the cryptocurrency assets to GMS.",
          "project.start_lending": "START LENDING",
          "project.total_interest": "Total interest",
          "project.expected_apr": "EXPECTED APR",
          "project.redemption": "REDEMPTION",
          "project.remaining_term": "REMAINING TERM",
          "project.you_can_mint": "YOU CAN MINT",
          "project.price": "Price",
          "project.total_supply": "Total supply",
          "project.ending_in":
            "Ending in {{days}}days {{hours}}hours {{minutes}}mins {{seconds}}seconds",
          "project.data_report.title": "Data Report",
          "project.data_report.text":
            "The release status of the vehicle can be checked.\nDetailed data is accessible on the Owner Page by connecting your wallet holding\na POS and selecting the relevant information via the Account Page.",
          "project.history.title": "Project History",

          "project.faq.question1.question": "How does HARVEST FLOW operate?",
          "project.faq.question1.answer":
            "HARVEST FLOW allows our company to borrow your cryptocurrency for a fixed period. After the contract period ends, we return the same type and amount of cryptocurrency that was borrowed, along with a lending fee calculated at a fixed rate, paid in the same type of cryptocurrency.",

          "project.faq.question2.question":
            "How does using HARVEST FLOW contribute to social good?",
          "project.faq.question2.answer":
            'The cryptocurrency lent through HARVEST FLOW is intended to be used for initiatives that improve the world, such as vehicle loan businesses or renewable energy projects. We refer to earning income while contributing to social good as a "Social Action," aiming for both economic and social success. Please see "SOCIAL ACTION" for more details. The specific impact varies by project, so please also check the project page for further information.',

          "project.faq.question3.question":
            "I don't own any cryptocurrency. Can I still use the service?",
          "project.faq.question3.answer":
            "To use HARVEST FLOW, you need to own the cryptocurrency DAI.",

          "project.faq.question4.question": "Can the loan be canceled midway?",
          "project.faq.question4.answer":
            "In principle, mid-term cancellation of the loan is not allowed. However, since Proof of Support is issued as an NFT, it can be bought and sold on marketplaces such as OpenSea or MagicEden. While we are involved in creating collection pages and setting royalties on external marketplaces, we are not involved in the buying and selling process itself. Please refer to our Cryptocurrency Loan Agreement for more details.",

          "project.faq.question5.question":
            "How is the lending fee calculated?",
          "project.faq.question5.answer":
            "The lending fee is generally calculated based on the following formula:\n<ul><li>Interest: (Quantity of the same type of cryptocurrency corresponding to the number of loan units × lending rate × number of seconds from the time the lending was executed to the time our company receives the claim from the customer holding Proof of Support (if this time is after the three-year mark from execution, then the three-year mark)) / (60×60×24×365) - any lending fees already paid to the customer holding the Proof of Support.</li></ul>\nThe frequency and timing of payments, as well as the lending rate, vary by project. Please refer to the project page for more details.",

          "project.faq.question6.question":
            "Are there any costs associated with using this service?",
          "project.faq.question6.answer":
            "There are no charges from us for using this service. However, users are responsible for covering the gas fees. When lending cryptocurrency to us, requesting the return of the lent cryptocurrency, or claiming the lending fee, you will need to pay the gas fees. Gas fees are transaction fees on the blockchain network and can vary based on transaction speed and network congestion. Please make sure to check the gas fees before proceeding with any transactions.",

          "project.faq.question7.question":
            "The vehicle status is displayed as NOT STARTED. When will it be updated?",
          "project.faq.question7.answer":
            "After the lending application period ends, the collected funds will be transferred to the operating company, which will use them to purchase the vehicle. Once the driver selection, device installation on the vehicle, and release process are completed, the data will be linked and the status will be updated.",

          "project.faq.question8.question":
            "What cryptocurrency is required to lend in RWA-001?",
          "project.faq.question8.answer":
            "You will need DAI on the Polygon chain. The purchase method is introduced here.",

          "project.faq.question9.question":
            "How can I earn interest after lending?",
          "project.faq.question9.answer":
            "By connecting the wallet holding your POS, you can claim your interest by pressing the HARVEST button on your account page.",

          "project.faq.question10.question":
            "When can I receive the first interest payment?",
          "project.faq.question10.answer":
            "Repayments to customers are linked to the contract with the borrower. Please refer to the project page of each project and the cryptocurrency loan agreement for details.",

          "project.faq.question11.question":
            "Do I need to create an account or submit identification to use the service?",
          "project.faq.question11.answer":
            "There is no need to register an account or submit identification. You can use the service simply by connecting a supported wallet like Metamask.",

          "project.faq.question12.question":
            "How can I get in touch for questions or inquiries?",
          "project.faq.question12.answer":
            "All inquiries are accepted in the HARVEST HALL Discord.",

          "account.total_equity": "TOTAL EQUITY(USD)",
          "account.your_apr": "Your APR",
          "account.boost": "Boost",
          "account.lending_now": "Lending Now",
          "account.total_interest": "TOTAL INTEREST",
          "account.point": "POINT",
          "account.rank": "Rank",
          "account.claimable_interest": "CLAIMABLE INTEREST",
          "account.claimable_principle": "CLAIMABLE PRINCIPLE",
          "account.project_history": "User history",
          "account.items": "Items",
          "owner.description": "Description",
          "owner.description.text":
            "The inaugural project RWA-001 involves crypto asset lending to a company that operates a tuk tuk loan business in Cambodia, a country that has experienced remarkable growth with a 7% GDP growth rate over the past five years and has attracted over 5 million tourists.",
          "owner.asset": "Asset",
          "owner.term": "Term",
          "owner.lending": "Lending",
          "owner.apr": "APR",
          "owner.go_to_project_page": "Go to project page",
          "owner.harvest.total_equity": "TOTAL EQUITY in USD",
          "owner.harvest.lending": "LENDING",
          "owner.harvest.total_interest_claimed": "TOTAL INTEREST CLAIMED",
          "owner.harvest.average_apr": "AVERAGE APR",
          "owner.harvest.claimable_interest": "CLAIMABLE INTEREST",
          "owner.harvest.claimable_principle": "CLAIMABLE PRINCIPLE",
          "owner.asset_overview.title": "Asset Overview",
          "owner.asset_overview.asset_id": "ASSET ID",
          "owner.asset_overview.number_of_payments": "Number of Payments",
          "owner.asset_overview.asset_type": "ASSEt type",
          "owner.asset_overview.vehicle": "Vehicle",
          "owner.asset_overview.vehicle_model": "Vehicle Model",
          "owner.asset_overview.mileage": "Mileage",
          "owner.asset_overview.mileage_time": "Mileage TIME",
          "owner.asset_overview.history": "HISTORY",
          "owner.asset_overview.driver_profile": "Driver Profile",
          "owner.asset_overview.name": "Name",
          "owner.asset_overview.sex": "Sex",
          "owner.asset_overview.driver_since": "Driver Since",
          "owner.asset_overview.location": "Location",
          "owner.rwa_data.title": "RWA Data",
          "owner.rwa_data.total_hours_worked": "Total hours worked",
          "owner.rwa_data.this_week": "this week",
          "owner.rwa_data.last_week": "last week",
          "owner.rwa_data.total_mileage": "total mileage",
          "owner.rwa_data.driving_chart": "driving chart",
          "owner.rwa_data.hours": "hours",
          "owner.rwa_data.mileages": "mileages",
          "owner.rwa_data.go_to_project_page": "Go to project page",
          "project.ended": "Ended",
          "privacypolicy.heading": "Privacy Policy",

          "privacypolicy.text1":
            'Apas Port Inc. (https://apasport.xyz/) (hereinafter referred to as "the Company") has established the following privacy policy (hereinafter referred to as "this Policy") and will handle personal information appropriately in accordance with this Policy. The meanings of the terms used in this Policy shall conform to the Act on the Protection of Personal Information (Act No. 57 of 2003, as amended, hereinafter referred to as the "Personal Information Protection Act").',

          "privacypolicy.text2":
            "Article 1 (Items of Personal Information Collected)\nThe Company will collect the following personal information, in addition to any other personal information necessary to achieve the purposes listed in the following article:\n- Name, gender, occupation, company name, job title within the company, email address, and SNS username, etc.",

          "privacypolicy.text3":
            "Article 2 (Purpose of Use)\nThe Company will use the acquired personal information within the scope necessary to achieve the following purposes:\n1. For the development and provision of the Company's products and services\n2. To determine whether customers meet the registration requirements for the Company's services\n3. To verify the identity of customers\n4. To fulfill the Company's obligations to customers\n5. To provide customers with information and notifications regarding the Company's products and services\n6. To respond to inquiries regarding the Company's products and services\n7. To conduct advertising, promotion, and marketing related to the Company's services\n8. To implement fraud prevention measures necessary for the secure operation of the Company's website, etc.\n9. To comply with laws and regulations\n10. To conduct various surveys and analyses necessary for the above purposes of use\n11. To provide information to third parties by the methods described in this Policy",

          "privacypolicy.text4":
            "Article 3 (Provision to Third Parties)\nThe Company will not provide the acquired personal information to third parties without prior consent from the individual, except in the following cases:\n1. When required by law\n2. When necessary to protect the life, body, or property of a third party and it is difficult to obtain the individual's consent\n3. When particularly necessary for public health improvement or healthy child development promotion and it is difficult to obtain the individual's consent\n4. When cooperation is necessary for a national institution, local public body, or its agent to perform legally prescribed duties, and obtaining the individual's consent would interfere with the performance of those duties\n5. When disclosure of personal information is requested by a court, public prosecutor's office, police, or other authority with similar powers under proper procedures\n6. When the third party is an academic research institution, etc. (an institution or organization conducting academic research or a person belonging to such an institution or organization), and the third party needs to handle the provided personal information for academic research purposes (including cases where the purpose is partly academic research and excluding cases where it may unjustly infringe on the rights and interests of individuals)\n7. When providing personal data in connection with the delegation of all or part of the handling of personal data within the scope necessary to achieve the purposes of use\n8. When personal information is provided in connection with a business succession due to a merger or other reason and is handled within the scope of the purposes of use before the succession",

          "privacypolicy.text5":
            "Article 4 (Security Management Measures)\nThe Company will establish organizational, human, physical, and technical security management measures to prevent unauthorized access, leakage, loss, or damage of personal information and will take necessary and appropriate measures to properly manage customers' personal information and specific personal information, etc.",

          "privacypolicy.text6":
            "Article 5 (Requests for Disclosure, Correction, Suspension of Use, Inquiries, Complaints, etc.)\n1. If you wish to request the disclosure, correction, addition, deletion, suspension of use, erasure, or suspension of provision to third parties of retained personal data under the Personal Information Protection Act, the Company will promptly disclose, or correct or suspend use, within the necessary scope after confirming that the request is from the individual and that it meets the requirements prescribed by law. However, this does not apply if the Company is not obligated to do so by law or other regulations.\n2. If you wish to make a request as described above or make inquiries or complaints regarding the handling of personal information, please contact the following inquiry desk. Please note that a fee may be charged depending on the disclosure method for the disclosure of retained personal data or third-party provision records.\n\nEmail: privacy@harvestflow.io",

          "privacypolicy.text7":
            "Article 6 (Regarding Cookies, etc.)\nThe Company may use services utilizing cookies and similar technologies (hereinafter referred to as \"External Services\") for the purpose of analyzing access history to the Company's website to improve the Company's website and services, or for the purpose of providing more customized advertisements to individual customers. Information about users may be transmitted to external service providers via cookies and similar technologies (hereinafter referred to as \"External Transmission\"). The Company discloses the following information regarding External Transmission based on Article 27-12 of the Telecommunications Business Act (Act No. 86 of 1984, as amended).\n1. Google Analytics\n   - Service Provider Name: Google LLC\n   - Information Sent: Cookie ID, access history to the website, browser type and settings, device type and settings, IP address, etc.\n   - Purpose of Use by the Company: Analysis of access history to the Company's website, improvement of the Company's website and services, and provision of advertisements\n   - Purpose of Use by the Recipient: Provision of access analysis services, etc. (Details can be found at https://policies.google.com/privacy#whycollect)",

          "privacypolicy.text8":
            "Article 7 (Revisions)\nThe Company may revise this Policy to protect personal information or to comply with changes in laws and regulations.\n\nEstablished on August 1, 2024\n\n―\n\nDisclaimer:\nThis English translation of the Privacy Policy is provided for convenience only. In the event of any inconsistency or discrepancy between the Japanese original and this English translation, the Japanese original shall prevail. Please refer to the Japanese version for the complete and accurate legal text.",

          lendingTerms: "I agree to the crypto lending terms.",
          "account.letsNFTLend": "You have no NFT. Lend immediately!",
        },
      },
      jp: {
        translation: {
          "homepage.hero.title": "Harvest Flow",
          "homepage.hero.subtitle": "飛び込もう。新しい世界の流れに。",
          "homepage.hero.text":
            "受け取り利息8%のソーシャルアクション。\n世界と繋がる暗号資産レンディング。",
          "homepage.our_projects.title": "プロジェクトハイライト",
          "homepage.our_projects.heading":
            "新興国の未来をドライブする\nカンボジア トゥクトゥクローン事業",
          "homepage.our_projects.text":
            "初回ブロジェクトRWA-001は過去5年間のGDP成長率が7%と急速な経済成長を遂げ、500万人を超える旅行客が訪れるなど、目覚ましい発展を遂げているカンボジアでトゥクトゥクローン事業を展開する優良企業に暗号資産レンディングを行います。",
          "homepage.our_projects.note":
            "8月26日受付開始\nエバンジェリストキャンペーン応募は<0>こちら</0>",
          "homepage.our_projects.btn":
            "<0>8月26日受付開始\nエバンジェリストキャンペーン応募はこちら</0>",
          "homepage.our_projects.coming_soon": "準備中",
          "homepage.our_projects.vehicle": "車両",
          "general.play_movie": "動画を再生する",
          "general.apy": "年率（APY）",
          "general.status": "ステータス",
          "general.asset_type": "資産タイプ",
          "general.view_more": "詳細を見る",
          "general.coming_soon": "Coming soon",
          "general.next_project": "Next project",
          "general.connect_wallet": "ウォレット接続",
          "general.disconnect_wallet": "ウォレット解除",
          "general.connect_wallet_account": "アカウントページ",
          "homepage.about.title": "HARVEST FLOWについて",
          "homepage.about.heading":
            "受け取り利息8%の\nソーシャルアクション。\n世界と繋がる暗号資産レンディング。",
          "homepage.about.text":
            "HARVEST FLOWは、暗号資産を一定期間事業者に貸し出すことで安定的なインカムゲインを得ながら世界をよくする事業を応援して社会貢献ができるサービスです。金銭的なリターンを超えた、世界中の実りを収穫（Harvest）し、資金が流れる（Flow）ことで社会的、経済的な変化を生み出す新しい形のソーシャルアクションを提供します。\n\n集まった資金は将来にわたって収益を生む現実資産（RWA）への投資に使われ、お客様はソーシャルアクションの可視化を通して、自分の応援が社会にどのような良い影響をもたらしているかを実感することができます",
          "homepage.how_it_works.title": "仕組み",
          "homepage.features.title": "特徴",
          "homepage.features.feature1_title":
            "1. 少額からの暗号資産レンディングで堅実な利息を実現",
          "homepage.features.feature1_text":
            "少額からの暗号資産レンディングを可能にすることで、より多くの人々が安定したインカムゲインを得られます。従来の企業融資では、プラットフォーム手数料や管理コストの比重が大きいため、最低融資額が高額に設定されることが多く、小口の投資家にとって参入障壁となっていました。暗号資産を活用することで、コストを大幅削減し、暗号資産をお持ちのお客様なら、誰でも利用できます。",
          "homepage.features.feature2_title":
            "2. 現地優良企業との連携で、安心・透明な運用",
          "homepage.features.feature2_text":
            "新興国の現地優良企業との戦略的提携を通じて、安心で透明性の高い運用を実現しています。現地のニーズを深く理解し、信頼できるパートナー企業を厳選することで、レンディング先の事業の健全性を高めます。また、ブロックチェーンやIoT技術を活用し、資金の流れを可視化することで、高い透明性を確保します。",
          "homepage.features.feature3_title":
            "直感的な操作で、誰でも、どこでも、わかりやすく",
          "homepage.features.feature3_text":
            "ユーザーフレンドリーなインターフェースを提供し、誰もが直感的に操作できるプラットフォームを提供します。暗号資産やブロックチェーンの専門知識がなくても、簡単にレンディングに参加できるように暗号資産取引所やエコシステムパートナーと協力し、初心者でもわかりやすく利用できる環境を提供します。",
          "homepage.features.feature4_title":
            "3. DAIでカンタン、本人確認も不要",
          "homepage.features.feature4_text":
            "ステーブルコインであるDAIを利用することで、価格変動リスクを気にする必要なく、より手軽にサービスを利用できます。さらに、煩雑な本人確認手続きが不要なため、サービス利用開始までのハードルを大幅に下げ、シンプルな手順で誰でも簡単にサービスを開始できます。",
          "homepage.faq.title": "よくあるご質問",
          "faq.question1":
            "HARVEST FLOWはどのようなスキームで提供していますか？",
          "faq.answer1":
            "HARVEST FLOWを通してお客様の保有する暗号資産を当社が一定期間貸借し、契約期間満了後に貸借した暗号資産と同種・同量の暗号資産をお返しするとともに、一定の料率で計算した貸借料を同種の暗号資産でお支払いするというサービスです。",
          "faq.question2":
            "HARVEST FLOWを利用することはどのように社会貢献につながりますか？",
          "faq.answer2":
            "HARVEST FLOWを通じてレンディングした暗号資産は、車のローン事業者や自然エネルギー事業者など、世界を良くする事業に使われることを予定しております。インカムゲインを得ながら、社会貢献をすることを私たちは「ソーシャルアクション」と呼び、経済的と社会的な成功を目指すことをミッションとしています。詳しくは「SOCIAL ACTION」をご覧ください。また、プロジェクトによっても異なるため、詳細はプロジェクトページもご確認ください。",
          "faq.question3":
            "暗号資産を持っていないのですが、サービスを利用することできますか",
          "faq.answer3":
            "HARVEST FLOWを利用するには暗号資産のDAIを保有している必要があります。",
          "faq.question4": "貸出後の途中解約はできますか。",
          "faq.answer4":
            "貸出後の途中解約は原則できません。ただし、Proof of Support（応援証明書）はNFTで発行されるため、OpenseaやMagicEdenなどのマーケットプレイスで売買することが可能です。なお、外部のマーケットプレイスでの取引に関して、当社は外部マーケットプレイスでのコレクションページの作成やロイヤリティの設定などに限り関与しますが、売買自体には一切関与いたしません。詳細は当社の暗号資産貸借取引約款をご確認ください。",
          "faq.question5": "貸借料はどのように計算されますか",
          "faq.answer5":
            "貸借料は原則下記の計算式に基づき計算されます。<ul><li>利息：貸借口数に対応する、元本と同種の暗号資産の数量×貸借料率×レンディング実行時からProof of Support（応援証明書）を保有するお客様からの請求が当社に到達した時点（当該時点が実行時から３年間を経過した時点より後の時点である場合には、実行時から３年間を経過した時点）までの秒数／（60×60×24×365）－当社が当該Proof of Support（応援証明書）を保有するお客様に対して支払い済みの貸借料</li></ul>受け取りの頻度や時期、貸借料率はプロジェクトによって異なるため、詳細はプロジェクトページでご確認ください。",
          "faq.question6":
            "このサービスを利用する際に発生する費用はありますか？",
          "faq.answer6":
            "本サービスの利用にあたって当社にお支払いいただく費用はありません。ただしガス代はお客様ユーザー様のご負担となります。お客様は当社への暗号資産の貸付け、貸し付けた暗号資産の返還請求又は貸借料請求を行う場合、ガス代を負担する必要があります。ガス代はブロックチェーンネットワーク上の取引手数料であり、取引のスピードやネットワークの混雑状況により変動します。ご利用の際は、取引前にガス代の確認をお願いいたします。",
          "faq.question7": "質問やお問い合わせはどこでできますか？",
          "faq.answer7":
            "HARVEST HALLの<0>Discord</0>でご質問を受け付けております。",
          "homepage.pos.title": "応援証明書<0>（PROOF OF SUPPORT）</0>",
          "homepage.pos.text":
            "プロジェクトに暗号資産を貸し出すとデジタル証明書としてPOS（Proof of Support、応援証明書）が発行されます。POSは透明性・耐改ざん性の高いNFT（Non-Fungible Token、非代替性トークン）というブロックチェーン技術を採用しています。POSを保有しているウォレットは利息と元本の受け取りや、オーナーページへのアクセスをすることができます。また、NFTは外部のマーケットプレイスで自由に売買することが可能です。アーティストやブランドとコラボレーションをした特別な作品が登録されており、あなただけの唯一無二の証明書になります。",
          "homepage.social_action.title": "ソーシャルアクション",
          "homepage.social_action.text":
            "HARVEST FLOWは社会課題の解決だけではなく、関わる人たちの経済的な豊かさも両立できるソーシャルアクションをプロジェクトの中心に据えています。グローバルで大きな時価総額を持つ暗号資産を前向きに活用することで、世界とユーザーに持続可能な実りを提供します。",
          "homepage.social_action.subtitle":
            "HARVEST FLOWが注力する\n世界をよくするキーワード",
          "homepage.social_action.usecase": "社会課題を解決",
          "homepage.social_action.financial": "豊かさをシェア",
          "homepage.social_action.growth": "新興国の未来",
          "homepage.social_action.transparency": "資金使途の透明性",
          "homepage.social_action.culture": "芸術文化を支援",
          "homepage.social_action.learn_more": "もっと詳しく見る",
          "homepage.how_to_start.title": "始め方",
          "homepage.how_to_start.step1.title": "レンディング申込",
          "homepage.how_to_start.step1.text":
            "現在申込募集しているプロジェクトページから利用規約に同意後、数量を選択し、申込（MINT）を行います。<0>*プロジェクトが受け付けている暗号資産を対応しているブロックチェーンに保有していることを確認してください。</0>",
          "homepage.how_to_start.step2.title": "Proof of Support（POS）発行",
          "homepage.how_to_start.step2.text":
            "レンディングに使ったウォレットにPOSが発行されます。",
          "homepage.how_to_start.step3.title": "利息、元本の受け取り",
          "homepage.how_to_start.step3.text":
            "POSを保有しているウォレットで接続後、アカウントページから利息や元本の受け取りができます。",
          "homepage.how_to_start.step4.title": "応援プロジェクト詳細の確認",
          "homepage.how_to_start.step4.text":
            "オーナーページからプロジェクトやRWAの詳細を確認できます。",
          "partners.title": "サポーター",
          "partners.kunimitsu.name": "國光 宏尚",
          "partners.kunimitsu.position": "フィナンシェ代表取締役CEO",
          "partners.masakazu.name": "キクチ・マサカズ",
          "partners.masakazu.position": "Secured Finance AG 創業者 & CEO",
          "partners.kanemoto.name": "兼元 謙任",
          "partners.kanemoto.position": "一般社団法人 HEART SHAKER 代表理事",
          "partners.nagase.name": "長瀨 威志",
          "partners.nagase.position":
            "アンダーソン・毛利・友常法律事務所 パートナー弁護士",
          "partners.yamashita.name": "山下 琢巳",
          "partners.yamashita.position": "Astar Network 共同創業者",
          "partners.narimoto.name": "成本 治男",
          "partners.narimoto.position": "TMI総合法律事務所 パートナー弁護士",
          "partners.shieldify.name": "Shieldify",
          "partners.shieldify.position": "",
          "partners.watanabe.name": "渡辺 創太",
          "partners.watanabe.position": "Astar Network 創業者",
          "partners.deform.name": "Deform",
          "partners.deform.position": "",
          "footer.claim":
            "最新情報の案内やサポートはコミュニティで行っております。",
          "project.hero.title":
            "新興国の未来をドライブする\nカンボジア トゥクトゥクローン事業",
          "project.overview.title": "プロジェクト概要",
          "project.point1.text":
            "カンボジアの首都プノンペンはGDP成長率7%と高い経済成長を遂げています。",
          "project.point2.text":
            "最先端のIoT技術でトゥクトゥクの車体管理を行い、ドライバーを支援するスカラーシップ制度を実現。",
          "project.point3.text":
            "日本のFinTech企業を代表するGlobal Mobility Serviceと提携。",
          "project.table.interest": "受取利息（年率）",
          "project.table.loan_period": "レンディング期間",
          "project.table.max_lending": "募集金額",
          "project.table.amount_per_share": "一口あたりの金額",
          "project.table.total_shares": "販売口数",
          "project.table.collateral": "担保",
          "project.table.category": "カテゴリー",
          "project.table.region": "地域",
          "project.table.repayment": "元本償還方法",
          "project.table.bullet_repayment": "満期一括返済",
          "project.table.repayment_frequency": "貸借料の支払頻度",
          "project.table.monthly": "毎月",
          "project.table.total_repayments": "貸借料支払合計回数",
          "project.table.times": "回",
          "project.table.vehicle": "車両",
          "project.table.vehicle_leasing": "車両リース",
          "project.table.cambodia": "カンボジア",
          "project.table.month": "ヶ月",
          "project.collateralText":
            "本項目における「担保」の詳細については、後記「スキームについて」における「・担保について」の項目をご参照ください。」",
          "project.schedule.title": "スケジュール",
          "project.schedule.about_project.title": "プロジェクトについて",
          "project.schedule.about_project.text":
            "初回となる本プロジェクト「新興国の未来をドライブするカンボジアトゥクトゥクローン事業」は、東南アジアのトゥクトゥクドライバー向けのローン事業に特化したGlobal Moblity Service株式会社（以下、GMS）との取り組みから誕生しました。\n\nGMSは、革新的なIoTを活用した車両の運行管理システムを導入し、ドライバーの収入状況や車両の稼働状況をリアルタイムで把握することで様々なオペレーション対応を可能とし、デフォルト率を限りなくゼロにすることに成功。\n\nこの技術を活用することで、これまで融資を受けることが難しかった貧困層にも、公平な融資の機会の提供が可能となりました。\nGMSが当社から借り入れた暗号資産はカンボジア、プノンペンでトゥクトゥク（三輪タクシー）の購入に充てられ、現地の労働能力と意欲に満ちたドライバーの方々に経済的自立の機会を提供します。\n\n少額からのレンディングを通してインカムゲインを得ながら、世界の実りを手助けすることのできる、経済的・社会的に意義のあるソーシャルアクションに参加してみませんか。",
          "project.schedule.story.title": "ストーリー",
          "project.schedule.story.subtitle": "経済成長著しいカンボジアの現状",
          "project.schedule.story.text":
            "現在のカンボジアは、東南アジア諸国の中でも特に高い経済成長を遂げており、首都プノンペンでは建設ラッシュが続く活気に満ちた都市へと発展しました。\n\n郊外では、中上級層向けの住宅開発も進められ、過去5年間のGDP成長率が7%と急速な経済成長を遂げ、貧困率も8年間で半減するなど、目覚ましい発展を遂げています。\n\nその一方で、経済成長の恩恵を受けられない地域も存在し、都市部と地方の格差は深刻な社会問題となっています。\nそういった資金が行き届かない地域などを中心に、近年、カンボジアはマイクロファイナンス投資の有望な投資先として世界的から注目を集めています。\n\n欧米の主要マイクロファイナンス投資ビークルの国別ポートフォリオにおいて、カンボジアはインドに次ぐ2番目の投資額を誇っています。\nマイクロファイナンスは、従来の金融サービスから取り残されがちな低所得者層や中小企業に対して、小口の融資を提供する金融サービスです。経済成長の恩恵を受けられない人々の生活改善や、中小企業の成長支援に大きな役割を果たしています。\n\nHARVEST FLOWではお客様からお借りした暗号資産をGMSに貸付けます。そのうえで、GMSが、魅力的な成長市場を持つカンボジアで車両ローンをトゥクトゥクドライバーに提供することで、高い成長性と社会的意義を兼ね備えたソーシャルアクションの機会をご提供します。",
          "project.borrower.title":
            "カンボジアのトゥクトゥク市場とドライバー向けローン",
          "project.borrower.text":
            "カンボジアの主要都市では、オートバイや自転車をベースに改造された三輪タクシーのトゥクトゥクが重要な交通手段として広く利用されています。短距離の移動に便利で料金も手頃なため、地元の人々や観光客に人気があります。首都プノンペンには約1万2,000台が存在し、市内の交通の約20%を担っており、市民の足として定着しています。 \n\nカンボジアの交通インフラを支えるトゥクトゥクドライバーの多くは、低所得層や地方からの出稼ぎ労働者であり、自らのトゥクトゥクを購入するための資金調達が大きな課題となっています。理由として挙げられるのが銀行や大手マイクロファイナンス機関の多くが、個人事業主への融資に積極的ではないことです。\n\nカンボジアのマイクロファイナンス機関の融資残高は80億米ドルを超えていますが、その多くは中小企業向けであり、ドライバーとして自立を目指す個人はサービスの対象になりにくいのが現状です。\n\n年間の観光客が500万人を超えるプノンペンでは、トゥクトゥクを手にすることで平均月収の3倍にもなる400米ドルを得ることが可能で、労働意欲があれば貧困から抜け出す大きなきっかけとなります。私たちが取材した多くのドライバーもその収入で子供を学校に通わせることが出来る喜びを生き生きと語ってくれました。",
          "project.driver_interview_video": "ドライバーインタビュー動画",
          "project.pos.title": "POSについて",
          "project.pos.subtitle": "PROOF OF SUPPORT - 応援証明書",
          "project.pos.text":
            "プロジェクトに暗号資産を貸し出すと一口ごとにデジタル証明書としてPOS（Proof of Support、応援証明書）が発行されます。POSは透明性・耐改ざん性の高いNFT（Non-Fungible Token、非代替性トークン）というブロックチェーン技術を採用しています。\n\nPOSを保有しているウォレットは利息と元本の受け取りや、オーナーページへのアクセスをすることができます。\n\nアーティストやブランドとコラボレーションをした特別な作品が登録されており、あなただけの唯一無二の証明書になります。\n\nPOSは外部のマーケットプレイスで自由に売買することが可能ですが、POSの外部のマーケットプレイスでの取引に関して、当社は一切関与いたしません。詳細は当社の暗号資産貸借取引約款をお読みください。",
          "project.artist_collaboration.text":
            "絵描き  1986年、北海道生まれ。幼少期から絵を描き始める。 アメリカ留学時に絵を学ぶ。 2015年より東京に拠点を移し、2019年より本格的に絵描きとしての活動をスタート。 アクリル画の作品を中心に、看板や宣伝美術、ウィンドウに用いられる絵や文字を描いている。",
          "project.about_the_borrower.title": "借り手について",
          "project.about_the_borrower.note":
            "RWA-0001では、お客様の貸付先は株式会社Apas Portになります。\n詳しくはスキームについてを参照ください。\n本プロジェクトに関して問い合わせは全てコミュニティへお願いいたします。",
          "project.about_the_borrower.company.title":
            "Global Mobility Service 株式会社\nJapanese Fintech Company",
          "project.about_the_borrower.company.text":
            "Global Mobility Service（グローバル・モビリティ・サービス、以下GMS）は、日本を代表するフィンテック企業であり、IoTとクラウドサービスを活用したモビリティ関連のサービスを提供しています。\n\nGMSは、MCCS（Mobility-Cloud Connecting System）とMSPF（Mobility Service Platform）という2つの主要なシステムを開発・運用しています。\n1. MCCS（Mobility-Cloud Connecting System）：\n「MCCS」は、自動車からの情報収集のみならず、遠隔でのモビリティの起動制御を、あらゆる車種に対して後付けで実装可能なIoTデバイスです。MCCSをモビリティに搭載し、オートファイナンスと関連付けることで、もし支払いが滞った場合でも、当社が遠隔で車のエンジン起動を制御し、料金の支払いを促進できる画期的な仕組みを構築しております。それにより、これまでローン審査を通過しなかった人々がファイナンスを受けられる機会を創出します。\n\n主な機能：\n- リアルタイムの車両追跡\n- ドライバーの運転行動分析\n- 事故や盗難の検知\n- 車両の遠隔制御（エンジンの起動制御\n- メンテナンススケジュールの管理\n2. MSPF（Mobility Service Platform）：\nMSPFは、GMSが提供するクラウドベースのファイナンスプラットフォームです。このシステムは、MCCSから収集された車両データを活用し、信用リスク評価モデルを構築することで、従来の金融サービスでは対象とされにくかった層（クレジットスコアが低い個人や中小企業など）に対して、車両購入やリースのための金融サービスを提供します。\n\n主な機能：\n- 信用リスク評価モデルの構築\n- 車両ローンやリースの審査と提供\n- ローンやリースの支払い管理\n- 延滞や債務不履行の管理\n\nGMSは、これらのシステムを活用することで、15000台を超える車両をリリースしており、新興国と先進国で、モビリティ関連のサービスと金融包摂を促進しています。同社のサービスは新興国においては、フィリピン、カンボジア、インドネシア、先進国においては日本で展開されており、それぞれの国の経済発展と社会課題の解決に貢献しています。\n\nカンボジアでのトゥクトゥクローン提供は2023年の10月からスタートし、既に100台を超える車両のリリースに成功しています",
          "project.about_the_scheme.title": "スキームについて",
          "project.about_the_scheme.text":
            "HARVEST FLOWは、世界中の支援を希望している事業者と暗号資産の運用先を探しているユーザをつなげる暗号資産レンディングサービスです。\n\nお客様が保有されている暗号資産を一定期間HARVEST FLOWを通して貸し付け（レンディング）していただくことで、銘柄や数量、貸出期間に応じた受取利息を受け取ることができます。\n\n第一弾となる本プロジェクトではHARVEST FLOWの運営会社である株式会社Apas Portが貸付先となります。集めた資産$DAIはApas Portに対する貸付を経由して、最終的にGMSのカンボジア現地法人の4台のトゥクトゥク車両購入資金に充てられます。Apas Portがお客様の直接的な貸付先となることで、ドライバーのデフォルト時や経済情勢等により貸付先からの返済が当初の想定通りになされなかった場合、または何らかの事情により上記の会社の財政状態が悪化した場合にも、当社がお客様に対する元本の返還及び貸借料の支払いを行う義務を負います。\n\n・担保について\n当社のお客様に対する返済原資を確保するために、当社がGMSに暗号資産の貸付けを行うにあたって、今回購入する4台のトゥクトゥクに担保を設定します。",

          "project.start_lending": "レンディングする",
          "project.total_interest": "総受取利息",
          "project.expected_apr": "受取利息（年）",
          "project.redemption": "元本償還",
          "project.remaining_term": "残期間",
          "project.you_can_mint": "ミント可能NFT数",
          "project.price": "値段",
          "project.total_supply": "総供給量",
          "project.ending_in":
            "{{days}}日{{hours}}時間{{minutes}}分{{seconds}}秒で終了",
          "project.data_report.title": "データレポート",
          "project.data_report.text":
            "車両のリリース状況を確認できます。\n個別の詳細データはPOSを所有しているウォレットを接続後、\nアカウントページから選択することでオーナーページで確認できます。",
          "project.history.title": "プロジェクトヒストリー",

          "project.faq.question1.question":
            "HARVEST FLOWはどのようなスキームで提供していますか？",
          "project.faq.question1.answer":
            "HARVEST FLOWを通してお客様の保有する暗号資産を当社が一定期間貸借し、契約期間満了後に貸借した暗号資産と同種・同量の暗号資産をお返しするとともに、一定の料率で計算した貸借料を同種の暗号資産でお支払いするというサービスです。",

          "project.faq.question2.question":
            "HARVEST FLOWを利用することはどのように社会貢献につながりますか？",
          "project.faq.question2.answer":
            "HARVEST FLOWを通じてレンディングした暗号資産は、車のローン事業者や自然エネルギー事業者など、世界を良くする事業に使われることを予定しております。インカムゲインを得ながら、社会貢献をすることを私たちは「ソーシャルアクション」と呼び、経済的と社会的な成功を目指すことをミッションとしています。詳しくは「SOCIAL ACTION」をご覧ください。また、プロジェクトによっても異なるため、詳細はプロジェクトページもご確認ください。",

          "project.faq.question3.question":
            "暗号資産を持っていないのですが、サービスを利用することできますか",
          "project.faq.question3.answer":
            "HARVEST FLOWを利用するには暗号資産のDAIを保有している必要があります。",

          "project.faq.question4.question": "貸出後の途中解約はできますか。",
          "project.faq.question4.answer":
            "貸出後の途中解約は原則できません。ただし、Proof of Support（応援証明書）はNFTで発行されるため、OpenseaやMagicEdenなどのマーケットプレイスで売買することが可能です。なお、外部のマーケットプレイスでの取引に関して、当社は外部マーケットプレイスでのコレクションページの作成やロイヤリティの設定などに限り関与しますが、売買自体には一切関与いたしません。詳細は当社の暗号資産貸借取引約款をご確認ください。",

          "project.faq.question5.question": "貸借料はどのように計算されますか",
          "project.faq.question5.answer":
            "貸借料は原則下記の計算式に基づき計算されます。\n<ul><li>利息：貸借口数に対応する、元本と同種の暗号資産の数量×貸借料率×レンディング実行時からProof of Support（応援証明書）を保有するお客様からの請求が当社に到達した時点（当該時点が実行時から３年間を経過した時点より後の時点である場合には、実行時から３年間を経過した時点）までの秒数／（60×60×24×365）－当社が当該Proof of Support（応援証明書）を保有するお客様に対して支払い済みの貸借料</li></ul>\n受け取りの頻度や時期、貸借料率はプロジェクトによって異なるため、詳細はプロジェクトページでご確認ください。",

          "project.faq.question6.question":
            "このサービスを利用する際に発生する費用はありますか？",
          "project.faq.question6.answer":
            "本サービスの利用にあたって当社にお支払いいただく費用はありません。ただしガス代はお客様ユーザー様のご負担となります。お客様は当社への暗号資産の貸付け、貸し付けた暗号資産の返還請求又は貸借料請求を行う場合、ガス代を負担する必要があります。ガス代はブロックチェーンネットワーク上の取引手数料であり、取引のスピードやネットワークの混雑状況により変動します。ご利用の際は、取引前にガス代の確認をお願いいたします。",

          "project.faq.question7.question":
            "REPORTSページで車両のステータスがNOT STARTEDと表示されていますが、いつ更新されますか。",
          "project.faq.question7.answer":
            "レンディング募集期間終了後、集まった資金を運用会社に送金し、その資金を使って車両を購入します。そしてドライバー選定、車両にデバイス装着、リリースというフローが終了次第、データが連携され、ステータスが更新されます。",

          "project.faq.question8.question":
            "RWA-001でレンディングするにはどの暗号資産が必要ですか。",
          "project.faq.question8.answer":
            "POLYGONチェーンのDAIが必要です。購入方法はこちらで紹介しています。",

          "project.faq.question9.question":
            "レンディングした後どのように利息を得ることができますか。",
          "project.faq.question9.answer":
            "POSを保有しているウォレットを接続している状態でアカウントページにて、HARVESTボタンを押すことでクレームできます。",

          "project.faq.question10.question":
            "最初の利息受け取りはいつからできますか。",
          "project.faq.question10.answer":
            "お客様への返済は貸付先との契約に連動します。各プロジェクトのプロジェクトページ及び暗号資産貸借取引約款をご確認ください。",

          "project.faq.question11.question":
            "サービスを使うために会員登録や身分証を提出する必要はありますか。",
          "project.faq.question11.answer":
            "本サービスは会員登録や身分証の提出をする必要はありません。Metamaskなどの対応しているウォレットを接続するだけでご利用いただけます。",

          "project.faq.question12.question":
            "その他の質問やお問い合わせはどこでできますか？",
          "project.faq.question12.answer":
            "HARVEST HALLのDiscordでご質問を受け付けております。",

          "account.total_equity": "総資産(USD)",
          "account.your_apr": "平均受取利息",
          "account.boost": "ブースト",
          "account.lending_now": "レンディング中",
          "account.total_interest": "総受取済利息",
          "account.point": "ポイント",
          "account.rank": "ランク",
          "account.claimable_interest": "受取可能利息",
          "account.claimable_principle": "受取可能元本",
          "account.project_history": "PROJECT HISTORY",
          "account.items": "アイテム",
          "owner.description": "説明",
          "owner.description.text":
            "初回ブロジェクトRWA-001は過去5年間のGDP成長率が7%と急速な経済成長を遂げ、500万人を超える旅行客が訪れるなど、目覚ましい発展を遂げているカンボジアでトゥクトゥクローン事業を展開する優良企業に暗号資産レンディングを行います。",
          "owner.asset": "資産",
          "owner.term": "期間",
          "owner.lending": "レンディング中",
          "owner.apr": "受取利息",
          "owner.go_to_project_page": "プロジェクトページへ",
          "owner.harvest.total_equity": "総資産(USD)",
          "owner.harvest.lending": "レンディング中",
          "owner.harvest.total_interest_claimed": "総受取済利息",
          "owner.harvest.average_apr": "平均受取利息",
          "owner.harvest.claimable_interest": "受取可能利息",
          "owner.harvest.claimable_principle": "受取可能元本",
          "owner.asset_overview.title": "資産概要",
          "owner.asset_overview.asset_id": "資産ID",
          "owner.asset_overview.number_of_payments": "支払い回数",
          "owner.asset_overview.asset_type": "資産タイプ",
          "owner.asset_overview.vehicle": "車両",
          "owner.asset_overview.vehicle_model": "車両モデル",
          "owner.asset_overview.mileage": "走行距離",
          "owner.asset_overview.mileage_time": "走行時間",
          "owner.asset_overview.history": "履歴",
          "owner.asset_overview.driver_profile": "ドライバープロフィール",
          "owner.asset_overview.name": "名前",
          "owner.asset_overview.sex": "性別",
          "owner.asset_overview.driver_since": "ドライバー開始",
          "owner.asset_overview.location": "場所",
          "owner.rwa_data.title": "RWAデータ",
          "owner.rwa_data.total_hours_worked": "総走行時間",
          "owner.rwa_data.this_week": "今週",
          "owner.rwa_data.last_week": "先週",
          "owner.rwa_data.total_mileage": "総走行距離",
          "owner.rwa_data.driving_chart": "走行チャート",
          "owner.rwa_data.hours": "時間",
          "owner.rwa_data.mileages": "距離",
          "owner.rwa_data.go_to_project_page": "プロジェクトページへ",
          "project.ended": "終了",
          "privacypolicy.heading": "プライバシーポリシー",
          "privacypolicy.text1":
            "株式会社Apas Port（https://apasport.xyz/）（以下「当社」といいます。）は、次のとおりのプライバシーポリシー（以下「本ポリシー」といいます。）を定め、これに基づき、個人情報を適正に取扱います。\nなお、本ポリシーで使用する用語の意味は、個人情報の保護に関する法律（平成15年法律第57号。その後の改正を含み、以下「個人情報保護法」といいます。）に準拠するものとします。",

          "privacypolicy.text2":
            "第１条（取得する個人情報の項目）\n当社は、次に掲げる個人情報のほか、次条に掲げる目的達成に必要となる個人情報を取得します。\n氏名、性別、ご職業、所属企業名、所属企業における役職、電子メールアドレス及びSNS上のユーザー名　等",

          "privacypolicy.text3":
            "第２条（利用目的）\n当社は、取得した個人情報を次に掲げる利用目的を達成するため必要な範囲内で利用します。\n（１） 当社の商品及びサービスの開発及び提供のため\n（２） お客様が当社のサービスの登録要件を満たしているかを判断するため\n（３） お客様ご本人であることを確認するため\n（４） 当社のお客様に対する債務を履行するため\n（５） 当社の商品及びサービスに関する当社からのご案内・情報提供を行うため\n（６） 当社の商品及びサービスに関する当社に対するお問い合わせへの対応を行うため\n（７） 当社のサービスに関する広告・宣伝・マーケティングを行うため\n（８） 当社ウェブサイト等の安全な運営に必要な不正対策のため\n（９） 法令及びコンプライアンスの遵守のため\n（10） 上記の各利用目的に必要な各種調査・分析を行うため\n（11） 本ポリシー記載の方法による、第三者への提供を行うため",

          "privacypolicy.text4":
            "第３条（第三者提供）\n当社は、本ポリシーで掲げる場合を除き、取得した個人情報を、本人の事前の同意を得ずに第三者に提供しません。\n（１） 法令に基づく場合\n（２） 第三者の生命、身体又は財産の保護に必要がある場合であって、本人の同意を得ることが困難である場合\n（３） 公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難である場合\n（４） 国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合で、本人の同意を得ることによりその事務の遂行に支障を及ぼす恐れがある場合\n（５） 裁判所、検察庁、警察又はこれらに準じた権限を有する機関から、適正な手続に基づき個人情報についての開示を求められた場合\n（６） 提供先の第三者が学術研究機関等である場合であって、その第三者が提供を受けた個人情報を学術研究目的で取り扱う必要がある場合\n（目的の一部が学術研究目的である場合を含み、個人の権利利益を不当に侵害する恐れがある場合を除く）\n（７） 利用目的の達成に必要な範囲内において個人データの取扱いの全部又は一部を委託することに伴って当該個人データを提供する場合\n（８） 合併その他の事由による事業の承継に伴い個人情報を提供する場合であって、承継前の利用目的の範囲で取り扱われる場合",

          "privacypolicy.text5":
            "第４条（安全管理措置）\n当社は、個人情報の不正アクセスや、個人情報の漏えい、滅失、毀損等を防止するために、組織的・人的・物理的・技術的な安全管理策を定め、必要かつ適切な措置を実施して、お客様等の個人情報・特定個人情報等を適切に管理いたします。",

          "privacypolicy.text6":
            "第５条（個人データの開示、訂正、停止等の請求、お問い合わせ、苦情等について等）\n１　個人情報保護法に基づき当社が保有する保有個人データの開示・訂正・追加・削除・利用の停止・消去・第三者への提供の停止、第三者提供記録の開示・訂正・追加・削除・利用の停止・消去をご請求される場合には、ご本人からのご請求であること、及び、同法に定める要件を満たしていることを確認の上、遅滞なく開示し、又は必要な範囲で訂正等若しくは利用停止等を行います。\n但し、同法その他の法令により、当社がこれらの義務を負わない場合は、この限りではありません。\n２　上記のご請求並びに個人情報の取扱いに関するお問い合わせ及び苦情等のお申し出をされる場合は、以下のお問い合わせ窓口までご連絡ください。\nなお、保有個人データ、第三者提供記録の開示については、その開示方法に応じた手数料をご請求させていただきます。\nEmail：privacy@harvestflow.io",

          "privacypolicy.text7":
            "第６条（Cookie等について）\n当社は、当社のウェブサイトへのお客様等のアクセス履歴を分析し、当社のウェブサイト及びサービスを改善するため、又は個々のお客様等に対してよりカスタマイズされた広告を提供する目的のため、Cookie及び類似技術を用いたサービス（以下「外部サービス」といい、Cookie及び類似技術により、外部サービス提供事業者に利用者に関する情報が送信されることを「外部送信」といいます。）を利用する場合があります。\n当社が電気通信事業法（昭和59年法律第86号。その後の改正を含みます。）第27条の12に基づき、外部送信に関して公表する事項は下記のとおりです。\n（１） Google Analytics\n・事業者名 Google LLC\n・送信される情報 Cookie ID、ウェブサイトへのアクセス履歴、ブラウザの種類・設定、デバイスの種類・設定、IPアドレス等\n・当社の利用目的 当社のウェブサイトへのアクセス履歴の分析、当社のウェブサイト及びサービスの改善、並びに広告の提供\n・送信先の利用目的 アクセス分析サービスの提供等(詳細はhttps://policies.google.com/privacy#whycollect)",

          "privacypolicy.text8":
            "第７条（改定）\n当社では、お客様等の個人情報の保護を図るために、また法令その他の規範の変更に対応するために、本ポリシーを改定することがあります。\n\n2024年8月1日制定",
          lendingTerms: "暗号資産貸借取引約款に同意します。",
          "account.letsNFTLend":
            "何も持っていません。今すぐレンディングしましょう！",

          "terms.heading": "約款",
          "terms.text1":
            "株式会社Apas Port（https://apasport.xyz/）（以下「当社」といいます。）は、次のとおりのプライバシーポリシー（以下「本ポリシー」といいます。）を定め、これに基づき、個人情報を適正に取扱います。\nなお、本ポリシーで使用する用語の意味は、個人情報の保護に関する法律（平成15年法律第57号。その後の改正を含み、以下「個人情報保護法」といいます。）に準拠するものとします。\n\n（取得する個人情報の項目）\n第1条　当社は、次に掲げる個人情報のほか、次条に掲げる目的達成に必要となる個人情報を取得します。\n●●\n\n（利用目的）\n第２条　当社は、取得した個人情報を次に掲げる利用目的を達成するため必要な範囲内で利用します。\n（１） 当社の商品・サービスの提供のため\n（２） 商品・サービスに関する当社からのご案内・情報提供を行うため\n（３） 商品・サービスに関する当社に対するお問い合わせへの対応を行うため\n（４） 広告・宣伝・マーケティングを行うため\n（５） 当社ウェブサイト等の安全な運営に必要な不正対策のため\n（６） 上記の各利用目的に必要な各種調査・分析を行うため\n（７） 本ポリシー記載の方法による、第三者への提供を行うため\n\n（第三者提供）\n第３条　当社は、本ポリシーで掲げる場合を除き、取得した個人情報を、本人の事前の同意を得ずに第三者に提供しません。\n（１） 法令に基づく場合\n（２） 第三者の生命、身体又は財産の保護に必要がある場合であって、本人の同意を得ることが困難である場合\n（３） 公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難である場合\n（４） 国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合で、本人の同意を得ることによりその事務の遂行に支障を及ぼす恐れがある場合\n（５） 裁判所、検察庁、警察又はこれらに準じた権限を有する機関から、適正な手続に基づき個人情報についての開示を求められた場合\n（６） 提供先の第三者が学術研究機関等（大学その他の学術研究を目的とする機関若しくは団体又はそれらに属する者）である場合であって、その第三者が提供を受けた個人情報を学術研究目的で取り扱う必要がある場合（目的の一部が学術研究目的である場合を含み、個人の権利利益を不当に侵害する恐れがある場合を除く）\n（７） 利用目的の達成に必要な範囲内において個人データの取扱いの全部または一部を委託することに伴って当該個人データを提供する場合\n（８） 合併その他の事由による事業の承継に伴い個人情報を提供する場合であって、承継前の利用目的の範囲で取り扱われる場合\n[（９） 第４条の共同利用の方法による場合]\n[（10） （第三者が外国に所在する場合）\n個人情報保護委員会が定める外国に所在する場合\n体制整備要件を満たしている場合]\n[２　当社が個人情報を提供する第三者が外国に所在する場合に関し、以下の情報を提供します。\n●●]\n\n[（共同利用）\n第４条　当社は、次のとおり、個人情報を共同利用します。\n（１） 共同利用する個人情報の項目\n●●\n（２） 共同利用する個人情報の利用目的\n●●\n（３） 共同利用者の範囲\n当社のグループ会社、当社並びに当社の有価証券報告書等に記載する連結子会社及び持分法適用関連会社\n（４） 共同利用の管理責任者\n当社（当社の住所及び代表者名は、上記[「会社概要」]をご覧ください。）]\n\n（安全管理措置）\n第５条　当社は、個人情報の不正アクセスや、個人情報の漏えい、滅失、毀損等を防止するために、組織的・人的・物理的・技術的な安全管理策を定め、必要かつ適切な措置を実施して、お客様等の個人情報・特定個人情報等を適切に管理いたします。\n\n（個人データの開示、訂正、停止等の請求、お問い合わせ、苦情等について等）\n第６条　個人情報保護法に基づき当社が保有する保有個人データの開示・訂正・追加・削除・利用の停止・消去・第三者への提供の停止、第三者提供記録の開示・訂正・追加・削除・利用の停止・消去をご請求される場合には、ご本人からのご請求であること、及び、同法に定める要件を満たしていることを確認の上、遅滞なく開示し、又は必要な範囲で訂正等若しくは利用停止等を行います。但し、同法その他の法令により、当社がこれらの義務を負わない場合は、この限りではありません。\n２　上記のご請求並びに個人情報の取扱いに関するお問い合わせ及び苦情等のお申し出をされる場合は、以下のお問い合わせ窓口までご連絡ください。なお、保有個人データ、第三者提供記録の開示については、その開示方法に応じた手数料をご請求させていただきます。\n[住所：\nEmail：\n電話番号：\n受付時間：平日●時～●時（土日祝日は除きます。）]\n\n［（Cookieについて）\n第７条　当社は、ウェブサイトにおけるお客様等の利用状況を分析するため、あるいは個々のお客様等に対してよりカスタマイズされたサービス・広告を提供する等の目的のため、Cookie及び類似技術を使用して一定の情報を収集する場合があります。］\n\n（改定）\n第８条　当社では、お客様等の個人情報の保護を図るために、また法令その他の規範の変更に対応するために、本ポリシーを改定することがあります。\n\n2024年6月1日制定",
        },
      },
    },
    fallbackLng: "jp",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    supportedLngs: ["en", "jp"],
    detection: {
      order: ["querystring"],
      lookupQuerystring: "lng",
    },
  });

const tagManagerArgs = {
  gtmId: "G-T10TL48SWJ",
};

TagManager.initialize(tagManagerArgs);

// Application to Render
const app = (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AppContext.Provider value={mainController}>
        <PageCoordinator />
      </AppContext.Provider>
    </BrowserRouter>
  </ThemeProvider>
);

// Render application in DOM
createRoot(document.getElementById("app")).render(app);
