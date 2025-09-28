/**
 * 認証関連のAPIエンドポイント。
 * Base URL (例: http://localhost:8080/api) はaxiosInstanceで管理されます。
 */
export const AuthEndpoints = {
  // ユーザーログイン
  LOGIN: "/auth/login",
  // 新規ユーザー登録
  SIGNUP: "/auth/register",
  // アクセストークンのリフレッシュ (HttpOnly Cookieを使用)
  REFRESH_TOKEN: "/auth/refreshToken",
  // ログアウト (サーバー側でリフレッシュトークンを破棄)
  LOGOUT: "/auth/logout",
} as const;

/**
 * 保護されたリソース関連のAPIエンドポイント。
 */
export const ResourceEndpoints = {
  // 認証済みユーザー情報の取得
  USER_INFO: "/users/me",
  // 他の保護されたリソースのエンドポイントを追加...
} as const;