import axios from "axios";

export const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
export const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export function getKakaoAuthorizeUrl() {
  return (
    `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${REST_API_KEY}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code`
  );
}

export async function exchangeToken(code) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  });

  const res = await axios.post("https://kauth.kakao.com/oauth/token", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return res.data.access_token;
}

export async function fetchProfile(accessToken) {
  const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { nickname, profile_image_url } = res.data.kakao_account.profile;
  return { nickname, profileImageUrl: profile_image_url };
}
