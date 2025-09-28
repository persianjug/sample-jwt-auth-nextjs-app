"use client";

import useAuth from "@/hooks/useAuth";
import useGuestGuard from "@/hooks/useGuestGuard";
import SignupForm from "@/components/SignupForm";

/**
 * @fileoverview 新規登録ページコンポーネント。
 * 認証済みユーザーのアクセス制御（ダッシュボードへのリダイレクト）は {@link useGuestGuard} フックに委譲されます。
 * @returns {JSX.Element | null} サインアップフォームまたはリダイレクト処理
 */
const SignupPage = () => {
  // 認証済みチェックフックを呼び出し、リダイレクトロジックを起動
  useGuestGuard();

  // 認証状態をuseAuthから直接取得
  const { isAuthenticated } = useAuth();

  // isAuthenticatedがtrueの間は、フック内でリダイレクト処理が行われるため、
  // ここではnullを返して描画をブロックし、フックの処理完了を待機します。
  if (isAuthenticated) {
    return null;
  }

  // 認証されていない場合のみ、サインアップフォームを表示
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignupForm />
    </div>
  );
};

export default SignupPage;