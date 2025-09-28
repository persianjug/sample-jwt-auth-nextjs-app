/**
 * 主要なHTTPステータスコードを定義した定数オブジェクト。
 */
export const HttpStatus = {
  /** 200 OK: リクエストが成功し、成功を意味する。 */
  OK: 200,
  /** 201 Created: リクエストが成功し、新しいリソースが作成された。 */
  CREATED: 201,
  /** 400 Bad Request: クライアント側の入力が不正。 */
  BAD_REQUEST: 400,
  /** 401 Unauthorized: 認証が必要だが、認証されていない。JWT期限切れはこのコードになることが多い。 */
  UNAUTHORIZED: 401,
  /** 403 Forbidden: 認証はされているが、リソースへのアクセス権限がない。 */
  FORBIDDEN: 403,
  /** 404 Not Found: リソースが見つからない。 */
  NOT_FOUND: 404,
  /** 500 Internal Server Error: サーバー側の処理で予期せぬエラーが発生。 */
  INTERNAL_SERVER_ERROR: 500,
} as const;