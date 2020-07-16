import React, { ReactElement } from "react";
import HamburgerReact from "hamburger-react";

interface Props {
  toggled: boolean;
  toggle: () => void;
}

export default function Hamburger({ toggled, toggle }: Props): ReactElement {
  return (
    <div className="z-50 lg:hidden">
      <HamburgerReact
        toggled={toggled}
        toggle={toggle}
        color="white"
        label="hamburger"
      />
    </div>
  );
}
