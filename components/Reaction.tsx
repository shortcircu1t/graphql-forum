import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: string;
  number: number;
  active?: boolean;
}

export default function Reaction({ number, id, active }: Props): ReactElement {
  switch (id) {
    case "like":
      return (
        <p className="mr-4">
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="1x"
            color="green"
            className={`mr-1 ${active && "text-teal-400"}`}
          />
          {number}
        </p>
      );
    case "dislike":
      return (
        <p className="mr-4">
          <FontAwesomeIcon
            icon={faThumbsDown}
            size="1x"
            color="red"
            className={`mr-1 ${active && "text-red-400"}`}
          />
          {number}
        </p>
      );

    case "comment":
      return (
        <p className="mr-4">
          <FontAwesomeIcon
            icon={faComment}
            size="1x"
            color="white"
            className="mr-1"
          />
          {number}
        </p>
      );

    default:
      return (
        <p className="mr-4">
          <FontAwesomeIcon
            icon={faThumbsDown}
            size="1x"
            color="red"
            className="mr-1"
          />
          {number}
        </p>
      );
  }
}
