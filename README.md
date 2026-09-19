# 카카오 로그인 실습

백엔드 없이, 프론트에서 인가 코드 → 액세스 토큰 교환 → 사용자 정보 조회까지 전부 직접 해보는 실습용 프로젝트입니다.

> ⚠️ 오늘 실습은 **학습 목적의 예외**입니다. 실제 서비스에서는 `client_secret`을 사용하는 토큰 교환은 반드시 백엔드가 담당해야 합니다. (자세한 이유는 슬라이드 참고)

## 1. 카카오 개발자 콘솔 설정

1. [카카오 개발자 콘솔](https://developers.kakao.com)에서 애플리케이션 추가 → **[앱] → [플랫폼 키] → REST API 키** 확인
2. [카카오 로그인] → **활성화 설정 ON** (기본값 OFF)
3. 같은 **REST API 키** 화면 안에서 Redirect URI에 `http://localhost:5173/oauth/callback` 등록
4. 같은 화면에서 **Client Secret "사용 안 함"** 확인 (오늘 실습이 성립하는 전제 조건)
5. 동의항목에서 닉네임, 프로필 사진 등 필요한 항목 체크

> ⚠️ Redirect URI와 Client Secret은 예전엔 [카카오 로그인] 메뉴에 있었는데, 콘솔 개편으로 REST API 키 화면 쪽으로 옮겨갔어요. [카카오 로그인] 메뉴에서 안 보인다고 당황하지 마세요.

## 2. 프로젝트 설정

```bash
npm install
cp .env.example .env
# .env 파일을 열어 발급받은 REST API 키를 넣어주세요
npm run dev
```

## 3. 확인

브라우저에서 `http://localhost:5173/login` 접속 → 로그인 버튼 클릭 → 실제 카카오 로그인 화면 → 로그인 성공 시 `/home`으로 이동하며 닉네임과 프로필 사진이 보이면 성공입니다.

## 구조

```
src/
├─ lib/
│  ├─ auth.js   토큰/프로필 저장 (Step 5)
│  └─ kakao.js  카카오 API 호출 (Step 1, 3, 4)
├─ components/
│  └─ PrivateRoute.jsx  라우트 가드 (Step 6)
├─ pages/
│  ├─ LoginPage.jsx     로그인 버튼 (Step 1)
│  ├─ CallbackPage.jsx  콜백 처리 (Step 2, 3, 4, 5)
│  └─ HomePage.jsx      로그인 후 페이지
└─ App.jsx
```
