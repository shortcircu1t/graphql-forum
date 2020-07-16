import React, { ReactElement } from "react";

interface Props {
  color?: string;
  href: string;
  children: string;
}

export default function UnderlinedLink({
  color,
  href,
  children,
}: Props): ReactElement {
  return (
    <a href={href} className={`py-4 pr-4 ${color} underline`}>
      {children}
    </a>
  );
}
