import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getJwtToken, setJwtToken } from "@/utils/jwtMemoryStorage";
import * as authService from "@/services/authService";
import { AppRoutes } from "@/constants/routes";
import { createLogger } from "@/utils/logger";
import { AUTH_MESSAGES } from "@/constants/logMessages";

/**
 * 認証状態、ログイン、ログアウトの処理を提供するカスタムフック。
 * アクセストークンはメモリ（グローバル変数）で管理し、リフレッシュトークンはHttpOnly Cookieに依存します。
 * @returns {object} 認証フックの機能セット
 * @property {boolean} isAuthenticated - 現在認証されているかどうか。
 * @property {(username: string, password: string) => Promise<AuthData>} login - ログイン処理を実行する関数。
 * @property {() => Promise<void>} logout - ログアウト処理を実行する関数。
 */
const useAuth = () => {
  // APIリクエスト中を示すフラグ */
  const [isLoading, setIsLoading] = useState(true);
  // 認証状態の取得
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Next.jsのルーターインスタンス */
  const router = useRouter();
  // ロガーインスタンスを作成
  const authLogger = createLogger("AUTH");

  // アプリケーション起動時の初期化チェック
  useEffect(() => {
    const checkInitialAuth = () => {
      authLogger.debug(AUTH_MESSAGES.INITIAL_CHECK_START, null, "checkInitialAuth")
      try {
        if (getJwtToken()) {
          setIsAuthenticated(true);
          authLogger.info(AUTH_MESSAGES.JWT_FOUND, null, "checkInitialAuth");
        } else {
          authLogger.info(AUTH_MESSAGES.JWT_NOT_FOUND, null, "checkInitialAuth");
        }
      } finally {
        setIsLoading(false);
        authLogger.debug(AUTH_MESSAGES.CHECK_COMPLETED, null, "checkInitialAuth");
      }
    };
    checkInitialAuth();
  }, []);

  /**
   * ログイン処理を実行し、トークンをメモリに保存します。
   * @param {string} username - ユーザー名。
   * @param {string} password - パスワード。
   * @returns {Promise<AuthData>} サーバーからの認証データ（JWTなど）。
   */
  const login = useCallback(async (username: string, password: string) => {
    try {
      // サーバーからjwtTokenとrefreshTokenを取得
      const { jwtToken, refreshToken } = await authService.login({ username, password });

      // 1. アクセストークンをメモリに保存
      setJwtToken(jwtToken);

      // 2. RefreshTokenはサーバー側でHttpOnly Cookieに自動で設定されることを期待
      setIsAuthenticated(true);
      // router.push(AppRoutes.DASHBOARD);
      authLogger.info(AUTH_MESSAGES.LOGIN_SUCCESS, null, "login");
      return { jwtToken, refreshToken }
    } catch (error) {
      authLogger.error(AUTH_MESSAGES.LOGIN_ERROR, error, "login");
      setIsAuthenticated(false);
      throw error;
    }
  }, [router]);

  /**
   * ログアウト処理を実行し、サーバーにリフレッシュトークンの破棄を依頼します。
   * クライアント側のJWTもメモリから削除します。
   * @returns {Promise<void>}
   */
  const logout = useCallback(async () => {
    try {
      const message = await authService.logout();
      authLogger.info(AUTH_MESSAGES.LOGOUT_API_SUCCESS, message, "logout");
    } catch (error) {
      authLogger.info(AUTH_MESSAGES.LOGOUT_API_ERROR, error, "logout");
    } finally {
      setJwtToken(null); // クライアント側のトークンをメモリから削除
      setIsAuthenticated(false);
      router.push(AppRoutes.LOGIN);
    }
  }, [router]);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

export default useAuth;
