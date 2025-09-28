import React from "react";
import Link from "next/link";

/**
 * @typedef {object} AuthLinkProps
 * @property {string} questionText - 質問文 (例: "アカウントをお持ちでないですか？")
 * @property {string} linkText - リンクのテキスト (例: "新規登録はこちら")
 * @property {string} href - 遷移先のURL。
 */
interface AuthLinkProps {
  questionText: string;
  linkText: string;
  href: string;
}

/**
 * フォームの下部に配置される、認証ページ間のナビゲーションリンク
 * @param {AuthLinkProps} props
 * @returns {JSX.Element}
 */
const AuthLink = ({ questionText, linkText, href }: AuthLinkProps) => (
  <p className="mt-4 text-center text-sm text-gray-600 flex flex-col items-center">
    <span>{questionText}</span>
    <Link href={href} passHref>
      <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer mt-0.5">
        {linkText}
      </span>
    </Link>
  </p>
);

export default AuthLink;