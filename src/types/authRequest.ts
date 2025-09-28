/**
 * @typedef {object} LoginRequest
 * ログインAPI (/auth/login) に送信するデータ構造。
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * @typedef {object} SignupRequest
 * ユーザー登録API (/auth/signup) に送信するデータ構造。
 */
export interface SignupRequest {
  username: string;
  password: string;
}
