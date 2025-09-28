import { LoginRequest, SignupRequest } from "@/types/authRequest";
import axiosInstance from "./axiosInstance";
import { AuthData, UserInfo } from "@/types/auth";
import { AuthEndpoints, ResourceEndpoints } from "@/constants/apiEndpoints";

/**
 * ユーザーを認証し、JWTとリフレッシュトークンを取得します。
 * @param {LoginRequest} credentials - ユーザー名とパスワード
 * @returns {Promise<AuthData>} サーバーから返される認証データ（JWT）
 */
export const login = async (credentials: LoginRequest): Promise<AuthData> => {
  const response = await axiosInstance.post<AuthData>(AuthEndpoints.LOGIN, credentials);
  return response.data;
}

/**
 * 新規ユーザーアカウントを登録します。
 * @param {SignupRequest} userData - ユーザー名とパスワード
 * @returns {Promise<string>} 成功メッセージまたは失敗メッセージ
 */
export const signup = async (userData: SignupRequest): Promise<string> => {
  const response = await axiosInstance.post(AuthEndpoints.SIGNUP, userData);
  return response.data;
}

/**
 * 現在のセッションのログアウト処理を実行します。
 * @returns {Promise<string>} 成功メッセージまたは失敗メッセージ
 */
export const logout = async (): Promise<string> => {
  const response = await axiosInstance.post(AuthEndpoints.LOGOUT);
  return response.data;
}

/**
 * 保護されたリソースから認証済みユーザー情報を取得します。
 * @returns {Promise<UserInfo>} ユーザー情報
 */
export const fetchUserInfo = async (): Promise<UserInfo> => {
  const response = await axiosInstance.get<UserInfo>(ResourceEndpoints.USER_INFO);
  return response.data;
}