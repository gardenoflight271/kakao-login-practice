import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { exchangeToken, fetchProfile } from "../lib/kakao";
import { saveSession } from "../lib/auth";

function CallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error || !code) {
            navigate("/login", { replace: true });
            return;
        }

        (async () => {
            try {
                const accessToken = await exchangeToken(code);
                const profile = await fetchProfile(accessToken);
                saveSession(accessToken, profile);
                navigate("/home", { replace: true });
            } catch (err) {
                console.error(err);
                setErrorMessage("로그인 처리 중 문제가 발생했습니다. 콘솔 설정(Redirect URI, Client Secret)을 확인해주세요.");
            }
        })();
    }, []);

    return (
        <p style={{ textAlign: "center", marginTop: 80 }}>
            {errorMessage || "로그인 처리 중..."}
        </p>
    );
}
export default CallbackPage;