import React, { ReactElement } from "react";

interface Props {
  src?: string;
  alt?: string;
}

export default function ProfilePicture({ src, alt }: Props): ReactElement {
  return (
    <img
      className="object-cover w-12 h-12 mr-4 rounded-full lg:w-16 lg:h-16"
      src={
        src || "https://graphql-forum.s3.eu-west-3.amazonaws.com/download.jpg"
      }
      alt={alt || "Profile Picture"}
    />
  );
}
