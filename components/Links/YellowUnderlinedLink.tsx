import React, { ReactElement } from "react";
import UnderlinedLink from "./UnderlinedLink";

interface Props {
  href: string;
  children: string;
}

export default function YellowUnderlinedLink({
  children,
  href,
}: Props): ReactElement {
  return (
    <UnderlinedLink color="text-yellow-300" href={href}>
      {children}
    </UnderlinedLink>
  );
}
