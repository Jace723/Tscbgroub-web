# tscbgroup.com — 모던 브리티시 신규 웹사이트

(주)더솔루션컴퍼니비 정적 웹사이트. 빌드 도구 없이 그대로 배포·열람할 수 있는 순수 HTML5 + CSS3 + Vanilla JS 구조입니다.

## 파일 구조

```
work/tscbgroup-web/
├─ index.html            HOME        — 히어로, 듀얼 코어(ESG·AI), AA1000AS 자격, 대표·저서 9종, INSIGHT 하이라이트
├─ about.html            ABOUT B     — 철학, WHY B 4대 강점, WHO IS B(약력·학력·연구·강의), 저서 전체 목록
├─ what-we-do.html       WHAT WE DO  — 서비스 3개 영역, 진행 방식 3단계, 산업 모듈 10개
├─ insight-b.html        INSIGHT B   — 대표 칼럼 3편 + 페이지 내 아티클 뷰어(모달)
├─ contact.html          CONTACT     — 문의 폼(FormSubmit 전송 + mailto 병행), 본사 정보
├─ robots.txt
├─ sitemap.xml
├─ assets/
│  ├─ css/style.css      디자인 시스템 전체(토큰·레이아웃·컴포넌트·반응형)
│  ├─ js/i18n.js         KR|EN 사전(dict) + 즉시 전환 엔진 + localStorage 유지
│  ├─ js/main.js         헤더 스크롤·모바일 드로어·스크롤 리빌·아티클 뷰어·문의 폼 전송
│  ├─ js/insights.js     칼럼 3편의 본문(KR/EN) 데이터
│  └─ images/
│     ├─ hero-london.jpg      히어로(카나리 워프 야경, downloads/tscb-renewal/hero-london-modern.jpg를 압축 복사)
│     ├─ about-office.jpg     ABOUT B 오피스 이미지(생성)
│     └─ ai-esg-strategy.jpg  AI·ESG 전략 이미지(생성)
└─ tools/validate.py     정적 검증 스크립트
```

## 다국어 (KR | EN)

- 모든 문구는 `data-i18n="key"` 속성으로 표시되고, 실제 문구는 `assets/js/i18n.js`의 `DICT`에 `{ ko, en }`로 들어 있습니다.
- 헤더·드로어·푸터의 `KR | EN` 버튼이 `localStorage["tscb-lang"]`에 선택 언어를 저장하고, 다음 페이지에서도 유지됩니다.
- 문구를 고치거나 추가할 때는 ① 해당 HTML의 `data-i18n` 값을 ② `DICT`의 키와 함께 수정하면 됩니다. 키가 없으면 검증 스크립트가 오류로 알려줍니다.
- 지원 속성: `data-i18n`(텍스트), `data-i18n-html`(마크업 포함 텍스트), `data-i18n-ph`(placeholder), `data-i18n-aria`(aria-label), `data-i18n-alt`(이미지 alt).
- 칼럼 본문은 `assets/js/insights.js`에 `body.ko` / `body.en`으로 들어 있으며, 모달을 열어 둔 상태에서 언어를 바꾸면 본문도 즉시 교체됩니다.

## 문의 폼 (info@tscbgroup.com)

두 개의 경로를 함께 제공합니다.

1. **폼 전송** — `action="https://formsubmit.co/info@tscbgroup.com"` (서버·API 키 불필요). JS가 있으면 `https://formsubmit.co/ajax/info@tscbgroup.com`으로 `fetch` 전송 후 페이지 안에서 접수 확인 UI를 보여 주고, JS가 없으면 일반 POST로 전송됩니다.
   - **최초 1회 활성화 필요**: 첫 전송 시 FormSubmit이 `info@tscbgroup.com`으로 확인 메일을 보냅니다. 그 메일의 확인 링크를 눌러야 이후 문의가 실제로 도착합니다. (활성화 전 문의는 전달되지 않습니다.)
   - 숨김 필드: `_subject`, `_template=table`, `_captcha=false`, `_honey`(스팸 방지), `_language`. 제출자 이메일은 `_replyto`로 넘겨 메일에서 바로 회신할 수 있습니다.
2. **메일로 직접 보내기** — 폼에 입력한 값으로 `mailto:info@tscbgroup.com` 링크를 만들어 줍니다(제목·본문 자동 구성). FormSubmit이 차단되거나 네트워크 전송이 실패한 환경에서도 같은 내용을 보낼 수 있습니다.

## 검증

```bash
cd work/tscbgroup-web
python3 tools/validate.py
```

검사 항목: HTML 태그 균형, 중복 id, 깨진 상대 경로(`href/src/action`), `data-i18n*` 키 누락, CSS `url()` 대상 존재, CSS·JS 괄호 균형. 현재 결과는 `errors: 0  warnings: 0`입니다. JS 문법은 esprima로 별도 파싱 확인했습니다.

## 배포

- 폴더 전체를 정적 호스팅(Wix 외 Netlify·Vercel·GitHub Pages·S3 등) 루트에 올리면 그대로 동작합니다. `index.html`이 루트에 있어야 합니다.
- 현재 사이트가 Wix로 운영 중이라면, 이 폴더는 독립 정적 사이트이므로 도메인 연결 방식(서브도메인 테스트 → 본 도메인 전환)을 정한 뒤 업로드하세요.
- 폰트는 Google Fonts(Inter, Noto Sans KR)와 Pretendard CDN을 불러옵니다. 오프라인 환경에서는 시스템 폰트로 대체됩니다.

## 콘텐츠 출처

- 회사 소개·WHY B·연혁 문구: 기존 tscbgroup.com/about 및 홈페이지 원문을 현대적으로 정리.
- 칼럼 3편: 「인구 소멸과 2030년 기업 경영의 변곡점」(`work/articles/yt_col1_wix.md`), 「AI 검색 시대, 우리 회사가 사라지는 이유」(tscbgroup.com AEO 실전 가이드), 「30년 쌓은 실력이 왜 AI 답변에는 안 나올까」(VRIO-D 모형). 영문은 동일 내용의 번역입니다.
- 저서·자격 정보: License No. 001-039, ACSAP, 저서 9종 서지.
