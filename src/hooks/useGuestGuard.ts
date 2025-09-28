import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { AppRoutes } from "@/constants/routes";

/**
 * 非認証ルート (ログイン、サインアップなど) へのアクセス制御を行うカスタムフック。
 * ユーザーが認証済みの場合、自動的にダッシュボードへリダイレクトします。
 * @returns {void}
 */
const useGuestGuard = (): void => {
  // 現在の認証状態
  const { isAuthenticated } = useAuth();
  // Next.jsのルーターインスタンス
  const router = useRouter();

  useEffect(() => {
    // 認証済みであればダッシュボードへリダイレクト
    if (isAuthenticated) {
      // router.replaceを使うことで、ブラウザの履歴にログインページが残るのを防ぎます
      router.replace(AppRoutes.DASHBOARD);
    }
  }, [isAuthenticated, router]);
};

export default useGuestGuard;