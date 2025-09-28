/**
 * API接続に関する定数定義。
 */
export const ApiConfig = {
  // 開発環境用のAPIベースURLのフォールバック値
  LOCAL_BASE_URL_FALLBACK: "http://localhost:8080/api",

  // Authorizationヘッダーのキー
  AUTH_HEADER_KEY: "Authorization",

  // JWTに使用する認証スキームのプレフィックス
  AUTH_BEARER_PREFIX: "Bearer ",

  // withCredentialsのデフォルト値
  WITH_CREDENTIALS: true, // リフレッシュトークン (HttpOnly Cookie) の送受信を可能にする
} as const;