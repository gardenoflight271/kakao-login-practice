import { useNavigate } from "react-router-dom";
import { getProfile, clearSession } from "../lib/auth";

function HomePage() {
  const navigate = useNavigate();
  const profile = getProfile();

  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ maxWidth: 360, margin: "80px auto", textAlign: "center" }}>
      {profile?.profileImageUrl && (
        <img
          src={profile.profileImageUrl}
          alt="프로필"
          style={{ width: 72, height: 72, borderRadius: "50%", marginBottom: 12 }}
        />
      )}
      <h2>🏠 {profile?.nickname ?? "회원"}님, 환영합니다!</h2>
      <p style={{ color: "#666" }}>카카오 로그인으로 인증된 페이지입니다.</p>
      <button onClick={handleLogout} style={{ padding: 12, width: "100%", marginTop: 16 }}>
        로그아웃
      </button>
    </div>
  );
}

export default HomePage;
