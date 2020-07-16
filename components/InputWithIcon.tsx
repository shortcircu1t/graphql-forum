import React, { ReactElement, ReactNode } from "react";

interface Props {
  tailwindString: string;
  children: ReactNode;
}

export default function InputWithIcon({
  tailwindString,
  children,
}: Props): ReactElement {
  return (
    <div
      className={`flex items-center px-3 py-1 rounded-full ${tailwindString}`}
    >
      {children}
    </div>
  );
}
