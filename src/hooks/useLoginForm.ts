import { useState, useCallback, useMemo } from "react";
import useAuth from "@/hooks/useAuth";
import { createLogger } from "@/utils/logger";
import { FORM_MESSAGES } from "@/constants/logMessages";
import { UI_FORM_MESSAGES } from "@/constants/uiMessages";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/routes";
import { withMinDuration } from "@/utils/withMinDuration";
import { UX_CONFIG } from "@/constants/uxConfig";

/**
 * @typedef {object} LoginFormHook
 * @property {string} username - ユーザー名の入力値。
 * @property {(value: string) => void} setUsername - ユーザー名を設定する関数。
 * @property {string} password - パスワードの入力値。
 * @property {(value: string) => void} setPassword - パスワードを設定する関数。
 * @property {string} error - 表示するエラーメッセージ。
 * @property {boolean} isLoading - 送信中かどうか。
 * @property {() => void} handleSubmit - フォーム送信ロジックを実行する関数。
 * @property {boolean} isButtonDisabled - ボタンを非活性化すべきかどうか。
 */
interface LoginFormHook {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  isButtonDisabled: boolean;
}

/**
 * ログインフォームの状態管理と送信ロジックを提供するカスタムフック。
 * フォームの入力値、エラー、ローディング状態を管理し、useAuthのログイン機能をラップします。
 * @returns {LoginFormHook} フォームの状態と処理関数を含むオブジェクト
 */
const useLoginForm = (): LoginFormHook => {
  // ユーザー名入力フィールドの値/
  const [username, setUsername] = useState("");
  // パスワード入力フィールドの値
  const [password, setPassword] = useState("");
  // ユーザーに表示するエラーメッセージ
  const [error, setError] = useState("");
  // APIリクエスト中を示すフラグ
  const [isLoading, setIsLoading] = useState(false);
  // 認証フックからログイン関数を取得
  const { login } = useAuth();
  // ロガーインスタンスを作成
  const formLogger = createLogger("FORM");
  // Next.jsのルーターインスタンス */
  const router = useRouter();

  /**
   * フォーム送信イベントを処理し、認証APIを呼び出します。
   * 成功した場合、useAuthフックがリダイレクトを処理します。
   * @param {React.FormEvent} e - フォームイベントオブジェクト
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 処理開始ログ
    const funcName = "handleSubmit";
    formLogger.debug(FORM_MESSAGES.SUBMIT_START, null, funcName);

    if (!username || !password) {
      setError(UI_FORM_MESSAGES.LOGIN_MISSING_FIELDS);
      formLogger.info(FORM_MESSAGES.VALIDATION_EMPTY, null, funcName);
      return;
    }

    // 処理開始時刻を記録し、ローディングを開始
    setIsLoading(true);

    try {
      await withMinDuration(
        () => login(username, password), // 実行したい非同期関数
        UX_CONFIG.MIN_LOADING_DURATION_MS, // 最小待機時間
      );

      // 処理が成功し、待機が完了したため、ローディングを解除しリダイレクト
      setIsLoading(false);
      formLogger.debug(FORM_MESSAGES.LOGIN_SUCESS, null, funcName);
      router.push(AppRoutes.DASHBOARD);
    } catch (err) {
      setError(UI_FORM_MESSAGES.LOGIN_FAILED_GENERIC);
      formLogger.error(FORM_MESSAGES.LOGIN_FAILED, err, funcName);
      setIsLoading(false);
    } finally {
      formLogger.debug(FORM_MESSAGES.SUBMIT_END, null, funcName);
    }
  }, [login, username, password]);

  /**
   * @type {boolean} 送信ボタンの非活性状態を計算するメモ化された値。
   * ローディング中、またはユーザー名/パスワードが空の場合は非活性化されます。
   */
  const isButtonDisabled = useMemo(() => {
    return isLoading || !username || !password;
  }, [isLoading, username, password]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
    isButtonDisabled,
  };
};

export default useLoginForm;