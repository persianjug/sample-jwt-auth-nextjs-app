// 待機処理を行うユーティリティ
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 非同期処理をラップし、実行時間が最小期間に満たない場合は残りの時間だけ待機します。
 * @param {() => Promise<T>} apiCall - 実行したい非同期関数
 * @param {number} minDuration - 最小ローディング表示期間 (ms)
 * @returns {Promise<T>} apiCallの実行結果。
 */
export const withMinDuration = async <T>(
  apiCall: () => Promise<T>,
  minDuration: number
): Promise<T> => {
  const startTime = Date.now();

  // API呼び出しと、時間待機を並列で実行
  const [result] = await Promise.all([
    apiCall(), // 実行したいAPI処理
    delay(minDuration), // 最小期間の待機（常にminDuration待つ）
  ]);

  // Promise.allを使うと、API完了と最小期間待機の「両方」が満たされるまで待機します。
  // そのため、APIが100msで終わっても、minDurationが500msなら、合計500ms待機されます。

  return result; // APIの実行結果のみを返す
};