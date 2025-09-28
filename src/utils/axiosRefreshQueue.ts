import { HttpStatus } from "@/constants/httpStatus";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

// --- キュー管理の状態 ---
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig
}[] = [];

/**
 * リフレッシュ完了後、待機中のキューを処理し、リクエストを再試行または拒否します。
 * @param {AxiosInstance} axiosInstance - Axiosインスタンス。
 * @param {AxiosError | null} error - リフレッシュ中に発生したエラー
 * @param {string | null} [token=null] - 新しく取得されたJWT
 */
const processQueue = (
  axiosInstance: AxiosInstance,
  error: AxiosError | null,
  token: string | null = null
): void => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (prom.config.headers) {
      prom.config.headers["Authorization"] = `Bearer ${token}`;
      // 新しいトークンで元のリクエストを再試行
      axiosInstance(prom.config).then(prom.resolve).catch(prom.reject);
    } else {
      prom.reject(new Error("Failed to process request queue."));
    }
  });
  failedQueue = [];
};


/**
 * 401エラーを捕捉し、トークンの自動リフレッシュ処理を適用するレスポンスインターセプター関数を返します。
 * @param {AxiosInstance} axiosInstance - Axiosインスタンス
 * @param {(token: string | null) => void} setJwtToken - JWTをメモリに設定する関数
 * @returns {(error: AxiosError) => Promise<any>} Axiosレスポンスインターセプターのコールバック関数
 */
export const createAuthRefreshInterceptor = (
  axiosInstance: AxiosInstance,
  setJwtToken: (token: string | null) => void
) => {
  return async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === HttpStatus.UNAUTHORIZED &&
      originalRequest &&
      originalRequest.url !== "/auth/refreshToken" &&
      !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        // リフレッシュAPIを呼び出し
        const refreshResponse = await axiosInstance.post("/auth/refreshToken", {});
        const newJwtToken = refreshResponse.data.jwtToken;

        setJwtToken(newJwtToken); // 1. 新しいJWTをメモリに保存
        processQueue(axiosInstance, null, newJwtToken); // 2. 待機キューを処理

        // 3. 元のリクエストを再試行
        originalRequest.headers.Authorization = `Bearer ${newJwtToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        setJwtToken(null);
        processQueue(axiosInstance, refreshError as AxiosError);
        // ログインページへリダイレクト
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  };
};