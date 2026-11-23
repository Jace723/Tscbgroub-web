/* ==========================================================================
   insights.js — INSIGHT B article library (KR / EN)
   Full bodies are rendered into the in-page modal viewer.
   ========================================================================== */
(function () {
  "use strict";

  var A1_KO =
    '<p class="art-lead">최근 국내 거시경제 지표는 뚜렷한 이중성을 드러낸다. AI 반도체 수출이 호조를 보이며 거시 성장률을 방어하고 있으나, 내수 소비와 기업 체감 경기는 장기간 정체 국면을 벗어나지 못하고 있다. 경영 현장에서는 이를 일시적 경기 침체로 해석하기보다, 기업의 고객 기반과 노동 시장을 동시에 재편하는 \'인구 구조적 전환기\'의 신호로 읽어야 한다.</p>' +
    '<h2>1. 한국 경제의 완충 지대가 사라지는 시점</h2>' +
    '<p>미국과 유럽이 1946~1964년생 베이비붐 세대의 은퇴와 함께 재정적자 및 국채 금리 상승 압력을 겪고 있는 것과 달리, 한국은 한국전쟁 이후 형성된 1955~1974년생 베이비붐 세대 덕분에 약 10년의 시간적 여유를 확보해 왔다. 현재 50대 초반인 1974년생은 연공서열 구조 속에서 최고 소득 구간에 머물며 국가 세수와 내수 소비의 핵심 동력 역할을 수행하고 있다.</p>' +
    '<p>그러나 통계상 한국 직장인의 실질 퇴직 연령이 평균 53세(남성 55세 전후)임을 감안하면, 2028~2030년은 한국 경제의 결정적 분기점이 된다. 마지막 베이비붐 세대가 노동 시장에서 이탈하면서 소득세 기반은 급격히 축소되고, 고령층의 사회보장 지출은 구조적으로 팽창할 수밖에 없다.</p>' +
    '<h2>2. 국가 부채와 장기 금리 상승이 기업에 미치는 영향</h2>' +
    '<p>은퇴 세대가 자산을 축적하는 단계에서 인출하는 단계로 전환되면, 국내 채권 시장의 국채 소화 여력이 약화되면서 장기 금리의 상방 압력이 커진다. 재정적자 확대를 방어하기 위해 통화 유동성이 유지될 경우, 기업은 \'고금리·고물가·저성장\'이 중첩되는 복합 경영 환경에 직면하게 된다.</p>' +
    '<p>과거처럼 저금리 유동성과 확장되는 내수 시장에 기대어 외형 성장을 추구하던 경영 방식은 더 이상 작동하기 어렵다. 자본 조달 비용이 높아진 환경에서는 현금흐름의 건전성과 자본 효율성(ROIC)이 기업 생존의 핵심 지표로 부상한다.</p>' +
    '<h2>3. 인구 감소 시대의 비즈니스 모델 재설계 방향</h2>' +
    '<p>인구 소멸은 단순한 시장 축소가 아니라 시장 구조의 재편을 의미한다. 첫째, <strong>\'중간 시장의 붕괴\'</strong>에 대비해야 한다. 중산층의 구매력이 약화되면서 중간 가격대 제품·서비스는 경쟁력을 잃고, 초가성비 영역과 고부가가치 프리미엄 영역으로 수요가 양극화된다. 기업은 자사의 포지셔닝이 어느 쪽에 속하는지 명확히 재정의해야 한다.</p>' +
    '<p>둘째, 생산가능인구 감소에 따른 인력난과 인건비 부담을 <strong>\'AI 기반 업무 자동화\'</strong>로 상쇄해야 한다. 인력 확충에 의존하는 사업 모델은 한계에 봉착할 수밖에 없으며, 소수 정예 인력과 AI 에이전트 시스템을 결합해 1인당 부가가치를 극대화하는 조직 전환이 필수적이다. 다가오는 2030년대를 대비하는 기업에게 향후 3년은 비즈니스 모델을 근본적으로 재설계할 수 있는 마지막 골든타임이다.</p>';

  var A1_EN =
    '<p class="art-lead">Korea\'s recent macro indicators show a clear duality. AI semiconductor exports defend headline growth, while domestic consumption and business sentiment have not escaped a long stagnation. On the management side, this should be read less as a temporary downturn than as a signal of a demographic transition that is reorganising the customer base and the labour market at the same time.</p>' +
    '<h2>1. When Korea\'s buffer disappears</h2>' +
    '<p>The United States and Europe are absorbing the retirement of the 1946–1964 baby-boom cohort alongside fiscal deficits and upward pressure on sovereign yields. Korea, by contrast, has enjoyed roughly ten extra years thanks to the 1955–1974 cohort born after the Korean War. Those born in 1974, now in their early fifties, remain in the highest income band within seniority-based structures, and they carry national tax revenue and domestic consumption.</p>' +
    '<p>But with the effective retirement age in Korea averaging 53 (around 55 for men), 2028–2030 becomes the decisive turning point. As the last baby-boom cohort leaves the labour market, the income-tax base contracts sharply while social spending on the elderly expands structurally.</p>' +
    '<h2>2. What national debt and higher long-term rates do to companies</h2>' +
    '<p>When a generation shifts from accumulating assets to drawing them down, the domestic bond market\'s capacity to absorb issuance weakens and long-term rates face upward pressure. If monetary liquidity is maintained to defend against widening deficits, companies face a compound environment of high rates, high prices and low growth.</p>' +
    '<p>The old playbook — pursuing top-line growth on low-rate liquidity and an expanding domestic market — no longer works. When capital is expensive, cash-flow soundness and capital efficiency (ROIC) become the core indicators of survival.</p>' +
    '<h2>3. Redesigning the business model for a shrinking population</h2>' +
    '<p>Population decline is not simply a smaller market; it is a reorganisation of market structure. First, prepare for the <strong>collapse of the middle market</strong>. As middle-class purchasing power weakens, mid-priced products and services lose competitiveness and demand polarises into extreme value and high-value premium segments. Every company must redefine which side it stands on.</p>' +
    '<p>Second, offset the labour shortage and wage burden of a shrinking working-age population with <strong>AI-based work automation</strong>. Business models that depend on adding headcount will hit a wall; the essential transition is a small core of specialists combined with AI agent systems to maximise value added per person. For a company preparing for the 2030s, the next three years are the last window in which the business model can be fundamentally redesigned.</p>';

  var A2_KO =
    '<p class="art-lead">수십 년간 기술을 축적해 업계 1위를 지켜온 회사가 왜 생성형 AI의 추천 목록에서는 완전히 배제되는가. 기업이 실제로 보유한 본원적 경쟁력과 AI의 답변 엔진이 고객에게 전달하는 경쟁력 사이의 구조적 괴리를 우리는 <strong>\'인용 격차(Citation Gap)\'</strong>라고 부른다.</p>' +
    '<p>많은 기업이 이 격차를 메우려고 키워드 광고비를 늘리거나 콘텐츠 발행량을 늘린다. 그러나 생성형 AI가 정보를 탐색(Search)하고 추출(Extract)하고 검증(Verify)하고 재구성(Synthesize)하는 메커니즘은 전통적 검색 포털의 키워드 매칭과 본질적으로 다르다.</p>' +
    '<p>이 글은 『AI 승자독식(Winner Takes the Answer)』에서 체계화한 네 가지 프레임워크 — 3C-AI, VRIO-D, STQP, E-E-A-T-C — 로 고전 모델의 한계를 짚고, AI 경제에서 대체 불가능한 권위를 확보하기 위한 진단표와 실행 지침을 정리한다.</p>' +
    '<h2>1부. 경영학 고전의 한계와 AI 시대의 네 가지 전략 프레임워크</h2>' +
    '<p>오마에 겐이치의 3C, 제이 바니의 VRIO, 필립 코틀러의 STP, 구글의 E-E-A-T는 여전히 탁월한 통찰을 준다. 다만 이 모델들은 모두 \'인간 고객이 웹페이지 전체를 직접 읽고 판단한다\'는 전제 위에 설계되었다. 인간 고객과 기업 사이에 인공지능이라는 지식 편집자가 들어선 지금, 각 모델이 마주한 한계와 확장의 논리는 다음과 같다.</p>' +
    '<h3>1. 3C에서 3C-AI로 — 경쟁 지형의 재획정</h3>' +
    '<p>전통적 3C 분석은 자사·고객·경쟁사의 삼각 구도로 시장 기회를 포착한다. 기업용 근태·인사 관리 소프트웨어를 공급하는 A사는 고도화된 기능과 50~100인 규모의 타깃, 경쟁 소프트웨어 세 개사를 분석해 "기능이 다양하고 가격 경쟁력이 15% 우수하다"는 전략을 세웠다.</p>' +
    '<p>그러나 고객은 AI에게 "A사 제품과 경쟁사 스펙을 비교해 달라"고 묻지 않는다. "외근직이 많은 40인 제조업체인데, 별도 전산 관리자 없이 출퇴근 기록과 연차 관리를 가장 돈 안 들이고 처리하는 방법이 뭐야?"라고 묻는다. AI가 제시한 답은 구글 스프레드시트 템플릿, 노션 무료 워크스페이스, 카카오워크 기본 무료 플랜, 그리고 "현 규모에서는 유료 소프트웨어를 도입하지 말라"는 비구매 대안이었다.</p>' +
    '<p>A사가 수억 원을 들인 소프트웨어는 추천 화면에 한 줄도 오르지 못했다. A사가 설정한 경쟁사는 동종 소프트웨어 개발사였지만, 고객의 질문 맥락에서 AI가 진열한 진짜 대체재는 무료 클라우드 도구와 \'도입하지 않는 선택\'이었기 때문이다.</p>' +
    '<ul><li>AI는 시장의 수동적 관찰자가 아니라, 어떤 대안을 어떤 기준으로 진열할지 결정하는 중개자다.</li>' +
    '<li>경쟁 구도는 산업 분류표에 고정되지 않고, 고객의 개별 질문이 가진 결핍과 제약 조건에 따라 매번 재획정된다.</li>' +
    '<li>따라서 기업은 기능 우위 비교를 넘어, 자사 솔루션이 무료 대체재의 한계를 넘는 필수 대안으로 추천될 수 있도록 도입 성과와 ROI 데이터를 구조화해야 한다.</li></ul>' +
    '<h3>2. VRIO에서 VRIO-D로 — 발견 가능성(D)</h3>' +
    '<p>VRIO는 내부 역량이 가치(V), 희소성(R), 모방 불가능성(I), 조직(O)을 충족하는지로 지속 가능한 우위를 판단한다. 정밀 부품 강소기업 B사는 세계적 특허 포트폴리오와 청정 공정 설비, 박사급 연구 인력을 갖추고 VRIO 전 항목 \'충족\' 판정을 받았다.</p>' +
    '<p>그런데 B사는 글로벌 바이어의 AI 검색 추천에서 완전히 소외되어 있었다. 내구성 시험 성적서는 연구소 내부 파일 서버에만 있었고, 공인 인증 데이터는 상세페이지의 통 이미지(JPG) 속에 그림으로만 박혀 있었다. 크롤링할 수 없는 이미지 속 글씨와 인트라넷의 특허는 검색 봇과 언어 모델의 시각에서 존재하지 않는 허상이다.</p>' +
    '<p>내부적으로 아무리 가치 있고 희소하며 모방하기 어려운 자원이라도, AI가 접근하고 검증할 수 없다면 시장 가치는 0이다. VRIO-D는 발견 가능성을 세 단계로 검증한다.</p>' +
    '<ul><li><strong>접근성(Access)</strong> — 텍스트 HTML로 크롤러에 완전히 노출되어 있는가?</li>' +
    '<li><strong>이해성(Understand)</strong> — 고객의 상황적 문제(예: 극한의 진동 환경)와 결합되어 있는가?</li>' +
    '<li><strong>확인성(Verify)</strong> — 시험 성적서 번호, 공인 기관명, 정량 수치 등 객관적 증거가 결속되어 있는가?</li></ul>' +
    '<h3>3. STP에서 STQP로 — 결정 질문 매핑</h3>' +
    '<p>코틀러의 STP는 세분화와 표적 선정을 거쳐 포지셔닝으로 직행한다. 물류 최적화 솔루션을 파는 C사는 타깃을 \'중소 전자상거래 유통기업\'으로 두고 "스마트한 미래를 여는 혁신적인 차세대 AI 물류 파트너"라는 슬로건을 내세웠다.</p>' +
    '<p>그러나 AI를 쓰는 고객은 "혁신적인 물류 파트너를 알려달라"고 검색하지 않는다. "일 주문량 500건 수준의 패션 쇼핑몰인데, 카페24 호환되면서 반품 검수 자동화를 지원하고 월 구독료 30만 원 이하인 솔루션을 추천해 달라"고 입력한다.</p>' +
    '<p>STQP는 타깃(T)과 포지셔닝(P) 사이에 질문 매핑(Q)을 반드시 놓는다. 고객의 구매 직전 질문과 제약 조건을 도출하고, 그 질문에 1:1로 대응하는 조건부 포지셔닝 문장을 설계한다. 예컨대 "카페24 주문 연동과 반품 바코드 검수를 월 25만 원으로 해결하는 500건 전용 물류 자동화 솔루션(실제 70개 쇼핑몰 도입, 오배송률 0.02%)"처럼 쓴다.</p>' +
    '<h3>4. E-E-A-T에서 E-E-A-T-C로 — 문단 단위 인용 무결성</h3>' +
    '<p>구글의 E-E-A-T는 페이지 전체의 신뢰도를 높이는 데 주력한다. 필진 이력을 기재하고 분량 있는 칼럼을 쌓는 방식이다. 그러나 생성형 AI는 페이지를 통째로 인용하지 않는다. 문서를 문단 단위로 해체하고, 질문에 필요한 한 문장만 발췌해 다른 사이트의 정보와 합성한다.</p>' +
    '<p>본문 상단에 "365일 24시간 무상 원격 기술 지원"이라 적고 각주에 "단, 프리미엄 유료 플랜 고객에 한함"이라 분리해 두면, AI는 상단 문장만 잘라 모든 고객에게 무상 지원이 제공된다고 왜곡해 추천한다. 고객 분쟁과 브랜드 신뢰 파탄으로 이어지는 지점이다.</p>' +
    '<p>E-E-A-T-C는 평가 단위를 \'페이지\'에서 \'문단\'으로 미세화하고, 인용 가능성(Citability)의 세 요건을 요구한다.</p>' +
    '<ul><li><strong>독립적 완결성</strong> — 단락 하나만 분리해도 주어·서술어·대상이 완벽히 해석되어야 한다.</li>' +
    '<li><strong>조건의 결속성</strong> — 혜택과 핵심 주장 바로 옆에 적용 조건과 예외가 한 문장으로 결합되어야 한다.</li>' +
    '<li><strong>출처 추적성</strong> — 인용된 수치에 조사 기관, 시점, 표본 기준이 명시되어야 한다.</li></ul>' +
    '<h2>2부. C-Level 자가진단 및 실행 워크시트</h2>' +
    '<p>다음 열 문항 중 셋 이상이 해당된다면, 문제는 콘텐츠의 양이 아니라 구조에 있다.</p>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th>자가진단 항목</th><th>관련 모델</th></tr></thead><tbody>' +
    '<tr><td>고객이 AI에 입력할 실제 고민 문장(프롬프트) 목록을 수집한 적이 없다</td><td>STQP</td></tr>' +
    '<tr><td>주요 AI 엔진에서 사명을 빼고 업종을 검색했을 때 자사 솔루션이 언급되지 않는다</td><td>3C-AI</td></tr>' +
    '<tr><td>AI 답변에서 무료 도구·대체재·비구매 대안이 우리 제품보다 먼저 추천된다</td><td>3C-AI</td></tr>' +
    '<tr><td>핵심 스펙·단가·규격표가 HTML이 아닌 이미지나 잠긴 파일 안에만 있다</td><td>VRIO-D</td></tr>' +
    '<tr><td>주장을 입증할 공인 시험 성적서·실측 수치가 웹에 비공개 상태다</td><td>VRIO-D</td></tr>' +
    '<tr><td>브랜드 소개 문구가 \'최고의\', \'혁신적인\', \'스마트한\' 같은 추상적 형용사로 도배되어 있다</td><td>STQP</td></tr>' +
    '<tr><td>혜택과 필수 예외 조건이 서로 분리되어 있다</td><td>E-E-A-T-C</td></tr>' +
    '<tr><td>인용된 통계에 측정 시점과 주체가 명시되어 있지 않다</td><td>E-E-A-T-C</td></tr>' +
    '<tr><td>반복 접수되는 핵심 문의에 공식적으로 답하는 단일 웹 문서가 없다</td><td>STQP · E-E-A-T-C</td></tr>' +
    '<tr><td>주요 AI 답변에서 브랜드 인용 정확도를 정기적으로 측정하지 않는다</td><td>전 단계</td></tr>' +
    '</tbody></table></div>' +
    '<h2>3부. 결론 — 가장 투명하고 정직한 기업이 AI의 승자가 된다</h2>' +
    '<p>생성형 AI 시대의 최적화는 검색엔진 알고리즘을 기만하던 기술적 꼼수가 통하지 않는 영역이다. 인공지능은 과장된 카피에 흔들리지 않고, 화려한 디자인에 현혹되지 않는다. 가장 명확한 텍스트로 증명된 실체, 검증된 조건, 투명하게 공개된 팩트만을 신뢰하고 인용한다.</p>' +
    '<p>기업이 오랜 세월 축적한 탁월함이 침묵 속에 갇혀 있다면, 그것은 아무런 힘을 발휘하지 못한다. 고전 이론을 AI의 문법으로 재정렬하고, 강점을 가장 정직하고 명확한 언어로 외부에 드러내야 한다. 준비된 기업만이 가장 먼저, 가장 확고한 신뢰로 호명된다.</p>';

  var A2_EN =
    '<p class="art-lead">Why does a company that has held the top of its industry for decades not appear at all in a generative AI\'s recommendation list? We call the structural divergence between the competitiveness a company actually holds and the competitiveness an AI answer conveys to customers the <strong>citation gap</strong>.</p>' +
    '<p>Many companies respond by raising keyword advertising budgets or publishing more content. But how a generative model searches, extracts, verifies and synthesises information differs fundamentally from keyword matching on a traditional search portal.</p>' +
    '<p>This piece works through four frameworks systematised in <em>Winner Takes the Answer</em> — 3C-AI, VRIO-D, STQP and E-E-A-T-C — against the limits of the classic models, and sets out a diagnostic and an execution brief for earning authority that an AI cannot replace.</p>' +
    '<h2>Part 1. The limits of the classics, and four frameworks for the AI era</h2>' +
    '<p>Ohmae\'s 3C, Barney\'s VRIO, Kotler\'s STP and Google\'s E-E-A-T remain excellent. But all four were designed on the premise that a human customer reads a whole page and judges it. Now that a knowledge editor called AI stands between the customer and the company, each model meets a limit, and each has a way of extending.</p>' +
    '<h3>1. From 3C to 3C-AI — redrawing the competitive map</h3>' +
    '<p>Classic 3C analysis captures market opportunity through company, customer and competitor. A company selling workforce-management software analysed its advanced features, a target of manufacturers with 50–100 staff, and three competing products, and concluded: "more functions and 15% better pricing, so we can grow acquisition."</p>' +
    '<p>But the customer does not ask an AI to compare the specifications of Company A and its competitors. They ask: "I run a 40-person manufacturer with a lot of field staff. What is the cheapest easy way to handle clock-in records and leave without hiring an IT administrator?" The AI\'s answer was a Google Sheets template, a free Notion workspace, the free tier of a groupware service, and the advice not to buy paid software at that size.</p>' +
    '<p>Software that cost hundreds of millions of won in R&amp;D did not appear in a single line of the recommendation. The competitors Company A had defined were other software vendors; the real substitutes the AI displayed in the context of that question were free cloud tools and the choice not to adopt anything at all.</p>' +
    '<ul><li>AI is not a passive observer of a market but an intermediary that decides which alternatives are displayed, and on what basis.</li>' +
    '<li>Competitive structure is not fixed by an industry classification; it is redrawn by the constraints inside each customer question.</li>' +
    '<li>A company must therefore structure adoption results and ROI evidence so that the AI has a reason to recommend it as the essential alternative that clears the limits of free substitutes.</li></ul>' +
    '<h3>2. From VRIO to VRIO-D — discoverability</h3>' +
    '<p>VRIO judges sustainable advantage by whether internal resources are valuable, rare, inimitable and organised. A precision-components company with a world-class patent portfolio, clean-process equipment and doctoral researchers passed every VRIO criterion.</p>' +
    '<p>Yet it was entirely absent from the AI search recommendations of global buyers. Its durability test reports sat on an internal file server, and its certified data existed only as a picture inside a flat JPG on a product page. To a crawler or a language model, text baked into an image and patents behind an intranet do not exist.</p>' +
    '<p>However valuable, rare and hard to imitate a resource is internally, if an AI cannot access and verify it, its market value in the AI economy is zero. VRIO-D verifies discoverability on three rungs.</p>' +
    '<ul><li><strong>Access</strong> — is it fully exposed to crawlers as text HTML?</li>' +
    '<li><strong>Understand</strong> — is it joined to the customer\'s situational problem (for example, extreme vibration environments)?</li>' +
    '<li><strong>Verify</strong> — is objective evidence attached: report numbers, accredited bodies, measured figures?</li></ul>' +
    '<h3>3. From STP to STQP — mapping the decision question</h3>' +
    '<p>Kotler\'s STP moves from segmentation and targeting straight to positioning. A logistics-optimisation vendor targeted small e-commerce distributors and adopted the slogan "an innovative next-generation AI logistics partner that opens a smart future."</p>' +
    '<p>A customer using AI does not search for an innovative logistics partner. They type: "I run a fashion mall at about 500 orders a week. Recommend a tool compatible with Cafe24 that automates return inspection, under 300,000 won a month."</p>' +
    '<p>STQP places question mapping (Q) between targeting (T) and positioning (P). It derives the questions customers actually ask just before buying, along with their constraints, and writes positioning statements that answer them one to one — for example, "logistics automation purpose-built for 500 orders a week, connecting Cafe24 orders and barcode return inspection at 250,000 won a month (70 malls live, 0.02% mis-shipment rate)."</p>' +
    '<h3>4. From E-E-A-T to E-E-A-T-C — citation integrity per paragraph</h3>' +
    '<p>Google\'s E-E-A-T works on the credibility of a whole page: named authors with credentials, a substantial body of columns. A generative model does not cite a page whole. It breaks the document into paragraphs and excerpts the one sentence that answers the question, synthesising it with material from other sites.</p>' +
    '<p>If the top of a page promises "24/7 free remote technical support" and a footnote says "premium paid plans only," the model can lift the first sentence alone and tell every customer that support is free. That is where customer disputes and brand trust collapse begin.</p>' +
    '<p>E-E-A-T-C reduces the unit of evaluation from page to paragraph and requires three conditions of citability.</p>' +
    '<ul><li><strong>Independence</strong> — a paragraph must parse completely on its own, with subject, predicate and object intact.</li>' +
    '<li><strong>Conditional binding</strong> — benefits and exceptions must sit in the same sentence as the claim they qualify.</li>' +
    '<li><strong>Traceability</strong> — any cited figure must name the body, the date and the basis of the sample.</li></ul>' +
    '<h2>Part 2. C-level self-diagnosis and working sheet</h2>' +
    '<p>If three or more of the following apply, the problem is structural rather than a matter of content volume.</p>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th>Self-diagnosis item</th><th>Model</th></tr></thead><tbody>' +
    '<tr><td>We have never collected the actual worry-statements (prompts) customers type into AI</td><td>STQP</td></tr>' +
    '<tr><td>Searching our industry in a major AI engine without our company name, our solution is not mentioned</td><td>3C-AI</td></tr>' +
    '<tr><td>AI answers recommend free tools, substitutes or non-purchase options ahead of us</td><td>3C-AI</td></tr>' +
    '<tr><td>Core specifications, prices and tables exist only inside images or locked files, not HTML</td><td>VRIO-D</td></tr>' +
    '<tr><td>Accredited test reports and measured figures that prove our claims are not public</td><td>VRIO-D</td></tr>' +
    '<tr><td>Our brand copy is crowded with abstract adjectives — best, innovative, smart</td><td>STQP</td></tr>' +
    '<tr><td>Benefits and their necessary exceptions are written apart from each other</td><td>E-E-A-T-C</td></tr>' +
    '<tr><td>Cited statistics carry no date of measurement and no body that produced them</td><td>E-E-A-T-C</td></tr>' +
    '<tr><td>There is no single official page answering the question our support desk receives every week</td><td>STQP · E-E-A-T-C</td></tr>' +
    '<tr><td>We do not regularly measure how accurately major AI answers cite our brand</td><td>All stages</td></tr>' +
    '</tbody></table></div>' +
    '<h2>Part 3. Conclusion — the most transparent company wins</h2>' +
    '<p>Optimisation for generative AI is not a field where technical tricks that once fooled a ranking algorithm still work. AI is unmoved by inflated copy and unimpressed by fine design. It trusts and cites only substance proven in clear text, stated conditions, and facts disclosed openly.</p>' +
    '<p>If the excellence a company accumulated over decades is locked in silence, it carries no force at all. Reorder the classics to the grammar of AI, and put your strengths outside in the most honest and clearest language. In a knowledge economy where an AI summarises everything into a few lines, only the prepared company is called first, and with the firmest trust.</p>';

  var A3_KO =
    '<p class="art-lead">VRIO-D 모형은 기업 자원의 가치가 밖에서 발견되고 확인될 수 있는지(Discoverability)까지 따지는 전략 모형입니다. 경영학 박사 심준규가 저서 『AI 승자독식』에서 기존 VRIO 분석에 다섯 번째 질문을 더해 제시했습니다.</p>' +
    '<blockquote>"우리의 강점이 고객 눈에 보이는가?"</blockquote>' +
    '<p>여기서 발견 가능성이란, 밖에서 정보를 찾는 사람(고객이나 AI)이 그 자원의 가치와 차별성에 접근하고, 이해하고, 확인할 수 있는지를 말합니다.</p>' +
    '<h2>골목 안쪽의 맛집 이야기</h2>' +
    '<p>동네마다 이런 식당이 하나쯤 있습니다. 30년 동안 같은 자리에서, 같은 정성으로 음식을 만들어 온 곳. 단골들은 "여기가 진짜"라고 말합니다. 그런데 간판도 작고, 인터넷에 올라온 글도 거의 없습니다.</p>' +
    '<p>새로 이사 온 사람이 AI에게 "이 동네 맛집 추천해 줘"라고 물으면, 이 식당은 답변에 나오지 않습니다. 실력이 없어서가 아닙니다. 실력이 \'보이지\' 않아서입니다. 기업도 똑같은 일을 겪습니다.</p>' +
    '<h2>경영학의 강점 점검표, VRIO</h2>' +
    '<p>회사의 강점을 따질 때 경영학자들이 즐겨 쓰는 틀이 VRIO입니다. 전략경영학자 제이 바니(Jay Barney)가 정리한 틀로, 네 가지를 묻습니다.</p>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th>VRIO</th><th>묻는 것</th><th>쉬운 말로</th></tr></thead><tbody>' +
    '<tr><td>V (Value)</td><td>고객에게 가치가 있는가?</td><td>고객에게 도움이 되나?</td></tr>' +
    '<tr><td>R (Rarity)</td><td>드문가?</td><td>다른 곳엔 없나?</td></tr>' +
    '<tr><td>I (Inimitability)</td><td>따라 하기 어려운가?</td><td>쉽게 베낄 수 없나?</td></tr>' +
    '<tr><td>O (Organization)</td><td>그 자원을 제대로 쓸 조직이 있는가?</td><td>잘 활용할 체계가 있나?</td></tr>' +
    '</tbody></table></div>' +
    '<p>네 질문을 모두 통과하면 "오래가는 경쟁력"이 있다고 봅니다.</p>' +
    '<h2>네 질문을 다 통과했는데, 왜 안 보일까?</h2>' +
    '<p>심준규 박사는 컨설팅 현장에서 이 네 질문으로 수많은 회사를 점검했습니다. 놀랍게도 네 질문을 모두 통과하는 회사가 적지 않았습니다. 문제는 그다음이었습니다. 네 질문을 다 통과한 회사가 정작 시장에서는 보이지 않았습니다.</p>' +
    '<p>예를 들어 30년 동안 쌓은 시험 데이터를 가진 회사가 있어도, 공개된 글에 그 흔적이 없으면 AI도 고객도 그 사실을 모릅니다. 그래서 다섯 번째 질문이 생겼습니다.</p>' +
    '<blockquote>D (Discoverability, 발견 가능성) — 그 강점이 밖에서 발견되고 확인될 수 있는가?</blockquote>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th>구분</th><th>기존 VRIO</th><th>VRIO-D</th></tr></thead><tbody>' +
    '<tr><td>질문 수</td><td>4개</td><td>5개 (발견 가능성 추가)</td></tr>' +
    '<tr><td>보는 범위</td><td>회사 안의 자원</td><td>회사 안의 자원 + 밖에서 보이는 모습</td></tr>' +
    '<tr><td>강점의 기준</td><td>가지고 있는가?</td><td>가지고 있고, 확인될 수 있는가?</td></tr>' +
    '<tr><td>핵심 질문</td><td>이 자원은 경쟁력이 있는가?</td><td>우리의 강점이 고객 눈에 보이는가?</td></tr>' +
    '</tbody></table></div>' +
    '<h2>오해 금지 — "다 공개하라"는 뜻이 아닙니다</h2>' +
    '<p>VRIO-D를 처음 들으면 "회사 비밀을 다 털어놓으라는 건가?" 하고 걱정할 수 있습니다. 그렇지 않습니다. 중요한 공정(노하우)은 지키되, 그 공정이 만든 결과와 적용 범위는 확인할 수 있게 만드는 일입니다.</p>' +
    '<p>맛집으로 비유하면 이렇습니다. 지킬 것은 육수 비법 레시피, 보여줄 것은 "30년간 매일 새벽 4시부터 12시간 끓인 육수", "하루 100그릇 한정"입니다. 비법은 지키면서 그 비법이 만든 결과는 누구나 확인할 수 있게 하는 것 — 무엇을 보여주고 무엇을 지킬지 전략적으로 고르는 렌즈가 VRIO-D입니다.</p>' +
    '<h2>내 사업에 적용해 보기 — 3단계</h2>' +
    '<ul class="numbered">' +
    '<li><strong>내 강점을 적어 보세요.</strong> 경력, 자격, 데이터, 고객 수, 노하우 등 "이건 자신 있다" 싶은 것을 다섯 개 적습니다.</li>' +
    '<li><strong>각 강점 옆에 \'어디서 확인할 수 있는지\' 적으세요.</strong> 홈페이지, 블로그, 언론 기사, 고객 후기, 공개 자료. 빈칸으로 남는 강점이 바로 \'가졌지만 보이지 않는 강점\'입니다.</li>' +
    '<li><strong>빈칸 하나를 골라 글로 남기세요.</strong> 비법은 빼고, 결과와 숫자, 적용 범위를 중심으로 공개 글을 하나 씁니다.</li>' +
    '</ul>' +
    '<p>체크 포인트: 고객이 "정말요? 어디서 확인할 수 있어요?"라고 물었을 때 링크 하나로 답할 수 있다면, 그 강점은 \'보이는 강점\'입니다.</p>' +
    '<h2>책에서 더 깊이 다루는 내용</h2>' +
    '<p>『AI 승자독식』 5장에서는 고객관계관리(CRM) 소프트웨어 기업 Salesforce가 자체 조사 보고서를 어떻게 지식 자산으로 쌓아 왔는지 살펴봅니다. 회사 안의 데이터가 바깥의 신뢰로 바뀌는 과정을 따라갑니다.</p>';

  var A3_EN =
    '<p class="art-lead">VRIO-D is a strategy model that asks whether the value of a company\'s resources can be discovered and verified from outside — its discoverability. Jace Shim, Ph.D., proposed it in <em>Winner Takes the Answer</em> by adding a fifth question to the established VRIO analysis.</p>' +
    '<blockquote>"Is our strength visible to the customer?"</blockquote>' +
    '<p>Discoverability here means whether someone looking for information from outside — a customer or an AI — can reach, understand and verify the value and distinctiveness of that resource.</p>' +
    '<h2>The restaurant at the end of the alley</h2>' +
    '<p>Every neighbourhood has a place like this. Thirty years in the same spot, cooking with the same care. Regulars say it is the real thing. The sign is small and almost nothing about it has been written online.</p>' +
    '<p>When a new resident asks an AI to recommend a good restaurant nearby, this one does not appear in the answer. Not because the cooking is weak, but because the strength is not visible. Companies meet exactly the same fate.</p>' +
    '<h2>VRIO, the strength checklist of management theory</h2>' +
    '<p>Strategists like to test a company\'s strengths with VRIO, a framework set out by Jay Barney. It asks four questions.</p>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th>VRIO</th><th>The question</th><th>In plain words</th></tr></thead><tbody>' +
    '<tr><td>V (Value)</td><td>Does it have value for the customer?</td><td>Does it help them?</td></tr>' +
    '<tr><td>R (Rarity)</td><td>Is it rare?</td><td>Does anyone else have it?</td></tr>' +
    '<tr><td>I (Inimitability)</td><td>Is it hard to imitate?</td><td>Can it be copied easily?</td></tr>' +
    '<tr><td>O (Organization)</td><td>Is there an organisation to exploit it?</td><td>Is there a system to use it well?</td></tr>' +
    '</tbody></table></div>' +
    '<p>Pass all four and you are said to hold a lasting competitive advantage.</p>' +
    '<h2>All four passed — so why is it invisible?</h2>' +
    '<p>Jace Shim has taken hundreds of companies through these four questions in the field. Remarkably many passed all of them. The problem came next: companies that passed all four were nowhere to be seen in the market.</p>' +
    '<p>A company may hold thirty years of test data, but if there is no trace of it in published text, neither an AI nor a customer knows it exists. Hence the fifth question.</p>' +
    '<blockquote>D (Discoverability) — can that strength be discovered and verified from outside?</blockquote>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th></th><th>Classic VRIO</th><th>VRIO-D</th></tr></thead><tbody>' +
    '<tr><td>Questions</td><td>Four</td><td>Five — discoverability added</td></tr>' +
    '<tr><td>Scope</td><td>Resources inside the company</td><td>Resources inside, plus how they appear outside</td></tr>' +
    '<tr><td>Test of strength</td><td>Do we have it?</td><td>Do we have it, and can it be verified?</td></tr>' +
    '<tr><td>Core question</td><td>Is this resource competitive?</td><td>Is our strength visible to the customer?</td></tr>' +
    '</tbody></table></div>' +
    '<h2>Not a call to publish everything</h2>' +
    '<p>At first hearing, VRIO-D sounds like a demand to disclose company secrets. It is not. The principle is to protect the process while making its results and scope verifiable.</p>' +
    '<p>With the restaurant: protect the broth recipe; show that the broth has been simmered twelve hours a day from 4 a.m. for thirty years, and that only one hundred bowls are served. VRIO-D is the lens for choosing strategically what to show and what to keep.</p>' +
    '<h2>Applying it to your business — three steps</h2>' +
    '<ul class="numbered">' +
    '<li><strong>List your strengths.</strong> Five things you are confident about: experience, credentials, data, customer count, know-how.</li>' +
    '<li><strong>Beside each, note where it can be verified.</strong> Website, blog, press, customer reviews, public records. Any strength with a blank next to it is held but invisible.</li>' +
    '<li><strong>Take one blank and write it up.</strong> Leave the secret out; write one public piece around the result, the numbers and the scope of application.</li>' +
    '</ul>' +
    '<p>Check point: if a customer asks "really? where can I verify that?" and you can answer with one link, the strength is visible.</p>' +
    '<h2>Where the book goes deeper</h2>' +
    '<p>Chapter 5 of <em>Winner Takes the Answer</em> follows how Salesforce, the CRM company, built its own research reports into a knowledge asset — the process by which data inside a company becomes trust outside it.</p>';

  var INSIGHTS = [
    {
      id: "population",
      cat: { ko: "인구 · 전략", en: "Demographics · Strategy" },
      date: { ko: "2026. 11. 23", en: "23 Nov 2026" },
      read: { ko: "약 6분", en: "6 min read" },
      title: {
        ko: "인구 소멸과 2030년 기업 경영의 변곡점",
        en: "Population Decline and the 2030 Turning Point for Business"
      },
      excerpt: {
        ko: "한국 경제의 완충 지대가 사라지는 2028~2030년. 마지막 베이비붐 세대의 은퇴가 기업의 비용 구조와 시장 구조를 동시에 바꿉니다.",
        en: "Between 2028 and 2030 the buffer of Korea's economy disappears. The retirement of the last baby-boom cohort changes cost structures and market structures at once."
      },
      body: { ko: A1_KO, en: A1_EN }
    },
    {
      id: "aeo-citation-gap",
      cat: { ko: "AI 전략 · AEO", en: "AI Strategy · AEO" },
      date: { ko: "2026. 11. 12", en: "12 Nov 2026" },
      read: { ko: "약 8분", en: "8 min read" },
      title: {
        ko: "AI 검색 시대, 우리 회사가 사라지는 이유: 인용 격차를 돌파하는 AEO 4대 전략 프레임워크",
        en: "Why Your Company Disappears in AI Search: Four Frameworks for Breaking Through the Citation Gap"
      },
      excerpt: {
        ko: "실제 경쟁력과 AI가 고객에게 전하는 경쟁력 사이의 '인용 격차'. 3C-AI·VRIO-D·STQP·E-E-A-T-C로 격차의 원인을 진단합니다.",
        en: "The 'citation gap' between real competitiveness and what AI tells customers. 3C-AI, VRIO-D, STQP and E-E-A-T-C diagnose where it comes from."
      },
      body: { ko: A2_KO, en: A2_EN }
    },
    {
      id: "vrio-d",
      cat: { ko: "AI 전략 · VRIO-D", en: "AI Strategy · VRIO-D" },
      date: { ko: "2026. 11. 11", en: "11 Nov 2026" },
      read: { ko: "약 4분", en: "4 min read" },
      title: {
        ko: "30년 쌓은 실력이 왜 AI 답변에는 안 나올까",
        en: "Why Thirty Years of Craft Never Appears in an AI Answer"
      },
      excerpt: {
        ko: "네 질문을 모두 통과한 회사가 시장에서는 보이지 않습니다. VRIO-D는 다섯 번째 질문, '발견 가능성'을 묻습니다.",
        en: "A company can pass all four questions and still be invisible. VRIO-D adds a fifth: discoverability."
      },
      body: { ko: A3_KO, en: A3_EN }
    }
  ];

  window.INSIGHTS = INSIGHTS;
  window.INSIGHT_AUTHOR = {
    ko: "<strong>심준규 박사</strong> · 인하대학교 경영학과 겸임교수 · (주)더솔루션컴퍼니비 대표이사 · 『AI 승자독식(Winner Takes the Answer)』 저자",
    en: "<strong>Jace Shim, Ph.D.</strong> · Adjunct Professor, Inha University · CEO, The Solution Company B · Author of <em>Winner Takes the Answer</em>"
  };
})();
