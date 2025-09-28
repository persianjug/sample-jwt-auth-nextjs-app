import { useState, useEffect } from "react";
import * as authService from "@/services/authService";
import { UserInfo } from "@/types/auth";

/**
 * @typedef {object} FetchResult
 * @property {UserInfo | null} data - 取得されたユーザー情報。
 * @property {boolean} loading - データ取得中かどうか。
 * @property {Error | null} error - 取得中に発生したエラー。
 */
interface FetchResult {
  data: UserInfo | null;
  loading: boolean;
  error: Error | null;
}

/**
 * 認証済みユーザー情報を取得し、その状態を管理するカスタムフック。
 * @returns {FetchResult} ユーザーデータ、ローディング状態、エラーを含むオブジェクト。
 */
const useFetchUserInfo = (): FetchResult => {
  const [data, setData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const userInfo = await authService.fetchUserInfo();
        setData(userInfo);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchUserInfo;