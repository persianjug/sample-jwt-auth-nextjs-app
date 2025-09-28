"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import Dashboard from "@/components/Dashboard";

/**
 * @fileoverview 認証済みユーザー専用のダッシュボードページコンポーネント。
 * アクセス制御は {@link useAuthGuard} フックに委譲し、フックのローディング状態が解除されたらコンテンツを表示します。
 * @returns {JSX.Element | null} ダッシュボードコンテンツまたは認証チェック中のUI
 */
const DashboardPage = () => {
  // 認証ガードフックからローディング状態を取得
  const { isLoading } = useAuthGuard();

  // ローディング中の間は、フック内でリダイレクト処理が行われるか、認証チェック中であること表示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 text-lg font-medium">認証チェック中...</div>
      </div>
    );
  }

  // 認証が完了し、リダイレクトが行われなかった場合のみ、コンテンツを表示
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;