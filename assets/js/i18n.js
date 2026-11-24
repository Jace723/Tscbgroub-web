/* ==========================================================================
   i18n.js — The Solution Company B
   Instant KR / EN switching for every text node carrying data-i18n.
   Preference persists in localStorage ("tscb-lang").
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "tscb-lang";
  var DEFAULT_LANG = "ko";

  var DICT = {
    /* ---- global ------------------------------------------------------- */
    "ui.skip": { ko: "본문으로 건너뛰기", en: "Skip to content" },
    "ui.menu": { ko: "메뉴 열기", en: "Open menu" },
    "ui.menuClose": { ko: "메뉴 닫기", en: "Close menu" },
    "ui.langLabel": { ko: "언어 선택", en: "Select language" },
    "ui.close": { ko: "닫기", en: "Close" },
    "img.officeAlt": { ko: "Canary Wharf 스카이라인이 보이는 모던한 회의실", en: "A modern boardroom overlooking the Canary Wharf skyline" },
    "img.aiAlt": { ko: "AI 네트워크와 지속가능성을 표현한 이미지", en: "An abstract network representing AI and sustainability" },

    "nav.home": { ko: "홈", en: "HOME" },
    "nav.about": { ko: "회사 소개", en: "ABOUT B" },
    "nav.what": { ko: "사업 영역", en: "WHAT WE DO" },
    "nav.insight": { ko: "인사이트", en: "INSIGHT B" },
    "nav.faq": { ko: "FAQ", en: "FAQ" },
    "nav.contact": { ko: "문의", en: "CONTACT" },

    "footer.brandText": {
      ko: "(주)더솔루션컴퍼니비는 ESG 전략과 AA1000AS 검증, AI 시대 비즈니스 모델 혁신을 함께 설계하는 글로벌 전략 자문사입니다.",
      en: "The Solution Company B Co., Ltd. is a global strategy advisory firm integrating ESG assurance (AA1000AS) and AI-era business model innovation."
    },
    "footer.license": {
      ko: "AA1000 Licensed Assurance Provider (License No. 001-039)",
      en: "AA1000 Licensed Assurance Provider (License No. 001-039)"
    },
    "footer.quick": { ko: "빠른 메뉴", en: "Quick menu" },
    "footer.office": { ko: "본사", en: "Head office" },
    "footer.addr": { ko: "주소", en: "Address" },
    "footer.tel": { ko: "전화", en: "Tel" },
    "footer.mail": { ko: "이메일", en: "Email" },
    "footer.copy": {
      ko: "© 2026 (주)더솔루션컴퍼니비, All Rights Reserved.",
      en: "© 2026 The Solution Company B Co., Ltd., All Rights Reserved."
    },
    "footer.note": { ko: "글로벌 전략 자문 · 2014년 설립", en: "Global advisory · Established 2014" },

    "cta.tag": { ko: "다음 단계", en: "Next step" },
    "cta.title": { ko: "다음 단계를 함께 설계합니다", en: "Let's design what comes next" },
    "cta.text": {
      ko: "지금 결정해야 할 문제를 알려주십시오. 진단과 프레임워크, 실행 계획까지 함께 준비합니다.",
      en: "Tell us the decision you are facing. We will bring the diagnosis, the framework and the delivery plan."
    },
    "cta.btn": { ko: "문의하기", en: "CONTACT" },


    /* ---- HOME : hero -------------------------------------------------- */
    "home.hero.tag": { ko: "글로벌 전략 · 검증 자문", en: "Global strategy & assurance" },
    "home.hero.l1": { ko: "ESG 제3자 검증과", en: "ESG Assurance &" },
    "home.hero.l2": { ko: "AI 시대 경영 전략 자문", en: "AI-Era Strategy Advisory" },
    "home.hero.sub": {
      ko: "영국 AccountAbility 공인 AA1000 검증기관(001-039)으로서 지속가능경영보고서 검증·공급망 ESG 자문과 AI 기반 비즈니스 모델·마케팅 전략을 통합 제공합니다.",
      en: "An AccountAbility-licensed AA1000 Assurance Provider (001-039) delivering independent sustainability assurance, supply-chain ESG advisory, and AI-era business model & marketing strategy."
    },
    "home.hero.cta1": { ko: "회사 소개", en: "ABOUT B" },
    "home.hero.cta2": { ko: "문의하기", en: "CONTACT" },

    "home.s1.k": { ko: "AA1000 라이선스", en: "AA1000 licence" },
    "home.s1.v": { ko: "No. 001-039", en: "No. 001-039" },
    "home.s2.k": { ko: "검증 기준 · 인증", en: "Standard · certification" },
    "home.s2.v": { ko: "AccountAbility · ACSAP", en: "AccountAbility · ACSAP" },
    "home.s3.k": { ko: "출간 저서", en: "Published books" },
    "home.s3.v": { ko: "9종", en: "9 titles" },
    "home.s4.k": { ko: "글로벌 파트너", en: "Global partners" },
    "home.s4.v": { ko: "영국 · 중국", en: "UK · China" },

    /* ---- HOME : dual core --------------------------------------------- */
    "home.dual.tag": { ko: "듀얼 코어", en: "Dual-core practice" },
    "home.dual.title": { ko: "두 개의 축, 하나의 통합된 해법", en: "Two cores, one integrated answer" },
    "home.dual.text": {
      ko: "ESG와 AI는 별개의 과제가 아닙니다. 같은 비즈니스를 두 방향에서 다시 설계하는 일입니다.",
      en: "ESG and AI are not separate agendas. They are two directions from which the same business is redesigned."
    },
    "home.dual.link": { ko: "서비스 자세히 보기", en: "Explore our services" },

    "home.p1.title": { ko: "ESG 전략 · AA1000AS 검증", en: "ESG Strategy & AA1000AS Assurance" },
    "home.p1.text": {
      ko: "지속가능경영 전략 수립부터 지속가능경영보고서 제3자 검증, 공급망 ESG 대응까지 — AA1000AS 기준에 맞춰 설계하고 검증합니다.",
      en: "From sustainability strategy and roadmap to independent third-party assurance of sustainability reports and supply-chain ESG readiness — designed and assured against AA1000AS."
    },
    "home.p1.i1": { ko: "지속가능경영 전략 수립 및 로드맵", en: "Sustainability strategy & roadmap" },
    "home.p1.i2": { ko: "지속가능경영보고서 제3자 검증 (AA1000AS)", en: "Independent third-party assurance (AA1000AS)" },
    "home.p1.i3": { ko: "공급망 ESG 평가 및 역량 강화", en: "Supply-chain ESG assessment & capacity building" },

    "home.p2.title": { ko: "AI 시대 전략 · 비즈니스 모델 혁신", en: "AI-Era Strategy & Business Model Innovation" },
    "home.p2.text": {
      ko: "AI가 고객의 선택을 중개하는 시대의 기업 전략, 비즈니스 모델 재설계, AEO·GEO 기반 디지털 마케팅 전환을 설계합니다.",
      en: "Corporate strategy for an era in which AI mediates customer choice, business model redesign, and a digital marketing transition built on AEO and GEO."
    },
    "home.p2.i1": { ko: "AI 시대 기업·사업 포트폴리오 전략", en: "AI-era corporate & portfolio strategy" },
    "home.p2.i2": { ko: "비즈니스 모델 혁신 및 수익화 설계", en: "Business model innovation & monetisation design" },
    "home.p2.i3": { ko: "AEO·GEO 기반 디지털 마케팅 전환", en: "AEO / GEO-driven digital marketing transition" },

    /* ---- HOME : AA1000 ------------------------------------------------- */
    "home.aa.tag": { ko: "검증 자격", en: "Assurance credential" },
    "home.aa.title": { ko: "공인 AA1000 검증기관", en: "An official AA1000 assurance provider" },
    "home.aa.text": {
      ko: "(주)더솔루션컴퍼니비는 AA1000 표준을 제정한 영국 AccountAbility의 라이선스 검증기관입니다. 제3자 검증은 자기 선언이 아니라, 공인된 절차와 자격을 갖춘 기관의 독립적 검증으로 수행됩니다.",
      en: "The Solution Company B Co., Ltd. is a licensed assurance provider of AccountAbility, the UK-based body that publishes the AA1000 standards. Third-party assurance is not a self-declaration; it is performed independently by an accredited provider."
    },
    "home.aa.p1": {
      ko: "지속가능경영보고서는 기업이 스스로 쓴 문장으로 신뢰를 얻지 못합니다. 이해관계자는 보고서의 수치와 서술이 독립적으로 검증되었는지를 확인합니다.",
      en: "A sustainability report does not earn trust from the sentences a company writes about itself. Stakeholders ask whether the figures and claims in it were independently verified."
    },
    "home.aa.p2": {
      ko: "당사는 AA1000AS 검증을 수행하며, 보고서 작성 지원과 임직원 역량강화 교육을 함께 제공합니다. 검증과 구축을 분리하지 않고 진행하는 것이 당사의 방식입니다.",
      en: "We carry out AA1000AS assurance and also support report preparation and employee capacity building. Our approach keeps preparation and assurance in one continuous line of work."
    },
    "home.aa.badge1": { ko: "AccountAbility 라이선스", en: "AccountAbility licensed" },
    "home.aa.badge2": { ko: "제3자 독립 검증", en: "Independent third party" },
    "home.aa.badge3": { ko: "ACSAP 인증", en: "ACSAP certified" },

    "home.aa.k1": { ko: "발급 기관", en: "Issuer" },
    "home.aa.v1": { ko: "AccountAbility (영국)", en: "AccountAbility (United Kingdom)" },
    "home.aa.k2": { ko: "자격", en: "Licence" },
    "home.aa.v2": { ko: "AA1000 Licensed Assurance Provider", en: "AA1000 Licensed Assurance Provider" },
    "home.aa.k3": { ko: "라이선스 번호", en: "Licence no." },
    "home.aa.v3": { ko: "001-039", en: "001-039" },
    "home.aa.k4": { ko: "검증 전문 인증", en: "Assurance certification" },
    "home.aa.v4": {
      ko: "ACSAP — AccountAbility 공인 지속가능성 검증 전문가",
      en: "ACSAP — AccountAbility Certified Sustainability Assurance Practitioner"
    },
    "home.aa.k5": { ko: "검증 범위", en: "Scope" },
    "home.aa.v5": {
      ko: "지속가능경영보고서 AA1000AS 검증 · 공급망 ESG · 역량강화 교육",
      en: "AA1000AS assurance of sustainability reports · supply-chain ESG · training"
    },
    "home.aa.note": {
      ko: "검증 의견은 검증 범위와 기준에 따라 독립적으로 작성됩니다. 상담 시 보유 보고서와 공시 일정을 기준으로 검증 계획을 제안합니다.",
      en: "Assurance conclusions are formed independently, within a defined scope and standard. A consultation begins with your existing reports and disclosure calendar."
    },
    "home.aa.cta": { ko: "검증 상담 요청", en: "Request an assurance consultation" },

    /* ---- HOME : CEO ---------------------------------------------------- */
    "home.ceo.tag": { ko: "대표 · 저서", en: "CEO & publications" },
    "home.ceo.title": { ko: "프레임워크를 만든 사람이 직접 자문합니다", en: "The author of the frameworks advises the work" },
    "home.ceo.text": {
      ko: "심준규 대표는 (주)더솔루션컴퍼니비가 현장에서 적용하는 전략 프레임워크를 직접 집필하고 자문합니다.",
      en: "Dr. Jace Shim personally authors and advises on the strategic frameworks applied by The Solution Company B Co., Ltd."
    },
    "home.ceo.name": { ko: "심준규", en: "Jace Shim, Ph.D." },
    "home.ceo.role": { ko: "대표이사 · 경영학 박사 · 인하대학교 경영학과 겸임교수", en: "CEO · Ph.D. in Business Administration · Adjunct Professor, Inha University" },
    "home.ceo.k1": { ko: "현직", en: "Role" },
    "home.ceo.v1": { ko: "(주)더솔루션컴퍼니비 대표이사", en: "CEO, The Solution Company B Co., Ltd." },
    "home.ceo.k2": { ko: "겸임", en: "Adjunct" },
    "home.ceo.v2": { ko: "인하대학교 경영학과 겸임교수", en: "Adjunct Professor, Dept. of Business Administration, Inha University" },
    "home.ceo.k3": { ko: "학위", en: "Ph.D." },
    "home.ceo.v3": { ko: "경영학 박사", en: "Ph.D. in Business Administration" },
    "home.ceo.k4": { ko: "MBA", en: "MBA" },
    "home.ceo.v4": { ko: "University of Liverpool (영국)", en: "University of Liverpool, United Kingdom" },
    "home.ceo.bio": {
      ko: "리테일·유통 현장 경험과 중국·영국에서의 실무를 바탕으로 아시아 시장의 비즈니스 메커니즘과 공급망 ESG를 연구합니다. 지속가능경영 검증과 AI 시대 비즈니스 모델 혁신을 하나의 전략으로 통합하는 데 집중하고 있습니다.",
      en: "His work connects retail and distribution practice in Korea with field experience in China and the UK, focused on supply-chain ESG and the business mechanisms of Asian markets. He integrates sustainability assurance and AI-era business model innovation into a single strategy."
    },
    "home.books.title": { ko: "대표이사 주요저서", en: "Publications by the CEO" },
    "home.books.text": {
      ko: "출간연도와 출판사, 핵심 프레임워크를 기준으로 정리한 서지입니다.",
      en: "A bibliography organised by year, publisher and the framework each title introduces."
    },

    "book.1.title": { ko: "AI 승자독식", en: "Winner Takes the Answer" },
    "book.1.sub": { ko: "Winner Takes the Answer", en: "AI 승자독식 · Korean edition" },
    "book.1.meta": { ko: "2026 · 라온북플러스", en: "2026 · Raonbook Plus" },
    "book.1.desc": {
      ko: "3C-AI · VRIO-D · STQP · E-E-A-T-C — AI 답변 경제를 위한 4대 전략 프레임워크.",
      en: "3C-AI · VRIO-D · STQP · E-E-A-T-C — four strategy frameworks for the AI answer economy."
    },
    "book.2.title": { ko: "타겟머니", en: "타겟머니 (Target Money)" },
    "book.2.sub": { ko: "Target Money", en: "Korean edition" },
    "book.2.meta": { ko: "2026 · 라온북", en: "2026 · Raonbook" },
    "book.2.desc": { ko: "고객과 시장을 다시 정의하는 타깃 설정의 전략.", en: "Strategy for defining targets, customers and markets anew." },
    "book.3.title": { ko: "비즈니스 모델 혁신", en: "비즈니스 모델 혁신 (Business Model Innovation)" },
    "book.3.sub": { ko: "Business Model Innovation", en: "Korean edition" },
    "book.3.meta": { ko: "2026 · 라온북", en: "2026 · Raonbook" },
    "book.3.desc": { ko: "사업 구조와 수익 모델을 재설계하는 프레임워크.", en: "A framework for redesigning business structure and revenue models." },
    "book.4.title": { ko: "AI 마케팅 패러다임", en: "AI 마케팅 패러다임 (The AI Marketing Paradigm)" },
    "book.4.sub": { ko: "The AI Marketing Paradigm", en: "Korean edition" },
    "book.4.meta": { ko: "2026 · 라온북", en: "2026 · Raonbook" },
    "book.4.desc": { ko: "검색과 추천이 AI로 이동한 뒤의 마케팅 구조.", en: "Marketing after search and recommendation moved to AI." },
    "book.5.title": { ko: "스테이블코인 부의 기회", en: "스테이블코인 부의 기회 (The Stablecoin Opportunity)" },
    "book.5.sub": { ko: "The Stablecoin Opportunity", en: "Korean edition" },
    "book.5.meta": { ko: "2026 · 라온북", en: "2026 · Raonbook" },
    "book.5.desc": { ko: "디지털 결제 인프라가 만드는 금융·사업 기회.", en: "Financial and business opportunities created by digital payment infrastructure." },
    "book.6.title": { ko: "그린북 THE GREEN BOOK", en: "THE GREEN BOOK" },
    "book.6.sub": { ko: "THE GREEN BOOK", en: "Korean edition" },
    "book.6.meta": { ko: "2025 · 프로방스", en: "2025 · Provence" },
    "book.6.desc": { ko: "지속가능경영을 실무 언어로 정리한 안내서.", en: "A practitioner's guide to sustainability management." },
    "book.7.title": { ko: "녹색금융으로 읽는 ESG 이야기", en: "녹색금융으로 읽는 ESG 이야기 (ESG Through Green Finance)" },
    "book.7.sub": { ko: "ESG Through Green Finance", en: "Korean edition" },
    "book.7.meta": { ko: "2025 · 에스디지연구소", en: "2025 · SDG Institute" },
    "book.7.desc": { ko: "금융의 관점에서 본 ESG 공시와 자금 흐름.", en: "ESG disclosure and capital flows seen from finance." },
    "book.8.title": { ko: "실천으로 완성하는 ESG 전략", en: "실천으로 완성하는 ESG 전략 (ESG Strategy in Practice)" },
    "book.8.sub": { ko: "ESG Strategy in Practice", en: "Korean edition" },
    "book.8.meta": { ko: "2024 · 한경사", en: "2024 · Hankyungsa" },
    "book.8.desc": {
      ko: "성공적인 ESG경영 전략의 수립과 실천을 위한 참고서.",
      en: "A reference for building and executing an ESG management strategy."
    },
    "book.9.title": { ko: "FVS 마케팅", en: "FVS 마케팅 (FVS Marketing)" },
    "book.9.sub": { ko: "FVS Marketing", en: "Korean edition" },
    "book.9.meta": { ko: "2015 · 휴먼큐브", en: "2015 · Humancube" },
    "book.9.desc": {
      ko: "새롭게 제시하는 마케팅 관점과 마케팅 전략을 위한 지침서.",
      en: "A guide to a new marketing perspective and marketing strategy."
    },
    "book.co": { ko: "공저", en: "Co-authored" },
    "book.author": { ko: "저자", en: "Author" },

    /* ---- HOME : insight preview ---------------------------------------- */
    "home.insight.tag": { ko: "인사이트", en: "Insight B" },
    "home.insight.title": { ko: "보고서로 끝내지 않고, 글로 남깁니다", en: "We publish what we learn" },
    "home.insight.text": {
      ko: "ESG 검증과 AI 답변 경제에 관한 칼럼과 프레임워크를 직접 씁니다.",
      en: "Columns and frameworks on assurance and the AI answer economy, written by our team."
    },
    "home.insight.cta": { ko: "전체 인사이트", en: "All insights" },

    /* ---- shared article cards ------------------------------------------ */
    "art1.cat": { ko: "인구 · 전략", en: "Demographics · Strategy" },
    "art1.title": { ko: "인구 소멸과 2030년 기업 경영의 변곡점", en: "Population Decline and the 2030 Turning Point for Business" },
    "art1.excerpt": {
      ko: "한국 경제의 완충 지대가 사라지는 2028~2030년. 마지막 베이비붐 세대의 은퇴가 기업의 비용 구조와 시장 구조를 동시에 바꿉니다.",
      en: "Between 2028 and 2030 the buffer of Korea's economy disappears. The retirement of the last baby-boom cohort changes cost structures and market structures at once."
    },
    "art2.cat": { ko: "AI 전략 · AEO", en: "AI Strategy · AEO" },
    "art2.title": {
      ko: "AI 검색 시대, 우리 회사가 사라지는 이유: 인용 격차를 돌파하는 AEO 4대 전략 프레임워크",
      en: "Why Your Company Disappears in AI Search: Four Frameworks for Breaking Through the Citation Gap"
    },
    "art2.excerpt": {
      ko: "실제 경쟁력과 AI가 고객에게 전하는 경쟁력 사이의 '인용 격차'. 3C-AI·VRIO-D·STQP·E-E-A-T-C로 격차의 원인을 진단합니다.",
      en: "The 'citation gap' between real competitiveness and what AI tells customers. 3C-AI, VRIO-D, STQP and E-E-A-T-C diagnose where it comes from."
    },
    "art3.cat": { ko: "AI 전략 · VRIO-D", en: "AI Strategy · VRIO-D" },
    "art3.title": { ko: "30년 쌓은 실력이 왜 AI 답변에는 안 나올까", en: "Why Thirty Years of Craft Never Appears in an AI Answer" },
    "art3.excerpt": {
      ko: "네 질문을 모두 통과한 회사가 시장에서는 보이지 않습니다. VRIO-D는 다섯 번째 질문, '발견 가능성'을 묻습니다.",
      en: "A company can pass all four questions and still be invisible. VRIO-D adds a fifth: discoverability."
    },
    "art.read": { ko: "읽기", en: "Read article" },

    /* ---- ABOUT --------------------------------------------------------- */
    "about.crumb": { ko: "회사 소개", en: "About B" },
    "about.h1": { ko: "전략과 검증을 실행으로 연결하는 파트너", en: "Connecting Strategy and Assurance to Execution" },
    "about.lead": {
      ko: "(주)더솔루션컴퍼니비(The Solution Company B Co., Ltd.)는 ESG·지속가능성 검증과 AI 시대 경영 전략의 통합 솔루션을 제공합니다.",
      en: "The Solution Company B Co., Ltd. delivers integrated solutions across ESG sustainability assurance and AI-era corporate strategy."
    },
    "about.m1.k": { ko: "설립", en: "Established" },
    "about.m1.v": { ko: "2014", en: "2014" },
    "about.m2.k": { ko: "본사", en: "Head office" },
    "about.m2.v": { ko: "경기도 안양시", en: "Anyang, Gyeonggi-do" },
    "about.m3.k": { ko: "파트너", en: "Partners" },
    "about.m3.v": { ko: "영국 · 중국", en: "United Kingdom · China" },

    "about.phil.tag": { ko: "철학", en: "Philosophy" },
    "about.phil.title": { ko: "왜 이름이 '솔루션 컴퍼니'인가", en: "Why we call ourselves a Solution Company" },
    "about.phil.p1": {
      ko: "(주)더솔루션컴퍼니비는 기존 컨설팅 시장에 새로운 방향을 제시하고자 합니다. 시장의 트렌드와 문제점을 분석하고, 해당 분야 최고의 전문가들과 함께 새로운 비즈니스 솔루션 모델을 제안하는 경영 컨설팅 법인입니다.",
      en: "The Solution Company B Co., Ltd. was established to bring a new standard to strategic advisory. We analyze market dynamics and structural challenges, working alongside leading specialists to design actionable business solutions."
    },
    "about.phil.p2": {
      ko: "단순 자문에 머무르지 않고 성공을 향한 맞춤 솔루션을 제안한다는 뜻을 담아 '(주)더솔루션컴퍼니비(The Solution Company B Co., Ltd.)'로 명명했습니다.",
      en: "We named our firm 'The Solution Company B Co., Ltd.' to reflect our commitment to tailored, executable solutions for client success."
    },
    "about.phil.p3": {
      ko: "진단과 분석에 그치지 않고, 지속적으로 성장할 수 있는 방법을 제안하며 고객과 함께 만들어 갑니다.",
      en: "We do not stop at diagnosis and analysis. We propose how the business keeps growing, and build it with the client."
    },
    "about.phil.quote1": { ko: "세상에는 하나의 방법과 정답만이 존재하는 건 아닙니다.", en: "There is never only one method, and never only one right answer." },
    "about.phil.quote2": {
      ko: "우리는 매번 새로운 관점과 방법으로 세상을 바라보고, 그 새로움을 함께 나눕니다.",
      en: "We look at the world from a new perspective and a new method each time, and we share what we find."
    },
    "about.phil.quoteBy": { ko: "— (주)더솔루션컴퍼니비", en: "— The Solution Company B Co., Ltd." },

    "about.why.tag": { ko: "왜 B인가", en: "Why B" },
    "about.why.title": { ko: "네 가지 강점", en: "Four reasons" },
    "about.why.text": {
      ko: "전문가의 이력이 아니라, 고객의 문제 앞에서 무엇을 할 수 있는지로 증명합니다.",
      en: "Not by the CVs of our people, but by what we can do in front of a client's problem."
    },
    "about.w1.t": { ko: "풍부한 실무경험", en: "Practitioner depth" },
    "about.w1.sub": { ko: "Experience", en: "실무경험" },
    "about.w1.d": {
      ko: "컨설턴트들은 자신의 전문 영역에서 '프로'라 불리는 사람들입니다. 방법론으로 접근하는 것을 넘어, 직접 문제를 함께 고민하고 현장에서 작동하는 해법을 찾습니다.",
      en: "Our consultants are practitioners first. Beyond applying a methodology, they work the problem with you and find what actually operates in the field."
    },
    "about.w2.t": { ko: "AA1000AS 전문성", en: "AA1000AS expertise" },
    "about.w2.sub": { ko: "Assurance", en: "검증" },
    "about.w2.d": {
      ko: "AccountAbility의 Licensed Assurance Provider로서 지속가능경영보고서 제3자 검증 역량을 보유하며, 보고서 작성 지원과 임직원 역량강화 교육을 함께 수행합니다.",
      en: "As an AccountAbility Licensed Assurance Provider we hold the capability for third-party assurance of sustainability reports, and we support report preparation and internal capacity building alongside it."
    },
    "about.w3.t": { ko: "정보공유 시스템", en: "A knowledge-sharing system" },
    "about.w3.sub": { ko: "Knowledge", en: "정보공유" },
    "about.w3.d": {
      ko: "전문가만이 가진 정보를 원하는 사람들과 함께 공유하는 시스템을 운영합니다. 그 과정에서 새로운 전문지식이 만들어지고, 고객에게 더 큰 가치로 돌아갑니다.",
      en: "We run a system that shares what specialists know with everyone who needs it. New knowledge is produced in that process and returns to clients as greater value."
    },
    "about.w4.t": { ko: "영국 · 중국 글로벌 파트너 인프라", en: "UK & China partner infrastructure" },
    "about.w4.sub": { ko: "Global", en: "글로벌" },
    "about.w4.d": {
      ko: "영국과 중국에 파트너를 두고, 현지의 성공 전략을 한국 시장에, 한국의 실행 방식을 현지에 번역합니다. 해외 진출 시 현지 사정에 맞춘 조율을 함께합니다.",
      en: "With partners in the United Kingdom and China, we translate local success strategies into the Korean market and Korean practice into local markets, and coordinate market entry on the ground."
    },

    "about.who.tag": { ko: "B는 누구인가", en: "Who is B" },
    "about.who.title": { ko: "대표 심준규", en: "Jace Shim, Ph.D." },
    "about.who.lead": {
      ko: "하나의 정답이 아니라, 환경과 시스템에 맞는 다양한 정답을 찾습니다.",
      en: "Not one right answer, but the answers that fit a given environment and system."
    },
    "about.who.bio1": {
      ko: "대학에서 경제학을 전공하고, University of Liverpool MBA 과정에서 경영 지식을 갖추었으며, 박사 과정에서 공급사슬에서의 ESG경영을 집중 연구했습니다.",
      en: "He studied economics as an undergraduate, took his MBA at the University of Liverpool, and focused his doctoral research on ESG management in the supply chain."
    },
    "about.who.bio2": {
      ko: "국내 리테일 시장에 대한 전문 경험과 중국을 비롯한 해외에서의 실무를 바탕으로 아시아 시장의 비즈니스 메커니즘을 다뤄 왔습니다. ESG 경영의 확산을 위해 연구와 강연, 컨설팅에 집중하고 있습니다.",
      en: "His specialist experience in the Korean retail market and his practice in China and elsewhere inform how he reads the business mechanisms of Asian markets. He divides his work between research, lecturing and consulting on the spread of ESG management."
    },
    "about.who.eduTitle": { ko: "학력", en: "Education" },
    "about.who.e1": { ko: "경영학 박사", en: "Ph.D. in Business Administration" },
    "about.who.e2": { ko: "MBA · University of Liverpool (영국)", en: "MBA, University of Liverpool, United Kingdom" },
    "about.who.e3": { ko: "경제학 전공 (학부)", en: "BA, Economics" },
    "about.who.researchTitle": { ko: "연구·전문 분야", en: "Research & expertise" },
    "about.who.r1": { ko: "공급망 ESG와 지속가능경영 검증", en: "Supply-chain ESG and sustainability assurance" },
    "about.who.r2": { ko: "리테일·유통 비즈니스 전략", en: "Retail and distribution business strategy" },
    "about.who.r3": { ko: "AI 시대 비즈니스 모델과 AEO·GEO 전략", en: "AI-era business models, AEO and GEO strategy" },
    "about.who.teachTitle": { ko: "겸임 직함", en: "Academic Appointment" },
    "about.who.t1": {
      ko: "인하대학교 경영학과 겸임교수",
      en: "Adjunct Professor, Department of Business Administration, Inha University"
    },
    "about.who.booksTitle": { ko: "대표이사 주요저서", en: "Publications by the CEO" },
    "about.who.booksText": {
      ko: "2015년부터 2026년까지 아홉 권. 판매 링크 없이 서지 정보로만 정리했습니다.",
      en: "Nine books between 2015 and 2026, listed as bibliography without retail links."
    },
    "about.office.caption": {
      ko: "전략은 회의실에서 끝나지 않습니다. 진단은 현장에서, 검증은 데이터에서 시작합니다.",
      en: "Strategy does not end in a meeting room. Diagnosis starts in the field; assurance starts with the data."
    },

    /* ---- WHAT WE DO ---------------------------------------------------- */
    "wwd.crumb": { ko: "사업 영역", en: "What we do" },
    "wwd.h1": { ko: "시장에서 작동하는 전략", en: "Strategy that survives contact with the market" },
    "wwd.lead": {
      ko: "검증과 전략, 교육을 하나의 라인으로 묶습니다. 보고서를 납품하는 대신 실행의 순서를 함께 정합니다.",
      en: "Assurance, strategy and training run as one line of work. Instead of handing over a report, we set the order of execution with you."
    },
    "wwd.m1.k": { ko: "서비스", en: "Services" },
    "wwd.m1.v": { ko: "3개 영역", en: "3 practices" },
    "wwd.m2.k": { ko: "산업 모듈", en: "Industry modules" },
    "wwd.m2.v": { ko: "10개 영역", en: "10 areas" },
    "wwd.m3.k": { ko: "검증 자격", en: "Assurance" },
    "wwd.m3.v": { ko: "AA1000 License 001-039", en: "AA1000 License 001-039" },

    "wwd.serv.tag": { ko: "B의 서비스", en: "B's services" },
    "wwd.serv.title": { ko: "세 개의 실천 영역", en: "Three practices" },
    "wwd.serv.text": {
      ko: "각 영역은 독립적으로 시작할 수 있고, 검증과 전략 과제가 겹칠 때 하나의 로드맵으로 통합됩니다.",
      en: "Each practice can start on its own, and where assurance and strategy overlap they are combined into a single roadmap."
    },
    "wwd.s1.title": { ko: "ESG 전략 및 AA1000AS 검증", en: "ESG Strategy & AA1000AS Assurance" },
    "wwd.s1.tag": { ko: "검증 · 공시", en: "Assurance · disclosure" },
    "wwd.s1.text": {
      ko: "지속가능경영 전략을 세우고, 보고서를 만들고, 제3자 검증으로 신뢰를 확보하는 전 과정을 지원합니다.",
      en: "We support the whole line: setting sustainability strategy, preparing the report, and securing credibility through third-party assurance."
    },
    "wwd.s1.i1": { ko: "지속가능경영 전략 수립 및 중장기 로드맵", en: "Sustainability strategy and multi-year roadmap" },
    "wwd.s1.i2": { ko: "지속가능경영보고서 작성 지원", en: "Sustainability report preparation" },
    "wwd.s1.i3": { ko: "AA1000AS 제3자 검증", en: "AA1000AS third-party assurance" },
    "wwd.s1.i4": { ko: "공급망 ESG 실사·평가 및 협력사 대응", en: "Supply-chain ESG due diligence and supplier response" },
    "wwd.s1.i5": { ko: "ESG 공시·금융 대응 및 임직원 교육", en: "ESG disclosure, sustainable finance response and training" },
    "wwd.s1.deliver": { ko: "산출물", en: "Deliverables" },
    "wwd.s1.d1": { ko: "전략 보고서·로드맵", en: "Strategy report and roadmap" },
    "wwd.s1.d2": { ko: "검증 의견서", en: "Assurance statement" },
    "wwd.s1.d3": { ko: "공급망 평가 체계", en: "Supplier assessment framework" },

    "wwd.s2.title": { ko: "AI 시대 비즈니스 모델 · 마케팅 컨설팅", en: "AI-Era Business Model & Marketing" },
    "wwd.s2.tag": { ko: "전략 · AEO/GEO", en: "Strategy · AEO/GEO" },
    "wwd.s2.text": {
      ko: "AI가 고객의 선택을 중개하는 구조를 전제로, 사업 포트폴리오와 수익 모델, 그리고 검색·추천 전략을 다시 설계합니다.",
      en: "Taking as given that AI mediates customer choice, we redesign the portfolio, the revenue model, and the way a company is found and cited."
    },
    "wwd.s2.i1": { ko: "AI 시대 사업 포트폴리오 진단 및 재설계", en: "AI-era portfolio diagnosis and redesign" },
    "wwd.s2.i2": { ko: "비즈니스 모델 혁신과 수익화 구조 설계", en: "Business model innovation and monetisation design" },
    "wwd.s2.i3": { ko: "AEO·GEO 기반 콘텐츠·인용 전략", en: "AEO and GEO content and citation strategy" },
    "wwd.s2.i4": { ko: "AI 검색 가시성 진단 (3C-AI·VRIO-D·STQP·E-E-A-T-C)", en: "AI search visibility diagnosis (3C-AI, VRIO-D, STQP, E-E-A-T-C)" },
    "wwd.s2.i5": { ko: "업무 자동화와 조직 운영 방식 전환", en: "Work automation and operating model transition" },
    "wwd.s2.deliver": { ko: "산출물", en: "Deliverables" },
    "wwd.s2.d1": { ko: "인용 격차 진단표", en: "Citation gap diagnostic" },
    "wwd.s2.d2": { ko: "비즈니스 모델 캔버스", en: "Business model canvas" },
    "wwd.s2.d3": { ko: "질문 지도·포지셔닝 문장", en: "Question map and positioning statements" },

    "wwd.s3.title": { ko: "임직원 역량강화 교육 및 워크숍", en: "Corporate Training & Workshops" },
    "wwd.s3.tag": { ko: "교육 · 워크숍", en: "Training · workshops" },
    "wwd.s3.text": {
      ko: "전략은 조직이 이해하지 못하면 실행되지 않습니다. 경영진 세미나부터 실무 워크숍까지, 조직의 언어로 옮깁니다.",
      en: "A strategy that the organisation does not understand is never executed. From executive seminars to hands-on workshops, we translate it into the organisation's language."
    },
    "wwd.s3.i1": { ko: "임직원 ESG 역량강화 교육", en: "ESG capability building for employees" },
    "wwd.s3.i2": { ko: "AI 리터러시와 실무 활용 워크숍", en: "AI literacy and applied workshops" },
    "wwd.s3.i3": { ko: "경영진 전략 세미나", en: "Executive strategy seminars" },
    "wwd.s3.i4": { ko: "AEO·GEO 실무 워크시트 교육", en: "AEO and GEO working-session training" },
    "wwd.s3.i5": { ko: "기업 맞춤 교재·케이스 개발", en: "Custom materials and case development" },
    "wwd.s3.deliver": { ko: "산출물", en: "Deliverables" },
    "wwd.s3.d1": { ko: "교육 커리큘럼", en: "Curriculum" },
    "wwd.s3.d2": { ko: "워크시트·진단표", en: "Worksheets and diagnostics" },
    "wwd.s3.d3": { ko: "워크숍 결과 보고", en: "Workshop findings" },
    "wwd.sx.toContact": { ko: "이 서비스로 문의하기", en: "Enquire about this practice" },

    "wwd.app.tag": { ko: "진행 방식", en: "How we work" },
    "wwd.app.title": { ko: "진단에서 내재화까지", en: "From diagnosis to ownership" },
    "wwd.app.text": {
      ko: "컨설턴트가 떠난 뒤에도 작동하는 것을 목표로 합니다.",
      en: "We aim for what still works after the consultants leave."
    },
    "wwd.ap1.t": { ko: "진단", en: "Diagnose" },
    "wwd.ap1.d": {
      ko: "현황과 데이터를 먼저 봅니다. 무엇이 문제이고 무엇이 아닌지, 근거를 붙여 정리합니다.",
      en: "We look at the situation and the data first, and set out what is a problem and what is not, with the evidence attached."
    },
    "wwd.ap2.t": { ko: "공동 설계", en: "Co-design" },
    "wwd.ap2.d": {
      ko: "고객의 조직과 함께 대안을 만듭니다. 실행 주체가 설계에 참여해야 실행이 남습니다.",
      en: "Alternatives are built with the client's organisation. Execution stays only when the people who execute took part in the design."
    },
    "wwd.ap3.t": { ko: "내재화 · 검증", en: "Embed & assure" },
    "wwd.ap3.d": {
      ko: "교육과 검증으로 결과를 조직의 역량과 대외 신뢰로 바꿉니다.",
      en: "Training and assurance turn the result into internal capability and external credibility."
    },

    "wwd.ind.tag": { ko: "B의 산업 영역", en: "B's industries" },
    "wwd.ind.title": { ko: "10개 모듈화 산업 영역", en: "Ten modular industry areas" },
    "wwd.ind.text": {
      ko: "산업별 전문가의 인사이트를 모듈로 묶어, 필요한 영역만 조합해 프로젝트를 구성합니다.",
      en: "Each area is a module built from specialist insight, combined as a project requires."
    },
    "ind.1.name": { ko: "비즈니스 전략", en: "Business Strategy" },
    "ind.1.desc": { ko: "사업 포트폴리오와 성장 경로 설계", en: "Portfolio and growth-path design" },
    "ind.2.name": { ko: "ESG 경영전략", en: "ESG Strategy" },
    "ind.2.desc": { ko: "지속가능경영 전략·공시·검증", en: "Sustainability strategy, disclosure and assurance" },
    "ind.3.name": { ko: "마케팅 전략", en: "Marketing Strategy" },
    "ind.3.desc": { ko: "시장 진입과 브랜드 포지셔닝", en: "Market entry and brand positioning" },
    "ind.4.name": { ko: "도소매·유통", en: "Retail Business" },
    "ind.4.desc": { ko: "리테일 채널과 상품·매장 전략", en: "Retail channels, assortment and store strategy" },
    "ind.5.name": { ko: "시스템 구축·운영", en: "System Operation" },
    "ind.5.desc": { ko: "업무 프로세스와 운영 체계 설계", en: "Process and operating-system design" },
    "ind.6.name": { ko: "의료·건강", en: "Health Care" },
    "ind.6.desc": { ko: "헬스케어 서비스와 사업 모델", en: "Healthcare services and business models" },
    "ind.7.name": { ko: "문화·예술", en: "Culture & Art" },
    "ind.7.desc": { ko: "문화예술 콘텐츠와 브랜드 협업", en: "Cultural content and brand collaboration" },
    "ind.8.name": { ko: "인적자원 관리", en: "HR" },
    "ind.8.desc": { ko: "조직·인재·역량 개발", en: "Organisation, talent and capability" },
    "ind.9.name": { ko: "패션 마케팅", en: "Fashion Marketing" },
    "ind.9.desc": { ko: "패션 브랜드와 리테일 마케팅", en: "Fashion brand and retail marketing" },
    "ind.10.name": { ko: "스포츠 마케팅", en: "Sports" },
    "ind.10.desc": { ko: "스포츠 자산과 스폰서십 전략", en: "Sports assets and sponsorship strategy" },

    /* ---- INSIGHT ------------------------------------------------------- */
    "insight.crumb": { ko: "인사이트", en: "Insight B" },
    "insight.h1": { ko: "인용될 수 있는 인사이트", en: "Insight that can be cited" },
    "insight.lead": {
      ko: "ESG 검증과 AI 답변 경제에 관한 칼럼과 실무 프레임워크. 각 글은 그 자체로 완결되도록 씁니다.",
      en: "Columns and working frameworks on assurance and the AI answer economy. Each piece is written to stand on its own."
    },
    "insight.note": {
      ko: "카드를 선택하면 본문 전체를 페이지 안에서 읽을 수 있습니다. 언어 전환 시 본문도 함께 바뀝니다.",
      en: "Select a card to read the full piece inside this page. Switching language switches the article too."
    },
    "insight.archive.tag": { ko: "전체 아카이브", en: "Full Archive" },
    "insight.archive.title": { ko: "기존 칼럼 · 인사이트 아카이브", en: "Published Columns & Insights Archive" },
    "insight.archive.lead": {
      ko: "기존 tscbgroup.com에 발행된 AI·AEO/GEO 전략, ESG 모델링, ESG 인사이트 전편(135편)을 분야별로 구분해 정리했습니다.",
      en: "All 135 published articles from tscbgroup.com — organised across AI/AEO/GEO strategy, ESG business modelling, and ESG insights."
    },
    "insight.filter.all": { ko: "전체", en: "All" },
    "insight.filter.esg": { ko: "ESG", en: "ESG" },
    "insight.filter.ai": { ko: "AI · AEO · GEO 전략", en: "AI · AEO · GEO" },
    "insight.filter.bm": { ko: "비즈니스 모델링", en: "Business Modeling" },
    "insight.searchPh": { ko: "제목 또는 키워드 검색...", en: "Search title or keyword..." },
    "insight.more": { ko: "더 보기", en: "Load more" },
    "insight.modalLabel": { ko: "인사이트 읽기", en: "Reading insight" },
    "insight.count": { ko: "총 136편 아카이브", en: "136 Archived Insights" },
    "insight.langNote": { ko: "ESG · AI·AEO·GEO · 비즈니스 모델링", en: "ESG · AI·AEO·GEO · Business Modeling" },

    /* ---- CONTACT ------------------------------------------------------- */
    "contact.crumb": { ko: "문의", en: "Contact" },
    "contact.h1": { ko: "결정해야 할 문제부터 알려주십시오", en: "Start with the decision you are facing" },
    "contact.lead": {
      ko: "검증 일정, 공시 마감, AI 검색에서의 노출처럼 지금 시급한 문제를 적어 주시면 담당자가 검토 후 회신드립니다.",
      en: "Write the problem that is urgent now — an assurance timetable, a disclosure deadline, visibility in AI search — and we will review it and reply."
    },
    "contact.form.title": { ko: "문의 보내기", en: "Send an enquiry" },
    "contact.form.text": {
      ko: "아래 내용은 info@tscbgroup.com으로 전달됩니다.",
      en: "Your message is delivered to info@tscbgroup.com."
    },
    "contact.f.name": { ko: "성함", en: "Name" },
    "contact.f.name.ph": { ko: "홍길동", en: "Full name" },
    "contact.f.company": { ko: "회사명", en: "Company" },
    "contact.f.company.ph": { ko: "회사 또는 기관명", en: "Company or organisation" },
    "contact.f.email": { ko: "이메일", en: "Email" },
    "contact.f.email.ph": { ko: "name@company.com", en: "name@company.com" },
    "contact.f.phone": { ko: "연락처", en: "Phone" },
    "contact.f.phone.ph": { ko: "선택 입력", en: "Optional" },
    "contact.f.topic": { ko: "문의 분야", en: "Area of enquiry" },
    "contact.topic.1": { ko: "ESG / AA1000AS 검증", en: "ESG / AA1000AS assurance" },
    "contact.topic.2": { ko: "AI 전략 / 비즈니스 모델", en: "AI strategy / business model" },
    "contact.topic.3": { ko: "강연 / 자문", en: "Lecture / advisory" },
    "contact.topic.4": { ko: "기타", en: "Other" },
    "contact.f.topic.default": { ko: "선택해 주세요", en: "Please select" },
    "contact.f.message": { ko: "문의 내용", en: "Message" },
    "contact.f.message.ph": {
      ko: "현재 상황과 필요한 시점, 검토 중인 범위를 적어 주세요.",
      en: "Describe your situation, the timing you need and the scope under consideration."
    },
    "contact.f.consent": {
      ko: "문의 응대를 위해 성함·회사명·이메일·연락처의 수집 및 이용에 동의합니다.",
      en: "I agree to the collection and use of my name, company, email and phone number for responding to this enquiry."
    },
    "contact.f.submit": { ko: "문의 보내기", en: "Send enquiry" },
    "contact.f.sending": { ko: "전송 중…", en: "Sending…" },
    "contact.f.mailto": { ko: "이메일 앱으로 직접 보내기", en: "Send directly from your email app" },
    "contact.f.note": {
      ko: "전송이 되지 않는 환경에서는 아래 '메일로 직접 보내기'를 이용해 주세요. 같은 내용이 메일에 담깁니다.",
      en: "If sending fails in your environment, use the direct email option below — it carries the same content."
    },
    "contact.success.title": { ko: "문의가 접수되었습니다", en: "Your enquiry has been sent" },
    "contact.success.text": {
      ko: "확인 후 기재하신 이메일로 회신드리겠습니다. 급한 사안이면 info@tscbgroup.com으로 직접 보내 주셔도 됩니다.",
      en: "We will review it and reply to the email address you gave. For urgent matters you can also write to info@tscbgroup.com directly."
    },
    "contact.success.again": { ko: "새 문의 작성", en: "Write another enquiry" },
    "contact.error.title": { ko: "전송에 실패했습니다", en: "Sending failed" },
    "contact.error.text": {
      ko: "네트워크 또는 메일 서비스 문제로 전송되지 않았습니다. 아래 '메일로 직접 보내기'로 같은 내용을 보내 주세요.",
      en: "The message did not go through, likely a network or mail service issue. Use the direct email option below to send the same content."
    },
    "contact.invalid.text": { ko: "필수 항목을 확인해 주세요.", en: "Please check the required fields." },
    "contact.info.title": { ko: "본사 연락처", en: "Head office" },
    "contact.info.addr.k": { ko: "주소", en: "Address" },
    "contact.info.tel.k": { ko: "전화", en: "Telephone" },
    "contact.info.mail.k": { ko: "이메일", en: "Email" },
    "contact.info.web.k": { ko: "웹사이트", en: "Website" },
    "contact.info.map": { ko: "지도에서 보기", en: "Open in maps" },
    "contact.aside.note": {
      ko: "검증·자문 상담은 보유 보고서와 공시 일정, 의사결정 시점을 기준으로 범위를 정합니다.",
      en: "Assurance and advisory engagements are scoped against your existing reports, your disclosure calendar and your decision timeline."
    },
    "home.ceo.quote": {
      ko: "“Strategy without assurance lacks trust; assurance without strategy misses the market.”",
      en: "“Strategy without assurance lacks trust; assurance without strategy misses the market.”"
    },
    "faq.crumb": { ko: "FAQ", en: "FAQ" },
    "faq.eyebrow": { ko: "CLIENT ADVISORY", en: "CLIENT ADVISORY" },
    "faq.h1": { ko: "자주 묻는 질문 · 자문 가이드", en: "Client Advisory & FAQ" },
    "faq.lead": {
      ko: "ESG · AA1000AS 검증, Business Model 혁신, Marketing Strategy 분야별로 가장 많이 묻는 질문과 실무 비교표를 정리했습니다.",
      en: "Key questions and practical comparisons across ESG & AA1000AS Assurance, Business Model Innovation, and Marketing Strategy."
    },
    "faq.meta1": { ko: "ESG · Business Model · Marketing Strategy", en: "ESG · Business Model · Marketing Strategy" },
    "faq.meta2": { ko: "비교표 4종 · 핵심 FAQ 12선", en: "4 Comparison Tables · 12 Key FAQs" },
    "faq.cmp.tag": { ko: "비교표", en: "Comparisons" },
    "faq.cmp.title": { ko: "한눈에 보는 기준 · 전략 비교표", en: "Standards & Frameworks at a Glance" },
    "faq.cmp.lead": {
      ko: "의사결정과 실무 적용에 바로 활용하실 수 있도록 분야별 핵심 기준과 프레임워크를 비교했습니다.",
      en: "Side-by-side comparisons of assurance standards, business model design, and marketing strategy frameworks."
    },
    "faq.qa.tag": { ko: "분야별 핵심 질문", en: "Questions & Answers" },
    "faq.qa.title": { ko: "자문 영역별 자주 묻는 질문", en: "Advisory Questions by Practice Area" },
    "faq.qa.lead": {
      ko: "카테고리를 선택하면 ESG, Business Model, Marketing Strategy 분야별 답변과 비교표를 바로 확인할 수 있습니다.",
      en: "Select a practice category to filter answers and comparison tables across ESG, Business Model, and Marketing Strategy."
    }
  };

  /* ---- engine ------------------------------------------------------- */
  function readStored() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return v === "en" || v === "ko" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function store(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable — switching still works for this page */
    }
  }

  function initialLang() {
    var stored = readStored();
    if (stored) return stored;
    var nav = (navigator.language || "ko").toLowerCase();
    return nav.indexOf("ko") === 0 ? "ko" : DEFAULT_LANG;
  }

  var current = initialLang();

  function t(key, lang) {
    var entry = DICT[key];
    var l = lang || current;
    if (!entry) return "";
    return entry[l] != null ? entry[l] : entry.ko;
  }

  function apply(lang) {
    current = lang === "en" ? "en" : "ko";
    var root = document.documentElement;
    root.setAttribute("lang", current);
    root.setAttribute("data-lang", current);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute("data-i18n");
      var entry = DICT[key];
      if (!entry) continue;
      var value = entry[current] != null ? entry[current] : entry.ko;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = value;
      else el.textContent = value;
    }

    var holders = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < holders.length; j++) {
      var ph = holders[j];
      var pkey = ph.getAttribute("data-i18n-ph");
      if (DICT[pkey]) ph.setAttribute("placeholder", t(pkey));
    }

    var alts = document.querySelectorAll("[data-i18n-alt]");
    for (var n2 = 0; n2 < alts.length; n2++) {
      var altKey = alts[n2].getAttribute("data-i18n-alt");
      if (DICT[altKey]) alts[n2].setAttribute("alt", t(altKey));
    }

    var labels = document.querySelectorAll("[data-i18n-aria]");
    for (var k = 0; k < labels.length; k++) {
      var la = labels[k];
      var lkey = la.getAttribute("data-i18n-aria");
      if (DICT[lkey]) la.setAttribute("aria-label", t(lkey));
    }

    if (document.body) {
      var tk = document.body.getAttribute("data-title-ko");
      var te = document.body.getAttribute("data-title-en");
      if (tk || te) document.title = current === "en" ? te || tk : tk || te;
    }

    var buttons = document.querySelectorAll("[data-lang-btn]");
    for (var m = 0; m < buttons.length; m++) {
      var b = buttons[m];
      var on = b.getAttribute("data-lang-btn") === current;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    }

    document.dispatchEvent(new CustomEvent("tscb:langchange", { detail: { lang: current } }));
  }

  function set(lang) {
    store(lang);
    apply(lang);
  }

  window.TSCBi18n = { t: t, apply: apply, set: set, get lang() { return current; }, dict: DICT };

  function boot() {
    apply(current);
    document.addEventListener("click", function (ev) {
      var btn = ev.target.closest ? ev.target.closest("[data-lang-btn]") : null;
      if (!btn) return;
      ev.preventDefault();
      set(btn.getAttribute("data-lang-btn"));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
