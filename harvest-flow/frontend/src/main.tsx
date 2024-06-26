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
          "homepage.pos.title": "POS（Proof of Support)",
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
        },
      },
      jp: {
        translation: {
          "homepage.hero.title": "Harvest Flow",
          "homepage.hero.subtitle": "飛び込もう。新しい世界の流れに。",
          "homepage.hero.text":
            "受け取り利息8%の\nソーシャルアクション。\n世界と繋がる暗号資産レンディング。",
          "homepage.our_projects.title": "プロジェクトハイライト",
          "homepage.our_projects.heading":
            "新興国の未来をドライブする カンボジア トゥクトゥクローン事業",
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
          "homepage.pos.title": "POS（Proof of Support、応援証明書）",
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
          "partners.kanemoto.name": "兼元謙任",
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
