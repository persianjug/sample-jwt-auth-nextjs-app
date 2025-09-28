import classNames from "classnames";
import React from "react";

/**
 * @typedef {object} PrimaryButtonProps
 * @property {string} text - 通常時に表示するテキスト (例: "ログイン")
 * @property {string} loadingText - ローディング中に表示するテキスト (例: "処理中...")
 * @property {boolean} isLoading - ローディング中かどうか
 * @property {boolean} disabled - ボタンを非活性化するかどうか
 * @property {"indigo" | "green" | "red"} [color="indigo"] - ボタンの基本色
 * @property {string} [className=""] - 追加で適用するクラス
 */
interface PrimaryButtonProps {
  text: string;
  loadingText: string;
  isLoading: boolean;
  disabled: boolean;
  color?: "indigo" | "green"; // ログイン(indigo)とサインアップ(green)をサポート
  className?: string;
}

/**
 * 共通のスタイリングが適用されたフォーム送信ボタン。
 * ローディング状態と非活性状態を自動で処理します。
 * @param {PrimaryButtonProps} props
 * @returns {JSX.Element}
 */
const PrimaryButton = ({ text, loadingText, isLoading, disabled, color = "indigo", className = "" }: PrimaryButtonProps) => {
  // ベースとなる共通スタイル
  const baseClasses = [
    "w-full", "py-2", "px-4", "rounded-md",
    "font-semibold", "transition", "duration-150"
  ];

  // 最終的なクラス名を classNames で宣言的に結合
  const finalClassName = classNames(
    ...baseClasses, // 共通クラスを適用
    className,      // 外部から渡された追加クラス

    // 非活性時 (最優先で適用されるスタイル)
    // ローディング中ではないが、disabledがtrueの場合
    {
      "bg-gray-400 cursor-not-allowed text-gray-600": disabled && !isLoading,
    },

    // アクティブ時の色 (非活性ではない場合に適用)
    {
      "text-white": !disabled,
      // color="indigo" のスタイル
      "bg-indigo-600 hover:bg-indigo-700": !disabled && color === "indigo",
      // color="green" のスタイル
      "bg-green-600 hover:bg-green-700": !disabled && color === "green",
      // 視覚的なフィードバック (例: ローディング中は少し透明度を下げる)
      "opacity-80": isLoading
    }
  );


  return (
    <button
      type="submit"
      className={finalClassName}
      disabled={disabled}
    >
      {isLoading ? loadingText : text}
    </button>
  );
};

export default PrimaryButton;