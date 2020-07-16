import React, { ReactElement } from "react";

import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useMe } from "../hooks/useMe";
import { Post } from "../types/types";
import { LIKE_COMMENT_MUTATION } from "../graphql/comment/mutations/likeComment";
import { GET_COMMENTS_BATCH_QUERY } from "../graphql/comment/queries/getCommentsBatch";
import { DISLIKE_COMMENT_MUTATION } from "../graphql/comment/mutations/dislikeComment";
import { COMMENTS_PAGE_SIZE } from "../config/constants";

import Reaction from "./Reaction";

interface Props {
  id: string;
  number: number;
  commentId: number;
  active: boolean;
  postId: number;
}

interface reactionVariables {
  commentId: number;
}

interface reactionData {
  likeComment?: boolean;
  dislikeComment?: boolean;
}

export default function CommentReaction({
  id,
  number,
  active,
  commentId,
  postId,
}: Props): ReactElement {
  const client = useApolloClient();
  const { me } = useMe();
  const [likeComment] = useMutation<reactionData, reactionVariables>(
    LIKE_COMMENT_MUTATION,
    {
      variables: { commentId },
    }
  );

  const [dislikeComment] = useMutation<reactionData, reactionVariables>(
    DISLIKE_COMMENT_MUTATION,
    {
      variables: { commentId },
    }
  );
  const updateOptimistically = (action: string, commentData) => {
    let commentArr = commentData?.comments.comments;
    commentArr = commentArr.map((comment) => {
      if (+comment.id === commentId) {
        if (action === "like") {
          if (comment.liked) {
            return {
              ...comment,
              liked: false,
              disliked: false,
              likes: comment.likes - 1,
              dislikes: comment.dislikes,
            };
          } else {
            if (comment.disliked) {
              return {
                ...comment,
                liked: true,
                disliked: false,
                likes: comment.likes + 1,
                dislikes: comment.dislikes - 1,
              };
            } else {
              return {
                ...comment,
                liked: true,
                disliked: false,
                likes: comment.likes + 1,
                dislikes: comment.dislikes,
              };
            }
          }
        } else {
          if (comment.disliked) {
            return {
              ...comment,
              liked: false,
              disliked: false,
              likes: comment.likes,
              dislikes: comment.dislikes - 1,
            };
          } else {
            if (comment.liked) {
              return {
                ...comment,
                liked: false,
                disliked: true,
                likes: comment.likes - 1,
                dislikes: comment.dislikes + 1,
              };
            } else {
              return {
                ...comment,
                liked: false,
                disliked: true,
                likes: comment.likes,
                dislikes: comment.dislikes + 1,
              };
            }
          }
        }
      }
      return comment;
    });
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
  };

  const handleClick = async () => {
    const commentData = client.readQuery({
      query: GET_COMMENTS_BATCH_QUERY,
      variables: { postId, pageSize: COMMENTS_PAGE_SIZE },
    });
    const commentArr = commentData?.comments.comments;
    if (id === "like") {
      updateOptimistically("like", commentData);
      await likeComment();
    } else {
      updateOptimistically("dislike", commentData);
      await dislikeComment();
    }
  };

  return (
    <button onClick={handleClick}>
      <Reaction id={id} number={number} active={active} />
    </button>
  );
}
