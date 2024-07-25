import React, { createContext } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { createRoot } from "react-dom/client";
import PageCoordinator from "./pages/PageCoordinator";
import MainController from "./MainController";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import TagManager from "react-gtm-module";
import LanguageDetector from "i18next-browser-languagedetector";

import "./main.css";

console.log("[ERWT]: Renderer execution started");
export const AppContext = createContext(null);
const mainController = new MainController();

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
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
            "APPLICATIONS OPEN IN LATE JULY. PRE-REGISTER <0>HERE</0>.",
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
            "HARVEST FLOW is a service that securely holds your cryptocurrency for a specified period. At the end of the contract term, the original amount/type of cryptocurrency is returned, along with an interest payment calculated at a fixed rate, paid in the same cryptocurrency. Our lending service (structured as a consumer loan transaction) adheres to Japanese law, providing our customers with a secure and trustworthy experience.",
          "faq.question2":
            "How does using HARVEST FLOW contribute to social good?",
          "faq.answer2":
            "Lending through HARVEST FLOW is used for initiatives that improve the world, such as car loan companies and renewable energy businesses. Earning stable income gains while contributing to society is what we call 'Social Action,' and our mission is to achieve both economic and social success. For more details, please refer to 'Social Action.'",
          "faq.question3":
            "I don't own any cryptocurrency. Can I still participate?",
          "faq.answer3":
            "To use HARVEST FLOW, it is necessary to own cryptocurrency in a supported wallet. Check out the instructions on how to purchase cryptocurrency <0>here</0>.",
          "faq.question4": "Can the loan be canceled midway?",
          "faq.answer4":
            "Midway loan cancellation is generally not permitted. However, as the Proof of Support is issued as an NFT, it can be traded on marketplaces such as Opensea and MagicEden even during the loan period.",
          "faq.question5": "How are the principal and interest calculated?",
          "faq.answer5":
            "The interest received upon maturity is generally calculated using the following formula:<ul><li>Principal: Lending amount (cryptocurrency)</li><li>Interest: Lending amount (cryptocurrency) × Lending period × Annual rate ÷ 365 days</li></ul>The frequency and timing of payments vary by project, so please check the project page for details.",
          "faq.question6": "How can I get in touch for questions or inquiries?",
          "faq.answer6":
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
            "You can view project and/or RWA details via the Owner Page.",
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
          "project.table.loan_period": "Planned Loan Period",
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
          "project.schedule.title": "Schedule",
          "project.schedule.about_project.title": "About the project",
          "project.schedule.about_project.text":
            'The inaugural project, "Cambodia Tuk Tuk Loan Business Driving the Future of Emerging Countries," was born from a collaboration with Global Mobility Service (hereafter referred to as GMS), specializing in loan services for tuk tuk drivers in Southeast Asia.\n\nGMS successfully implemented an innovative IoT-based vehicle operation management system, enabling real-time monitoring of drivers\' income and vehicle operation status, leading to an almost zero default rate.\n\nThrough the use of this technology, we are now able to offer fair lending opportunities to individuals who were previously underserved, especially those from disadvantaged backgrounds, ensuring that everyone has an equal chance to access financial support.\n\nHARVEST FLOW, in partnership with GMS, will use the cryptocurrency assets ($DAI) collected from global support to purchase tuk tuks and provide opportunities through loans to motivated individuals in Cambodia, such as the drivers mentioned in the interviews, who are full of labor capacity and enthusiasm.\n\nWe invite you to be a part of this meaningful journey by lending small amounts and contributing to global prosperity, while also earning income through your participation.',
          "project.schedule.story.title": "Story",
          "project.schedule.story.subtitle":
            "The Current State of Cambodia's Remarkable Economic Growth",
          "project.schedule.story.text":
            "Cambodia is currently experiencing remarkable economic growth, particularly prominent among Southeast Asian nations. Its capital, Phnom Penh, has transformed into a vibrant city with a continuous construction boom.\n\nSuburban areas witness ongoing developments, including housing projects catering to the middle and upper class. With a GDP growth rate of 7% over the past five years, Cambodia has made significant strides, halving its poverty rate in eight years.\n\nOn the other hand, some regions do not benefit from economic growth, leading to a serious social problem of urban-rural disparities. Focusing on areas where funds do not reach, Cambodia has gained global attention in recent years as a promising destination for microfinance investments.\n\nCambodia ranks second in investment volume in the country portfolio of major microfinance investment vehicles in the Western world, trailing only behind India. Microfinance is a financial service that provides small-scale loans to marginalized low-income individuals and small businesses often left behind by traditional financial services. It plays a significant role in improving the livelihoods of people who do not benefit from economic growth and supporting the growth of small businesses.\n\nHARVEST FLOW provides opportunities for impactful social action by lending cryptocurrency assets entrusted by customers to reputable vehicle loan companies in Cambodia. This not only taps into Cambodia's attractive market but also combines high growth potential with social significance.",
          "project.borrower.title":
            "The Tuk Tuk Market and Driver Loans in Cambodia",
          "project.borrower.text":
            "Tuk tuks, three-wheeled taxis modified from motorcycles or bicycles, are widely used as a vital mode of transportation in major cities across Cambodia. They are popular among locals and tourists alike for their convenience in short-distance travel and affordable fares. In the capital city of Phnom Penh alone, there are approximately 12,000 tuk tuks, accounting for about 20% of the city's transportation and becoming an integral part of citizens' daily lives.\n\nMany tuk tuk drivers in Cambodia, who form the backbone of the country's transportation infrastructure, come from low-income backgrounds or rural areas seeking employment opportunities. However, securing funds to purchase their own tuk-tuk remains a major challenge. This is primarily due to the reluctance of banks and major microfinance institutions to provide loans to individual entrepreneurs.\n\nWhile the total loan portfolio of microfinance institutions in Cambodia exceeds $8 billion, most of it is directed towards small and medium enterprises, making it difficult for individual drivers striving for self-sufficiency to access these services.\n\nPhnom Penh, with over 5 million annual tourists, offers tuk tuk drivers an opportunity to earn up to $400, triple the average monthly income, which can be a significant stepping stone for them to escape poverty, provided they have the motivation to work.Many drivers we interviewed expressed joy in being able to send their children to school with their earnings, highlighting the transformative impact of their income.",
          "project.driver_interview_video": "Driver Interview Video",
          "project.pos.title": "About POS",
          "project.pos.subtitle": "(Proof of Support)",
          "project.pos.text":
            "When lending cryptocurrency to a project, you'll receive a POS (Proof of Support) as a digital certificate. This POS utilizes NFT (Non-Fungible Token) blockchain technology, ensuring both high transparency and resistance to tampering.\nBy partnering with unique artists and brands for every project, we ensure that each certificate is one-of-a-kind and exclusively yours. Holding a POS enables your wallet to earn interest/principal and grants access to the Owner Page. You also have the option to sell it on external markets.",
          "project.artist_collaboration.text":
            "Artist\nBorn in Hokkaido in 1986. Izumida Lee began drawing at a young age and studied art while living in the United States.  In 2015, she relocated to Tokyo and launched her career as an artist in 2019. Her work primarily focuses on acrylic paintings, signboards, advertising art, and illustrations and text for window displays.",
          "project.about_the_borrower.title": "About the Borrower",
          "project.about_the_borrower.note":
            "For RWA-001, the actual borrower will be Apas Port Inc.\nPlease refer to the project scheme for more details.\nFor any inquiries regarding this project, please contact the community.\nDiscord:",
          "project.about_the_borrower.company.title":
            "Global Mobility Service Inc.\nJapanese Fintech Company",
          "project.about_the_borrower.company.text":
            "Global Mobility Service (GMS), a leading Japanese FinTech company, specializes in providing mobility-related services leveraging IoT and cloud technologies.\n\nGMS operates two key systems, namely the Mobility-Cloud Connecting System (MCCS) and the Mobility Service Financial Platform (MFPS):\n\n1. Mobility-Cloud Connecting System (MCCS):\nMCCS is a platform that combines GMS's proprietary IoT devices with cloud systems. IoT devices installed in vehicles transmit real-time location and driving data to the cloud system. This enables efficient vehicle management, operation optimization, and enhanced safety.\n\nKey features include:\n- Real-time vehicle tracking\n- Driver behavior analysis\n- Detection of accidents and theft\n- Remote vehicle control (such as engine shutdown)\n- Maintenance schedule management\n\n\n2. Mobility Service Financial Platform (MFPS):\nMFPS is a cloud-based finance platform provided by GMS. This system leverages vehicle data collected from MCCS to construct a credit risk assessment model, enabling the provision of financial services for vehicle purchase or leasing to underserved segments (such as individuals or small businesses with low credit scores) that are often overlooked by traditional financial services.\n\nKey features include:\n- Construction of credit risk assessment models\n- Evaluation and provision of vehicle loans or leases\n- Management of loan or lease payments\n- Oversight of delinquencies and defaults\n\n\nGMS has released over 15,000 vehicles using these systems, primarily focusing on emerging markets to promote mobility-related services and financial inclusion. The company's services are deployed in Southeast Asian countries such as the Philippines, Cambodia, and Indonesia, contributing to local economic development and addressing societal challenges.\n\nThe tuk tuk loan offering in Cambodia commenced in October 2023, and it has already successfully released over 100 vehicles.",
          "project.about_the_scheme.title": "About the Scheme",
          "project.about_the_scheme.text":
            "・Scheme\nHARVEST FLOW is a cryptocurrency lending service that connects businesses seeking global support with users looking to invest their cryptocurrency. By lending your cryptocurrency through HARVEST FLOW to businesses for a specified period, you can receive interest based on the type, quantity, and duration of the loan.\n\nIn the first phase of this project, Apas Port Co., Ltd., the operating company of HARVEST FLOW, will act as the effective borrower. The collected $DAI assets will be lent to Apas Port, which will then be used to fund the purchase of four tuk-tuk vehicles for Global Mobility Service (GMS) in Cambodia. The company will provide loans to local drivers for the tuk-tuks, and their repayments will be used to pay back the lenders. Typically, GMS would be the direct borrower, but for this inaugural project, Apas Port will act as an intermediary. This arrangement ensures that if the drivers default, the economic situation worsens, or the financial condition of the above-mentioned companies deteriorates, the principal and interest are guaranteed.\n\n・Collateral\nThe four tuk-tuk vehicles purchased in this project will have a first-priority lien set by Apas Port Co., Ltd. through GMS Cambodia. By establishing the lien based on legal expert advice, we have built a more controlled risk lending scheme.",
          "project.start_lending": "Start lending",
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
          "project.faq.question1.question":
            "The vehicle status is displayed as NOT STARTED. When will it be updated?",
          "project.faq.question1.answer":
            "After the lending application period ends, the collected funds will be transferred to the operating company, which will use them to purchase the vehicle. Once the driver selection, device installation on the vehicle, and release process are completed, the data will be linked and the status will be updated.",
          "project.faq.question2.question":
            "Where can I purchase DAI on the BASE chain?",
          "project.faq.question2.answer": "",
          "project.faq.question3.question":
            "I do not own any cryptocurrencies. Can I still use the service?",
          "project.faq.question3.answer": "",
          "project.faq.question4.question": "Can the loan be canceled midway?",
          "project.faq.question4.answer": "",
          "project.faq.question5.question": "How is the interest calculated?",
          "project.faq.question5.answer": "",
          "project.faq.question6.question":
            "How can I get in touch for questions or inquiries?",
          "project.faq.question6.answer": "",
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
            "7月下旬募集開始\n事前登録は<0>こちら</0>",
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
          "homepage.about.title": "HARVEST FLOWについて",
          "homepage.about.heading":
            "受け取り利息8%の\nソーシャルアクション。\n世界と繋がる暗号資産レンディング。",
          "homepage.about.text":
            "HARVEST FLOWは、暗号資産を一定期間事業者に貸し出すことで安定的なインカムゲインを得ながら世界をよくする事業を応援して社会貢献ができるサービスです。金銭的なリターンを超えた、世界中の実りを収穫（Harvest）し、資金が流れる（Flow）ことで社会的、経済的な変化を生み出す新しい形のソーシャルアクションを提供します。\n\n集まった資金は将来にわたって収益を生む現実資産（RWA）への投資に使われ、お客様はソーシャルアクションの可視化を通して、自分の応援が社会にどのような良い影響をもたらしているかを実感することができます",
          "homepage.how_it_works.title": "仕組み",
          "homepage.features.title": "特徴",
          "homepage.features.feature1_title":
            "少額からの暗号資産レンディングで堅実な利息を実現",
          "homepage.features.feature1_text":
            "少額からの暗号資産レンディングを可能にすることで、より多くの人々が安定したインカムゲインを得られます。従来の企業融資では、プラットフォーム手数料や管理コストの比重が大きいため、最低融資額が高額に設定されることが多く、小口の投資家にとって参入障壁となっていました。暗号資産を活用することで、コストを大幅削減し、暗号資産をお持ちのお客様なら、誰でも利用できます。",
          "homepage.features.feature2_title":
            "現地優良企業との連携で、安心・透明な運用",
          "homepage.features.feature2_text":
            "新興国の現地優良企業との戦略的提携を通じて、安心で透明性の高い運用を実現しています。現地のニーズを深く理解し、信頼できるパートナー企業を厳選することで、レンディング先の事業の健全性を高めます。また、ブロックチェーンやIoT技術を活用し、資金の流れを可視化することで、高い透明性を確保します。",
          "homepage.features.feature3_title":
            "直感的な操作で、誰でも、どこでも、わかりやすく",
          "homepage.features.feature3_text":
            "ユーザーフレンドリーなインターフェースを提供し、誰もが直感的に操作できるプラットフォームを提供します。暗号資産やブロックチェーンの専門知識がなくても、簡単にレンディングに参加できるように暗号資産取引所やエコシステムパートナーと協力し、初心者でもわかりやすく利用できる環境を提供します。",
          "homepage.features.feature4_title": "DAIでカンタン、本人確認も不要",
          "homepage.features.feature4_text":
            "ステーブルコインであるDAIを利用することで、価格変動リスクを気にする必要なく、より手軽にサービスを利用できます。さらに、煩雑な本人確認手続きが不要なため、サービス利用開始までのハードルを大幅に下げ、シンプルな手順で誰でも簡単にサービスを開始できます。",
          "homepage.faq.title": "よくあるご質問",
          "faq.question1":
            "HARVEST FLOWはどのようなスキームで提供していますか？",
          "faq.answer1":
            "HARVEST FLOWはお客様の保有する暗号資産を一定期間お預かりし、契約期間満了後にお預かりした暗号資産と同量・同等の暗号資産をお返しするとともに、一定の料率で計算した貸借料をその暗号資産でお支払いするというサービスです。 日本法に準拠した暗号資産レンディング（消費貸借取引）サービスを提供しておりますため、お客さまには安心してご利用いただけます。",
          "faq.question2":
            "HARVEST FLOWを利用することはどのように社会貢献につながりますか",
          "faq.answer2":
            "HARVEST FLOWを通じたレンディングは車のローン事業者や自然エネルギー事業者など、世界を良くする事業に使われます。安定したインカムゲインを得ながら、社会貢献をすることを私たちは「ソーシャルアクション」と呼び、経済的と社会的な成功を目指すことをミッションとしています。詳しくは「SOCIAL ACITON」をご覧ください。",
          "faq.question3":
            "暗号資産を持っていないのですが、サービスを利用することできますか",
          "faq.answer3":
            "HARVEST FLOWを利用するには暗号資産をサポートされているウォレットで所有している必要があります。暗号資産の購入の仕方は<0>こちら</0>で紹介しています",
          "faq.question4": "貸出後の途中解約はできますか。",
          "faq.answer4":
            "貸出後の途中解約は原則できません。ただし、Proof of Support（応援証明書）はNFTで発行されるため、OpenseaやMagicEdenなどのマーケットプレイスで売買することが可能です。",
          "faq.question5": "元本と受取利息はどのように計算されますか",
          "faq.answer5":
            "満期償還時に受け取れる元本と利息は原則下記の計算式で受け取れます。<ul><li>元　本：貸出数量（暗号資産）</li><li>利息：貸出数量（暗号資産） × 貸出期間 × 年率 ÷ 365日</li></ul>受け取りの頻度や時期はプロジェクトによって異なるため、詳細はプロジェクトページでご確認ください。",
          "faq.question6": "質問やお問い合わせはどこでできますか？",
          "faq.answer6":
            "HARVEST HALLの<0>Discord</0>でご質問を受け付けております。",
          "homepage.pos.title": "応援証明書<0>（PROOF OF SUPPORT）</0>",
          "homepage.pos.text":
            "プロジェクトに暗号資産を貸し出すとデジタル証明書としてPOS（Proof of Support、応援証明書）が発行されます。POSは透明性・耐改ざん性の高いNFT（Non-Fungible Token、非代替性トークン）というブロックチェーン技術を採用しています。POSを保有しているウォレットは利息と元本の受け取りや、オーナーページへのアクセスをすることができます。また、NFTは外部のマーケットプレイスで自由に売買することが可能です。アーティストやブランドとコラボレーションをした特別な作品が登録されており、あなただけの唯一無二の証明書になります。",
          "homepage.social_action.title": "ソーシャルアクション",
          "homepage.social_action.text":
            "HARVEST FLOWは社会課題の解決だけではなく、関わる人たちの経済的な豊かさも両立できるソーシャルアクションをプロジェクトの中心に据えています。グローバルで大きな時価総額を持つ暗号資産を前向きに活用することで、世界とユーザーに持続可能な実りを提供します。",
          "homepage.social_action.subtitle":
            "HARVEST FLOWが\n注力する世界をよくするキーワード",
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
          "project.table.loan_period": "予定運用期間",
          "project.table.max_lending": "募集金額",
          "project.table.amount_per_share": "一口あたりの金額",
          "project.table.total_shares": "販売口数",
          "project.table.collateral": "担保",
          "project.table.category": "カテゴリー",
          "project.table.region": "地域",
          "project.table.repayment": "元本償還方法",
          "project.table.bullet_repayment": "満期一括返済",
          "project.table.repayment_frequency": "返済頻度",
          "project.table.monthly": "毎月",
          "project.table.total_repayments": "返済合計回数",
          "project.table.times": "回",
          "project.table.vehicle": "車両",
          "project.table.vehicle_leasing": "車両リース",
          "project.table.cambodia": "カンボジア",
          "project.table.month": "ヶ月",
          "project.schedule.title": "スケジュール",
          "project.schedule.about_project.title": "プロジェクトについて",
          "project.schedule.about_project.text":
            "初回となる本プロジェクト「新興国の未来をドライブするカンボジアトゥクトゥクローン事業」は、モビリティに特化したローン提供を行うFintech企業、Global Moblity Service株式会社（以下、GMS）へドル建てで貸付けを行います。\n\nGMSは、革新的なIoTを活用した車両の運行管理システムを導入し、ドライバーの収入状況や車両の稼働状況をリアルタイムで把握することで様々なオペレーション対応を可能とし、デフォルト率を限りなくゼロにすることに成功。この技術を活用することで、これまで融資を受けることが難しかった貧困層にも、公平な融資の機会の提供が可能となりました。\n\n借入資金はカンボジア、プノンペンでトゥクトゥク（三輪タクシー）の購入に充てられ、現地の労働能力と意欲に満ちたドライバーの方々に、ローンを通して経済的自立の機会を提供します。ドライバーからのローン返済と利払により、貸し手への返済を行う予定です。\n少額からの暗号資産レンディングを通してインカムゲインを得ながら、世界の実りを手助けすることのできる、経済的・社会的に意義のあるソーシャルアクションに参加してみませんか。",
          "project.schedule.story.title": "ストーリー",
          "project.schedule.story.subtitle": "経済成長著しいカンボジアの現状",
          "project.schedule.story.text":
            "現在のカンボジアは、東南アジア諸国の中でも特に高い経済成長を遂げており、首都プノンペンでは建設ラッシュが続く活気に満ちた都市へと発展しました。\n\n郊外では、中上級層向けの住宅開発も進められ、過去5年間のGDP成長率が7%と急速な経済成長を遂げ、貧困率も8年間で半減するなど、目覚ましい発展を遂げています。\n\nその一方で、経済成長の恩恵を受けられない地域も存在し、都市部と地方の格差は深刻な社会問題となっています。 そういった資金が行き届かない地域などを中心に、近年、カンボジアはマイクロファイナンス投資の有望な投資先として世界的から注目を集めています。欧米の主要マイクロファイナンス投資ビークルの国別ポートフォリオにおいて、カンボジアはインドに次ぐ2番目の投資額を誇っています。\nマイクロファイナンスは、従来の金融サービスから取り残されがちな低所得者層や中小企業に対して、小口の融資を提供する金融サービスです。経済成長の恩恵を受けられない人々の生活改善や、中小企業の成長支援に大きな役割を果たしています。\n\nHARVEST FLOWはお客様からお預かりした暗号資産を、魅力的な市場を持つカンボジアの車両ローン事業会社に対して貸し出すことで、高い成長性と社会的意義を兼ね備えたソーシャルアクションの機会をご提供します。",
          "project.borrower.title":
            "カンボジアのトゥクトゥク市場とドライバー向けローン",
          "project.borrower.text":
            "カンボジアの主要都市では、オートバイや自転車をベースに改造された三輪タクシーのトゥクトゥクが重要な交通手段として広く利用されています。短距離の移動に便利で料金も手頃なため、地元の人々や観光客に人気があります。首都プノンペンには約1万2,000台が存在し、市内の交通の約20%を担っており、市民の足として定着しています。 \n\nカンボジアの交通インフラを支えるトゥクトゥクドライバーの多くは、低所得層や地方からの出稼ぎ労働者であり、自らのトゥクトゥクを購入するための資金調達が大きな課題となっています。理由として挙げられるのが銀行や大手マイクロファイナンス機関の多くが、個人事業主への融資に積極的ではないことです。\n\nカンボジアのマイクロファイナンス機関の融資残高は80億米ドルを超えていますが、その多くは中小企業向けであり、ドライバーとして自立を目指す個人はサービスの対象になりにくいのが現状です。\n\n年間の観光客が500万人を超えるプノンペンでは、トゥクトゥクを手にすることで平均月収の3倍にもなる400米ドルを得ることが可能で、労働意欲があれば貧困から抜け出す大きなきっかけとなります。私たちが取材した多くのドライバーもその収入で子供を学校に通わせることが出来る喜びを生き生きと語ってくれました。",
          "project.driver_interview_video": "ドライバーインタビュー動画",
          "project.pos.title": "POS",
          "project.pos.subtitle": "（PROOF OF SUPPORT、応援証明書）\nについて",
          "project.pos.text":
            "プロジェクトに暗号資産を貸し出すと一口ごとにデジタル証明書としてPOS（Proof of Support、応援証明書）が発行されます。POSは透明性・耐改ざん性の高いNFT（Non-Fungible Token、非代替性トークン）というブロックチェーン技術を採用しています。 POSを保有しているウォレットは利息と元本の受け取りや、オーナーページへのアクセスをすることができます。また、NFTは外部のマーケットプレイスで自由に売買することが可能です。\nアーティストやブランドとコラボレーションをした特別な作品が登録されており、あなただけの唯一無二の証明書になります。",
          "project.artist_collaboration.text":
            "絵描き  1986年、北海道生まれ。幼少期から絵を描き始める。 アメリカ留学時に絵を学ぶ。 2015年より東京に拠点を移し、2019年より本格的に絵描きとしての活動をスタート。 アクリル画の作品を中心に、看板や宣伝美術、ウィンドウに用いられる絵や文字を描いている。",
          "project.about_the_borrower.title": "借り手について",
          "project.about_the_borrower.note":
            "RWA-001では実質的な貸付先は株式会社Apas Portになります。\n詳しくはスキームについてを参照ください。\n本プロジェクトに関して問い合わせは全てコミュニティへお願いいたします。\nDiscord:",
          "project.about_the_borrower.company.title":
            "Global Mobility 株式会社\nJapanese Fintech Company",
          "project.about_the_borrower.company.text":
            "Global Mobility Service（グローバル・モビリティ・サービス、以下GMS）は、日本を代表するフィンテック企業であり、IoTとクラウドサービスを活用したモビリティ関連のサービスを提供しています。\n\nGMSは、MCCS（Mobility-Cloud Connecting System）とMSPF（Mobility Service Platform）という2つの主要なシステムを開発・運用しています。\n1. MCCS（Mobility-Cloud Connecting System）：\n「MCCS」は、自動車からの情報収集のみならず、遠隔でのモビリティの起動制御を、あらゆる車種に対して後付けで実装可能なIoTデバイスです。MCCSをモビリティに搭載し、オートファイナンスと関連付けることで、もし支払いが滞った場合でも、当社が遠隔で車のエンジン起動を制御し、料金の支払いを促進できる画期的な仕組みを構築しております。それにより、これまでローン審査を通過しなかった人々がファイナンスを受けられる機会を創出します。\n\n主な機能：\n- リアルタイムの車両追跡\n- ドライバーの運転行動分析\n- 事故や盗難の検知\n- 車両の遠隔制御（エンジンの起動制御\n- メンテナンススケジュールの管理\n2. MSPF（Mobility Service Platform）：\nMSPFは、GMSが提供するクラウドベースのファイナンスプラットフォームです。このシステムは、MCCSから収集された車両データを活用し、信用リスク評価モデルを構築することで、従来の金融サービスでは対象とされにくかった層（クレジットスコアが低い個人や中小企業など）に対して、車両購入やリースのための金融サービスを提供します。\n\n主な機能：\n- 信用リスク評価モデルの構築\n- 車両ローンやリースの審査と提供\n- ローンやリースの支払い管理\n- 延滞や債務不履行の管理\n\nGMSは、これらのシステムを活用することで、15000台を超える車両をリリースしており、新興国と先進国で、モビリティ関連のサービスと金融包摂を促進しています。同社のサービスは新興国においては、フィリピン、カンボジア、インドネシア、先進国においては日本で展開されており、それぞれの国の経済発展と社会課題の解決に貢献しています。\n\nカンボジアでのトゥクトゥクローン提供は2023年の10月からスタートし、既に100台を超える車両のリリースに成功しています",
          "project.about_the_scheme.title": "スキームについて",
          "project.about_the_scheme.text":
            "・スキームについて\nHARVEST FLOWは、世界中の支援を希望している事業者と暗号資産の運用先を探しているユーザをつなげる暗号資産レンディングサービスです。\n\nお客様が保有されている暗号資産を一定期間HARVEST FLOWを通して事業者に貸し付け（レンディング）していただくことで、銘柄や数量、貸出期間に応じた受取利息を受け取ることができます。\n\n第一弾となる本プロジェクトではHARVEST FLOWの運用会社である株式会社Apas Portが実質的な貸付先となります。集めた資産$DAIはApas Portに対する貸付を経由して、最終的にGMSのカンボジア現地法人の4台のトゥクトゥク車両購入資金に充てられます。\n当社はトゥクトゥクを現地のドライバーにローン提供し、その返済が貸し手への返済に使われます。通常ではGMSが直接的な貸付先となりますが、第一弾である本プロジェクトはオペレーションテストを兼ねて、特別にApas Portが仲介することで、ドライバーのデフォルト時や経済情勢等により貸付先からの返済が当初の想定通りになされなかった場合、または何らかの事情により上記の会社の財政状態が悪化した場合に元本利息の保証を行います。\n\n・担保について\n今回購入する4台のトゥクトゥクはGMSカンボジアを経由して株式会社Apas Portが第一優先担保権を設定します。法律専門家のアドバイスに基づく担保設定を行うことで、よりリスクがコントロールされた融資スキームを構築しました。",
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
            "車両のステータスがNOT STARTEDと表示されていますが、いつ更新されますか。",
          "project.faq.question1.answer":
            "レンディング募集期間終了後、集まった資金を運用会社に送金し、その資金を使って車両を購入します。そしてドライバー選定、車両にデバイス装着、リリースというフローが終了次第、データが連携され、ステータスが更新されます。",
          "project.faq.question2.question":
            "BASEチェーンのDAIはどこで買えますか。",
          "project.faq.question2.answer": "",
          "project.faq.question3.question":
            "暗号資産を持っていないのですが、サービスを利用することできますか。",
          "project.faq.question3.answer": "",
          "project.faq.question4.question": "貸出後の途中解約はできますか。",
          "project.faq.question4.answer": "",
          "project.faq.question5.question": "利息はどのように計算されますか。",
          "project.faq.question5.answer": "",
          "project.faq.question6.question":
            "質問やお問い合わせはどこでできますか？",
          "project.faq.question6.answer": "",
          "account.total_equity": "総資産(USD)",
          "account.your_apr": "平均受取利息",
          "account.boost": "ブースト",
          "account.lending_now": "レンディング中",
          "account.total_interest": "総受取済利息",
          "account.point": "ポイント",
          "account.rank": "ランク",
          "account.claimable_interest": "受取可能利息",
          "account.claimable_principle": "受取可能元本",
          "account.project_history": "ユーザー履歴",
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
