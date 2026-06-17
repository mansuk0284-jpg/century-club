# 🎾 Century Tennis Club (백세 테니스 클럽)

> "Healthy & joyful tennis, for a hundred years" — 백세까지 건강하고 즐겁게

테니스 동호회 경기 편성 · 결과 기록 · 랭킹 · 선수 분석 PWA 앱.

## 설치 방법 (별도 설치파일 없음 — PWA)
이 앱은 브라우저에서 "홈 화면에 추가"로 설치합니다.

### 1) 웹에 올리기 (한 번만)
1. GitHub 로그인 → New repository → 이름 `century-tennis` → Public → Create
2. "uploading an existing file" → 이 폴더의 파일 5개 모두 업로드
   - index.html, manifest.json, sw.js, icon-192.svg, icon-512.svg
3. Commit → Settings → Pages → Branch: main → Save
4. 약 1분 후 `https://[내아이디].github.io/century-tennis` 접속

### 2) 휴대폰에 앱으로 설치
- iPhone: Safari로 위 주소 접속 → 공유( ⬆️ ) → "홈 화면에 추가"
- Android: Chrome으로 접속 → 메뉴(⋮) → "앱 설치"

설치하면 홈 화면에 엠블럼 아이콘이 생기고, 전체화면 앱처럼 실행됩니다.

## 기능
- 경기 편성 (코트 종류·수·시간 기반 자동 대진, 중복 파트너·상대 최소화)
- 결과 입력 (코트 그림 위 점수 입력, 승/무/패)
- 기록 (일자별 펼침)
- 랭킹 (승수→게임 다승→득실 순, 무승부 반영)
- 선수 분석 (파트너·상대 승률)
- Firebase 연동 시 회원 간 데이터 공유
