import React, { ReactElement } from "react";

interface Props {
  text: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function ButtonPrimary({
  text,
  type,
  disabled,
  onClick,
  ariaLabel,
}: Props): ReactElement {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      role="button"
      aria-label={ariaLabel || ""}
      className="block px-3 py-2 m-auto mt-5 mb-2 text-lg text-center text-white bg-teal-600 rounded-sm btn-load"
    >
      {disabled ? "Loading..." : text}
      <style jsx>{`
        .btn-load {
          background: #319795;
          transition: background 1.3s ease;
        }
      `}</style>
    </button>
  );
}
