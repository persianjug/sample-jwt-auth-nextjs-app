"use client";

import useGuestGuard from "@/hooks/useGuestGuard";
import useAuth from "@/hooks/useAuth";
import LoginForm from "@/components/LoginForm";

/**
 * @fileoverview ログインページコンポーネント。
 * 認証済みユーザーのアクセス制御は {@link useGuestGuard} フックに委譲されます。
 * @returns {JSX.Element | null} ログインフォームまたはリダイレクト処理
 */
const LoginPage = () => {
  // 認証済みチェックフックを呼び出し、リダイレクトロジックを起動
  useGuestGuard();
  // 認証状態をuseAuthから直接取得（useGuestGuardが参照するのと同じ状態）
  const { isAuthenticated } = useAuth();

  // NOTE: useGuestGuard内でrouter.replace()が呼ばれますが、
  // そのフレームワーク側の処理が終わるまで、ここではnullを返して描画をブロックします。
  // isAuthenticatedがtrueの間は、UIを描画せずにリダイレクトを待機。
  if (isAuthenticated) {
    return null;
  }

  // 認証されていない場合のみ、ログインフォームを表示
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;