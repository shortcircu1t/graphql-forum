import React, { ReactElement } from "react";
import moment from "moment";
import ProfilePicture from "./ProfilePicture";

interface Props {
  username: string;
  createdAt: string;
  avatarUrl?: string;
}

export default function CreatorAndDate({
  username,
  createdAt,
  avatarUrl,
}: Props): ReactElement {
  return (
    <div className="flex">
      <ProfilePicture src={avatarUrl} />
      <div>
        <p>{username}</p>
        <p className="text-secondary">{moment(+createdAt).fromNow()}</p>
      </div>
    </div>
  );
}
