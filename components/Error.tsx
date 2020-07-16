import React, { ReactElement } from "react";

interface Props {
  msg: string;
}

export default function ErrorMessage({ msg }: Props): ReactElement {
  return <p className="px-2 text-left text-red-400">{msg}</p>;
}
