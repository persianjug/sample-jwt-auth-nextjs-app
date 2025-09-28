import classNames from "classnames";
import React from "react";

/**
 * @typedef {object} FormFieldProps
 * @property {string} id - inputとlabelに適用するID/for属性
 * @property {string} label - labelに表示するテキスト
 * @property {string} type - inputのtype属性 (text, passwordなど)
 * @property {string} value - inputの現在の値
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - 値変更時のハンドラ
 * @property {boolean} [disabled] - inputを非活性化するかどうか
 */
interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

/**
 * 共通のスタイリングが適用されたラベルと入力フィールドのセット。
 * @param {FormFieldProps} props
 * @returns {JSX.Element}
 */
const FormField = ({ id, label, type, value, onChange, disabled }: FormFieldProps) => {
  // input要素のベースクラス
  const inputBaseClasses = [
    "w-full", "px-3", "py-2", "border", "border-gray-300",
    "rounded-md", "focus:ring-indigo-500", "focus:border-indigo-500",
    "transition-colors" // 変化を滑らかにするため追加
  ];

  // classnamesで条件付きクラスを結合
  const inputClassName = classNames(
    ...inputBaseClasses,
    {
      // disabledがtrueの場合に適用するスタイル
      "bg-gray-50 cursor-not-allowed opacity-80": disabled,

      // disabledがfalseの場合に適用するスタイル（例としてhoverを追加）
      "hover:border-indigo-400": !disabled
    }
  );

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClassName}
        disabled={disabled}
        required
      />
    </div>
  );
}
export default FormField;