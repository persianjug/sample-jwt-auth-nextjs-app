// types/auth.ts

/**
 * @typedef {object} AuthData
 * ログインAPI (/auth/login) から返されるデータ構造。
 * Refresh TokenはHttpOnly Cookieで扱われるため、通常は定義に含めません。
 * @property {string} jwtToken - アクセストークン (JWT)。
 */
export interface AuthData {
  jwtToken: string;
  refreshToken: string;
}

/**
 * @typedef {object} UserInfo
 * 保護されたAPI (/resource/user-info) から取得されるユーザー情報。
 * @property {string} username - ユーザー名。
 * @property {string} email - ユーザーのメールアドレス。
 */
export interface UserInfo {
  username: string;
  email: string;
  // 必要に応じて他のフィールドを追加: id, roles, etc.
}