/**
 * ログメッセージに日付、時刻、ミリ秒、プレフィックスを付与し、コンソールに出力する。
 * @param {string} component - ログを出力する機能名（例: "AUTH", "API", "UI"）
 * @param {"INFO" | "ERROR" | "DEBUG"} level - ログレベル
 * @param {string} message - ログメッセージ本体
 * @param {any} [details] - エラーオブジェクトや詳細情報など、オプションのデータ
 * @param {string} [funcname] - 関数名
 */
export const log = (
  component: string,
  level: "INFO" | "ERROR" | "DEBUG",
  message: string,
  details?: any,
  funcName?: string
) => {
  const now = new Date();

  // 日付部分を YYYY-MM-DD 形式で取得
  const datePart = now.toLocaleDateString("ja-JP", {
    year: "numeric", month: "2-digit", day: "2-digit"
  }).replace(/\//g, "-");

  // 時刻部分を HH:MM:SS 形式で取得
  const timePart = now.toLocaleTimeString("ja-JP", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  });

  // ★ ミリ秒部分を3桁で取得し、ゼロパディング
  const msPart = String(now.getMilliseconds()).padStart(3, "0");

  // タイムスタンプを結合 (例: 2025-09-30 22:14:00.123)
  const timestamp = `${datePart} ${timePart}.${msPart}`;

  // 関数名があればプレフィックスに追加 (例: [22:30:15.123] [AUTH:INFO] [login])
  const funcPrefix = funcName ? ` [${funcName}]` : "";

  // プレフィックスを生成 (例: [2025-09-30 22:14:00.123] [AUTH:INFO])
  const prefix = `[${timestamp}] [${component}:${level}]${funcPrefix}`;

  // ログに出力する引数を配列として準備
  const args = [`${prefix} ${message}`];

  // detailsが存在する場合のみ、配列にdetailsを追加する
  if (details !== undefined && details !== null) {
    args.push(details);
  }

  // consoleメソッドのapplyを使って、引数配列を渡す
  if (level === "ERROR") {
    console.error.apply(console, args);
  } else {
    console.log.apply(console, args);
  }
};

// 特定のコンポーネント専用のログ関数を作成するヘルパー (変更なし)
export const createLogger = (component: string) => ({
  info: (message: string, details?: any, funcName?: string) => log(component, "INFO", message, details, funcName),
  error: (message: string, details?: any, funcName?: string) => log(component, "ERROR", message, details, funcName),
  debug: (message: string, details?: any, funcName?: string) => log(component, "DEBUG", message, details, funcName),
});