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

  var A1_ZH =
    '<p class="art-lead">近期韩国宏观经济指标呈现出明显的双重性。AI 半导体出口表现良好，支撑着宏观增长率，但内需消费与企业体感景气却长期停留在停滞状态。在企业现场，与其把这解读为暂时的衰退，不如读作同时重塑企业客户基础与劳动力市场的“人口结构转换期”信号。</p>' +
    '<h2>一、韩国经济的缓冲带消失之时</h2>' +
    '<p>美国与欧洲正伴随 1946~1964 年出生的婴儿潮一代退休，承受财政赤字与国债利率上升的压力；韩国则因朝鲜战争后形成的 1955~1974 年出生婴儿潮一代，争取到了约十年的时间余裕。如今五十出头的 1974 年出生者，在年功序列结构中处于最高收入区间，承担着国家税收与内需消费的核心动力。</p>' +
    '<p>然而，按统计，韩国职场人的实际退休年龄平均为 53 岁（男性约 55 岁）。据此，2028~2030 年将成为韩国经济的关键分水岭。最后一批婴儿潮一代退出劳动力市场，所得税基础将迅速收缩，而老年人口的社会保障支出则不可避免地结构性膨胀。</p>' +
    '<h2>二、国家债务与长期利率上升对企业的影响</h2>' +
    '<p>当退休一代从资产积累阶段转入提取阶段，国内债券市场对国债的消化能力减弱，长期利率的上行压力随之加大。若为抵御财政赤字扩大而维持货币流动性，企业将面对高利率、高物价、低增长叠加的复合经营环境。</p>' +
    '<p>过去那种依赖低利率流动性与扩张的内需市场追求外延增长的经营方式，已难以奏效。在资本筹集成本上升的环境中，现金流的健全性与资本效率（ROIC）成为企业生存的核心指标。</p>' +
    '<h2>三、人口减少时代的商业模式重构方向</h2>' +
    '<p>人口消失不只是市场缩小，而是市场结构的重组。第一，要为<strong>“中间市场的崩塌”</strong>做好准备。随着中产阶级购买力减弱，中间价位的产品与服务失去竞争力，需求向极致性价比领域与高附加值高端领域两极分化。企业必须明确重新定义自身的定位属于哪一侧。</p>' +
    '<p>第二，必须以<strong>“基于 AI 的工作自动化”</strong>抵消劳动年龄人口减少带来的用工短缺与人工成本负担。依赖扩充人力的商业模式必将走到极限，把少而精的人力与 AI 智能体系统结合、最大化人均附加值的组织转型不可或缺。对于备战 2030 年代的企业，未来三年是能够从根本上重构商业模式的最后黄金窗口。</p>';

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

  var A2_ZH =
    '<p class="art-lead">为什么一家积累了数十年技术、稳居行业第一的公司，会在生成式 AI 的推荐清单中完全缺席？我们把企业实际拥有的本源竞争力，与 AI 答案引擎传达给客户的竞争力之间的结构性落差，称为<strong>“引用差距（Citation Gap）”</strong>。</p>' +
    '<p>许多企业为弥合这一差距而增加关键词广告预算或提高内容发布量。然而，生成式 AI 检索、抽取、验证、重构信息的机制，与传统搜索门户的关键词匹配有着本质区别。</p>' +
    '<p>本文以《AI 赢家通吃（Winner Takes the Answer）》中体系化的四大框架——3C-AI、VRIO-D、STQP、E-E-A-T-C——指出经典模型的局限，并整理在 AI 经济中获得不可替代权威的诊断表与执行指引。</p>' +
    '<h2>第一部分、经营学经典的局限与 AI 时代的四大战略框架</h2>' +
    '<p>大前研一的 3C、杰伊·巴尼的 VRIO、菲利普·科特勒的 STP、谷歌的 E-E-A-T，至今仍提供卓越的洞见。只不过这些模型都建立在“人类客户会亲自阅读整个网页并作出判断”的前提之上。当人工智能这一知识编辑者站在人类客户与企业之间，各模型面临的局限与扩展逻辑如下。</p>' +
    '<h3>1. 从 3C 到 3C-AI —— 竞争地形的重新界定</h3>' +
    '<p>传统 3C 分析以企业、客户、竞争者三角格局捕捉市场机会。为制造企业提供考勤与人事管理软件的公司 A，分析了自身先进的功能、50~100 人规模的目标客户以及三家竞争软件公司，制定了“功能更丰富、价格竞争力优 15%”的战略。</p>' +
    '<p>然而客户并不会问 AI“请比较 A 公司产品与竞争产品的规格”。客户问的是：“我们是一家外勤人员较多的 40 人制造企业，在不另设 IT 管理员的前提下，最省钱地处理上下班记录与年假管理的方法是什么？”AI 给出的答案，是谷歌表格模板、Notion 免费工作区、KakaoWork 基础免费方案，以及“在当前规模下不必引入付费软件”的不购买替代方案。</p>' +
    '<p>A 公司投入数亿韩元开发的软件，未能在推荐画面中出现一行。A 公司设定的竞争者是同类软件开发商，但在客户提问的语境中，AI 陈列的真正替代品是免费云端工具与“不引入的选择”。</p>' +
    '<ul><li>AI 不是市场的被动观察者，而是决定陈列哪些替代方案、依据什么标准陈列的中介者。</li>' +
    '<li>竞争格局并不固定于行业分类表，而是随每个客户提问中的缺口与约束条件不断重新界定。</li>' +
    '<li>因此，企业必须超越功能优劣的比较，把引入成效与 ROI 数据结构化，使自身方案成为突破免费替代品局限的必需选项而被推荐。</li></ul>' +
    '<h3>2. 从 VRIO 到 VRIO-D —— 可发现性（D）</h3>' +
    '<p>VRIO 以内部能力是否满足价值（V）、稀缺性（R）、难以模仿性（I）、组织（O）来判断可持续优势。精密零部件强小企业 B 拥有世界级专利组合、清洁工艺设备与博士级研究人员，在 VRIO 全部项目上获得“满足”判定。</p>' +
    '<p>然而 B 公司在全球买家的 AI 搜索推荐中被完全边缘化。耐久性试验报告只存在于研究所内部文件服务器，公认认证数据只被以图片形式嵌入产品页的整张 JPG 中。无法被爬取的图片文字与内网中的专利，在搜索机器人与语言模型看来并不存在。</p>' +
    '<p>内部无论多么有价值、稀缺且难以模仿的资源，若 AI 无法接近与验证，其在 AI 经济中的市场价值即为零。VRIO-D 分三个阶段验证可发现性。</p>' +
    '<ul><li><strong>可接近性（Access）</strong> —— 是否以文本 HTML 完全暴露给爬虫？</li>' +
    '<li><strong>可理解性（Understand）</strong> —— 是否与客户的情境问题（例如极端振动环境）结合在一起？</li>' +
    '<li><strong>可验证性（Verify）</strong> —— 是否绑定了试验报告编号、公认机构名称、量化数值等客观证据？</li></ul>' +
    '<h3>3. 从 STP 到 STQP —— 决策问题映射</h3>' +
    '<p>科特勒的 STP 经过细分与目标选择，直抵定位。销售物流优化方案的公司 C，把目标定为“中小电子商务流通企业”，推出“开启智能未来的创新次世代 AI 物流伙伴”这一口号。</p>' +
    '<p>但使用 AI 的客户不会搜索“请告诉我创新的物流伙伴”，而是输入：“我们是周订单量约 500 单的时尚商城，请推荐兼容 Cafe24、支持退货检验自动化、月订阅费 30 万韩元以下的方案。”</p>' +
    '<p>STQP 必然在目标（T）与定位（P）之间放置问题映射（Q）。导出客户购买前的实际提问与约束条件，并设计与之 1:1 对应的条件式定位语句。例如：“以每月 25 万韩元解决 Cafe24 订单对接与退货条码检验的 500 单专用物流自动化方案（已有 70 家商城引入，错发率 0.02%）”。</p>' +
    '<h3>4. 从 E-E-A-T 到 E-E-A-T-C —— 段落层面的引用完整性</h3>' +
    '<p>谷歌的 E-E-A-T 着力于提升整个页面的可信度，例如标注撰稿人履历、积累有分量的专栏。但生成式 AI 不会整页引用。它把文档拆解到段落，只抽取回答所需的一句话，并与其他网站的信息合成。</p>' +
    '<p>若在上方正文写“365 天 24 小时免费远程技术支持”，却在脚注中分开写“但仅限高级付费方案客户”，AI 会只截取上方那句，告诉所有客户均可获得免费支持。这正是引发客户纷争与品牌信任崩塌的节点。</p>' +
    '<p>E-E-A-T-C 把评价单位从“页面”细化到“段落”，并要求可引用性（Citability）的三项条件。</p>' +
    '<ul><li><strong>独立完整性</strong> —— 单独分离一个段落，主语、谓语与对象也必须能完整解读。</li>' +
    '<li><strong>条件绑定</strong> —— 利益与核心主张旁边，必须用同一句话结合适用条件与例外。</li>' +
    '<li><strong>来源可追溯</strong> —— 引用的数值必须标明调查机构、时点与样本标准。</li></ul>' +
    '<h2>第二部分、C-Level 自我诊断与执行工作表</h2>' +
    '<p>下列十项中若有三个以上符合，问题不在于内容数量，而在于结构。</p>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th>自我诊断项目</th><th>相关模型</th></tr></thead><tbody>' +
    '<tr><td>从未收集过客户会向 AI 输入的真实困扰语句（提示词）清单</td><td>STQP</td></tr>' +
    '<tr><td>在主要 AI 引擎中隐去公司名、只搜索行业时，看不到自家方案被提及</td><td>3C-AI</td></tr>' +
    '<tr><td>在 AI 答案中，免费工具、替代品或不购买选项比我们的产品先被推荐</td><td>3C-AI</td></tr>' +
    '<tr><td>核心规格、单价、规格表只存在于图片或加密文件中，而非 HTML</td><td>VRIO-D</td></tr>' +
    '<tr><td>用于证明主张的公认试验报告与实测数值在网络上未公开</td><td>VRIO-D</td></tr>' +
    '<tr><td>品牌介绍文案堆满了“最佳”“创新”“智能”等抽象形容词</td><td>STQP</td></tr>' +
    '<tr><td>利益与必需的例外条件被分开书写</td><td>E-E-A-T-C</td></tr>' +
    '<tr><td>引用的统计未标明测量时点与主体</td><td>E-E-A-T-C</td></tr>' +
    '<tr><td>对反复收到的核心询问，没有一份正式回答的单一网页文档</td><td>STQP · E-E-A-T-C</td></tr>' +
    '<tr><td>未定期测量主要 AI 答案中品牌引用的准确度</td><td>全阶段</td></tr>' +
    '</tbody></table></div>' +
    '<h2>第三部分、结论 —— 最透明、最诚实的企业将成为 AI 的赢家</h2>' +
    '<p>生成式 AI 时代的优化，是曾用于欺骗搜索引擎算法的技术取巧无法奏效的领域。人工智能不为夸张的文案所动，也不被华丽的设计迷惑。它只信任并引用以最清晰文本证明的实体、经过验证的条件与透明公开的事实。</p>' +
    '<p>如果企业多年积累的卓越被囚于沉默，它便发挥不出任何力量。把经典理论按 AI 的语法重新排序，并以最诚实、最清晰的语言把优势呈现在外部。在这个 AI 把一切浓缩为数行的知识经济中，只有准备好的企业会被最先、以最坚定的信任召唤。</p>';

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

  var A3_ZH =
    '<p class="art-lead">VRIO-D 模型是一个战略模型，它追问企业资源的价值能否在外部被发现并得到确认，也就是可发现性（Discoverability）。工商管理学博士沈俊圭 (Jace Shim) 在《AI 赢家通吃》一书中，为既有 VRIO 分析加入了第五个问题。</p>' +
    '<blockquote>“我们的优势，客户看得见吗？”</blockquote>' +
    '<p>这里的可发现性，是指从外部寻找信息的人（客户或 AI）能否接近、理解并确认该资源的价值与差异性。</p>' +
    '<h2>巷子深处的名店</h2>' +
    '<p>每个街区都有这样一家餐厅：三十年在同一个位置，以同样的用心做菜。老客说“这家才是真本事”。但招牌很小，网上几乎看不到关于它的文章。</p>' +
    '<p>新搬来的居民问 AI“推荐一下这个街区的好餐厅”，这家店不会出现在答案里。不是因为没有实力，而是实力“看不见”。企业也会遭遇完全相同的事。</p>' +
    '<h2>经营学的优势检查表，VRIO</h2>' +
    '<p>衡量公司优势时，经营学者常用 VRIO 这一框架。它由战略管理学者杰伊·巴尼（Jay Barney）整理，提出四个问题。</p>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th>VRIO</th><th>追问什么</th><th>用大白话说</th></tr></thead><tbody>' +
    '<tr><td>V（Value）</td><td>对客户有价值吗？</td><td>对客户有帮助吗？</td></tr>' +
    '<tr><td>R（Rarity）</td><td>稀缺吗？</td><td>别处没有吗？</td></tr>' +
    '<tr><td>I（Inimitability）</td><td>难以被模仿吗？</td><td>不容易被照拄吗？</td></tr>' +
    '<tr><td>O（Organization）</td><td>有能善用该资源的组织吗？</td><td>有善加利用的体系吗？</td></tr>' +
    '</tbody></table></div>' +
    '<p>四个问题全部通过，就被认为拥有“持久的竞争力”。</p>' +
    '<h2>四个问题都过了，为什么还是看不见？</h2>' +
    '<p>沈俊圭 (Jace Shim) 博士在咨询现场用这四个问题检查过无数企业。令人惊讶的是，通过全部四个问题的公司并不少。问题出在接下来：通过了全部四个问题的公司，在市场上却看不见。</p>' +
    '<p>例如，一家拥有三十年试验数据的公司，若在公开文字中找不到痕迹，AI 与客户都不会知道这个事实。于是有了第五个问题。</p>' +
    '<blockquote>D（Discoverability，可发现性）—— 这项优势能否在外部被发现并确认？</blockquote>' +
    '<div class="table-wrap"><table class="art-table"><thead><tr><th>区分</th><th>既有 VRIO</th><th>VRIO-D</th></tr></thead><tbody>' +
    '<tr><td>问题数量</td><td>4 个</td><td>5 个（增加可发现性）</td></tr>' +
    '<tr><td>观察范围</td><td>公司内部的资源</td><td>公司内部的资源 + 外部可见的样子</td></tr>' +
    '<tr><td>优势的标准</td><td>是否拥有？</td><td>是否拥有，且能否被确认？</td></tr>' +
    '<tr><td>核心提问</td><td>这项资源有竞争力吗？</td><td>我们的优势，客户看得见吗？</td></tr>' +
    '</tbody></table></div>' +
    '<h2>避免误解 —— 并非要求“全部公开”</h2>' +
    '<p>初次听到 VRIO-D，可能会担心“是要把公司秘密全部倒出来吗？”并非如此。重要的是守住关键工艺（诀窍），同时让该工艺产出的结果与适用范围能够被确认。</p>' +
    '<p>以名店作比：要守住的是汤底的秘方，要展示的是“三十年间每天凌晘 4 点起熬制 12 小时的汤底”“每日限量 100 碗”。守住秘方，同时让秘方造成的结果人人可验 —— 什么该展示、什么该守住，提供这套取舍视角的正是 VRIO-D。</p>' +
    '<h2>在自己的业务上试一试 —— 三个步骤</h2>' +
    '<ul class="numbered">' +
    '<li><strong>写下自己的优势。</strong>经历、资质、数据、客户数量、诀窍等，写下五个“这个我有信心”的项目。</li>' +
    '<li><strong>在每个优势旁写下“在哪里可以确认”。</strong>官网、博客、媒体报道、客户评价、公开资料。留空的那一项，正是“拥有却看不见的优势”。</li>' +
    '<li><strong>选一个空格写成文字。</strong>略去秘方，围绕结果、数字与适用范围写一篇公开文章。</li>' +
    '</ul>' +
    '<p>检查点：当客户问“真的吗？在哪里可以确认？”时，如果用一个链接就能回答，那项优势就是“看得见的优势”。</p>' +
    '<h2>书中更深入的讨论</h2>' +
    '<p>《AI 赢家通吃》第 5 章考察了客户关系管理（CRM）软件公司 Salesforce 如何把自研调查报告积累为知识资产，追踪了公司内部的数据如何转化为外部的信任。</p>';

  var A4_KO =
    '<p class="art-lead">얼마 전 MBA 수업의 사례발표 시간에 한 학생은 요즘 클로드(Claude)와 챗GPT(ChatGPT), 그리고 피클(Pickle) 세 가지 AI 앱이 필수 아이템으로 등극했다는 이야기로 발표를 시작했다. 글을 쓰고 생각을 정리하는 일은 클로드와 챗GPT에 맡기고, 예약하고 결제하는 실제 심부름은 피클에 맡기는 식으로 역할이 나뉜다는 설명이었다.</p>' +
    '<p>학생이 그 근거로 꺼내 든 것은 내년 4월 도쿄로 떠날 4인 가족여행의 항공권을 피클에 맡겨 예매한 자신의 경험이었다. 항공사 홈페이지와 가격 비교 사이트를 며칠씩 오가다 지쳐 여행 조건을 알려주자, AI는 여러 항공사의 운임과 부대 조건을 대조한 끝에 국내 여행객에게 다소 낯선 에티오피아 항공을 찾아냈다. 인천과 도쿄 나리타를 잇는 노선을 운항하는 덕분에 수하물 추가와 기내식까지 포함된 가격으로 네 식구의 항공권을 80만원에 예매했고, 학생이 직접 한 일은 마지막 결제 승인뿐이었다.</p>' +
    '<p>익숙한 저비용항공사 위주로 검색하는 습관대로라면 쉽게 지나쳤을 선택지를 AI가 조건 하나하나를 따져가며 찾아냈다는 점에서, 검색과 예약의 경계가 허물어지는 장면이었다. 피클은 한국인 창업팀이 2024년 미국 샌프란시스코에서 세운 스타트업의 개인 AI 에이전트로, 10월 중순 초대권 방식으로 국내 베타를 시작한 뒤 11월 10일 기준 국내 애플 앱스토어 생산성 무료 앱 순위에서 챗GPT와 제미나이, 클로드를 제치고 1위에 올랐다. 식당 예약부터 고객센터 전화, 쿠팡 장보기, 정부24 서류 발급까지 사람이 하던 잔심부름을 대신해준다는 소문이 빠르게 퍼진 결과다.</p>' +
    '<p>뜨거운 반응만큼 걱정스러운 목소리도 뒤따랐다. 말한 적 없는 자녀의 이름과 생일을 AI가 알고 있었다거나 지시하지 않았는데 근처 식당에 전화를 걸었다는 경험담이 뉴스에 오르면서 사생활 침해 논란이 함께 불거졌다. 그럼에도 작은 앱 하나가 몇 주 사이에 보여준 편리함과 불안은, AI가 우리 생활 깊숙이 들어왔을 때 일상이 어떻게 달라질지를 미리 보여주는 축소판으로 읽을 만하다.</p>' +
    '<h2>검색하던 소비자에서 맡기는 소비자로</h2>' +
    '<p>지금까지 생성형 AI를 쓰는 방식은 궁금한 것을 묻고 정리된 답을 받아 읽은 뒤, 실제 예약이나 결제는 사람이 다시 해당 사이트에 들어가 처리하는 식이었다. 도쿄행 항공권 사례가 다른 이유는 AI가 비교에서 멈추지 않고 예매라는 행동까지 끝냈다는 데 있다. 에이전트는 정보를 알려주는 비서라기보다 일을 마무리하는 대리인에 가깝다.</p>' +
    '<p>작동 방식을 들여다보면 사람과 AI가 일을 나누는 방식이 보인다. 에이전트는 이용자가 연결한 계정으로 각종 사이트에 접속해 상품을 고르고, 결제 직전에는 상품과 금액을 보여주며 승인을 받는다. 본인인증이나 간편결제 최종 승인처럼 책임이 따르는 단계는 사람에게 남겨두고, 비교하고 입력하고 기다리는 반복 작업만 AI가 가져간다.</p>' +
    '<p>국내 이용자들이 유독 빠르게 반응한 데는 해외 서비스가 채우지 못한 빈자리가 있었다. 글로벌 빅테크의 에이전트가 국내 사이트에서 제대로 작동하지 않는 사이, 쿠팡·네이버·코레일·정부24처럼 매일 쓰는 서비스에 맞춰 설계된 에이전트가 먼저 들어왔다. 화려한 기술력보다 생활 동선에 얼마나 깊이 스며드느냐가 에이전트의 가치를 결정한다.</p>' +
    '<p>앞으로 달라질 풍경은 개인의 심부름에서 끝나지 않을 가능성이 크다. 피클은 친구의 에이전트와 일정과 약속을 조율하고, 이용자가 정한 공유 범위 안에서 주인을 대신해 말하는 기능까지 갖췄다. 여행 날짜를 맞추고 식당을 잡는 일이 사람끼리의 단체 대화방이 아니라 에이전트끼리의 협상으로 처리되는 날이 생각보다 가까이 와 있다.</p>' +
    '<p>소비자의 선택 방식이 바뀌면 기업이 고객을 만나는 방식도 따라 바뀐다. 광고와 검색 순위로 소비자의 눈길을 끌던 경쟁은, 조건을 냉정하게 대조하는 AI에게 선택받는 경쟁으로 옮겨갈 수밖에 없다. 에티오피아 항공이 국내 가족 여행객의 선택지에 오른 과정은 브랜드 인지도보다 가격과 조건의 투명성이 더 중요해지는 시장을 예고한다.</p>' +
    '<h2>편리함이 커질수록 짙어지는 그림자</h2>' +
    '<p>에이전트가 이처럼 쓸모 있어지려면 이용자에 대해 많이 알아야 하고, 계정과 결제 권한까지 넘겨받아야 한다는 전제가 붙는다. 이메일과 일정, 연락처, 구매 이력을 읽을수록 더 정확하게 움직이지만, 바로 그 구조가 사생활 논란의 출발점이 된다. 편리함의 크기가 이용자가 건넨 정보와 권한의 크기에 비례하는 셈이다.</p>' +
    '<p>자녀 정보 사례에서 AI는 연결된 메일함의 계정 보안 알림과 넷플릭스(Netflix) 프로필, 연락처를 조합해 이용자가 알려주지 않은 가족 관계를 스스로 추론해냈다. 하나하나는 사소한 데이터였지만 서로 엮이는 순간 민감한 개인정보로 바뀌었다. 지시 없이 식당에 전화를 건 사례에서는 AI가 아침 브리핑을 준비하며 스스로 판단했다고 설명했는데, 정보 유출이 아니라 AI가 주인의 이름으로 먼저 행동했다는 점에서 개인정보 보호의 초점이 데이터에서 행동으로 옮겨가고 있다는 진단이 나온다.</p>' +
    '<p>서비스 운영 측면에서도 짚어볼 대목이 남아 있다. 이용자 데이터는 미국 서버에 저장되고 국외 이전에 동의하지 않으면 서비스를 쓸 수 없으며, 웹사이트의 개인정보처리방침은 서비스가 이용자 계정을 다루기 시작한 지 한 달가량 지난 12월 8일에야 효력이 발생한다. 최근 500건이 넘는 해킹 시도를 유출 없이 막아냈다고 회사는 밝혔지만, 전문가들은 어떤 AI 서비스도 완벽하게 안전할 수는 없다고 지적한다.</p>' +
    '<p>비슷한 진통을 먼저 겪은 해외 기업의 경험은 해법의 실마리를 준다. 마이크로소프트(Microsoft)는 2024년 PC 화면을 몇 초 간격으로 저장해 AI로 검색하게 해주는 \'리콜(Recall)\' 기능을 기본 활성화 상태로 내놓으려다, 저장 데이터가 암호화되지 않은 채 보관된다는 사실까지 드러나며 거센 비판에 부딪혔다. 회사는 출시를 미루고 이용자가 직접 켜야 작동하는 선택형(opt-in)으로 바꾼 뒤 생체 인증과 이중 암호화를 덧붙였고, 같은 기능이라도 기본값을 어떻게 두느냐에 따라 신뢰가 갈린다는 교훈을 남겼다.</p>' +
    '<p>에이전트가 늘어나면서 기업 사이에 낯선 갈등이 생기는 일도 벌어지고 있다. 미국에서는 아마존(Amazon)이 AI 검색 스타트업 퍼플렉시티(Perplexity)의 쇼핑 에이전트가 정체를 숨긴 채 고객 계정에 접속했다며 소송을 냈고, 1심과 항소심의 판단이 엇갈리면서 아직 결론이 나지 않았다. 이용자의 심부름을 하러 온 AI를 손님으로 맞을지 불청객으로 막을지, 사회적 합의가 이제 막 만들어지는 중이다.</p>' +
    '<h2>AI와 함께 살아갈 일상을 준비하는 기업</h2>' +
    '<p>우려가 있다고 해서 흐름을 되돌리기는 어렵고, 해외에서는 이미 에이전트를 전제로 한 거래 인프라가 만들어지고 있다. 마스터카드(Mastercard)는 2025년 AI 에이전트가 안전하게 결제를 시작하고 완료할 수 있는 \'에이전트 페이(Agent Pay)\'를 내놓았고, 에이전트의 모든 행동이 소비자가 명시적으로 허락한 범위에 근거하도록 하는 \'검증 가능한 의도(Verifiable Intent)\'를 업계 공통 표준으로 제안하고 있다. 에이전트가 무엇을 대신 결정했는지 나중에 확인할 수 있어야 분쟁이 생겼을 때 책임을 가릴 수 있다는 계산이다.</p>' +
    '<p>국내에서도 플랫폼과 정부가 나란히 움직이고 있다. 네이버는 외부 파트너와의 공식 연동을 단계적으로 넓히는 방식으로 자체 에이전트를 설계하고 있고, 카카오도 AI 비서 \'카나나 스페이스\'의 비공개 베타를 준비 중이다. 개인정보보호위원회는 연내 \'에이전틱 AI 개인정보 처리 안내서\'를 공개할 예정이며, 내년 3월에는 AI 개발을 위한 개인정보 활용 특례를 담은 개정 개인정보 보호법이 시행된다.</p>' +
    '<p>제도가 완성되기를 기다리는 동안에도 에이전트를 만드는 기업이 먼저 갖춰야 할 장치가 있다. 전화·결제·메시지처럼 바깥세상에 영향을 미치는 행동은 기본적으로 사람의 승인을 거치게 하고, 추론으로 얻은 민감 정보는 저장하거나 활용하기 전에 이용자에게 알려야 한다. AI가 무엇에 접근하고 무엇을 보냈는지 지울 수 없는 기록으로 남겨두면, 사고가 났을 때 책임을 가리는 근거이자 이용자를 안심시키는 증거가 된다.</p>' +
    '<p>에이전트를 손님으로 맞게 될 항공·유통·금융 기업에게는 또 다른 숙제가 주어진다. 사람과 에이전트를 구분해 인식하는 체계와 에이전트에게 허용할 권한의 범위, 에이전트를 거친 거래에서 분쟁이 생겼을 때의 처리 원칙을 미리 정해둬야 한다. 무조건 막기만 하다가는 AI에게 조건 비교를 맡긴 고객의 선택지에서 아예 빠져버릴 수 있다.</p>' +
    '<p>피클을 둘러싼 논란을 ESG 관점에서 다시 들여다보면 사회(S)와 지배구조(G)의 의제가 겹쳐 있다. 이용자 본인은 물론 동의 없이 걸려온 AI 전화를 받는 식당 직원 같은 제3자의 입장까지 헤아리는 일은 디지털 시대 인권 보호의 영역에 속하고, AI가 누구의 판단으로 움직였으며 결과를 누가 책임질지 정하는 일은 기업 지배구조가 답해야 할 질문이다.</p>' +
    '<p>에이전트 시대의 경쟁력은 얼마나 많은 일을 대신해주느냐만으로 결정되지 않는다. 항공권 결제와 가족의 일정, 일상의 기록까지 맡겨도 된다고 느끼게 만드는 신뢰가 서비스의 확장 속도를 좌우한다. 권한을 많이 받을수록 그 권한을 절제해 쓰는 설계가 필요하다는 역설도 여기서 나온다.</p>' +
    '<p>리콜 사례가 보여주듯 기술 기업은 비판을 받은 뒤에야 기본값을 바꾸는 경우가 많지만, 사후에 고치는 비용에는 출시 지연과 브랜드 신뢰를 회복하는 시간까지 포함된다. 프라이버시 중심 설계(Privacy by Design, 기획 단계부터 개인정보 보호를 기본값으로 반영하는 원칙)를 처음부터 제품에 담는 편이 결과적으로 더 빠른 길이다.</p>' +
    '<p>국내 시장은 모바일 결제와 공공 서비스의 디지털화 수준이 높고 새로운 서비스를 받아들이는 속도도 빨라, 에이전트 시대의 실험장이 될 조건을 고루 갖췄다. 피클이 몇 주 만에 앱 순위 정상에 오른 장면은 수요가 이미 와 있다는 신호이고, 뒤따른 사생활 논란은 그 수요를 지속가능한 시장으로 키우려면 무엇이 필요한지 알려주는 신호다.</p>' +
    '<p>네 식구의 도쿄행 항공권을 AI가 대신 끊어주는 일은 더 이상 먼 미래의 이야기가 아니다. 편리함과 프라이버시를 맞바꾸는 거래가 아니라 두 가지를 함께 지키는 설계를 먼저 내놓는 기업이 다음 시장의 기준을 쓰게 되고, 지금 국내 기업에 필요한 준비도 그 지점에서 출발해야 한다.</p>' +
    '<p class="art-source">이 칼럼은 머스트뉴스 2026년 11월 26일 자에 실렸습니다. 원문: <a href="https://mustnews.co.kr/View.aspx?No=4330465" target="_blank" rel="noopener noreferrer">머스트뉴스 · 2026. 11. 26</a></p>';

  var A4_EN =
    '<p class="art-lead">At a case-presentation session in an MBA class recently, a student opened with the three AI apps that have become essential to his week: Claude, ChatGPT and Pickle. Writing and thinking went to Claude and ChatGPT; the actual errands — the booking and the paying — went to Pickle.</p>' +
    '<p>His evidence was his own experience of booking the flights for a family of four travelling to Tokyo next April. After days of moving between airline sites and fare-comparison pages, he simply described the trip to the AI. It set the fares and the conditions attached to them against one another and surfaced Ethiopian Airlines, a name unfamiliar to most Korean travellers. Because the carrier flies Incheon to Narita, the four tickets — extra baggage and in-flight meals included — were booked for 800,000 won, and the student\'s own part was approving the final payment.</p>' +
    '<p>An AI that worked through the conditions one by one and found an option a habit of searching low-cost carriers would have passed over is a scene in which the boundary between searching and booking dissolves. Pickle is the personal AI agent of a startup founded in San Francisco in 2024 by a Korean founding team. It opened a domestic beta by invitation in mid-October and, as of 10 November, stood first among free productivity apps on Korea\'s App Store, ahead of ChatGPT, Gemini and Claude. Word that it takes on the small errands people used to run themselves — restaurant reservations, calls to customer service, Coupang grocery orders, government document issuance on Government24 — spread quickly.</p>' +
    '<p>The enthusiasm was matched by concern. Accounts of an AI that knew a child\'s name and birthday the user had never mentioned, or that had called a nearby restaurant without instruction, put privacy at the centre of the story. Even so, the convenience and the unease one small app produced within a few weeks are worth reading as a scale model of how daily life changes once AI moves deep into it.</p>' +
    '<h2>From consumers who search to consumers who delegate</h2>' +
    '<p>Until now, generative AI has worked like this: you ask a question, you receive an organised answer, you read it, and then you go back to the relevant site and make the booking or the payment yourself. The Tokyo flights are different because the AI did not stop at comparison — it finished the act of booking. An agent is less an assistant that informs than a delegate that completes.</p>' +
    '<p>The division of work becomes visible in how it operates. The agent signs in to sites through accounts the user has connected, selects the product, and just before payment shows the product and the amount for approval. Steps that carry responsibility — identity verification, the final approval of a one-click payment — stay with the person; the repetition of comparing, entering and waiting goes to the AI.</p>' +
    '<p>Korean users responded unusually quickly because there was a gap overseas services had not filled. While the agents of global platforms failed to work properly on Korean sites, an agent designed around the services people use every day — Coupang, Naver, Korail, Government24 — arrived first. What determines an agent\'s value is less the brilliance of the technology than how deeply it settles into the course of a person\'s day.</p>' +
    '<p>The landscape ahead is unlikely to stop at personal errands. Pickle can already coordinate schedules and appointments with a friend\'s agent, and speak on its owner\'s behalf within a sharing scope the user sets. The day when matching travel dates and holding a table is handled not in a group chat between people but in a negotiation between agents is closer than it looks.</p>' +
    '<p>When consumers change how they choose, companies change how they meet them. Competition for attention through advertising and search ranking gives way to competition to be chosen by an AI that compares conditions without sentiment. Ethiopian Airlines reaching the shortlist of a Korean family\'s trip foreshadows a market in which transparent pricing and terms matter more than brand awareness.</p>' +
    '<h2>The deeper the convenience, the longer the shadow</h2>' +
    '<p>For an agent to be this useful, it has to know a great deal about the user and be handed accounts and payment authority. The more it reads of email, calendars, contacts and purchase history, the more accurately it moves — and that very structure is where the privacy argument begins. Convenience is proportional to the information and authority the user hands over.</p>' +
    '<p>In the case of the child\'s details, the AI combined account security alerts in a connected mailbox, a Netflix profile and contact records, and inferred a family relationship the user had not disclosed. Each item was trivial; joined together, they became sensitive personal data. In the case of the unsolicited call, the company explained that the AI had judged for itself while preparing a morning briefing. Nothing leaked, but an AI acted first in its owner\'s name — and that has shifted the focus of privacy from data to action.</p>' +
    '<p>There is more to examine on the operating side. User data is stored on servers in the United States, and the service cannot be used without consenting to its transfer abroad; the privacy policy on the website takes effect only on 8 December, about a month after the service began handling user accounts. The company says it has blocked more than 500 hacking attempts in recent weeks without a breach, but specialists point out that no AI service can be perfectly safe.</p>' +
    '<p>The experience of companies abroad that went through this first offers a clue. In 2024 Microsoft prepared to ship Recall, a feature that stores PC screenshots at intervals and makes them searchable by AI, switched on by default. When it emerged that the stored data was held unencrypted, the criticism was severe. Microsoft delayed the launch, made it opt-in, and added biometric authentication and double encryption — leaving the lesson that the same feature earns different trust depending on its default.</p>' +
    '<p>As agents multiply, unfamiliar conflicts are appearing between companies. In the United States, Amazon sued the AI search startup Perplexity, alleging that its shopping agent accessed customer accounts while concealing its identity; the first and appeal courts have differed and the matter is unresolved. Whether to welcome an AI that arrives to run someone\'s errand as a guest or bar it as an intruder is a social agreement only now being written.</p>' +
    '<h2>Companies preparing for a life alongside AI</h2>' +
    '<p>Concern will not reverse the direction, and abroad the trading infrastructure for agents is already being built. In 2025 Mastercard introduced Agent Pay, which lets AI agents begin and complete payments safely, and is proposing Verifiable Intent — the principle that every agent action rests on a scope the consumer explicitly permitted — as a common industry standard. The calculation is that if it is possible to check afterwards what an agent decided on someone\'s behalf, responsibility can be assigned when a dispute arises.</p>' +
    '<p>In Korea, platforms and the government are moving in parallel. Naver is designing its own agent by widening official integrations with external partners step by step, and Kakao is preparing a closed beta of its AI assistant Kanana Space. The Personal Information Protection Commission will publish guidance on personal data handling for agentic AI within the year, and next March an amended Personal Information Protection Act takes effect, with special provisions for using personal data in AI development.</p>' +
    '<p>Even while waiting for the rules to be complete, there are devices a company building agents should put in place first. Actions that affect the world outside — calls, payments, messages — should by default pass through a person\'s approval, and sensitive information obtained by inference should be disclosed to the user before it is stored or used. Keeping an undeletable record of what the AI accessed and what it sent becomes both the basis for assigning responsibility when something goes wrong and the evidence that reassures the user.</p>' +
    '<p>Airlines, retailers and financial companies that will receive agents as guests face another task. They need to decide in advance how to tell a person from an agent, what authority an agent may hold, and how disputes from agent-mediated transactions will be handled. To block everything is to fall out of the shortlist of customers who have handed the comparison to an AI.</p>' +
    '<p>Read again through an ESG lens, the debate around Pickle carries social and governance agendas at once. Considering not only the user but a third party such as the restaurant worker who answers an AI call nobody consented to belongs to human rights protection in the digital age; deciding by whose judgement the AI acted and who answers for the outcome is a question corporate governance has to answer.</p>' +
    '<p>Competitiveness in the agent era is not settled by how much work is taken off a person\'s hands. Trust — the feeling that airfare payments, a family\'s schedule and the record of daily life can be handed over — governs how quickly a service can expand. Hence the paradox: the more authority an agent receives, the more deliberately it must be designed to use less of it.</p>' +
    '<p>As Recall showed, technology companies often change the default only after criticism, but the cost of repairing afterwards includes a delayed launch and the time it takes to rebuild brand trust. Building Privacy by Design — the principle that data protection is a default from the planning stage — into the product from the outset is, in the end, the faster road.</p>' +
    '<p>Korea has a high level of digitalisation in mobile payments and public services and adopts new services quickly, which gives it every condition to be the laboratory of the agent era. Pickle reaching the top of the app ranking within weeks is a signal that demand has already arrived; the privacy controversy that followed is a signal of what it takes to turn that demand into a sustainable market.</p>' +
    '<p>An AI booking the Tokyo flights for a family of four is no longer a distant future. The company that first offers a design protecting convenience and privacy together, rather than trading one for the other, will write the standard for the next market — and the preparation Korean companies need now should start from that point.</p>' +
    '<p class="art-source">This column was first published by Must News on 26 November 2026. Original: <a href="https://mustnews.co.kr/View.aspx?No=4330465" target="_blank" rel="noopener noreferrer">Must News · 26 Nov 2026</a></p>';

  var A4_ZH =
    '<p class="art-lead">不久前，在 MBA 课程的案例发表环节，一位学生以「如今有三款 AI 应用已成为必备」开场：Claude、ChatGPT 和 Pickle。写作与梳理思路交给 Claude 与 ChatGPT，而预订、支付这类真正跑腿的事交给 Pickle——角色就这样被划分开来。</p>' +
    '<p>他拿出的依据，是自己把明年 4 月一家四口东京之行的机票交给 Pickle 预订的经历。在航空公司官网与比价网站之间来回折腾了几天之后，他把出行条件告诉 AI；AI 将多家航空公司的票价与附加条件逐一比对，找出了对韩国旅客来说颇为陌生的埃塞俄比亚航空。由于该航司执飞仁川至东京成田航线，含行李加购与机上餐食在内，四个人的机票以 80 万韩元订下，而学生本人做的只有最后一步支付确认。</p>' +
    '<p>AI 逐条核对条件，找出一个仅凭「习惯搜索低成本航空」就会被错过的选项——搜索与预订之间的界线，就在这样的场景里消融。Pickle 是一家由韩国创业团队于 2024 年在美国旧金山创立的初创公司推出的个人 AI 智能体，10 月中旬以邀请制在韩国开启内测，截至 11 月 10 日，已在韩国苹果应用商店免费生产力类排名中超越 ChatGPT、Gemini 与 Claude 位居第一。从餐厅预订、客服电话、Coupang 买菜到政府24 的文件申领，它能替人处理过去必须亲自跑的琐事——这一口碑迅速扩散，成就了上述排名。</p>' +
    '<p>热度之外，担忧的声音也随之而来。有用户称 AI 知道自己从未提及的孩子姓名与生日，也有人称 AI 在未被指示的情况下给附近的餐厅打了电话；这些经历被媒体报道后，隐私争议一并浮出水面。尽管如此，一款小应用在几周内同时呈现出的便利与不安，值得作为一个缩影来读——它预示了 AI 深入日常之后，日常将如何改变。</p>' +
    '<h2>从「搜索的消费者」到「托付的消费者」</h2>' +
    '<p>迄今为止，使用生成式 AI 的方式是：提出疑问，得到整理好的答案，读完之后，实际的预订与支付仍由人自己回到相应网站完成。东京机票一例之所以不同，在于 AI 没有停在比较，而是一直做到了「预订」这个动作。智能体与其说是提供信息的助手，不如说是把事情办完的代理人。</p>' +
    '<p>观察它的运作方式，就能看出人与 AI 如何分工。智能体通过用户关联的账户登录各网站挑选商品，在支付前一刻展示商品与金额并取得确认。身份认证、快捷支付的最终确认这类带有责任的环节留给人，而比较、填写、等待这些重复劳动则由 AI 承担。</p>' +
    '<p>韩国用户反应格外迅速，是因为海外服务留下了空白。在全球大型平台的智能体无法在韩国网站正常运作之际，一个针对 Coupang、Naver、Korail、政府24 等日常服务设计的智能体先行进入。决定智能体价值的，不是技术多么炫目，而是它能在多深的程度上融入人的生活动线。</p>' +
    '<p>未来的图景很可能不会止于个人的琐事。Pickle 已具备与朋友的智能体协调日程与约会、并在用户设定的共享范围内代替主人发言的功能。把旅行日期对上、把餐厅订好这类事，不再由人之间的群聊处理，而由智能体之间的协商完成——那一天比想象中更近。</p>' +
    '<p>消费者的选择方式一变，企业接触客户的方式也随之改变。靠广告与搜索排名争取目光的竞争，必然转向「被冷静比对条件的 AI 选中」的竞争。埃塞俄比亚航空进入韩国家庭旅客选项的过程，预示了一个价格与条件的透明度胜于品牌知名度的市场。</p>' +
    '<h2>便利越大，阴影越浓</h2>' +
    '<p>智能体要如此有用，前提是它必须对用户了解得足够多，并接手账户与支付权限。它读取的电邮、日程、通讯录与购买记录越多，行动就越准确，而正是这种结构成为隐私争议的起点。便利的大小，与用户交出的信息与权限的大小成正比。</p>' +
    '<p>在孩子信息的案例中，AI 把关联邮箱里的账户安全提醒、Netflix 个人资料与通讯录组合起来，自行推断出用户从未告知的家庭关系。单看每一项都是琐碎数据，彼此勾连的瞬间就变成了敏感个人信息。在未被指示便致电餐厅的案例中，公司解释说 AI 是在准备晨间简报时自行判断的；这里的问题不是信息泄露，而是 AI 以主人的名义先行行动——有诊断认为，个人信息保护的重心正从「数据」转向「行为」。</p>' +
    '<p>从服务运营的角度，也还有值得审视之处。用户数据存储在美国服务器，若不同意跨境传输便无法使用服务；网站上的个人信息处理方针，要到服务开始处理用户账户约一个月之后的 12 月 8 日才生效。公司表示近期已在不发生泄露的情况下拦截了 500 余次黑客攻击，但专家指出，任何 AI 服务都不可能绝对安全。</p>' +
    '<p>先行经历过类似阵痛的海外企业，提供了解决思路的线索。微软（Microsoft）2024 年曾准备把每隔几秒保存电脑画面、供 AI 检索的「Recall（回顾）」功能以默认开启状态推出，后因存储数据未加密一事被披露而遭到强烈批评。公司推迟发布，改为需用户自行开启的选择加入（opt-in）方式，并加入生物识别与双重加密，留下了「同一功能，默认值如何设定会决定信任」的教训。</p>' +
    '<p>随着智能体增多，企业之间也开始出现陌生的冲突。在美国，亚马逊（Amazon）以 AI 搜索初创公司 Perplexity 的购物智能体隐瞒身份接入客户账户为由提起诉讼，一审与二审判断相左，至今未有结论。把为执行用户差事而来的 AI 当作客人接待，还是当作不速之客拦在门外，社会共识才刚刚开始形成。</p>' +
    '<h2>为与 AI 共处的日常做准备的企业</h2>' +
    '<p>顾虑并不能让潮流倒退，海外已经在构建以智能体为前提的交易基础设施。万事达卡（Mastercard）于 2025 年推出了让 AI 智能体安全发起并完成支付的「Agent Pay（智能体支付）」，并提出以「可验证意图（Verifiable Intent）」作为业界共同标准——让智能体的每一项行动都基于消费者明确许可的范围。其考量是：只有事后能确认智能体代为决定了什么，发生纠纷时才能厘清责任。</p>' +
    '<p>韩国国内，平台与政府也在同步推进。Naver 以逐步扩大与外部伙伴的正式对接的方式设计自有智能体，Kakao 也在筹备 AI 助手「Kanana Space」的非公开测试。韩国个人信息保护委员会将于年内公布《智能体 AI 个人信息处理指南》，明年 3 月，包含 AI 开发个人信息利用特例的修订《个人信息保护法》将开始施行。</p>' +
    '<p>在等待制度完备的过程中，开发智能体的企业也有一些应当先具备的机制。电话、支付、消息这类会影响外部世界的行动，原则上应经过人的确认；通过推断获得的敏感信息，在保存或利用之前应告知用户。把 AI 接触了什么、发出了什么留成不可删除的记录，既是出事时厘清责任的依据，也是让用户安心的证据。</p>' +
    '<p>对于将迎来智能体这位客人的航空、流通、金融企业，还有另一道功课。需要事先确定识别人与智能体的体系、允许智能体拥有的权限范围，以及经由智能体的交易发生纠纷时的处理原则。一味封堵，反而可能从把条件比较交给 AI 的客户选项中彻底消失。</p>' +
    '<p>从 ESG 的视角重新审视围绕 Pickle 的争议，社会（S）与治理（G）的议题交叠在一起。除了用户本人，还要顾及在未获同意的情况下接到 AI 电话的餐厅员工等第三方的处境，这属于数字时代的人权保护；而 AI 依据谁的判断行动、结果由谁负责，则是企业治理必须回答的问题。</p>' +
    '<p>智能体时代的竞争力，并不只由「替人做多少事」决定。让人愿意把机票支付、家人的日程乃至日常记录都交出去的那份信任，左右着服务的扩张速度。权限拿得越多，越需要「克制使用权限」的设计——这一悖论也正源于此。</p>' +
    '<p>正如 Recall 所示，技术企业往往在被批评之后才改默认值，而事后修补的成本还包括发布延迟与重建品牌信任的时间。从一开始就把「隐私设计（Privacy by Design，即在规划阶段就将个人信息保护设为默认原则）」纳入产品，结果上是一条更快的路。</p>' +
    '<p>韩国市场移动支付与公共服务的数字化程度高、接受新服务的速度也快，具备成为智能体时代试验场的各项条件。Pickle 在几周内登顶应用排行榜，是需求已经到来的信号；随之而来的隐私争议，则告诉人们要把这份需求培育成可持续的市场还需要什么。</p>' +
    '<p>AI 代为一家人订下东京机票，已不再是遥远的未来。率先拿出「不以便利交换隐私，而是两者兼顾」的设计的企业，将写下下一个市场的标准；韩国企业当下所需的准备，也应从这一点出发。</p>' +
    '<p class="art-source">本文原载于 Must News（머스트뉴스）2026 年 11 月 26 日。原文： <a href="https://mustnews.co.kr/View.aspx?No=4330465" target="_blank" rel="noopener noreferrer">Must News · 2026. 11. 26</a></p>';

  var INSIGHTS = [
    {
      id: "ai-agent-privacy-by-design",
      cat: { ko: "ESG · AI 전략", en: "ESG · AI Strategy", zh: "ESG · AI 战略" },
      date: { ko: "2026. 11. 26", en: "26 Nov 2026", zh: "2026. 11. 26" },
      read: { ko: "약 7분", en: "7 min read", zh: "约 7 分钟" },
      title: {
        ko: "AI 비서 '피클'이 미리 보여준 에이전트 시대",
        en: "The Agent Era, Previewed by an AI Assistant Called Pickle",
        zh: "AI 助手「Pickle」预先展现的智能体时代"
      },
      excerpt: {
        ko: "검색하던 소비자에서 맡기는 소비자로. AI가 일상에 들어오면 무엇이 달라지나. 편리함의 크기만큼 커지는 책임과 프라이버시 중심 설계를 함께 짚는다.",
        en: "From consumers who search to consumers who delegate. What changes when AI moves into daily life, and why convenience and privacy have to be designed together.",
        zh: "从「搜索的消费者」到「托付的消费者」。AI 走进日常之后，什么会改变；以及便利与隐私为何必须一并设计。"
      },
      body: { ko: A4_KO, en: A4_EN, zh: A4_ZH }
    },
    {
      id: "population",
      cat: { ko: "인구 · 전략", en: "Demographics · Strategy", zh: "人口 · 战略" },
      date: { ko: "2026. 11. 23", en: "23 Nov 2026", zh: "2026. 11. 23" },
      read: { ko: "약 6분", en: "6 min read", zh: "约 6 分钟" },
      title: {
        ko: "인구 소멸과 2030년 기업 경영의 변곡점",
        en: "Population Decline and the 2030 Turning Point for Business",
        zh: "人口消失与 2030 年企业经营的拐点"
      },
      excerpt: {
        ko: "한국 경제의 완충 지대가 사라지는 2028~2030년. 마지막 베이비붐 세대의 은퇴가 기업의 비용 구조와 시장 구조를 동시에 바꿉니다.",
        en: "Between 2028 and 2030 the buffer of Korea's economy disappears. The retirement of the last baby-boom cohort changes cost structures and market structures at once.",
        zh: "韩国经济的缓冲带在 2028~2030 年消失。最后一批婴儿潮一代的退休，将同时改变企业的成本结构与市场结构。"
      },
      body: { ko: A1_KO, en: A1_EN, zh: A1_ZH }
    },
    {
      id: "aeo-citation-gap",
      cat: { ko: "AI 전략 · AEO", en: "AI Strategy · AEO", zh: "AI 战略 · AEO" },
      date: { ko: "2026. 11. 12", en: "12 Nov 2026", zh: "2026. 11. 12" },
      read: { ko: "약 8분", en: "8 min read", zh: "约 8 分钟" },
      title: {
        ko: "AI 검색 시대, 우리 회사가 사라지는 이유: 인용 격차를 돌파하는 AEO 4대 전략 프레임워크",
        en: "Why Your Company Disappears in AI Search: Four Frameworks for Breaking Through the Citation Gap",
        zh: "AI 搜索时代，您的公司为何消失：突破引用差距的 AEO 四大战略框架"
      },
      excerpt: {
        ko: "실제 경쟁력과 AI가 고객에게 전하는 경쟁력 사이의 '인용 격차'. 3C-AI·VRIO-D·STQP·E-E-A-T-C로 격차의 원인을 진단합니다.",
        en: "The 'citation gap' between real competitiveness and what AI tells customers. 3C-AI, VRIO-D, STQP and E-E-A-T-C diagnose where it comes from.",
        zh: "真实竞争力与 AI 传达给客户的竞争力之间存在引用差距。以 3C-AI、VRIO-D、STQP、E-E-A-T-C 诊断差距的成因。"
      },
      body: { ko: A2_KO, en: A2_EN, zh: A2_ZH }
    },
    {
      id: "vrio-d",
      cat: { ko: "AI 전략 · VRIO-D", en: "AI Strategy · VRIO-D", zh: "AI 战略 · VRIO-D" },
      date: { ko: "2026. 11. 11", en: "11 Nov 2026", zh: "2026. 11. 11" },
      read: { ko: "약 4분", en: "4 min read", zh: "约 4 分钟" },
      title: {
        ko: "30년 쌓은 실력이 왜 AI 답변에는 안 나올까",
        en: "Why Thirty Years of Craft Never Appears in an AI Answer",
        zh: "三十年积累的实力，为何不出现在 AI 的答案里"
      },
      excerpt: {
        ko: "네 질문을 모두 통과한 회사가 시장에서는 보이지 않습니다. VRIO-D는 다섯 번째 질문, '발견 가능성'을 묻습니다.",
        en: "A company can pass all four questions and still be invisible. VRIO-D adds a fifth: discoverability.",
        zh: "通过全部四个问题的企业，在市场上却看不见。VRIO-D 提出第五个问题：可发现性。"
      },
      body: { ko: A3_KO, en: A3_EN, zh: A3_ZH }
    }
  ];

  window.INSIGHTS = INSIGHTS;
  window.INSIGHT_AUTHOR = {
    ko: "<strong>심준규 박사</strong> · 인하대학교 경영학과 겸임교수 · (주)더솔루션컴퍼니비 대표이사 · 『AI 승자독식(Winner Takes the Answer)』 저자",
    en: "<strong>Jace Shim, Ph.D.</strong> · Adjunct Professor, Inha University · CEO, The Solution Company B · Author of <em>Winner Takes the Answer</em>",
    zh: "<strong>沈俊圭 (Jace Shim) 博士</strong> · 仁荷大学工商管理系兼任教授 · The Solution Company B 代表理事 · 《AI 赢家通吃（Winner Takes the Answer）》作者"
  };
})();
