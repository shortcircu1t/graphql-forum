import React, { ReactElement } from "react";

import { useMe } from "../hooks/useMe";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { DELETE_COMMENT_MUTATION } from "../graphql/comment/mutations/deleteComment";
import { GET_COMMENTS_BATCH_QUERY } from "../graphql/comment/queries/getCommentsBatch";
import { COMMENTS_PAGE_SIZE } from "../config/constants";

import CreatorAndDate from "./CreatorAndDate";
import CommentReaction from "./CommentReaction";

interface Props {
  comment: any;
  postId: number;
}

export default function Comment({ comment, postId }: Props): ReactElement {
  const client = useApolloClient();
  const { me } = useMe();
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { commentId: +comment.id },
  });
  return (
    <div className="flex flex-col p-1 my-4">
      <div className="flex justify-between">
        <CreatorAndDate
          username={comment.user.username}
          createdAt={comment.createdAt}
          avatarUrl={comment.user.avatarUrl}
        />
        {me && (
          <div className="flex items-center">
            {me?.username === comment.user.username ? (
              <button
                className="h-8 px-3 mr-2 text-sm text-black bg-yellow-300 rounded-sm"
                onClick={async () => {
                  const commentData = client.readQuery({
                    query: GET_COMMENTS_BATCH_QUERY,
                    variables: { postId, pageSize: COMMENTS_PAGE_SIZE },
                  });
                  let commentArr = commentData?.comments.comments;
                  console.log(commentArr);
                  commentArr = commentArr.filter(
                    (commentItem) => comment.id !== commentItem.id
                  );
                  console.log(commentArr);
                  client.writeQuery({
                    query: GET_COMMENTS_BATCH_QUERY,
                    variables: { postId, pageSize: COMMENTS_PAGE_SIZE },
                    data: {
                      comments: {
                        ...commentData.comments,
                        comments: commentArr,
                      },
                    },
                  });
                  await deleteComment();
                }}
              >
                <span className="hidden lg:inline">Delete</span>
                <span className="inline lg:hidden">X</span>
              </button>
            ) : (
              <>
                <CommentReaction
                  id="like"
                  number={comment.likes}
                  commentId={+comment.id}
                  active={comment.liked}
                  postId={postId}
                />
                <CommentReaction
                  id="dislike"
                  number={comment.dislikes}
                  commentId={+comment.id}
                  active={comment.disliked}
                  postId={postId}
                />
              </>
            )}
          </div>
        )}
      </div>
      <p>{comment.comment}</p>
    </div>
  );
}
