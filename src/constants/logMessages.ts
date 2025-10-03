export const AUTH_MESSAGES = {
  INITIAL_CHECK_START: "初期認証チェックを開始します。",
  JWT_FOUND: "メモリにJWTを確認。ユーザー認証済みとして状態を更新しました。",
  JWT_NOT_FOUND: "メモリに有効なJWTが見つかりませんでした。未認証状態を維持します。",
  CHECK_COMPLETED: "初期認証チェックが完了しました。",

  LOGIN_SUCCESS: "ログイン成功。トークンをメモリに設定し、ダッシュボードへリダイレクトします。",
  LOGIN_ERROR: "ログイン処理中にエラーが発生しました。",

  LOGOUT_API_SUCCESS: "サーバー側のログアウトAPI呼び出しに成功しました。",
  LOGOUT_API_ERROR: "サーバー側のログアウトAPI呼び出し中にエラーが発生しました。クライアント側でのクリーンアップを継続します。",
  LOGOUT_CLIENT_CLEARED: "クライアント側のJWTをクリアしました。ログイン画面へリダイレクトします。",
};

export const FORM_MESSAGES = {
  // ユーザー名やパスワードが空の場合
  VALIDATION_EMPTY: "バリデーション失敗: ユーザー名またはパスワードが空です。",
  // フォーム送信の開始
  SUBMIT_START: "フォーム送信処理を開始します。",
  // フォーム送信の完了（成功/失敗問わず）
  SUBMIT_END: "フォーム送信処理が完了しました。",
  // 認証フックからのエラーを捕捉した場合
  LOGIN_SUCESS: "ログイン成功。最小ローディング期間完了後、ダッシュボードへリダイレクトします。",
  LOGIN_FAILED: "ログイン処理がuseAuth内で失敗したため、フォームエラーを表示します。",
  PASSWORD_MISMATCH: "バリデーション失敗: パスワードと確認用パスワードが一致しません。",
  SIGNUP_API_SUCCESS: "ユーザー登録APIの呼び出しに成功しました。リダイレクトタイマーを開始します。",
  SIGNUP_API_ERROR: "ユーザー登録APIの呼び出しに失敗しました。エラーメッセージを抽出します。",
};
