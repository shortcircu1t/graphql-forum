import React, { ReactElement } from "react";
import { Post } from "../types/types";
import Reaction from "./Reaction";
import CreatorAndDate from "./CreatorAndDate";
import YellowUnderlinedLink from "./Links/YellowUnderlinedLink";

interface Props {
  post: Post;
}

export default function PostMini({ post }: Props): ReactElement {
  return (
    <>
      <div className="w-full p-4 font-normal border-b-2 post border-black-light">
        <div className="relative flex justify-between mb-2">
          <CreatorAndDate
            username={post.user.username}
            createdAt={post.createdAt}
            avatarUrl={post.user.avatarUrl}
          />
          <div
            tabIndex={-1}
            className="flex h-6 lg:h-8 text-secondary reactions"
            onClick={(e) => {
              (e.target as HTMLDivElement).focus();
            }}
          >
            <Reaction number={post.likes} id="like" />
            <Reaction number={post.dislikes} id="dislike" />
            <Reaction number={post.comments} id="comment" />
          </div>
          <div className="bg-black-light popup">
            Read the post to leave a reaction!
          </div>
        </div>
        <h2 className="mb-2 text-xl truncate lg:text-3xl">{post.title}</h2>
        <p className="mb-2 truncate text-secondary">{post.body}</p>
        <YellowUnderlinedLink href={`/post/${post.id}`}>
          Open
        </YellowUnderlinedLink>
      </div>
      <style jsx>{`
        div.post:last-child {
          border-bottom: none;
        }

        .popup {
          display: none;
          position: absolute;
          right: 0;
          margin-top: 35px;
          padding: 10px;
          border-radius: 10px;
        }

        .reactions:focus ~ .popup {
          display: block;
        }
      `}</style>
    </>
  );
}
