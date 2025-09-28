/**
 * @type {string | null} アクセストークンを保持するメモリ変数。
 */
let currentJwtToken: string | null = null;

/**
 * アクセストークンをメモリに設定します。nullを渡すと削除されます。
 * @param {string | null} token - 設定するJWT。
 */
export const setJwtToken = (token: string | null): void => {
  currentJwtToken = token;
};

/**
 * 現在メモリに保持されているアクセストークンを取得します。
 * @returns {string | null} JWTまたはnull。
 */
export const getJwtToken = (): string | null => {
  return currentJwtToken;
};