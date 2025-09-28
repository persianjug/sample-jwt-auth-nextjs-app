import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { AppRoutes } from "@/constants/routes";

/**
 * @typedef {object} AuthGuardHook
 * @property {boolean} isLoading - 認証状態の最終的なチェックが完了し、リダイレクトが不要であると確認されるまで、UIの表示をブロックすべきかどうか。
 */
interface AuthGuardHook {
  isLoading: boolean;
}

/**
 * 認証が必要なルートでのアクセス制御を行うカスタムフック。
 * ユーザーが認証されていない場合、自動的にログインページへリダイレクトします。
 * @returns {AuthGuardHook} 認証チェックが完了するまでのローディング状態
 */
const useAuthGuard = (): AuthGuardHook => {
  // 現在の認証状態
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  // Next.jsのルーターインスタンス
  const router = useRouter();

  // NOTE: useAuthのisAuthenticatedは初回レンダリング時にメモリチェックを行いtrue/falseを返すため、
  // ここでは単純にisAuthenticatedの状態変化を見てリダイレクトを処理します。
  useEffect(() => {
    // 認証チェックが完了した後で、かつ未認証の場合のみリダイレクトを実行
    if (!isAuthLoading && isAuthenticated === false) {
      // ログインページへリダイレクト
      // NOTE: router.replaceを使うことで、ブラウザの履歴にログインページが残るのを防ぎます。
      router.replace(AppRoutes.LOGIN);
    }
  }, [isAuthenticated, isAuthLoading, router]);

  // ★ 認証チェックが完了するまで、またはリダイレクトが確定するまで true
  const shouldBlockUI = isAuthLoading || (!isAuthenticated && !isAuthLoading);

  // リダイレクトが実行された後は、DashboardPageはnullを返すのが自然なので、
  // ここでは isAuthLoading の状態をそのまま返すのが Next.js の習慣に合致します。
  return { isLoading: isAuthLoading };
};

export default useAuthGuard;