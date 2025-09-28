import useSignupForm from "@/hooks/useSignupForm";
import { AppRoutes } from "@/constants/routes";
import AuthLink from "./ui/AuthLink";
import FormField from "./ui/FormField";
import PrimaryButton from "./ui/PrimaryButton";
import AuthFormWrapper from "./ui/AuthFormWrapper";

/**
 * @fileoverview 新規ユーザー登録のためのフォームコンポーネント。
 * フォームの入力状態、バリデーション、送信ロジックは {@link useSignupForm} カスタムフックに委譲されています。
 * このコンポーネントは、フックから提供された状態を元にUIをレンダリングすることに専念します。
 * @returns {JSX.Element} ユーザー登録フォームのUI要素。
 */
const SignupForm = () => {
  // フォームの状態と処理関数をカスタムフックから取得 */
  const {
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
  } = useSignupForm();

  return (
    <AuthFormWrapper title="新規ユーザー登録" onSubmit={handleSubmit}>

      <FormField
        id="username"
        label="ユーザー名"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />

      <FormField
        id="password"
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />

      <div className="mb-6">
        <FormField
          id="confirmPassword"
          label="パスワード (確認)"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

      <PrimaryButton
        text="アカウントを作成"
        loadingText="登録中..."
        isLoading={isLoading}
        disabled={isButtonDisabled}
        color="green"
      />

      <AuthLink
        questionText="アカウントをすでにお持ちですか？"
        linkText="ログインはこちら"
        href={AppRoutes.LOGIN}
      />
    </AuthFormWrapper>
  );
};

export default SignupForm;