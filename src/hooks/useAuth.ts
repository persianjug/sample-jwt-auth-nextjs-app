import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getJwtToken, setJwtToken } from "@/utils/jwtMemoryStorage";
import * as authService from "@/services/authService";
import { AppRoutes } from "@/constants/routes";

/**
 * 認証状態、ログイン、ログアウトの処理を提供するカスタムフック。
 * アクセストークンはメモリ（グローバル変数）で管理し、リフレッシュトークンはHttpOnly Cookieに依存します。
 * @returns {object} 認証フックの機能セット
 * @property {boolean} isAuthenticated - 現在認証されているかどうか。
 * @property {(username: string, password: string) => Promise<AuthData>} login - ログイン処理を実行する関数。
 * @property {() => Promise<void>} logout - ログアウト処理を実行する関数。
 */
const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // アプリケーション起動時の初期化チェック
  useEffect(() => {
    const checkInitialAuth = () => {
      try {
        if (getJwtToken()) {
          setIsAuthenticated(true);
        }
      } finally {
        setIsLoading(false);
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
      // setRefreshToken(refreshToken);

      // 2. RefreshTokenはサーバー側でHttpOnly Cookieに自動で設定されることを期待
      setIsAuthenticated(true);
      router.push(AppRoutes.DASHBOARD);
      return { jwtToken, refreshToken }
    } catch (error) {
      console.error("Login failed:", error);
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
      console.log("ログアウト成功メッセージ:", message);
    } catch (error) {
      console.error("ログアウト中にエラー:", error);
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
