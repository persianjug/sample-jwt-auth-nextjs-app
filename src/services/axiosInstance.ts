import axios from "axios";
import { getJwtToken, setJwtToken } from "@/utils/jwtMemoryStorage";
import { createAuthRefreshInterceptor } from "@/utils/axiosRefreshQueue";
import { ApiConfig } from "@/constants/apiConfig";

/**
 * @type {string} バックエンドAPIのベースURL。環境変数から取得します。
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || ApiConfig.LOCAL_BASE_URL_FALLBACK;

/**
 * カスタム設定を持つAxiosインスタンス。
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: ApiConfig.WITH_CREDENTIALS,
});

/**
 * リクエストインターセプター: メモリから取得したJWTをAuthorizationヘッダーに付加します。
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token && config.headers) {
      config.headers[ApiConfig.AUTH_HEADER_KEY] = `${ApiConfig.AUTH_BEARER_PREFIX}${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * レスポンスインターセプター: 401エラーを捕捉し、トークンの自動リフレッシュを試行します。
 * createAuthRefreshInterceptor関数を使ってロジックを適用。
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  createAuthRefreshInterceptor(axiosInstance, setJwtToken)
);

export default axiosInstance;