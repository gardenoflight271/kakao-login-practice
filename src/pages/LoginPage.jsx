import { useState } from "react";
import { getKakaoAuthorizeUrl } from "../lib/kakao";

import kakaoKr from "../assets/kakao_login_kr_medium.png";
import kakaoEn from "../assets/kakao_login_en_medium.png";

function LoginPage() {
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "ko"
    );

    const isKorean = language === "ko";

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const handleKakaoLogin = () => {
        window.location.href = getKakaoAuthorizeUrl();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-10 max-sm:px-5">
                <h1 className="text-lg font-bold text-gray-900">
                    Kakao Login
                </h1>

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
                <div className="w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white px-10 py-12 text-center shadow-sm max-sm:px-6">
                    {/* Icon */}
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEE500] text-2xl">
                        💬
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">
                        {isKorean ? "로그인" : "Login"}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        {isKorean ? (
                            <>
                                카카오 계정으로 간편하게
                                <br />
                                시작해보세요.
                            </>
                        ) : (
                            <>
                                Sign in easily with your
                                <br />
                                Kakao account.
                            </>
                        )}
                    </p>

                    {/* Kakao Login */}
                    <button
                        onClick={handleKakaoLogin}
                        aria-label={isKorean ? "카카오 로그인" : "Login with Kakao"}
                        className="mt-8 w-full cursor-pointer border-0 bg-transparent p-0"
                    >
                        <img
                            src={isKorean ? kakaoKr : kakaoEn}
                            alt={isKorean ? "카카오 로그인" : "Login with Kakao"}
                            className="mx-auto block w-full max-w-[300px]"
                        />
                    </button>

                    <p className="mt-5 text-xs text-gray-400">
                        {isKorean
                            ? "카카오 계정을 통해 안전하게 로그인합니다."
                            : "Securely sign in with your Kakao account."}
                    </p>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;