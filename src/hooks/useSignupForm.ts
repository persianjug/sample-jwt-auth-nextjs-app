import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as authService from '@/services/authService';
import axios from "axios";
import { AppRoutes } from "@/constants/routes";
import { createLogger } from "@/utils/logger";
import { FORM_MESSAGES } from "@/constants/logMessages";
import { UI_FORM_MESSAGES } from "@/constants/uiMessages";

/**
 * @typedef {object} SignupFormHook
 * @property {string} username - ユーザー名の入力値
 * @property {(value: string) => void} setUsername - ユーザー名セッター
 * @property {string} password - パスワードの入力値
 * @property {(value: string) => void} setPassword - パスワードセッター
 * @property {string} confirmPassword - 確認用パスワードの入力値
 * @property {(value: string) => void} setConfirmPassword - 確認用パスワードセッター
 * @property {string} error - 表示するエラーメッセージ
 * @property {string} success - 成功メッセージ
 * @property {boolean} isLoading - 送信中かどうか
 * @property {() => void} handleSubmit - フォーム送信ロジックを実行する関数
 * @property {boolean} isButtonDisabled - ボタンを非活性化すべきかどうか
 */
interface SignupFormHook {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  error: string;
  success: string;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  isButtonDisabled: boolean;
}

/**
 * ユーザー登録フォームの状態管理、バリデーション、および送信ロジックを提供するカスタムフック
 * 入力値、パスワードの一致チェック、ローディング状態、エラー/成功メッセージを管理し、
 * 成功時には自動でログインページへリダイレクトします。
 * @returns {SignupFormHook} フォームの状態と処理関数を含むオブジェクト
 */
const useSignupForm = (): SignupFormHook => {
  // ユーザー名入力フィールドの値
  const [username, setUsername] = useState("");
  // パスワード入力フィールドの値
  const [password, setPassword] = useState("");
  // 確認用パスワード入力フィールドの値
  const [confirmPassword, setConfirmPassword] = useState("");
  // ユーザーに表示するエラーメッセージ/
  const [error, setError] = useState("");
  // ユーザーに表示する成功メッセージ */
  const [success, setSuccess] = useState("");
  // APIリクエスト中を示すフラグ */
  const [isLoading, setIsLoading] = useState(false);
  // Next.jsのルーターインスタンス */
  const router = useRouter();
  // ロガーインスタンスを作成
  const signupLogger = createLogger("SIGNUP_FORM");

  /**
   * フォーム送信イベントを処理し、ユーザー登録APIを呼び出します。
   * 1. パスワードの一致チェックを行う。
   * 2. 認証サービス層を通じてAPIを呼び出す。
   * 3. 成功時、メッセージを表示後にログインページへリダイレクトする。
   * 4. 失敗時、エラーメッセージを抽出して表示する。
   *  @param {React.FormEvent} e - フォームイベントオブジェクト。
   */
  const handleSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 処理開始ログ (DEBUG)
    const funcName = "handleSubmit";
    signupLogger.debug(FORM_MESSAGES.SUBMIT_START, null, funcName);

    if (password !== confirmPassword) {
      setError(UI_FORM_MESSAGES.SIGNUP_PASSWORD_MISMATCH);
      signupLogger.info(FORM_MESSAGES.PASSWORD_MISMATCH, null, funcName);
      return;
    }

    setIsLoading(true);

    try {
      await authService.signup({ username, password });
      setSuccess(UI_FORM_MESSAGES.SIGNUP_SUCCESS);
      signupLogger.info(FORM_MESSAGES.SIGNUP_API_SUCCESS, { username }, funcName);

      // 成功メッセージ表示後、ログインページへリダイレクト
      setTimeout(() => {
        router.push(AppRoutes.LOGIN);
      }, 1500);
    } catch (err) {
      // 1. Axiosエラーであるかチェック
      let errorMessage = UI_FORM_MESSAGES.SIGNUP_FAILED_GENERIC;
      if (axios.isAxiosError(err) && err.response?.data) {
        const responseData = err.response.data;

        // 2. レスポンスデータが文字列であれば、それをそのままメッセージとする
        if (typeof responseData === "string") {
          errorMessage = responseData;
        }
        // 3. レスポンスデータがオブジェクトでも、適切なエラーメッセージフィールドがあれば利用できるが、
        //    ここでは「文字列でなければ汎用メッセージ」という元のロジックを維持
      }
      setError(errorMessage);
      signupLogger.error(
        FORM_MESSAGES.SIGNUP_API_ERROR,
        { error: err, extractedMessage: errorMessage },
        funcName);
    } finally {
      setIsLoading(false);
      signupLogger.debug(FORM_MESSAGES.SUBMIT_END, null, funcName);
    }
  }, [username, password, confirmPassword, router]);

  /**
   * @type {boolean} 送信ボタンの非活性状態を計算するメモ化された値。
   * ローディング中、または必須フィールドが一つでも空の場合は非活性化されます。
   */
  const isButtonDisabled = useMemo(() =>
    isLoading || !username || !password || !confirmPassword,
    [isLoading, username, password, confirmPassword]
  );

  return {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    isLoading,
    handleSubmit,
    isButtonDisabled,
  };
};

export default useSignupForm;