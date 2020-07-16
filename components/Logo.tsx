import React, { ReactElement } from "react";

export default function Logo(): ReactElement {
  return (
    <p className="block mr-4">
      <a href="/">
        <img
          className="object-cover w-12 h-12 rounded-full lg:mr-4 lg:w-16 lg:h-16"
          src="/images/logo.png"
          alt="Logo"
        />
      </a>
    </p>
  );
}
