import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, clearSession } from "../lib/auth";

function HomePage() {
  const navigate = useNavigate();
  const profile = getProfile();

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ko"
  );

  const isKorean = language === "ko";

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-10 max-sm:px-5">
        <div className="flex items-center gap-2">
          {/* 노란색 포인트 */}
          <div className="h-4 w-4 rounded bg-[#FEE500]" />

          <h1 className="text-lg font-bold text-gray-900">
            Kakao Login
          </h1>
        </div>

        {/* Language */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => changeLanguage("ko")}
            className={
              isKorean
                ? "font-semibold text-gray-900"
                : "text-gray-400 hover:text-gray-700"
            }
          >
            한국어
          </button>

          <span className="text-gray-300">|</span>

          <button
            onClick={() => changeLanguage("en")}
            className={
              !isKorean
                ? "font-semibold text-gray-900"
                : "text-gray-400 hover:text-gray-700"
            }
          >
            English
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-10">
        <section className="w-full max-w-[480px] rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          {/* Profile */}
          <div className="flex items-center gap-5 border-b border-gray-100 pb-7">

            {/* Profile Image */}
            <div className="rounded-full bg-[#FEE500] p-1">
              {profile?.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={isKorean ? "프로필 사진" : "Profile"}
                  className="h-20 w-20 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-3xl">
                  👤
                </div>
              )}
            </div>

            {/* Name */}
            <div className="min-w-0 text-left">
              <span className="inline-block rounded-full bg-[#FEE500] px-3 py-1 text-[11px] font-semibold text-gray-800">
                {isKorean ? "카카오 계정" : "Kakao Account"}
              </span>

              <h2 className="mt-2 truncate text-xl font-bold text-gray-900">
                {profile?.nickname ?? (isKorean ? "회원" : "User")}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {isKorean
                  ? "카카오 계정으로 로그인 중"
                  : "Signed in with Kakao"}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="py-7">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              {isKorean ? "계정 정보" : "Account Information"}
            </h3>

            {/* 노란색이 아주 살짝 들어간 정보 박스 */}
            <div className="rounded-xl bg-[#FFFBE6] px-4 py-2">
              <div className="flex items-center justify-between border-b border-yellow-100 py-3">
                <span className="text-sm text-gray-500">
                  {isKorean ? "닉네임" : "Nickname"}
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {profile?.nickname ?? "-"}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">
                  {isKorean ? "로그인 상태" : "Login Status"}
                </span>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {isKorean ? "로그인됨" : "Connected"}
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            {isKorean ? "로그아웃" : "Logout"}
          </button>
        </section>
      </main>
    </div>
  );
}

export default HomePage;