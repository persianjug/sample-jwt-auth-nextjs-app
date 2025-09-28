import React, { FormEventHandler } from "react";

/**
 * @typedef {object} AuthFormWrapperProps
 * @property {string} title - フォームのタイトル (例: "ログイン", "新規ユーザー登録")
 * @property {FormEventHandler} onSubmit - フォーム送信時のハンドラ関数
 * @property {React.ReactNode} children - フォームの内部コンテンツ（フィールド、ボタンなど）
 */
interface AuthFormWrapperProps {
  title: string;
  onSubmit: FormEventHandler;
  children: React.ReactNode;
}

/**
 * 認証フォーム（ログイン、サインアップなど）に共通の外枠、スタイル、タイトルを提供するコンポーネント。
 * @param {AuthFormWrapperProps} props
 * @returns {JSX.Element}
 */
const AuthFormWrapper = ({ title, onSubmit, children }: AuthFormWrapperProps) => (
  <form
    onSubmit={onSubmit}
    className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full"
  >
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h1>
    {children}
  </form>
);

export default AuthFormWrapper;