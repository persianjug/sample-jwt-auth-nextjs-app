import { fetchUserInfo } from "@/services/authService";
import { ResourceEndpoints } from "@/constants/apiEndpoints";
import { useProtectedResource } from "./useProtectedResource";
import { UserInfo } from "@/types/auth";

/**
 * @typedef {object} UserInfoHookResult
 * @property {UserInfo | undefined} userInfo - 認証済みユーザーの取得された詳細情報。データがまだロードされていない、または認証されていない場合は undefined。
 * @property {boolean} isLoading - ユーザー情報のロード中であるかどうかを示すブール値。
 * @property {any | undefined} error - ユーザー情報の取得中に発生したエラーオブジェクト。
 * @property {function} refetch - ユーザー情報の再検証（再フェッチ）を手動でトリガーする関数。
 */

/**
 * 認証済みのユーザー自身の詳細情報 (UserInfo) を取得し、管理するためのカスタムフック。
 *  内部的に {@link useProtectedResource} を使用し、認証状態に応じてフェッチを自動制御します。
 * @returns {UserInfoHookResult} ユーザー情報、ロード状態、エラー、および再フェッチ機能を含むオブジェクト
 */
export const useUserInfo = () => {
  const { data, error, isLoading, mutate } = useProtectedResource<UserInfo>(
    ResourceEndpoints.USER_INFO, // SWRキーとAPIエンドポイントの指定
    fetchUserInfo, // データを実際に取得するフェッチャー関数 
  );

  return {
    userInfo: data,
    isLoading,
    error,
    refetch: mutate // SWRのmutate関数を refetch として公開
  };
};