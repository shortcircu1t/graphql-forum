import React, { ReactElement } from "react";

interface Props {
  children: string;
  href: string;
}

export default function SettingsLink({ children, href }: Props): ReactElement {
  return (
    <a
      href={href}
      className={`block w-full h-full px-8 py-3 text-center transition-colors duration-300 bg-black-light hover:bg-yellow-300 hover:text-black`}
    >
      {children}
    </a>
  );
}
