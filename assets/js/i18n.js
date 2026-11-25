/* ==========================================================================
   i18n.js — The Solution Company B
   Instant KR / EN / 中文 switching for every text node carrying data-i18n.
   Preference persists in localStorage ("tscb-lang") and can be set with ?lang=ko|en|zh.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "tscb-lang";
  var DEFAULT_LANG = "ko";
  var LANGS = { ko: "ko", en: "en", zh: "zh" };

  /* "zh-CN", "zh-Hans", "cn", "ZH" all resolve to "zh" */
  function normalize(value) {
    if (!value) return null;
    var v = String(value).toLowerCase();
    if (v.indexOf("zh") === 0 || v === "cn" || v === "chinese" || v === "china") return "zh";
    if (v.indexOf("en") === 0) return "en";
    if (v.indexOf("ko") === 0 || v === "kr") return "ko";
    return null;
  }

  function fromQuery() {
    var m = /[?&]lang=([^&#]*)/.exec(window.location.search || "");
    if (!m) return null;
    try {
      return normalize(decodeURIComponent(m[1].replace(/\+/g, " ")));
    } catch (e) {
      return null;
    }
  }

  var DICT = {
    /* ---- global ------------------------------------------------------- */
    "ui.skip": { ko: "본문으로 건너뛰기", en: "Skip to content", zh: "跳到正文" },
    "ui.menu": { ko: "메뉴 열기", en: "Open menu", zh: "打开菜单" },
    "ui.menuClose": { ko: "메뉴 닫기", en: "Close menu", zh: "关闭菜单" },
    "ui.langLabel": { ko: "언어 선택", en: "Select language", zh: "选择语言" },
    "ui.close": { ko: "닫기", en: "Close", zh: "关闭" },
    "img.officeAlt": { ko: "Canary Wharf 스카이라인이 보이는 모던한 회의실", en: "A modern boardroom overlooking the Canary Wharf skyline", zh: "可眺望金丝雀码头天际线的现代会议室" },
    "img.aiAlt": { ko: "AI 네트워크와 지속가능성을 표현한 이미지", en: "An abstract network representing AI and sustainability", zh: "表现人工智能与可持续发展的抽象网络图像" },
    "img.ceoAlt": { ko: "심준규 대표이사", en: "Jace Shim, CEO", zh: "沈俊圭 (Jace Shim) 代表理事" },

    "nav.home": { ko: "홈", en: "HOME", zh: "首页" },
    "nav.about": { ko: "회사 소개", en: "ABOUT B", zh: "公司介绍" },
    "nav.what": { ko: "사업 영역", en: "WHAT WE DO", zh: "业务领域" },
    "nav.insight": { ko: "인사이트", en: "INSIGHT B", zh: "洞察" },
    "nav.faq": { ko: "FAQ", en: "FAQ", zh: "FAQ" },
    "nav.contact": { ko: "문의", en: "CONTACT", zh: "联系" },

    "footer.brandText": {
      ko: "(주)더솔루션컴퍼니비는 ESG 전략과 AA1000AS 검증, AI 시대 비즈니스 모델 혁신을 함께 설계하는 글로벌 전략 자문사입니다.",
      en: "The Solution Company B Co., Ltd. is a global strategy advisory firm integrating ESG assurance (AA1000AS) and AI-era business model innovation.",
      zh: "The Solution Company B Co., Ltd. 是一家将 ESG 战略、AA1000AS 鉴证与 AI 时代商业模式创新一并设计的全球战略咨询机构。"
    },
    "footer.license": {
      ko: "AA1000 Licensed Assurance Provider (License No. 001-039)",
      en: "AA1000 Licensed Assurance Provider (License No. 001-039)",
      zh: "AA1000 Licensed Assurance Provider (License No. 001-039)"
    },
    "footer.quick": { ko: "빠른 메뉴", en: "Quick menu", zh: "快速导航" },
    "footer.office": { ko: "본사", en: "Head office", zh: "总部" },
    "footer.addr": { ko: "주소", en: "Address", zh: "地址" },
    "footer.tel": { ko: "전화", en: "Tel", zh: "电话" },
    "footer.mail": { ko: "이메일", en: "Email", zh: "电子邮箱" },
    "footer.copy": {
      ko: "© 2026 (주)더솔루션컴퍼니비, All Rights Reserved.",
      en: "© 2026 The Solution Company B Co., Ltd., All Rights Reserved.",
      zh: "© 2026 The Solution Company B Co., Ltd., All Rights Reserved."
    },
    "footer.note": { ko: "글로벌 전략 자문 · 2014년 설립", en: "Global advisory · Established 2014", zh: "全球战略咨询 · 2014 年创立" },

    "cta.tag": { ko: "다음 단계", en: "Next step", zh: "下一步" },
    "cta.title": { ko: "다음 단계를 함께 설계합니다", en: "Let's design what comes next", zh: "与您一同设计下一步" },
    "cta.text": {
      ko: "지금 결정해야 할 문제를 알려주십시오. 진단과 프레임워크, 실행 계획까지 함께 준비합니다.",
      en: "Tell us the decision you are facing. We will bring the diagnosis, the framework and the delivery plan.",
      zh: "请告诉我们您此刻必须做出的决策。我们将把诊断、框架与执行计划一并准备好。"
    },
    "cta.btn": { ko: "문의하기", en: "CONTACT", zh: "联系我们" },


    /* ---- HOME : hero -------------------------------------------------- */
    "home.hero.tag": { ko: "글로벌 전략 · 검증 자문", en: "Global strategy & assurance", zh: "全球战略 · 鉴证咨询" },
    "home.hero.l1": { ko: "ESG 제3자 검증과", en: "ESG Assurance &", zh: "ESG 第三方鉴证与" },
    "home.hero.l2": { ko: "AI 시대 경영 전략 자문", en: "AI-Era Strategy Advisory", zh: "AI 时代经营战略咨询" },
    "home.hero.sub": {
      ko: "영국 AccountAbility 공인 AA1000 검증기관(001-039)으로서 지속가능경영보고서 검증·공급망 ESG 자문과 AI 기반 비즈니스 모델·마케팅 전략을 통합 제공합니다.",
      en: "An AccountAbility-licensed AA1000 Assurance Provider (001-039) delivering independent sustainability assurance, supply-chain ESG advisory, and AI-era business model & marketing strategy.",
      zh: "作为英国 AccountAbility 授权的 AA1000 鉴证机构（001-039），一体化提供可持续发展报告鉴证、供应链 ESG 咨询与 AI 驱动的商业模式及营销战略。"
    },
    "home.hero.cta1": { ko: "회사 소개", en: "ABOUT B", zh: "公司介绍" },
    "home.hero.cta2": { ko: "문의하기", en: "CONTACT", zh: "联系我们" },

    "home.s1.k": { ko: "AA1000 라이선스", en: "AA1000 licence", zh: "AA1000 授权" },
    "home.s1.v": { ko: "No. 001-039", en: "No. 001-039", zh: "No. 001-039" },
    "home.s2.k": { ko: "검증 기준 · 인증", en: "Standard · certification", zh: "鉴证准则 · 认证" },
    "home.s2.v": { ko: "AccountAbility · ACSAP", en: "AccountAbility · ACSAP", zh: "AccountAbility · ACSAP" },
    "home.s3.k": { ko: "출간 저서", en: "Published books", zh: "出版著作" },
    "home.s3.v": { ko: "9종", en: "9 titles", zh: "9 部" },
    "home.s4.k": { ko: "글로벌 파트너", en: "Global partners", zh: "全球合作伙伴" },
    "home.s4.v": { ko: "영국 · 중국", en: "UK · China", zh: "英国 · 中国" },

    /* ---- HOME : dual core --------------------------------------------- */
    "home.dual.tag": { ko: "듀얼 코어", en: "Dual-core practice", zh: "双核心" },
    "home.dual.title": { ko: "두 개의 축, 하나의 통합된 해법", en: "Two cores, one integrated answer", zh: "两条支柱，一个整合的答案" },
    "home.dual.text": {
      ko: "ESG와 AI는 별개의 과제가 아닙니다. 같은 비즈니스를 두 방향에서 다시 설계하는 일입니다.",
      en: "ESG and AI are not separate agendas. They are two directions from which the same business is redesigned.",
      zh: "ESG 与 AI 并非彼此分离的课题，而是从两个方向重新设计同一项业务。"
    },
    "home.dual.link": { ko: "서비스 자세히 보기", en: "Explore our services", zh: "查看服务详情" },

    "home.p1.title": { ko: "ESG 전략 · AA1000AS 검증", en: "ESG Strategy & AA1000AS Assurance", zh: "ESG 战略 · AA1000AS 鉴证" },
    "home.p1.text": {
      ko: "지속가능경영 전략 수립부터 지속가능경영보고서 제3자 검증, 공급망 ESG 대응까지 — AA1000AS 기준에 맞춰 설계하고 검증합니다.",
      en: "From sustainability strategy and roadmap to independent third-party assurance of sustainability reports and supply-chain ESG readiness — designed and assured against AA1000AS.",
      zh: "从可持续发展战略的制定，到可持续发展报告的第三方鉴证、供应链 ESG 应对，均依 AA1000AS 准则设计与鉴证。"
    },
    "home.p1.i1": { ko: "지속가능경영 전략 수립 및 로드맵", en: "Sustainability strategy & roadmap", zh: "可持续发展战略与路线图" },
    "home.p1.i2": { ko: "지속가능경영보고서 제3자 검증 (AA1000AS)", en: "Independent third-party assurance (AA1000AS)", zh: "可持续发展报告第三方鉴证（AA1000AS）" },
    "home.p1.i3": { ko: "공급망 ESG 평가 및 역량 강화", en: "Supply-chain ESG assessment & capacity building", zh: "供应链 ESG 评估与能力建设" },

    "home.p2.title": { ko: "AI 시대 전략 · 비즈니스 모델 혁신", en: "AI-Era Strategy & Business Model Innovation", zh: "AI 时代战略 · 商业模式创新" },
    "home.p2.text": {
      ko: "AI가 고객의 선택을 중개하는 시대의 기업 전략, 비즈니스 모델 재설계, AEO·GEO 기반 디지털 마케팅 전환을 설계합니다.",
      en: "Corporate strategy for an era in which AI mediates customer choice, business model redesign, and a digital marketing transition built on AEO and GEO.",
      zh: "在 AI 中介客户选择的时代，设计企业战略、重构商业模式，并推动以 AEO·GEO 为基础的数字营销转型。"
    },
    "home.p2.i1": { ko: "AI 시대 기업·사업 포트폴리오 전략", en: "AI-era corporate & portfolio strategy", zh: "AI 时代企业与业务组合战略" },
    "home.p2.i2": { ko: "비즈니스 모델 혁신 및 수익화 설계", en: "Business model innovation & monetisation design", zh: "商业模式创新与盈利设计" },
    "home.p2.i3": { ko: "AEO·GEO 기반 디지털 마케팅 전환", en: "AEO / GEO-driven digital marketing transition", zh: "基于 AEO·GEO 的数字营销转型" },

    /* ---- HOME : AA1000 ------------------------------------------------- */
    "home.aa.tag": { ko: "검증 자격", en: "Assurance credential", zh: "鉴证资质" },
    "home.aa.title": { ko: "공인 AA1000 검증기관", en: "An official AA1000 assurance provider", zh: "获授权的 AA1000 鉴证机构" },
    "home.aa.text": {
      ko: "(주)더솔루션컴퍼니비는 AA1000 표준을 제정한 영국 AccountAbility의 라이선스 검증기관입니다. 제3자 검증은 자기 선언이 아니라, 공인된 절차와 자격을 갖춘 기관의 독립적 검증으로 수행됩니다.",
      en: "The Solution Company B Co., Ltd. is a licensed assurance provider of AccountAbility, the UK-based body that publishes the AA1000 standards. Third-party assurance is not a self-declaration; it is performed independently by an accredited provider.",
      zh: "The Solution Company B Co., Ltd. 是制定 AA1000 准则的英国 AccountAbility 的授权鉴证机构。第三方鉴证不是自我声明，而须由具备公认程序与资质的机构独立完成。"
    },
    "home.aa.p1": {
      ko: "지속가능경영보고서는 기업이 스스로 쓴 문장으로 신뢰를 얻지 못합니다. 이해관계자는 보고서의 수치와 서술이 독립적으로 검증되었는지를 확인합니다.",
      en: "A sustainability report does not earn trust from the sentences a company writes about itself. Stakeholders ask whether the figures and claims in it were independently verified.",
      zh: "可持续发展报告无法仅凭企业自己撰写的文字赢得信任。利益相关方会确认报告中的数据与叙述是否经过独立鉴证。"
    },
    "home.aa.p2": {
      ko: "당사는 AA1000AS 검증을 수행하며, 보고서 작성 지원과 임직원 역량강화 교육을 함께 제공합니다. 검증과 구축을 분리하지 않고 진행하는 것이 당사의 방식입니다.",
      en: "We carry out AA1000AS assurance and also support report preparation and employee capacity building. Our approach keeps preparation and assurance in one continuous line of work.",
      zh: "本机构执行 AA1000AS 鉴证，同时提供报告编制支持与员工能力建设培训。不把鉴证与构建分割开来推进，是我们的做法。"
    },
    "home.aa.badge1": { ko: "AccountAbility 라이선스", en: "AccountAbility licensed", zh: "AccountAbility 授权" },
    "home.aa.badge2": { ko: "제3자 독립 검증", en: "Independent third party", zh: "第三方独立鉴证" },
    "home.aa.badge3": { ko: "ACSAP 인증", en: "ACSAP certified", zh: "ACSAP 认证" },

    "home.aa.k1": { ko: "발급 기관", en: "Issuer", zh: "发证机构" },
    "home.aa.v1": { ko: "AccountAbility (영국)", en: "AccountAbility (United Kingdom)", zh: "AccountAbility（英国）" },
    "home.aa.k2": { ko: "자격", en: "Licence", zh: "资质" },
    "home.aa.v2": { ko: "AA1000 Licensed Assurance Provider", en: "AA1000 Licensed Assurance Provider", zh: "AA1000 Licensed Assurance Provider" },
    "home.aa.k3": { ko: "라이선스 번호", en: "Licence no.", zh: "授权编号" },
    "home.aa.v3": { ko: "001-039", en: "001-039", zh: "001-039" },
    "home.aa.k4": { ko: "검증 전문 인증", en: "Assurance certification", zh: "鉴证专家认证" },
    "home.aa.v4": {
      ko: "ACSAP — AccountAbility 공인 지속가능성 검증 전문가",
      en: "ACSAP — AccountAbility Certified Sustainability Assurance Practitioner",
      zh: "ACSAP — AccountAbility 认证可持续发展鉴证师"
    },
    "home.aa.k5": { ko: "검증 범위", en: "Scope", zh: "鉴证范围" },
    "home.aa.v5": {
      ko: "지속가능경영보고서 AA1000AS 검증 · 공급망 ESG · 역량강화 교육",
      en: "AA1000AS assurance of sustainability reports · supply-chain ESG · training",
      zh: "可持续发展报告 AA1000AS 鉴证 · 供应链 ESG · 能力建设培训"
    },
    "home.aa.note": {
      ko: "검증 의견은 검증 범위와 기준에 따라 독립적으로 작성됩니다. 상담 시 보유 보고서와 공시 일정을 기준으로 검증 계획을 제안합니다.",
      en: "Assurance conclusions are formed independently, within a defined scope and standard. A consultation begins with your existing reports and disclosure calendar.",
      zh: "鉴证结论依据鉴证范围与准则独立形成。咨询时，我们将以既有报告与信息披露日程为基础提出鉴证计划。"
    },
    "home.aa.cta": { ko: "검증 상담 요청", en: "Request an assurance consultation", zh: "申请鉴证咨询" },

    /* ---- HOME : CEO ---------------------------------------------------- */
    "home.ceo.tag": { ko: "대표 · 저서", en: "CEO & publications", zh: "代表 · 著作" },
    "home.ceo.title": { ko: "프레임워크를 만든 사람이 직접 자문합니다", en: "The author of the frameworks advises the work", zh: "框架的提出者亲自提供咨询" },
    "home.ceo.text": {
      ko: "심준규 대표는 (주)더솔루션컴퍼니비가 현장에서 적용하는 전략 프레임워크를 직접 집필하고 자문합니다.",
      en: "Dr. Jace Shim personally authors and advises on the strategic frameworks applied by The Solution Company B Co., Ltd.",
      zh: "沈俊圭 (Jace Shim) 代表亲自撰写 The Solution Company B Co., Ltd. 在现场运用的战略框架，并亲自提供咨询。"
    },
    "home.ceo.name": { ko: "심준규", en: "Jace Shim, Ph.D.", zh: "沈俊圭 (Jace Shim) 博士" },
    "home.ceo.role": { ko: "대표이사 · 경영학 박사 · 인하대학교 경영학과 겸임교수", en: "CEO · Ph.D. in Business Administration · Adjunct Professor, Inha University", zh: "代表理事 · 工商管理学博士 · 仁荷大学工商管理系兼任教授" },
    "home.ceo.k1": { ko: "현직", en: "Role", zh: "现任" },
    "home.ceo.v1": { ko: "(주)더솔루션컴퍼니비 대표이사", en: "CEO, The Solution Company B Co., Ltd.", zh: "The Solution Company B Co., Ltd. 代表理事" },
    "home.ceo.k2": { ko: "겸임", en: "Adjunct", zh: "兼任" },
    "home.ceo.v2": { ko: "인하대학교 경영학과 겸임교수", en: "Adjunct Professor, Dept. of Business Administration, Inha University", zh: "仁荷大学工商管理系兼任教授" },
    "home.ceo.k3": { ko: "학위", en: "Ph.D.", zh: "学位" },
    "home.ceo.v3": { ko: "경영학 박사", en: "Ph.D. in Business Administration", zh: "工商管理学博士" },
    "home.ceo.k4": { ko: "MBA", en: "MBA", zh: "MBA" },
    "home.ceo.v4": { ko: "University of Liverpool (영국)", en: "University of Liverpool, United Kingdom", zh: "利物浦大学（英国）" },
    "home.ceo.bio": {
      ko: "리테일·유통 현장 경험과 중국·영국에서의 실무를 바탕으로 아시아 시장의 비즈니스 메커니즘과 공급망 ESG를 연구합니다. 지속가능경영 검증과 AI 시대 비즈니스 모델 혁신을 하나의 전략으로 통합하는 데 집중하고 있습니다.",
      en: "His work connects retail and distribution practice in Korea with field experience in China and the UK, focused on supply-chain ESG and the business mechanisms of Asian markets. He integrates sustainability assurance and AI-era business model innovation into a single strategy.",
      zh: "以零售与流通领域的现场经验，以及在中国、英国的实务经历为基础，研究亚洲市场的商业机制与供应链 ESG。专注于把可持续发展鉴证与 AI 时代商业模式创新整合为一套战略。"
    },
    "home.books.title": { ko: "대표이사 주요저서", en: "Publications by the CEO", zh: "代表理事主要著作" },
    "home.books.text": {
      ko: "출간연도와 출판사, 핵심 프레임워크를 기준으로 정리한 서지입니다.",
      en: "A bibliography organised by year, publisher and the framework each title introduces.",
      zh: "按出版年份、出版社与核心框架整理的著作书目。"
    },

    "book.1.title": { ko: "AI 승자독식", en: "Winner Takes the Answer", zh: "AI 赢家通吃" },
    "book.1.sub": { ko: "Winner Takes the Answer", en: "AI 승자독식 · Korean edition", zh: "Winner Takes the Answer · 韩文版" },
    "book.1.meta": { ko: "2026 · 라온북플러스", en: "2026 · Raonbook Plus", zh: "2026 · Raonbook Plus" },
    "book.1.desc": {
      ko: "3C-AI · VRIO-D · STQP · E-E-A-T-C — AI 검색 시대의 4대 전략 프레임워크.",
      en: "3C-AI · VRIO-D · STQP · E-E-A-T-C — four strategy frameworks for the AI search era.",
      zh: "3C-AI · VRIO-D · STQP · E-E-A-T-C —— AI 搜索时代的四大战略框架。"
    },
    "book.2.title": { ko: "타겟머니", en: "타겟머니 (Target Money)", zh: "Target Money 目标资金" },
    "book.2.sub": { ko: "Target Money", en: "Korean edition", zh: "Target Money · 韩文版" },
    "book.2.meta": { ko: "2026 · 라온북", en: "2026 · Raonbook", zh: "2026 · Raonbook" },
    "book.2.desc": { ko: "고객과 시장을 다시 정의하는 타깃 설정의 전략.", en: "Strategy for defining targets, customers and markets anew.", zh: "重新定义客户与市场的目标设定战略。" },
    "book.3.title": { ko: "비즈니스 모델 혁신", en: "비즈니스 모델 혁신 (Business Model Innovation)", zh: "商业模式创新" },
    "book.3.sub": { ko: "Business Model Innovation", en: "Korean edition", zh: "Business Model Innovation · 韩文版" },
    "book.3.meta": { ko: "2026 · 라온북", en: "2026 · Raonbook", zh: "2026 · Raonbook" },
    "book.3.desc": { ko: "사업 구조와 수익 모델을 재설계하는 프레임워크.", en: "A framework for redesigning business structure and revenue models.", zh: "重构业务结构与收益模式的框架。" },
    "book.4.title": { ko: "AI 마케팅 패러다임", en: "AI 마케팅 패러다임 (The AI Marketing Paradigm)", zh: "AI 营销范式" },
    "book.4.sub": { ko: "The AI Marketing Paradigm", en: "Korean edition", zh: "The AI Marketing Paradigm · 韩文版" },
    "book.4.meta": { ko: "2026 · 라온북", en: "2026 · Raonbook", zh: "2026 · Raonbook" },
    "book.4.desc": { ko: "검색과 추천이 AI로 이동한 뒤의 마케팅 구조.", en: "Marketing after search and recommendation moved to AI.", zh: "搜索与推荐迁移至 AI 之后的营销结构。" },
    "book.5.title": { ko: "스테이블코인 부의 기회", en: "스테이블코인 부의 기회 (The Stablecoin Opportunity)", zh: "稳定币的财富机遇" },
    "book.5.sub": { ko: "The Stablecoin Opportunity", en: "Korean edition", zh: "The Stablecoin Opportunity · 韩文版" },
    "book.5.meta": { ko: "2026 · 라온북", en: "2026 · Raonbook", zh: "2026 · Raonbook" },
    "book.5.desc": { ko: "디지털 결제 인프라가 만드는 금융·사업 기회.", en: "Financial and business opportunities created by digital payment infrastructure.", zh: "数字支付基础设施所带来的金融与商业机遇。" },
    "book.6.title": { ko: "그린북 THE GREEN BOOK", en: "THE GREEN BOOK", zh: "THE GREEN BOOK 绿皮书" },
    "book.6.sub": { ko: "THE GREEN BOOK", en: "Korean edition", zh: "THE GREEN BOOK · 韩文版" },
    "book.6.meta": { ko: "2025 · 프로방스", en: "2025 · Provence", zh: "2025 · Provence" },
    "book.6.desc": { ko: "지속가능경영을 실무 언어로 정리한 안내서.", en: "A practitioner's guide to sustainability management.", zh: "以实务语言整理可持续发展管理的指导书。" },
    "book.7.title": { ko: "녹색금융으로 읽는 ESG 이야기", en: "녹색금융으로 읽는 ESG 이야기 (ESG Through Green Finance)", zh: "以绿色金融读懂 ESG" },
    "book.7.sub": { ko: "ESG Through Green Finance", en: "Korean edition", zh: "ESG Through Green Finance · 韩文版" },
    "book.7.meta": { ko: "2025 · 에스디지연구소", en: "2025 · SDG Institute", zh: "2025 · SDG Institute" },
    "book.7.desc": { ko: "금융의 관점에서 본 ESG 공시와 자금 흐름.", en: "ESG disclosure and capital flows seen from finance.", zh: "从金融视角看 ESG 信息披露与资金流向。" },
    "book.8.title": { ko: "실천으로 완성하는 ESG 전략", en: "실천으로 완성하는 ESG 전략 (ESG Strategy in Practice)", zh: "以实践完成的 ESG 战略" },
    "book.8.sub": { ko: "ESG Strategy in Practice", en: "Korean edition", zh: "ESG Strategy in Practice · 韩文版" },
    "book.8.meta": { ko: "2024 · 한경사", en: "2024 · Hankyungsa", zh: "2024 · Hankyungsa" },
    "book.8.desc": {
      ko: "성공적인 ESG경영 전략의 수립과 실천을 위한 참고서.",
      en: "A reference for building and executing an ESG management strategy.",
      zh: "为成功建立并落实 ESG 经营战略而写的参考书。"
    },
    "book.9.title": { ko: "FVS 마케팅", en: "FVS 마케팅 (FVS Marketing)", zh: "FVS 营销" },
    "book.9.sub": { ko: "FVS Marketing", en: "Korean edition", zh: "FVS Marketing · 韩文版" },
    "book.9.meta": { ko: "2015 · 휴먼큐브", en: "2015 · Humancube", zh: "2015 · Humancube" },
    "book.9.desc": {
      ko: "새롭게 제시하는 마케팅 관점과 마케팅 전략을 위한 지침서.",
      en: "A guide to a new marketing perspective and marketing strategy.",
      zh: "提出全新营销视角与营销战略的指南。"
    },
    "book.co": { ko: "공저", en: "Co-authored", zh: "合著" },
    "book.author": { ko: "저자", en: "Author", zh: "作者" },

    /* ---- HOME : insight preview ---------------------------------------- */
    "home.insight.tag": { ko: "인사이트", en: "Insight B", zh: "洞察" },
    "home.insight.title": { ko: "ESG와 AI 시대의 경영 인사이트", en: "Business Insight for the ESG and AI Era", zh: "ESG 与 AI 时代的经营洞察" },
    "home.insight.text": {
      ko: "지속가능경영 검증과 AI 기반 비즈니스 모델·마케팅 전략에 관한 칼럼과 연구 노트를 발행합니다.",
      en: "Columns and research notes on sustainability assurance, AI-era business models and marketing strategy.",
      zh: "发布关于可持续发展鉴证、AI 驱动商业模式与营销战略的专栏与研究笔记。"
    },
    "home.insight.cta": { ko: "전체 인사이트", en: "All insights", zh: "全部洞察" },

    /* ---- shared article cards ------------------------------------------ */
    "art1.cat": { ko: "인구 · 전략", en: "Demographics · Strategy", zh: "人口 · 战略" },
    "art1.title": { ko: "인구 소멸과 2030년 기업 경영의 변곡점", en: "Population Decline and the 2030 Turning Point for Business", zh: "人口消失与 2030 年企业经营的拐点" },
    "art1.excerpt": {
      ko: "한국 경제의 완충 지대가 사라지는 2028~2030년. 마지막 베이비붐 세대의 은퇴가 기업의 비용 구조와 시장 구조를 동시에 바꿉니다.",
      en: "Between 2028 and 2030 the buffer of Korea's economy disappears. The retirement of the last baby-boom cohort changes cost structures and market structures at once.",
      zh: "韩国经济的缓冲带在 2028~2030 年消失。最后一批婴儿潮一代的退休，将同时改变企业的成本结构与市场结构。"
    },
    "art2.cat": { ko: "AI 전략 · AEO", en: "AI Strategy · AEO", zh: "AI 战略 · AEO" },
    "art2.title": {
      ko: "AI 검색 시대, 우리 회사가 사라지는 이유: 인용 격차를 돌파하는 AEO 4대 전략 프레임워크",
      en: "Why Your Company Disappears in AI Search: Four Frameworks for Breaking Through the Citation Gap",
      zh: "AI 搜索时代，您的公司为何消失：突破引用差距的 AEO 四大战略框架"
    },
    "art2.excerpt": {
      ko: "실제 경쟁력과 AI가 고객에게 전하는 경쟁력 사이의 '인용 격차'. 3C-AI·VRIO-D·STQP·E-E-A-T-C로 격차의 원인을 진단합니다.",
      en: "The 'citation gap' between real competitiveness and what AI tells customers. 3C-AI, VRIO-D, STQP and E-E-A-T-C diagnose where it comes from.",
      zh: "真实竞争力与 AI 传达给客户的竞争力之间存在引用差距。以 3C-AI、VRIO-D、STQP、E-E-A-T-C 诊断差距的成因。"
    },
    "art3.cat": { ko: "AI 전략 · VRIO-D", en: "AI Strategy · VRIO-D", zh: "AI 战略 · VRIO-D" },
    "art3.title": { ko: "30년 쌓은 실력이 왜 AI 답변에는 안 나올까", en: "Why Thirty Years of Craft Never Appears in an AI Answer", zh: "三十年积累的实力，为何不出现在 AI 的答案里" },
    "art3.excerpt": {
      ko: "네 질문을 모두 통과한 회사가 시장에서는 보이지 않습니다. VRIO-D는 다섯 번째 질문, '발견 가능성'을 묻습니다.",
      en: "A company can pass all four questions and still be invisible. VRIO-D adds a fifth: discoverability.",
      zh: "通过全部四问的企业，在市场上却看不见。VRIO-D 提出第五问：可发现性。"
    },
    "art.read": { ko: "읽기", en: "Read article", zh: "阅读" },

    /* ---- ABOUT --------------------------------------------------------- */
    "about.crumb": { ko: "회사 소개", en: "About B", zh: "公司介绍" },
    "about.h1": { ko: "전략과 검증을 실행으로 연결하는 파트너", en: "Connecting Strategy and Assurance to Execution", zh: "把战略与鉴证连接到执行" },
    "about.lead": {
      ko: "(주)더솔루션컴퍼니비(The Solution Company B Co., Ltd.)는 ESG·지속가능성 검증과 AI 시대 경영 전략의 통합 솔루션을 제공합니다.",
      en: "The Solution Company B Co., Ltd. delivers integrated solutions across ESG sustainability assurance and AI-era corporate strategy.",
      zh: "The Solution Company B Co., Ltd. 提供 ESG·可持续发展鉴证与 AI 时代经营战略的整合解决方案。"
    },
    "about.m1.k": { ko: "설립", en: "Established", zh: "成立" },
    "about.m1.v": { ko: "2014", en: "2014", zh: "2014" },
    "about.m2.k": { ko: "본사", en: "Head office", zh: "总部" },
    "about.m2.v": { ko: "경기도 안양시", en: "Anyang, Gyeonggi-do", zh: "京畿道安养市" },
    "about.m3.k": { ko: "파트너", en: "Partners", zh: "合作伙伴" },
    "about.m3.v": { ko: "영국 · 중국", en: "United Kingdom · China", zh: "英国 · 中国" },

    "about.phil.tag": { ko: "철학", en: "Philosophy", zh: "理念" },
    "about.phil.title": { ko: "왜 이름이 '솔루션 컴퍼니'인가", en: "Why we call ourselves a Solution Company", zh: "为何名为“解决方案公司”" },
    "about.phil.p1": {
      ko: "(주)더솔루션컴퍼니비는 기존 컨설팅 시장에 새로운 방향을 제시하고자 합니다. 시장의 트렌드와 문제점을 분석하고, 해당 분야 최고의 전문가들과 함께 새로운 비즈니스 솔루션 모델을 제안하는 경영 컨설팅 법인입니다.",
      en: "The Solution Company B Co., Ltd. was established to bring a new standard to strategic advisory. We analyze market dynamics and structural challenges, working alongside leading specialists to design actionable business solutions.",
      zh: "The Solution Company B Co., Ltd. 希望为既有咨询市场提出新的方向。我们分析市场趋势与问题所在，并与该领域最优秀的专家一同提出新的商业解决方案模式。"
    },
    "about.phil.p2": {
      ko: "단순 자문에 머무르지 않고 성공을 향한 맞춤 솔루션을 제안한다는 뜻을 담아 '(주)더솔루션컴퍼니비(The Solution Company B Co., Ltd.)'로 명명했습니다.",
      en: "We named our firm 'The Solution Company B Co., Ltd.' to reflect our commitment to tailored, executable solutions for client success.",
      zh: "为表达不止于单纯咨询、而是提出面向成功的定制解决方案这一含义，公司命名为 The Solution Company B Co., Ltd.。"
    },
    "about.phil.p3": {
      ko: "진단과 분석에 그치지 않고, 지속적으로 성장할 수 있는 방법을 제안하며 고객과 함께 만들어 갑니다.",
      en: "We do not stop at diagnosis and analysis. We propose how the business keeps growing, and build it with the client.",
      zh: "我们不止步于诊断与分析，而是提出可持续成长的方法，并与客户一同构建。"
    },
    "about.phil.quote1": { ko: "세상에는 하나의 방법과 정답만이 존재하는 건 아닙니다.", en: "There is never only one method, and never only one right answer.", zh: "世上并不只有一种方法、一个正确答案。" },
    "about.phil.quote2": {
      ko: "우리는 매번 새로운 관점과 방법으로 세상을 바라보고, 그 새로움을 함께 나눕니다.",
      en: "We look at the world from a new perspective and a new method each time, and we share what we find.",
      zh: "我们每一次都以新的视角与方法观察世界，并一同分享这份新意。"
    },
    "about.phil.quoteBy": { ko: "— (주)더솔루션컴퍼니비", en: "— The Solution Company B Co., Ltd.", zh: "— The Solution Company B Co., Ltd." },

    "about.why.tag": { ko: "왜 B인가", en: "Why B", zh: "为何是 B" },
    "about.why.title": { ko: "네 가지 강점", en: "Four reasons", zh: "四项优势" },
    "about.why.text": {
      ko: "전문가의 이력이 아니라, 고객의 문제 앞에서 무엇을 할 수 있는지로 증명합니다.",
      en: "Not by the CVs of our people, but by what we can do in front of a client's problem.",
      zh: "我们不以专家的履历，而以在客户的问题面前能够做什么来证明自己。"
    },
    "about.w1.t": { ko: "풍부한 실무경험", en: "Practitioner depth", zh: "丰富的实务经验" },
    "about.w1.sub": { ko: "Experience", en: "실무경험", zh: "Experience" },
    "about.w1.d": {
      ko: "컨설턴트들은 자신의 전문 영역에서 '프로'라 불리는 사람들입니다. 방법론으로 접근하는 것을 넘어, 직접 문제를 함께 고민하고 현장에서 작동하는 해법을 찾습니다.",
      en: "Our consultants are practitioners first. Beyond applying a methodology, they work the problem with you and find what actually operates in the field.",
      zh: "顾问们是在各自专业领域被称为专业者的人。我们超越方法论的套用，直接与客户一同思考问题，寻找在现场行得通的解法。"
    },
    "about.w2.t": { ko: "AA1000AS 전문성", en: "AA1000AS expertise", zh: "AA1000AS 专业能力" },
    "about.w2.sub": { ko: "Assurance", en: "검증", zh: "Assurance" },
    "about.w2.d": {
      ko: "AccountAbility의 Licensed Assurance Provider로서 지속가능경영보고서 제3자 검증 역량을 보유하며, 보고서 작성 지원과 임직원 역량강화 교육을 함께 수행합니다.",
      en: "As an AccountAbility Licensed Assurance Provider we hold the capability for third-party assurance of sustainability reports, and we support report preparation and internal capacity building alongside it.",
      zh: "作为 AccountAbility 授权鉴证机构，具备可持续发展报告第三方鉴证能力，并同时提供报告编制支持与员工能力建设培训。"
    },
    "about.w3.t": { ko: "정보공유 시스템", en: "A knowledge-sharing system", zh: "信息共享体系" },
    "about.w3.sub": { ko: "Knowledge", en: "정보공유", zh: "Knowledge" },
    "about.w3.d": {
      ko: "전문가만이 가진 정보를 원하는 사람들과 함께 공유하는 시스템을 운영합니다. 그 과정에서 새로운 전문지식이 만들어지고, 고객에게 더 큰 가치로 돌아갑니다.",
      en: "We run a system that shares what specialists know with everyone who needs it. New knowledge is produced in that process and returns to clients as greater value.",
      zh: "我们运营一套体系，把专家独有的知识分享给需要的人。新的专业知识在这一过程中产生，并以更大的价值回到客户身上。"
    },
    "about.w4.t": { ko: "영국 · 중국 글로벌 파트너 인프라", en: "UK & China partner infrastructure", zh: "英国 · 中国全球合作伙伴网络" },
    "about.w4.sub": { ko: "Global", en: "글로벌", zh: "Global" },
    "about.w4.d": {
      ko: "영국과 중국에 파트너를 두고, 현지의 성공 전략을 한국 시장에, 한국의 실행 방식을 현지에 번역합니다. 해외 진출 시 현지 사정에 맞춘 조율을 함께합니다.",
      en: "With partners in the United Kingdom and China, we translate local success strategies into the Korean market and Korean practice into local markets, and coordinate market entry on the ground.",
      zh: "在英国与中国设有合作伙伴，把当地的成功战略转译为韩国市场，把韩国的执行方式转译为当地市场。海外拓展时，我们与您一同协调当地情况。"
    },

    "about.who.tag": { ko: "B는 누구인가", en: "Who is B", zh: "B 是谁" },
    "about.who.title": { ko: "대표 심준규", en: "Jace Shim, Ph.D.", zh: "沈俊圭 (Jace Shim) 博士" },
    "about.who.lead": {
      ko: "하나의 정답이 아니라, 환경과 시스템에 맞는 다양한 정답을 찾습니다.",
      en: "Not one right answer, but the answers that fit a given environment and system.",
      zh: "不追求唯一的正确答案，而是寻找契合环境与系统的多种答案。"
    },
    "about.who.bio1": {
      ko: "대학에서 경제학을 전공하고, University of Liverpool MBA 과정에서 경영 지식을 갖추었으며, 박사 과정에서 공급사슬에서의 ESG경영을 집중 연구했습니다.",
      en: "He studied economics as an undergraduate, took his MBA at the University of Liverpool, and focused his doctoral research on ESG management in the supply chain.",
      zh: "他在大学主修经济学，在利物浦大学 MBA 课程中系统掌握经营知识，并在博士阶段集中研究供应链中的 ESG 经营。"
    },
    "about.who.bio2": {
      ko: "국내 리테일 시장에 대한 전문 경험과 중국을 비롯한 해외에서의 실무를 바탕으로 아시아 시장의 비즈니스 메커니즘을 다뤄 왔습니다. ESG 경영의 확산을 위해 연구와 강연, 컨설팅에 집중하고 있습니다.",
      en: "His specialist experience in the Korean retail market and his practice in China and elsewhere inform how he reads the business mechanisms of Asian markets. He divides his work between research, lecturing and consulting on the spread of ESG management.",
      zh: "以韩国零售市场的专业经验和中国等地的实务经历为基础，持续研究亚洲市场的商业机制。为推进 ESG 经营的扩散，专注于研究、演讲与咨询。"
    },
    "about.who.eduTitle": { ko: "학력", en: "Education", zh: "学历" },
    "about.who.e1": { ko: "경영학 박사", en: "Ph.D. in Business Administration", zh: "工商管理学博士" },
    "about.who.e2": { ko: "MBA · University of Liverpool (영국)", en: "MBA, University of Liverpool, United Kingdom", zh: "MBA · 利物浦大学（英国）" },
    "about.who.e3": { ko: "경제학 전공 (학부)", en: "BA, Economics", zh: "经济学专业（本科）" },
    "about.who.researchTitle": { ko: "연구·전문 분야", en: "Research & expertise", zh: "研究·专业领域" },
    "about.who.r1": { ko: "공급망 ESG와 지속가능경영 검증", en: "Supply-chain ESG and sustainability assurance", zh: "供应链 ESG 与可持续发展鉴证" },
    "about.who.r2": { ko: "리테일·유통 비즈니스 전략", en: "Retail and distribution business strategy", zh: "零售·流通经营战略" },
    "about.who.r3": { ko: "AI 시대 비즈니스 모델과 AEO·GEO 전략", en: "AI-era business models, AEO and GEO strategy", zh: "AI 时代商业模式与 AEO·GEO 战略" },
    "about.who.teachTitle": { ko: "겸임 직함", en: "Academic Appointment", zh: "兼任职务" },
    "about.who.t1": {
      ko: "인하대학교 경영학과 겸임교수",
      en: "Adjunct Professor, Department of Business Administration, Inha University",
      zh: "仁荷大学工商管理系兼任教授"
    },
    "about.who.booksTitle": { ko: "대표이사 주요저서", en: "Publications by the CEO", zh: "代表理事主要著作" },
    "about.who.booksText": {
      ko: "2015년부터 2026년까지 아홉 권의 저서를 출간연도와 출판사 기준으로 소개합니다.",
      en: "Nine books between 2015 and 2026, listed by publication year and publisher.",
      zh: "介绍 2015 年至 2026 年出版的九部著作，按出版年份与出版社排列。"
    },
    "about.office.caption": {
      ko: "전략은 회의실에서 끝나지 않습니다. 진단은 현장에서, 검증은 데이터에서 시작합니다.",
      en: "Strategy does not end in a meeting room. Diagnosis starts in the field; assurance starts with the data.",
      zh: "战略不止于会议室。诊断从现场开始，鉴证从数据开始。"
    },

    /* ---- WHAT WE DO ---------------------------------------------------- */
    "wwd.crumb": { ko: "사업 영역", en: "What we do", zh: "业务领域" },
    "wwd.h1": { ko: "시장에서 작동하는 전략", en: "Strategy that survives contact with the market", zh: "在市场上行得通的战略" },
    "wwd.lead": {
      ko: "검증과 전략, 교육을 하나의 라인으로 묶습니다. 보고서를 납품하는 대신 실행의 순서를 함께 정합니다.",
      en: "Assurance, strategy and training run as one line of work. Instead of handing over a report, we set the order of execution with you.",
      zh: "把鉴证、战略与培训串成一条线。我们不只交付报告，而是与您共同确定执行的顺序。"
    },
    "wwd.m1.k": { ko: "서비스", en: "Services", zh: "服务" },
    "wwd.m1.v": { ko: "3개 영역", en: "3 practices", zh: "3 个领域" },
    "wwd.m2.k": { ko: "산업 모듈", en: "Industry modules", zh: "行业模块" },
    "wwd.m2.v": { ko: "10개 영역", en: "10 areas", zh: "10 个领域" },
    "wwd.m3.k": { ko: "검증 자격", en: "Assurance", zh: "鉴证资质" },
    "wwd.m3.v": { ko: "AA1000 License 001-039", en: "AA1000 License 001-039", zh: "AA1000 License 001-039" },

    "wwd.serv.tag": { ko: "B의 서비스", en: "B's services", zh: "B 的服务" },
    "wwd.serv.title": { ko: "세 개의 실천 영역", en: "Three practices", zh: "三个实践领域" },
    "wwd.serv.text": {
      ko: "각 영역은 독립적으로 시작할 수 있고, 검증과 전략 과제가 겹칠 때 하나의 로드맵으로 통합됩니다.",
      en: "Each practice can start on its own, and where assurance and strategy overlap they are combined into a single roadmap.",
      zh: "各领域均可独立启动；当鉴证与战略课题重叠时，将整合为一条路线图。"
    },
    "wwd.s1.title": { ko: "ESG 전략 및 AA1000AS 검증", en: "ESG Strategy & AA1000AS Assurance", zh: "ESG 战略与 AA1000AS 鉴证" },
    "wwd.s1.tag": { ko: "검증 · 공시", en: "Assurance · disclosure", zh: "鉴证 · 披露" },
    "wwd.s1.text": {
      ko: "지속가능경영 전략을 세우고, 보고서를 만들고, 제3자 검증으로 신뢰를 확보하는 전 과정을 지원합니다.",
      en: "We support the whole line: setting sustainability strategy, preparing the report, and securing credibility through third-party assurance.",
      zh: "支持从建立可持续发展战略、编制报告，到通过第三方鉴证取得信任的全过程。"
    },
    "wwd.s1.i1": { ko: "지속가능경영 전략 수립 및 중장기 로드맵", en: "Sustainability strategy and multi-year roadmap", zh: "可持续发展战略与中长期路线图" },
    "wwd.s1.i2": { ko: "지속가능경영보고서 작성 지원", en: "Sustainability report preparation", zh: "可持续发展报告编制支持" },
    "wwd.s1.i3": { ko: "AA1000AS 제3자 검증", en: "AA1000AS third-party assurance", zh: "AA1000AS 第三方鉴证" },
    "wwd.s1.i4": { ko: "공급망 ESG 실사·평가 및 협력사 대응", en: "Supply-chain ESG due diligence and supplier response", zh: "供应链 ESG 尽职调查·评估与供应商应对" },
    "wwd.s1.i5": { ko: "ESG 공시·금융 대응 및 임직원 교육", en: "ESG disclosure, sustainable finance response and training", zh: "ESG 信息披露·金融应对与员工培训" },
    "wwd.s1.deliver": { ko: "산출물", en: "Deliverables", zh: "交付物" },
    "wwd.s1.d1": { ko: "전략 보고서·로드맵", en: "Strategy report and roadmap", zh: "战略报告与路线图" },
    "wwd.s1.d2": { ko: "검증 의견서", en: "Assurance statement", zh: "鉴证意见书" },
    "wwd.s1.d3": { ko: "공급망 평가 체계", en: "Supplier assessment framework", zh: "供应链评估体系" },

    "wwd.s2.title": { ko: "AI 시대 비즈니스 모델 · 마케팅 컨설팅", en: "AI-Era Business Model & Marketing", zh: "AI 时代商业模式 · 营销咨询" },
    "wwd.s2.tag": { ko: "전략 · AEO/GEO", en: "Strategy · AEO/GEO", zh: "战略 · AEO/GEO" },
    "wwd.s2.text": {
      ko: "AI가 고객의 선택을 중개하는 구조를 전제로, 사업 포트폴리오와 수익 모델, 그리고 검색·추천 전략을 다시 설계합니다.",
      en: "Taking as given that AI mediates customer choice, we redesign the portfolio, the revenue model, and the way a company is found and cited.",
      zh: "以 AI 中介客户选择为前提，重新设计业务组合与收益模式，以及搜索与推荐战略。"
    },
    "wwd.s2.i1": { ko: "AI 시대 사업 포트폴리오 진단 및 재설계", en: "AI-era portfolio diagnosis and redesign", zh: "AI 时代业务组合诊断与重构" },
    "wwd.s2.i2": { ko: "비즈니스 모델 혁신과 수익화 구조 설계", en: "Business model innovation and monetisation design", zh: "商业模式创新与盈利结构设计" },
    "wwd.s2.i3": { ko: "AEO·GEO 기반 콘텐츠·인용 전략", en: "AEO and GEO content and citation strategy", zh: "基于 AEO·GEO 的内容与引用战略" },
    "wwd.s2.i4": { ko: "AI 검색 가시성 진단 (3C-AI·VRIO-D·STQP·E-E-A-T-C)", en: "AI search visibility diagnosis (3C-AI, VRIO-D, STQP, E-E-A-T-C)", zh: "AI 搜索可见度诊断（3C-AI·VRIO-D·STQP·E-E-A-T-C）" },
    "wwd.s2.i5": { ko: "업무 자동화와 조직 운영 방식 전환", en: "Work automation and operating model transition", zh: "工作自动化与组织运营方式转型" },
    "wwd.s2.deliver": { ko: "산출물", en: "Deliverables", zh: "交付物" },
    "wwd.s2.d1": { ko: "인용 격차 진단표", en: "Citation gap diagnostic", zh: "引用差距诊断表" },
    "wwd.s2.d2": { ko: "비즈니스 모델 캔버스", en: "Business model canvas", zh: "商业模式画布" },
    "wwd.s2.d3": { ko: "질문 지도·포지셔닝 문장", en: "Question map and positioning statements", zh: "问题地图与定位语句" },

    "wwd.s3.title": { ko: "임직원 역량강화 교육 및 워크숍", en: "Corporate Training & Workshops", zh: "员工能力建设培训与工作坊" },
    "wwd.s3.tag": { ko: "교육 · 워크숍", en: "Training · workshops", zh: "培训 · 工作坊" },
    "wwd.s3.text": {
      ko: "전략은 조직이 이해하지 못하면 실행되지 않습니다. 경영진 세미나부터 실무 워크숍까지, 조직의 언어로 옮깁니다.",
      en: "A strategy that the organisation does not understand is never executed. From executive seminars to hands-on workshops, we translate it into the organisation's language.",
      zh: "组织若不理解战略，战略就不会被执行。从高层研讨会到实务工作坊，我们把战略转译为组织的语言。"
    },
    "wwd.s3.i1": { ko: "임직원 ESG 역량강화 교육", en: "ESG capability building for employees", zh: "员工 ESG 能力建设培训" },
    "wwd.s3.i2": { ko: "AI 리터러시와 실무 활용 워크숍", en: "AI literacy and applied workshops", zh: "AI 素养与实务应用工作坊" },
    "wwd.s3.i3": { ko: "경영진 전략 세미나", en: "Executive strategy seminars", zh: "高层战略研讨会" },
    "wwd.s3.i4": { ko: "AEO·GEO 실무 워크시트 교육", en: "AEO and GEO working-session training", zh: "AEO·GEO 实务工作表培训" },
    "wwd.s3.i5": { ko: "기업 맞춤 교재·케이스 개발", en: "Custom materials and case development", zh: "企业定制教材与案例开发" },
    "wwd.s3.deliver": { ko: "산출물", en: "Deliverables", zh: "交付物" },
    "wwd.s3.d1": { ko: "교육 커리큘럼", en: "Curriculum", zh: "培训课程体系" },
    "wwd.s3.d2": { ko: "워크시트·진단표", en: "Worksheets and diagnostics", zh: "工作表与诊断表" },
    "wwd.s3.d3": { ko: "워크숍 결과 보고", en: "Workshop findings", zh: "工作坊结果报告" },
    "wwd.sx.toContact": { ko: "이 서비스로 문의하기", en: "Enquire about this practice", zh: "就这项服务咨询" },

    "wwd.app.tag": { ko: "진행 방식", en: "How we work", zh: "推进方式" },
    "wwd.app.title": { ko: "진단에서 내재화까지", en: "From diagnosis to ownership", zh: "从诊断到内化" },
    "wwd.app.text": {
      ko: "컨설턴트가 떠난 뒤에도 작동하는 것을 목표로 합니다.",
      en: "We aim for what still works after the consultants leave.",
      zh: "目标是在顾问离开之后仍然有效运转。"
    },
    "wwd.ap1.t": { ko: "진단", en: "Diagnose", zh: "诊断" },
    "wwd.ap1.d": {
      ko: "현황과 데이터를 먼저 봅니다. 무엇이 문제이고 무엇이 아닌지, 근거를 붙여 정리합니다.",
      en: "We look at the situation and the data first, and set out what is a problem and what is not, with the evidence attached.",
      zh: "先看现状与数据。以证据为据，梳理什么是问题、什么不是问题。"
    },
    "wwd.ap2.t": { ko: "공동 설계", en: "Co-design", zh: "共同设计" },
    "wwd.ap2.d": {
      ko: "고객의 조직과 함께 대안을 만듭니다. 실행 주체가 설계에 참여해야 실행이 남습니다.",
      en: "Alternatives are built with the client's organisation. Execution stays only when the people who execute took part in the design.",
      zh: "与客户的组织一同制定备选方案。只有执行主体参与设计，执行才会留下来。"
    },
    "wwd.ap3.t": { ko: "내재화 · 검증", en: "Embed & assure", zh: "内化 · 鉴证" },
    "wwd.ap3.d": {
      ko: "교육과 검증으로 결과를 조직의 역량과 대외 신뢰로 바꿉니다.",
      en: "Training and assurance turn the result into internal capability and external credibility.",
      zh: "通过培训与鉴证，把结果转化为组织能力与对外信誉。"
    },

    "wwd.ind.tag": { ko: "B의 산업 영역", en: "B's industries", zh: "B 的行业领域" },
    "wwd.ind.title": { ko: "10개 모듈화 산업 영역", en: "Ten modular industry areas", zh: "十个模块化行业领域" },
    "wwd.ind.text": {
      ko: "산업별 전문가의 인사이트를 모듈로 묶어, 필요한 영역만 조합해 프로젝트를 구성합니다.",
      en: "Each area is a module built from specialist insight, combined as a project requires.",
      zh: "把各行业专家的洞见整理为模块，按需组合以构成项目。"
    },
    "ind.1.name": { ko: "비즈니스 전략", en: "Business Strategy", zh: "经营战略" },
    "ind.1.desc": { ko: "사업 포트폴리오와 성장 경로 설계", en: "Portfolio and growth-path design", zh: "业务组合与成长路径设计" },
    "ind.2.name": { ko: "ESG 경영전략", en: "ESG Strategy", zh: "ESG 经营战略" },
    "ind.2.desc": { ko: "지속가능경영 전략·공시·검증", en: "Sustainability strategy, disclosure and assurance", zh: "可持续发展战略·信息披露·鉴证" },
    "ind.3.name": { ko: "마케팅 전략", en: "Marketing Strategy", zh: "营销战略" },
    "ind.3.desc": { ko: "시장 진입과 브랜드 포지셔닝", en: "Market entry and brand positioning", zh: "市场进入与品牌定位" },
    "ind.4.name": { ko: "도소매·유통", en: "Retail Business", zh: "批发零售·流通" },
    "ind.4.desc": { ko: "리테일 채널과 상품·매장 전략", en: "Retail channels, assortment and store strategy", zh: "零售渠道与商品·门店战略" },
    "ind.5.name": { ko: "시스템 구축·운영", en: "System Operation", zh: "系统构建·运营" },
    "ind.5.desc": { ko: "업무 프로세스와 운영 체계 설계", en: "Process and operating-system design", zh: "业务流程与运营体系设计" },
    "ind.6.name": { ko: "의료·건강", en: "Health Care", zh: "医疗·健康" },
    "ind.6.desc": { ko: "헬스케어 서비스와 사업 모델", en: "Healthcare services and business models", zh: "医疗服务与商业模式" },
    "ind.7.name": { ko: "문화·예술", en: "Culture & Art", zh: "文化·艺术" },
    "ind.7.desc": { ko: "문화예술 콘텐츠와 브랜드 협업", en: "Cultural content and brand collaboration", zh: "文化内容与品牌合作" },
    "ind.8.name": { ko: "인적자원 관리", en: "HR", zh: "人力资源管理" },
    "ind.8.desc": { ko: "조직·인재·역량 개발", en: "Organisation, talent and capability", zh: "组织·人才·能力开发" },
    "ind.9.name": { ko: "패션 마케팅", en: "Fashion Marketing", zh: "时尚营销" },
    "ind.9.desc": { ko: "패션 브랜드와 리테일 마케팅", en: "Fashion brand and retail marketing", zh: "时尚品牌与零售营销" },
    "ind.10.name": { ko: "스포츠 마케팅", en: "Sports", zh: "体育营销" },
    "ind.10.desc": { ko: "스포츠 자산과 스폰서십 전략", en: "Sports assets and sponsorship strategy", zh: "体育资产与赞助战略" },

    /* ---- INSIGHT ------------------------------------------------------- */
    "insight.crumb": { ko: "인사이트", en: "Insight B", zh: "洞察" },
    "insight.h1": { ko: "전략과 검증의 인사이트", en: "Insight on Strategy and Assurance", zh: "战略与鉴证的洞察" },
    "insight.lead": {
      ko: "지속가능경영 검증, AI 시대의 비즈니스 모델, 마케팅 전략에 관한 칼럼과 실무 아카이브입니다.",
      en: "Columns and working papers on sustainability assurance, AI-era business models and marketing strategy.",
      zh: "关于可持续发展鉴证、AI 时代商业模式与营销战略的专栏与实务档案。"
    },
    "insight.note": {
      ko: "카드를 선택하면 본문 전체를 페이지 안에서 읽을 수 있습니다. 언어 전환 시 본문도 함께 바뀝니다.",
      en: "Select a card to read the full piece inside this page. Switching language switches the article too.",
      zh: "选择卡片即可在页面内阅读全文。切换语言时，正文也随之切换。"
    },
    "insight.archive.tag": { ko: "전체 아카이브", en: "Full Archive", zh: "全部档案" },
    "insight.archive.title": { ko: "기존 칼럼 · 인사이트 아카이브", en: "Published Columns & Insights Archive", zh: "既有专栏 · 洞察档案" },
    "insight.archive.lead": {
      ko: "AI·AEO/GEO 전략, ESG 모델링, ESG 인사이트로 이어온 칼럼 136편을 분야별로 확인하실 수 있습니다.",
      en: "All 136 articles — AI/AEO/GEO strategy, ESG business modelling and ESG insight — arranged by practice area.",
      zh: "可按领域查阅 AI·AEO/GEO 战略、ESG 模型化与 ESG 洞察共 136 篇专栏。"
    },
    "insight.filter.all": { ko: "전체", en: "All", zh: "全部" },
    "insight.filter.esg": { ko: "ESG", en: "ESG", zh: "ESG" },
    "insight.filter.ai": { ko: "AI · AEO · GEO 전략", en: "AI · AEO · GEO", zh: "AI · AEO · GEO 战略" },
    "insight.filter.bm": { ko: "비즈니스 모델링", en: "Business Modeling", zh: "商业模式设计" },
    "insight.searchPh": { ko: "제목 또는 키워드 검색...", en: "Search title or keyword...", zh: "搜索标题或关键词..." },
    "insight.more": { ko: "더 보기", en: "Load more", zh: "加载更多" },
    "insight.modalLabel": { ko: "인사이트 읽기", en: "Reading insight", zh: "阅读洞察" },
    "insight.share.group": { ko: "SNS 공유", en: "Share", zh: "分享" },
    "insight.share.x": { ko: "X(트위터)에 공유", en: "Share on X", zh: "分享到 X（Twitter）" },
    "insight.share.facebook": { ko: "페이스북에 공유", en: "Share on Facebook", zh: "分享到 Facebook" },
    "insight.share.linkedin": { ko: "링크드인에 공유", en: "Share on LinkedIn", zh: "分享到 LinkedIn" },
    "insight.count": { ko: "총 136편 아카이브", en: "136 Archived Insights", zh: "共 136 篇档案" },
    "insight.langNote": { ko: "ESG · AI·AEO·GEO · 비즈니스 모델링", en: "ESG · AI·AEO·GEO · Business Modeling", zh: "ESG · AI·AEO·GEO · 商业模式设计" },

    /* ---- CONTACT ------------------------------------------------------- */
    "contact.crumb": { ko: "문의", en: "Contact", zh: "联系" },
    "contact.h1": { ko: "결정해야 할 문제부터 알려주십시오", en: "Start with the decision you are facing", zh: "请先告诉我们需要做出的决策" },
    "contact.lead": {
      ko: "검증 일정, 공시 마감, AI 검색에서의 노출처럼 지금 시급한 문제를 적어 주시면 담당자가 검토 후 회신드립니다.",
      en: "Write the problem that is urgent now — an assurance timetable, a disclosure deadline, visibility in AI search — and we will review it and reply.",
      zh: "无论是鉴证日程、披露截止日期，还是 AI 搜索中的曝光度，请写下此刻最紧要的问题，我们将在审核后回复。"
    },
    "contact.form.title": { ko: "문의 보내기", en: "Send an enquiry", zh: "发送咨询" },
    "contact.form.text": {
      ko: "아래 내용은 info@tscbgroup.com으로 전달됩니다.",
      en: "Your message is delivered to info@tscbgroup.com.",
      zh: "以下内容将发送至 info@tscbgroup.com。"
    },
    "contact.f.name": { ko: "성함", en: "Name", zh: "姓名" },
    "contact.f.name.ph": { ko: "홍길동", en: "Full name", zh: "您的姓名" },
    "contact.f.company": { ko: "회사명", en: "Company", zh: "公司" },
    "contact.f.company.ph": { ko: "회사 또는 기관명", en: "Company or organisation", zh: "公司或机构名称" },
    "contact.f.email": { ko: "이메일", en: "Email", zh: "电子邮箱" },
    "contact.f.email.ph": { ko: "name@company.com", en: "name@company.com", zh: "name@company.com" },
    "contact.f.phone": { ko: "연락처", en: "Phone", zh: "联系电话" },
    "contact.f.phone.ph": { ko: "선택 입력", en: "Optional", zh: "选填" },
    "contact.f.topic": { ko: "문의 분야", en: "Area of enquiry", zh: "咨询领域" },
    "contact.topic.1": { ko: "ESG / AA1000AS 검증", en: "ESG / AA1000AS assurance", zh: "ESG / AA1000AS 鉴证" },
    "contact.topic.2": { ko: "AI 전략 / 비즈니스 모델", en: "AI strategy / business model", zh: "AI 战略 / 商业模式" },
    "contact.topic.3": { ko: "강연 / 자문", en: "Lecture / advisory", zh: "演讲 / 顾问" },
    "contact.topic.4": { ko: "기타", en: "Other", zh: "其他" },
    "contact.f.topic.default": { ko: "선택해 주세요", en: "Please select", zh: "请选择" },
    "contact.f.message": { ko: "문의 내용", en: "Message", zh: "咨询内容" },
    "contact.f.message.ph": {
      ko: "현재 상황과 필요한 시점, 검토 중인 범위를 적어 주세요.",
      en: "Describe your situation, the timing you need and the scope under consideration.",
      zh: "请说明现状、所需时间与正在考虑的咨询范围。"
    },
    "contact.f.consent": {
      ko: "문의 응대를 위해 성함·회사명·이메일·연락처의 수집 및 이용에 동의합니다.",
      en: "I agree to the collection and use of my name, company, email and phone number for responding to this enquiry.",
      zh: "为回复本次咨询，我同意收集并使用姓名、公司、电子邮箱与联系电话。"
    },
    "contact.f.submit": { ko: "문의 보내기", en: "Send enquiry", zh: "发送咨询" },
    "contact.f.sending": { ko: "전송 중…", en: "Sending…", zh: "发送中…" },
    "contact.f.mailto": { ko: "이메일 앱으로 직접 보내기", en: "Send directly from your email app", zh: "通过邮件应用直接发送" },
    "contact.f.note": {
      ko: "전송이 되지 않는 환경에서는 아래 '메일로 직접 보내기'를 이용해 주세요. 같은 내용이 메일에 담깁니다.",
      en: "If sending fails in your environment, use the direct email option below — it carries the same content.",
      zh: "若当前环境无法发送，请使用下方“通过邮件直接发送”。相同内容会写入邮件。"
    },
    "contact.success.title": { ko: "문의가 접수되었습니다", en: "Your enquiry has been sent", zh: "您的咨询已提交" },
    "contact.success.text": {
      ko: "확인 후 기재하신 이메일로 회신드리겠습니다. 급한 사안이면 info@tscbgroup.com으로 직접 보내 주셔도 됩니다.",
      en: "We will review it and reply to the email address you gave. For urgent matters you can also write to info@tscbgroup.com directly.",
      zh: "我们将在审核后回复至您填写的电子邮箱。情况紧急时，也可直接发送至 info@tscbgroup.com。"
    },
    "contact.success.again": { ko: "새 문의 작성", en: "Write another enquiry", zh: "撰写新的咨询" },
    "contact.error.title": { ko: "전송에 실패했습니다", en: "Sending failed", zh: "发送失败" },
    "contact.error.text": {
      ko: "네트워크 또는 메일 서비스 문제로 전송되지 않았습니다. 아래 '메일로 직접 보내기'로 같은 내용을 보내 주세요.",
      en: "The message did not go through, likely a network or mail service issue. Use the direct email option below to send the same content.",
      zh: "因网络或邮件服务问题未能发送。请使用下方“通过邮件直接发送”提交相同内容。"
    },
    "contact.invalid.text": { ko: "필수 항목을 확인해 주세요.", en: "Please check the required fields.", zh: "请检查必填项。" },
    "contact.info.title": { ko: "본사 연락처", en: "Head office", zh: "总部联系方式" },
    "contact.info.addr.k": { ko: "주소", en: "Address", zh: "地址" },
    "contact.info.tel.k": { ko: "전화", en: "Telephone", zh: "电话" },
    "contact.info.mail.k": { ko: "이메일", en: "Email", zh: "电子邮箱" },
    "contact.info.web.k": { ko: "웹사이트", en: "Website", zh: "网站" },
    "contact.info.map": { ko: "지도에서 보기", en: "Open in maps", zh: "在地图中查看" },
    "contact.aside.note": {
      ko: "검증·자문 상담은 보유 보고서와 공시 일정, 의사결정 시점을 기준으로 범위를 정합니다.",
      en: "Assurance and advisory engagements are scoped against your existing reports, your disclosure calendar and your decision timeline.",
      zh: "鉴证与顾问咨询的范围，以既有报告、信息披露日程与决策时点为基础确定。"
    },
    "home.ceo.quote": {
      ko: "“Strategy without assurance lacks trust; assurance without strategy misses the market.”",
      en: "“Strategy without assurance lacks trust; assurance without strategy misses the market.”",
      zh: "“Strategy without assurance lacks trust; assurance without strategy misses the market.”"
    },
    "faq.crumb": { ko: "FAQ", en: "FAQ", zh: "FAQ" },
    "faq.eyebrow": { ko: "CLIENT ADVISORY", en: "CLIENT ADVISORY", zh: "CLIENT ADVISORY" },
    "faq.h1": { ko: "자주 묻는 질문 · 자문 가이드", en: "Client Advisory & FAQ", zh: "常见问题 · 顾问指南" },
    "faq.lead": {
      ko: "ESG · AA1000AS 검증, Business Model 혁신, Marketing Strategy 분야의 주요 질문을 정리했습니다.",
      en: "Key client questions across ESG · AA1000AS assurance, business model innovation and marketing strategy.",
      zh: "整理了 ESG · AA1000AS 鉴证、商业模式创新与营销战略领域的主要问题。"
    },
    "faq.meta1": { ko: "ESG · Business Model · Marketing Strategy", en: "ESG · Business Model · Marketing Strategy", zh: "ESG · 商业模式 · 营销战略" },
    "faq.meta2": { ko: "분야별 핵심 자문 가이드", en: "Practice Guides by Area", zh: "分领域核心顾问指南" },
    "faq.cmp.tag": { ko: "기준 비교", en: "Comparison", zh: "标准比较" },
    "faq.cmp.title": { ko: "한눈에 보는 기준과 프레임워크", en: "Standards and Frameworks at a Glance", zh: "一目了然的标准与框架" },
    "faq.cmp.lead": {
      ko: "분야별로 주요 기준과 프레임워크를 나란히 비교했습니다.",
      en: "Side-by-side comparisons of assurance standards, business model design, and marketing strategy frameworks.",
      zh: "按领域并列比较主要标准与框架。"
    },
    "faq.qa.tag": { ko: "분야별 핵심 질문", en: "Questions & Answers", zh: "分领域核心问题" },
    "faq.qa.title": { ko: "자문 영역별 자주 묻는 질문", en: "Advisory Questions by Practice Area", zh: "各顾问领域的常见问题" },
    "faq.qa.lead": {
      ko: "분야를 선택하시면 해당 영역의 질문과 답변을 확인하실 수 있습니다.",
      en: "Select a practice area to read the questions and answers for that area.",
      zh: "选择领域后，即可查看该领域的问题与回答。"
    },

    /* ---- INSIGHT B : archive extras ------------------------------------- */
    "insight.cardRead": { ko: "읽기", en: "Read", zh: "阅读" },
    "insight.cat.insight": { ko: "인사이트", en: "Insight", zh: "洞察" },
    "insight.archive.origin": {
      ko: "tscbgroup.com 원문 보기 →",
      en: "Read the original on tscbgroup.com →",
      zh: "查看 tscbgroup.com 原文 →"
    },
    "insight.archive.koNote": {
      ko: "",
      en: "The full text of this column is published in Korean.",
      zh: "本专栏全文以韩文发布，以下为原文。"
    },

    /* ---- FAQ : tabs, search, Q&A, comparison tables --------------------- */
    "faq.tab.esg": { ko: "ESG · AA1000AS", en: "ESG · AA1000AS", zh: "ESG · AA1000AS" },
    "faq.tab.bm": { ko: "비즈니스 모델", en: "Business Model", zh: "商业模式" },
    "faq.tab.mkt": { ko: "마케팅 전략", en: "Marketing Strategy", zh: "营销战略" },
    "faq.tab.all": { ko: "전체", en: "All", zh: "全部" },
    "faq.searchPh": {
      ko: "질문·키워드 검색...",
      en: "Search questions or keywords...",
      zh: "搜索问题或关键词..."
    },

    "faq.q1": {
      ko: "AA1000AS 제3자 검증은 왜 필요하며 기업 자체 선언과 무엇이 다른가요?",
      en: "Why is third-party AA1000AS assurance necessary, and how does it differ from a company's own declaration?",
      zh: "为什么需要 AA1000AS 第三方鉴证？它与企业自我声明有何不同？"
    },
    "faq.a1": {
      ko: "지속가능경영보고서는 기업이 스스로 작성한 문장만으로는 투자자, 글로벌 고객사, 평가기관의 신뢰를 얻기 어렵습니다. 더솔루션컴퍼니비(License No. 001-039)는 영국 AccountAbility의 AA1000AS v3 원칙(포괄성·중대성·대응성·영향력)에 따라 독립 검증을 수행하고 공식 검증의견서를 발행해 대외 공시와 공급망 실사에서 객관적 효력을 제공합니다.",
      en: "A sustainability report written only by the company itself rarely earns the trust of investors, global clients or rating agencies. The Solution Company B (Licence No. 001-039) performs independent assurance against AccountAbility's AA1000AS v3 principles — inclusivity, materiality, responsiveness and impact — and issues a formal assurance statement that carries objective weight in disclosure and supply-chain due diligence.",
      zh: "可持续发展报告若仅由企业自己撰写，很难获得投资者、全球客户与评级机构的信任。The Solution Company B（License No. 001-039）依据英国 AccountAbility 的 AA1000AS v3 原则（包容性、实质性、回应性、影响性）执行独立鉴证并出具正式鉴证意见书，在对外信息披露与供应链尽职调查中提供客观效力。"
    },
    "faq.q2": {
      ko: "ACSAP 인증은 무엇을 의미하나요?",
      en: "What does ACSAP certification mean?",
      zh: "ACSAP 认证意味着什么？"
    },
    "faq.a2": {
      ko: "ACSAP(AccountAbility Certified Sustainability Assurance Practitioner)는 영국 AccountAbility가 검증 실무자의 전문성과 윤리적 독립성을 심사해 부여하는 국제 공인 지속가능성 검증 전문가 자격입니다. 더솔루션컴퍼니비는 기관 라이선스(001-039)와 ACSAP 자격을 보유한 전문가가 검증을 총괄합니다.",
      en: "ACSAP (AccountAbility Certified Sustainability Assurance Practitioner) is the international qualification AccountAbility awards after reviewing an assurance practitioner's expertise and ethical independence. At The Solution Company B, assurance is led by a specialist who holds both the institutional licence (001-039) and the ACSAP qualification.",
      zh: "ACSAP（AccountAbility Certified Sustainability Assurance Practitioner，AccountAbility 认证可持续发展鉴证师）是英国 AccountAbility 在审核鉴证从业者的专业能力与伦理独立性后授予的国际公认资格。The Solution Company B 由同时持有机构授权（001-039）与 ACSAP 资格的专家统筹鉴证工作。"
    },
    "faq.q3": {
      ko: "지속가능경영보고서 작성 자문과 제3자 검증을 동시에 진행할 수 있나요?",
      en: "Can report preparation support and third-party assurance run at the same time?",
      zh: "可持续发展报告编制咨询与第三方鉴证可以同时进行吗？"
    },
    "faq.a3": {
      ko: "검증의 독립성 원칙에 따라 검증 대상 원고의 작성 주체와 검증 판단 주체는 명확히 분리되어야 합니다. 다만 보고서 기획 단계의 공시 기준 매핑(GRI·ISSB·ESRS), 임직원 역량강화 교육, 그리고 최종 보고서에 대한 독립 제3자 검증은 사전에 역할을 분리해 체계적으로 연계 지원할 수 있습니다.",
      en: "Under the independence principle, the author of the report being assured and the party forming the assurance judgement must be clearly separated. Within that, disclosure-standard mapping at the planning stage (GRI, ISSB, ESRS), employee capacity building and the independent assurance of the final report can be delivered as one coordinated engagement with roles fixed in advance.",
      zh: "依据鉴证的独立性原则，鉴证对象的撰写主体与鉴证判断主体必须明确分离。不过，报告策划阶段的信息披露准则映射（GRI·ISSB·ESRS）、员工能力建设培训，以及对最终报告的独立第三方鉴证，可以在事先划分角色的前提下系统衔接支持。"
    },
    "faq.q4": {
      ko: "영문 지속가능경영보고서 검증 및 글로벌 공급망 대응도 가능한가요?",
      en: "Can you assure English-language sustainability reports and support global supply chains?",
      zh: "能否对英文可持续发展报告进行鉴证，并应对全球供应链？"
    },
    "faq.a4": {
      ko: "가능합니다. 국문과 영문 보고서 모두 AA1000AS 검증의견서를 발행할 수 있으며, 영국 및 중국 글로벌 파트너와의 협업을 통해 해외 공급망 실사 및 다국적 이해관계자 대응 자문을 제공합니다.",
      en: "Yes. We issue AA1000AS assurance statements for both Korean and English reports, and work with our partners in the United Kingdom and China on overseas supply-chain due diligence and engagement with multinational stakeholders.",
      zh: "可以。韩文与英文报告均可出具 AA1000AS 鉴证意见书，并通过与英国、中国的全球合作伙伴协作，提供海外供应链尽职调查与多国利益相关方应对咨询。"
    },
    "faq.q5": {
      ko: "AI 시대에 기존 기업의 비즈니스 모델은 왜 재설계가 필요한가요?",
      en: "Why do established business models need redesigning in the AI era?",
      zh: "在 AI 时代，既有企业的商业模式为何需要重构？"
    },
    "faq.a5": {
      ko: "AI가 정보 탐색과 비교·추천을 대신 수행하는 환경에서는 기존 유통 접점과 가격 결정력이 빠르게 약화됩니다. 따라서 가치 제안, 고객 세분화, 수익 모델을 AI 중개 구조와 데이터 기반 의사결정에 맞게 재설계해야 지속적인 현금흐름과 경쟁 우위를 유지할 수 있습니다.",
      en: "Where AI performs the search, comparison and recommendation, established distribution touchpoints and pricing power weaken quickly. Value proposition, customer segmentation and revenue model must be redesigned for an AI-mediated structure and data-driven decisions to keep cash flow and competitive advantage.",
      zh: "在 AI 代替客户进行信息检索、比较与推荐的环境中，既有的流通触点与定价能力会迅速弱化。因此，必须依照 AI 中介结构与数据驱动决策，重新设计价值主张、客户细分与收益模式，才能维持持续的现金流与竞争优势。"
    },
    "faq.q6": {
      ko: "『비즈니스 모델 혁신』과 『타겟머니』에서 제시하는 핵심 전략은 무엇인가요?",
      en: "What are the core strategies in Business Model Innovation and Target Money?",
      zh: "《商业模式创新》与《Target Money》提出的核心战略是什么？"
    },
    "faq.a6": {
      ko: "심준규 박사의 『비즈니스 모델 혁신』과 『타겟머니』는 불특정 다수를 향한 외형 성장보다, 실제 지불 의사와 반복 구매력을 가진 핵심 타깃을 정교하게 재정의하고 사업 구조와 수익화 메커니즘을 다시 짜는 실전 프레임워크를 제시합니다.",
      en: "Jace Shim's Business Model Innovation and Target Money set out a working framework that redefines the core target with real willingness to pay and repeat purchase, and rebuilds the business structure and monetisation mechanism, rather than chasing top-line growth across an undefined audience.",
      zh: "沈俊圭 (Jace Shim) 博士的《商业模式创新》与《Target Money》并不追求面向不特定多数的规模扩张，而是提出重新精细定义具有真实支付意愿与复购力的核心目标，并重构业务结构与盈利机制的实战框架。"
    },
    "faq.q7": {
      ko: "ESG 경영과 비즈니스 모델 혁신을 하나의 전략으로 통합해야 하는 이유는 무엇인가요?",
      en: "Why should ESG management and business model innovation be one strategy?",
      zh: "为什么要把 ESG 经营与商业模式创新整合为一套战略？"
    },
    "faq.a7": {
      ko: "ESG가 단순 규제 대응 비용으로 머물면 조직 내부의 추진력을 잃기 쉽습니다. 공급망 탄소·인권 기준과 지속가능성 데이터를 기업의 핵심 비즈니스 모델과 신사업 수익 구조 안에 통합할 때 비로소 장기적 기업가치 상승과 투자 유치로 이어집니다.",
      en: "If ESG stays a cost of regulatory compliance, internal momentum fades. Only when supply-chain carbon and human-rights criteria and sustainability data are integrated into the core business model and the revenue structure of new businesses does it translate into long-term enterprise value and investment.",
      zh: "若 ESG 只停留为应对监管的成本，组织内部很容易失去推动力。只有把供应链碳排与人权标准、可持续发展数据整合进企业核心商业模式与新业务的收益结构，才能带来长期企业价值提升与投资引入。"
    },
    "faq.q8": {
      ko: "심준규 대표이사가 자문 프로젝트에 직접 참여하나요?",
      en: "Does the CEO take part in engagements personally?",
      zh: "沈俊圭 (Jace Shim) 代表理事是否亲自参与咨询项目？"
    },
    "faq.a8": {
      ko: "네. 경영학 박사이자 인하대학교 경영학과 겸임교수인 심준규 대표이사(University of Liverpool MBA, 『AI 승자독식』 외 9종 저자)가 핵심 전략 진단과 프레임워크 설계, 주요 검증 자문에 직접 참여합니다.",
      en: "Yes. Jace Shim, Ph.D. — Chief Executive Officer, adjunct professor in the Department of Business Administration at Inha University, University of Liverpool MBA and author of nine titles including Winner Takes the Answer — personally leads strategic diagnosis, framework design and the main assurance engagements.",
      zh: "是。作为工商管理学博士、仁荷大学工商管理系兼任教授的沈俊圭 (Jace Shim) 代表理事（利物浦大学 MBA，《AI 赢家通吃》等九部著作作者）亲自参与核心战略诊断、框架设计与主要鉴证咨询。"
    },
    "faq.q9": {
      ko: "우리 회사가 실력은 좋은데 AI 검색(ChatGPT·Perplexity)에서 추천되지 않는 이유는 무엇인가요?",
      en: "Our company is good at what it does — why is it not recommended in AI search (ChatGPT, Perplexity)?",
      zh: "我们公司实力不差，却为何不被 AI 搜索（ChatGPT·Perplexity）推荐？"
    },
    "faq.a9": {
      ko: "이를 '인용 격차(Citation Gap)'라고 합니다. 기업의 실제 역량(VRIO)은 뛰어나더라도, AI가 웹에서 읽고 신뢰할 수 있는 구조화된 데이터, 비교 근거, 저자·기관 권위(Discoverability & Citability)가 부족하면 AI 답변에서 누락됩니다. VRIO-D와 E-E-A-T-C 진단을 통해 이 격차를 해소할 수 있습니다.",
      en: "This is the citation gap. Even where real capability (VRIO) is strong, a company is left out of AI answers when it lacks structured data an AI can read and trust, comparative evidence, and the authority of named authors and institutions — discoverability and citability. VRIO-D and E-E-A-T-C diagnostics close that gap.",
      zh: "这被称为“引用差距（Citation Gap）”。即使企业真实能力（VRIO）出众，若缺少 AI 能够阅读并信任的结构化数据、比较依据与作者·机构权威（Discoverability & Citability），就会在 AI 答案中缺失。可通过 VRIO-D 与 E-E-A-T-C 诊断化解这一差距。"
    },
    "faq.q10": {
      ko: "『AI 승자독식』의 4대 전략 프레임워크(3C-AI·VRIO-D·STQP·E-E-A-T-C)는 무엇인가요?",
      en: "What are the four strategy frameworks in Winner Takes the Answer?",
      zh: "《AI 赢家通吃》的四大战略框架（3C-AI·VRIO-D·STQP·E-E-A-T-C）是什么？"
    },
    "faq.a10": {
      ko: "심준규 박사가 정립한 AI 검색 시대를 위한 전략 체계입니다. AI 중개자를 포함한 3C-AI, 발견 가능성을 더한 VRIO-D, 고객 질문 의도에 맞춘 STQP, 인용 가능성을 강화하는 E-E-A-T-C로 구성됩니다.",
      en: "They form the strategy system Jace Shim built for the AI search era: 3C-AI, which includes the AI intermediary; VRIO-D, which adds discoverability; STQP, aligned to the intent behind customer questions; and E-E-A-T-C, which strengthens citability.",
      zh: "这是沈俊圭 (Jace Shim) 博士为 AI 搜索时代建立的战略体系。由纳入 AI 中介者的 3C-AI、增添可发现性的 VRIO-D、契合客户提问意图的 STQP，以及强化可引用性的 E-E-A-T-C 构成。"
    },
    "faq.q11": {
      ko: "『FVS 마케팅』과 『AI 마케팅 패러다임』은 기업 마케팅에 어떻게 적용되나요?",
      en: "How do FVS Marketing and The AI Marketing Paradigm apply to corporate marketing?",
      zh: "《FVS 营销》与《AI 营销范式》如何应用于企业营销？"
    },
    "faq.a11": {
      ko: "『FVS 마케팅』이 가치 중심의 시장 관점을 정립했다면, 『AI 마케팅 패러다임』은 검색에서 AI 답변으로 이동한 고객 여정에 맞춰 브랜드가 AI의 1순위 추천 대상으로 인용되도록 콘텐츠와 데이터 구조를 설계하는 실행 방법론을 제시합니다.",
      en: "FVS Marketing established a value-centred market view; The AI Marketing Paradigm supplies the delivery method — designing content and data structure so that the brand is cited as the AI's first recommendation along a journey that has moved from search results to AI answers.",
      zh: "如果说《FVS 营销》确立了以价值为中心的市场视角，《AI 营销范式》则提出面向从搜索转向 AI 答案的客户旅程，通过内容与数据结构设计，使品牌成为被 AI 首选引用的推荐对象的执行方法论。"
    },
    "faq.q12": {
      ko: "AEO·GEO 기반 마케팅 전략 자문은 일반 마케팅 대행과 무엇이 다른가요?",
      en: "How does AEO and GEO advisory differ from a general marketing agency?",
      zh: "基于 AEO·GEO 的营销战略咨询与一般营销代理有何不同？"
    },
    "faq.a12": {
      ko: "일반 마케팅 대행이 광고 집행이나 단기 트래픽 유입에 집중한다면, 더솔루션컴퍼니비의 자문은 기업의 비즈니스 모델과 핵심 경쟁력(3C-AI·STQP)을 재정의하고, AI 답변 엔진이 기업의 공식 데이터와 칼럼을 장기적으로 인용하도록 지식 아키텍처 자체를 설계합니다.",
      en: "A general agency concentrates on buying media or driving short-term traffic. Our advisory redefines the business model and core competitiveness (3C-AI, STQP) and designs the knowledge architecture itself, so that AI answer engines cite the company's official data and columns over the long run.",
      zh: "一般营销代理集中于广告投放或短期流量导入，而 The Solution Company B 的咨询重新定义企业的商业模式与核心竞争（3C-AI·STQP），并设计知识架构本身，使 AI 答案引擎长期引用企业的官方数据与专栏。"
    },

    "cmp.esg.title": {
      ko: "ESG · AA1000AS 제3자 검증 vs 자체 선언 · 일반 자가진단",
      en: "ESG · AA1000AS third-party assurance vs self-declaration and general self-assessment",
      zh: "ESG · AA1000AS 第三方鉴证 vs 自我声明 · 一般自评"
    },
    "cmp.esg.lead": {
      ko: "지속가능경영보고서의 대외 신뢰도와 글로벌 공시·공급망 실사 대응력을 기준으로 비교한 표입니다.",
      en: "Compared on the external credibility of the sustainability report and on readiness for global disclosure and supply-chain due diligence.",
      zh: "以可持续发展报告的对外可信度与全球信息披露·供应链尽职调查应对力为标准进行比较的表格。"
    },
    "cmp.esg.h1": { ko: "비교 항목", en: "Item", zh: "比较项目" },
    "cmp.esg.h2": {
      ko: "AA1000AS 제3자 검증 (TSCB 001-039)",
      en: "AA1000AS third-party assurance (TSCB 001-039)",
      zh: "AA1000AS 第三方鉴证（TSCB 001-039）"
    },
    "cmp.esg.h3": {
      ko: "기업 자체 선언 · 내부 점검",
      en: "Company self-declaration / internal review",
      zh: "企业自我声明 · 内部检查"
    },
    "cmp.esg.h4": { ko: "단순 K-ESG 자가진단", en: "Basic K-ESG self-assessment", zh: "单纯 K-ESG 自评" },
    "cmp.esg.r1k": { ko: "근거 표준", en: "Basis", zh: "依据标准" },
    "cmp.esg.r1a": {
      ko: "영국 AccountAbility AA1000AS v3 국제 표준",
      en: "AccountAbility AA1000AS v3, an international standard",
      zh: "英国 AccountAbility AA1000AS v3 国际准则"
    },
    "cmp.esg.r1b": { ko: "내부 자체 기준 (표준화 제한)", en: "Internal criteria (limited standardisation)", zh: "内部自定标准（标准化受限）" },
    "cmp.esg.r1c": { ko: "국내 지침 기반 체크리스트", en: "Checklist based on domestic guidance", zh: "基于国内指引的检查清单" },
    "cmp.esg.r2k": { ko: "검증 주체", en: "Assurer", zh: "鉴证主体" },
    "cmp.esg.r2a": { ko: "공인 라이선스 검증기관 · ACSAP 전문가", en: "Licensed assurance provider · ACSAP specialist", zh: "获授权鉴证机构 · ACSAP 专家" },
    "cmp.esg.r2b": { ko: "기업 내부 담당 부서", en: "Internal department", zh: "企业内部负责部门" },
    "cmp.esg.r2c": { ko: "내부 담당자 또는 일반 자문사", en: "Internal staff or a general consultant", zh: "内部负责人或一般咨询机构" },
    "cmp.esg.r3k": { ko: "독립성", en: "Independence", zh: "独立性" },
    "cmp.esg.r3a": { ko: "제3자 독립 검증의견서(Assurance Statement) 발행", en: "Independent third-party assurance statement issued", zh: "出具第三方独立鉴证意见书（Assurance Statement）" },
    "cmp.esg.r3b": { ko: "독립성 미보장", en: "Independence not assured", zh: "独立性无法保证" },
    "cmp.esg.r3c": { ko: "공식 제3자 검증의견서 불가", en: "No formal third-party assurance statement", zh: "无法出具正式第三方鉴证意见书" },
    "cmp.esg.r4k": { ko: "글로벌 통용성", en: "Global acceptance", zh: "全球通用性" },
    "cmp.esg.r4a": { ko: "GRI · ISSB · ESRS 및 해외 고객사 실사 대응 가능", en: "Accepted for GRI, ISSB and ESRS and for overseas client due diligence", zh: "可应对 GRI · ISSB · ESRS 及海外客户尽职调查" },
    "cmp.esg.r4b": { ko: "대외 공신력 제한", en: "Limited external credibility", zh: "对外公信力受限" },
    "cmp.esg.r4c": { ko: "국내 참고 지표 수준", en: "A domestic reference indicator only", zh: "仅属国内参考指标水平" },
    "cmp.esg.r5k": { ko: "검증 초점", en: "Focus", zh: "鉴证重点" },
    "cmp.esg.r5a": { ko: "포괄성 · 중대성 · 대응성 · 영향력 + 데이터 정확성", en: "Inclusivity, materiality, responsiveness, impact plus data accuracy", zh: "包容性 · 实质性 · 回应性 · 影响性 + 数据准确性" },
    "cmp.esg.r5b": { ko: "정성적 활동 나열 중심", en: "A listing of qualitative activities", zh: "以定性活动罗列为主" },
    "cmp.esg.r5c": { ko: "정량 점수 산출 중심", en: "Quantitative scoring", zh: "以量化评分计算为主" },

    "cmp.bm.title": {
      ko: "Business Model · 기존 성장 모델 vs AI 시대 비즈니스 모델 혁신",
      en: "Business model · the growth model vs AI-era business model innovation",
      zh: "商业模式 · 既有增长模型 vs AI 时代商业模式创新"
    },
    "cmp.bm.lead": {
      ko: "『비즈니스 모델 혁신』과 『타겟머니』 관점에서 수익 구조와 가치사슬의 전환 기준을 비교했습니다.",
      en: "The shift in revenue structure and value chain, seen through Business Model Innovation and Target Money.",
      zh: "从《商业模式创新》与《Target Money》的视角，比较收益结构与价值链的转换标准。"
    },
    "cmp.bm.h1": { ko: "구분", en: "Item", zh: "区分" },
    "cmp.bm.h2": { ko: "기존 외형 성장 중심 모델", en: "Growth-first model", zh: "既有以外延增长为中心的模型" },
    "cmp.bm.h3": { ko: "AI 시대 비즈니스 모델 혁신 (TSCB)", en: "AI-era business model innovation (TSCB)", zh: "AI 时代商业模式创新（TSCB）" },
    "cmp.bm.r1k": { ko: "타깃 정의", en: "Target", zh: "目标定义" },
    "cmp.bm.r1a": { ko: "인구통계 기반의 광범위한 시장 점유율 확대", en: "Broad share expansion on demographic segments", zh: "基于人口统计的广泛市场占有率扩张" },
    "cmp.bm.r1b": { ko: "지불 의사와 반복 수익성을 갖춘 정교한 타깃머니 설계", en: "A precisely defined target with willingness to pay and recurring profitability", zh: "设计具备支付意愿与复利性的精细目标资金" },
    "cmp.bm.r2k": { ko: "고객 접점", en: "Touchpoints", zh: "客户触点" },
    "cmp.bm.r2a": { ko: "자사 영업망 · 오프라인 채널 · 포털 광고 의존", en: "Own sales force, offline channels, portal advertising", zh: "自有销售网络 · 线下渠道 · 依赖门户广告" },
    "cmp.bm.r2b": { ko: "AI 에이전트 추천 경로와 직접 가치 제안의 결합", en: "AI agent recommendation paths combined with a direct value proposition", zh: "AI 智能体推荐路径与直接价值主张的结合" },
    "cmp.bm.r3k": { ko: "수익 구조", en: "Revenue structure", zh: "收益结构" },
    "cmp.bm.r3a": { ko: "단발성 제품 판매 및 물량 확대 중심", en: "One-off product sales and volume expansion", zh: "以单次产品销售与销量扩大为中心" },
    "cmp.bm.r3b": { ko: "데이터·구독·솔루션 기반의 반복 현금흐름", en: "Recurring cash flow from data, subscription and solutions", zh: "以数据·订阅·解决方案为基础的复现现金流" },
    "cmp.bm.r4k": { ko: "ESG 연계", en: "ESG link", zh: "ESG 联动" },
    "cmp.bm.r4a": { ko: "규제 대응을 위한 별도 비용 처리", en: "Treated as a separate compliance cost", zh: "为应对监管而单独列支的成本" },
    "cmp.bm.r4b": { ko: "공급망 경쟁력과 기업가치 제고의 핵심 축으로 내재화", en: "Embedded as a core axis of supply-chain competitiveness and enterprise value", zh: "内化为供应链竞争力与企业价值提升的核心支柱" },

    "cmp.mkt.title": {
      ko: "Marketing Strategy · AI 답변 최적화(AEO·GEO) vs 기존 SEO",
      en: "Marketing strategy · AEO and GEO vs conventional SEO",
      zh: "营销战略 · AI 答案优化（AEO·GEO）vs 既有 SEO"
    },
    "cmp.mkt.lead": {
      ko: "AI가 고객의 질문을 대신 해석하고 브랜드를 추천하는 환경에서의 마케팅 구조 차이입니다.",
      en: "How the marketing structure differs when an AI interprets the customer's question and recommends the brand.",
      zh: "在 AI 代替客户解读问题并推荐品牌的环境中，营销结构的差异。"
    },
    "cmp.mkt.h1": { ko: "구분", en: "Item", zh: "区分" },
    "cmp.mkt.h2": { ko: "AEO · GEO (AI 검색 최적화)", en: "AEO · GEO (AI search optimisation)", zh: "AEO · GEO（AI 搜索优化）" },
    "cmp.mkt.h3": { ko: "기존 SEO (검색 결과 목록)", en: "Conventional SEO (result lists)", zh: "既有 SEO（搜索结果列表）" },
    "cmp.mkt.r1k": { ko: "핵심 목표", en: "Objective", zh: "核心目标" },
    "cmp.mkt.r1a": { ko: "ChatGPT · Perplexity · Gemini 답변 내 직접 인용·추천", en: "Being cited and recommended inside ChatGPT, Perplexity and Gemini answers", zh: "在 ChatGPT · Perplexity · Gemini 的答案中被直接引用·推荐" },
    "cmp.mkt.r1b": { ko: "검색엔진 결과 페이지(SERP) 상위 링크 노출", en: "Ranking high on the search engine results page", zh: "在搜索引擎结果页（SERP）中占据前列链接" },
    "cmp.mkt.r2k": { ko: "고객 접점", en: "Touchpoint", zh: "客户触点" },
    "cmp.mkt.r2a": { ko: "AI가 요약·비교한 단일 답변과 출처 링크", en: "A single summarised and compared answer with source links", zh: "AI 摘要·比较后的单一答案与来源链接" },
    "cmp.mkt.r2b": { ko: "사용자가 여러 웹사이트 링크를 직접 클릭해 탐색", en: "Users click through several site links themselves", zh: "用户自行点击多个网站链接进行浏览" },
    "cmp.mkt.r3k": { ko: "핵심 콘텐츠 구조", en: "Content structure", zh: "核心内容结构" },
    "cmp.mkt.r3a": { ko: "질문-답변 구조, 비교표, 구조화 데이터, 명확한 근거 수치", en: "Question-and-answer structure, comparison tables, structured data, explicit figures", zh: "问答结构、比较表、结构化数据、明确依据数据" },
    "cmp.mkt.r3b": { ko: "키워드 밀도, 백링크, 메타 태그 중심", en: "Keyword density, backlinks, meta tags", zh: "以关键词密度、反向链接、元标签为中心" },
    "cmp.mkt.r4k": { ko: "평가 지표", en: "Metric", zh: "评估指标" },
    "cmp.mkt.r4a": { ko: "AI 인용 빈도, 인용 격차 해소, 추천 순위", en: "AI citation frequency, citation-gap closure, recommendation rank", zh: "AI 引用频次、引用差距化解、推荐排序" },
    "cmp.mkt.r4b": { ko: "키워드 검색 순위, 페이지 클릭률(CTR)", en: "Keyword ranking, click-through rate", zh: "关键词搜索排名、页面点击率（CTR）" },
    "cmp.mkt.r5k": { ko: "TSCB 프레임워크", en: "TSCB frameworks", zh: "TSCB 框架" },
    "cmp.mkt.r5a": { ko: "3C-AI · VRIO-D · STQP · E-E-A-T-C", en: "3C-AI · VRIO-D · STQP · E-E-A-T-C", zh: "3C-AI · VRIO-D · STQP · E-E-A-T-C" },
    "cmp.mkt.r5b": { ko: "전통적 3C · VRIO · STP · E-E-A-T", en: "Classic 3C · VRIO · STP · E-E-A-T", zh: "传统 3C · VRIO · STP · E-E-A-T" },

    "cmp.fw.title": {
      ko: "Marketing Strategy · 『AI 승자독식』 4대 전략 프레임워크 비교",
      en: "Marketing strategy · the four frameworks of Winner Takes the Answer",
      zh: "营销战略 · 《AI 赢家通吃》四大战略框架比较"
    },
    "cmp.fw.lead": {
      ko: "심준규 박사가 정립한 AI 검색 시대의 4대 프레임워크를 역할과 적용 대상별로 정리했습니다.",
      en: "The four frameworks Jace Shim defined for the AI search era, set out by role and object of diagnosis.",
      zh: "按作用与适用对象，整理沈俊圭 (Jace Shim) 博士为 AI 搜索时代建立的四大框架。"
    },
    "cmp.fw.h1": { ko: "프레임워크", en: "Framework", zh: "框架" },
    "cmp.fw.h2": { ko: "핵심 확장 개념", en: "Extension", zh: "核心扩展概念" },
    "cmp.fw.h3": { ko: "진단 대상", en: "Diagnoses", zh: "诊断对象" },
    "cmp.fw.h4": { ko: "실무 기대 효과", en: "Practical effect", zh: "实务预期效果" },
    "cmp.fw.r1k": { ko: "3C-AI", en: "3C-AI", zh: "3C-AI" },
    "cmp.fw.r1a": { ko: "Customer · Company · Competitor + AI 중개자", en: "Customer · Company · Competitor plus the AI intermediary", zh: "Customer · Company · Competitor + AI 中介者" },
    "cmp.fw.r1b": { ko: "AI 에이전트가 개입한 시장 구조와 경쟁 구도", en: "Market and competitive structure with an AI agent in the middle", zh: "AI 智能体介入后的市场结构与竞争格局" },
    "cmp.fw.r1c": { ko: "AI 추천 경로에 맞춘 포지셔닝 재설계", en: "Positioning redesigned for AI recommendation paths", zh: "契合 AI 推荐路径的定位重构" },
    "cmp.fw.r2k": { ko: "VRIO-D", en: "VRIO-D", zh: "VRIO-D" },
    "cmp.fw.r2a": { ko: "Value · Rarity · Imitability · Organization + Discoverability(발견 가능성)", en: "Value · Rarity · Imitability · Organization plus discoverability", zh: "Value · Rarity · Imitability · Organization + Discoverability（可发现性）" },
    "cmp.fw.r2b": { ko: "기업 핵심 역량이 AI에게 읽히고 발견되는 수준", en: "How far core capability can be read and found by an AI", zh: "企业核心能力被 AI 读取并发现的程度" },
    "cmp.fw.r2c": { ko: "숨겨진 경쟁력을 AI 인용 자산으로 전환", en: "Hidden competitiveness converted into citable assets", zh: "把隐性的竞争力转化为 AI 引用资产" },
    "cmp.fw.r3k": { ko: "STQP", en: "STQP", zh: "STQP" },
    "cmp.fw.r3a": { ko: "Segmentation · Targeting · Question Mapping · Positioning", en: "Segmentation · Targeting · Question Mapping · Positioning", zh: "Segmentation · Targeting · Question Mapping · Positioning" },
    "cmp.fw.r3b": { ko: "고객이 AI에 던지는 실제 질문(Prompt) 의도", en: "The intent behind the prompts customers actually type", zh: "客户向 AI 提出的真实问题（Prompt）意图" },
    "cmp.fw.r3c": { ko: "질문 단계별 맞춤형 브랜드 답변 선점", en: "Owning the brand answer at each stage of the question", zh: "在各提问阶段预先占据定制化品牌答案" },
    "cmp.fw.r4k": { ko: "E-E-A-T-C", en: "E-E-A-T-C", zh: "E-E-A-T-C" },
    "cmp.fw.r4a": { ko: "Experience · Expertise · Authoritativeness · Trustworthiness + Citability(인용 가능성)", en: "Experience · Expertise · Authoritativeness · Trustworthiness plus citability", zh: "Experience · Expertise · Authoritativeness · Trustworthiness + Citability（可引用性）" },
    "cmp.fw.r4b": { ko: "콘텐츠의 구조화, 검증 가능성, 공신력 출처", en: "Structure, verifiability and authoritative sourcing of content", zh: "内容的结构化程度、可验证性与权威来源" },
    "cmp.fw.r4c": { ko: "AI 모델이 1순위로 인용하는 권위 확보", en: "Authority that an AI model cites first", zh: "获得 AI 模型首选引用的权威地位" }
  };

  /* ---- engine ------------------------------------------------------- */
  function readStored() {
    try {
      return normalize(window.localStorage.getItem(STORAGE_KEY));
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
    /* ?lang= wins, then the saved choice, then the browser language */
    var query = fromQuery();
    if (query) {
      store(query);
      return query;
    }
    var stored = readStored();
    if (stored) return stored;
    var nav = (navigator.language || "ko").toLowerCase();
    return nav.indexOf("ko") === 0 ? "ko" : DEFAULT_LANG;
  }

  function htmlLang(lang) {
    if (lang === "zh") return "zh-CN";
    return lang;
  }

  var current = initialLang();

  function t(key, lang) {
    var entry = DICT[key];
    var l = lang || current;
    if (!entry) return "";
    return entry[l] != null ? entry[l] : entry.ko;
  }

  function apply(lang) {
    current = LANGS[lang] || "ko";
    var root = document.documentElement;
    root.setAttribute("lang", htmlLang(current));
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
      var tz = document.body.getAttribute("data-title-zh");
      if (tk || te || tz) {
        var byLang = { ko: tk, en: te, zh: tz };
        document.title = byLang[current] || tk || te || tz;
      }
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
    var next = LANGS[lang] || "ko";
    store(next);
    apply(next);
    syncUrl(next);
  }

  /* keep ?lang= in the address bar in step with the chosen language,
     so a reload or a copied link opens the same language */
  function syncUrl(lang) {
    if (!window.history || typeof window.history.replaceState !== "function") return;
    try {
      var search = (window.location.search || "").replace(/^\?/, "");
      var pairs = search ? search.split("&") : [];
      var out = [];
      var found = false;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if (!pair) continue;
        if (pair === "lang" || pair.indexOf("lang=") === 0) {
          out.push("lang=" + lang);
          found = true;
        } else {
          out.push(pair);
        }
      }
      if (!found) out.push("lang=" + lang);
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + "?" + out.join("&") + window.location.hash
      );
    } catch (e) {
      /* history writes can be refused — switching still works */
    }
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
