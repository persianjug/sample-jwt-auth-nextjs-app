import useSWR, { SWRResponse, Key, Fetcher } from "swr";
import useAuth from "./useAuth";

/**
 * @typedef {object} ProtectedResourceResult
 * @property {T | undefined} data - フェッチされたデータ。
 * @property {any | undefined} error - フェッチ中に発生したエラーオブジェクト。
 * @property {boolean} isLoading - データがロード中であるかどうか。
 * @property {function} mutate - データの再検証（再フェッチ）を手動でトリガーする関数。
 * @property {boolean} isAuthenticated - 現在のユーザーが認証されているかどうか。
 * @template T - フェッチされるデータの型。
 */

/**
 * 認証が必要なリソースのデータフェッチとキャッシングを管理するための汎用カスタムフック。
 * * このフックは {@link useAuth} を利用し、ユーザーが認証されていない場合はデータフェッチを自動的にスキップします。
 * SWRのキーに認証状態を含めることで、宣言的にフェッチを制御します。
 *
 * @template T - フェッチされるデータの型。
 * @param {Key} resourceKey - SWRのキーとして使用されるリソースの識別子（通常はAPIパス）
 * @param {Fetcher<T>} fetcher - 実際にAPIコールを実行する非同期関数
 * @returns {ProtectedResourceResult<T>} SWRの標準の戻り値に加え、認証状態（isAuthenticated）を含むオブジェクト
 */
export const useProtectedResource = <T>(
    resourceKey: Key,
    fetcher: Fetcher<T>
): SWRResponse<T, any> & { isAuthenticated: boolean } => {
    // 認証状態の取得
    const { isAuthenticated } = useAuth();
    // SWR のキーを定義。認証済みの場合のみキーを持つようにする。
    const swrKey = isAuthenticated ? resourceKey : null;
    // SWRのオプション定義
    const swrOptions = {
        revalidateOnFocus: true, // 画面にフォーカスが戻ったら自動再フェッチ
        shouldRetryOnError: false, // 失敗時のリトライを無効化
    };

    // データ取得
    const swrResult = useSWR<T>(swrKey, fetcher, swrOptions);

    return {
        ...swrResult,
        isAuthenticated,
    };
};