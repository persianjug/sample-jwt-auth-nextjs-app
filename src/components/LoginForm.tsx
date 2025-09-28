import useLoginForm from "@/hooks/useLoginForm";
import { AppRoutes } from "@/constants/routes";
import AuthLink from "./ui/AuthLink";
import FormField from "./ui/FormField";
import PrimaryButton from "./ui/PrimaryButton";
import AuthFormWrapper from "./ui/AuthFormWrapper";

/**
 * @fileoverview ユーザー認証のためのログインフォームコンポーネント。
 * フォームの状態管理、バリデーション、送信ロジックは {@link useLoginForm} カスタムフックに委譲されています。
 * このコンポーネントは、フックから提供されたデータを元にUIをレンダリングすることに専念します。
 * @returns {JSX.Element} ログインフォームのUI要素
 */
const LoginForm = () => {
  // フォームの状態と処理関数
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
    isButtonDisabled,
  } = useLoginForm();

  return (
    <AuthFormWrapper title="ログイン" onSubmit={handleSubmit}>
      <FormField
        id="username"
        label="ユーザー名"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />

      <div className="mb-6">
        <FormField
          id="password"
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {error && (<p className="text-red-500 text-sm mb-4 text-center">{error}</p>)}

      <PrimaryButton
        text="ログイン"
        loadingText="処理中..."
        isLoading={isLoading}
        disabled={isButtonDisabled}
        color="indigo"
      />

      <AuthLink
        questionText="アカウントをお持ちでないですか？"
        linkText="新規登録はこちら"
        href={AppRoutes.SIGNUP}
      />
    </AuthFormWrapper>
  );
};

export default LoginForm;