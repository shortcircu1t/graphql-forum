import React, { ReactElement } from "react";
import LinkButton from "../Links/LinkButton";
import { uppercaseFirstChar } from "../../utils/uppercaseFirstChar";
import { CATEGORIES } from "../../config/constants";

interface Props {
  activeLink?: string;
}

export default function LinksBigScreen({ activeLink }: Props): ReactElement {
  return (
    <ul className="flex-col justify-center hidden lg:flex lg:flex-row text-secondary">
      {CATEGORIES.map((category) => (
        <li className="flex justify-center" key={category}>
          <LinkButton
            href={`/categories/${category}`}
            active={activeLink === category}
          >
            {uppercaseFirstChar(category)}
          </LinkButton>
        </li>
      ))}
    </ul>
  );
}
