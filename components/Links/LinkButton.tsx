import React, { ReactElement } from "react";

interface Props {
  href: string;
  children: string;
  active?: boolean;
}

export default function LinkButton({
  href,
  children,
  active,
}: Props): ReactElement {
  return (
    <a
      href={href}
      className={`px-5 py-3 mx-2 text-2xl lg:text-lg text-center text-white rounded-lg hover:shadow-lg ${
        !active && "hover:bg-black-light"
      }`}
    >
      {children}
      {/* <style jsx>
        {`
          a {
            ${active
              ? `background: linear-gradient(to right, #11998e, #2ab58b)`
              : ``}
          }
        `}
      </style> */}
      <style jsx>
        {`
          a {
            ${active ? `background: #319795` : ``}
          }
        `}
      </style>
    </a>
  );
}
