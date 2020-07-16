import React, { ReactElement } from "react";
import { LIKE_POST_MUTATION } from "../graphql/post/mutations/likePost";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { DISLIKE_POST_MUTATION } from "../graphql/post/mutations/dislikePost";
import { REMOVE_DISLIKE_POST_MUTATION } from "../graphql/post/mutations/removeDislikePost";
import { REMOVE_LIKE_POST_MUTATION } from "../graphql/post/mutations/removeLikePost";
import { GET_FULL_POST_QUERY } from "../graphql/post/queries/getFullPost";
import { Post } from "../types/types";
import Reaction from "./Reaction";

interface Props {
  id: string;
  number: number;
  postId: number;
  active: boolean;
}

interface reactionVariables {
  postId: number;
}

interface reactionData {
  likePost?: boolean;
  dislikePost?: boolean;
  removeLikePost?: boolean;
  removeDislikePost?: boolean;
}

interface UpdateConfig {
  liked?: boolean;
  disliked?: boolean;
  likes?: number;
  dislikes?: number;
}

export default function PostReaction({
  id,
  number,
  postId,
  active,
}: Props): ReactElement {
  const client = useApolloClient();

  const [likePost] = useMutation<reactionData, reactionVariables>(
    LIKE_POST_MUTATION,
    {
      variables: { postId },
    }
  );

  const [dislikePost] = useMutation<reactionData, reactionVariables>(
    DISLIKE_POST_MUTATION,
    {
      variables: { postId },
    }
  );

  const [removeLikePost] = useMutation<reactionData, reactionVariables>(
    REMOVE_LIKE_POST_MUTATION,
    {
      variables: { postId },
    }
  );

  const [removeDislikePost] = useMutation<reactionData, reactionVariables>(
    REMOVE_DISLIKE_POST_MUTATION,
    {
      variables: { postId },
    }
  );

  const updateOptimistically = (
    { liked, disliked, likes, dislikes }: UpdateConfig,
    post: Post
  ) => {
    client.writeQuery({
      query: GET_FULL_POST_QUERY,
      variables: { postId },
      data: {
        getFullPost: {
          ...post,
          liked: liked,
          disliked: disliked,
          likes: likes,
          dislikes: dislikes,
        },
      },
    });
  };

  const handleClick = async () => {
    const postData = client.readQuery({
      query: GET_FULL_POST_QUERY,
      variables: { postId },
    });
    const post = postData?.getFullPost;
    if (id === "like") {
      if (!active) {
        updateOptimistically(
          {
            liked: true,
            disliked: false,
            likes: post.likes + 1,
            dislikes: post.disliked ? post.dislikes - 1 : post.dislikes,
          },
          post
        );
        await likePost();
      } else {
        updateOptimistically(
          {
            liked: false,
            disliked: false,
            likes: post.likes - 1,
            dislikes: post.dislikes,
          },
          post
        );
        await removeLikePost();
      }
    } else {
      if (!active) {
        updateOptimistically(
          {
            liked: false,
            disliked: true,
            likes: post.liked ? post.likes - 1 : post.likes,
            dislikes: post.dislikes + 1,
          },
          post
        );
        await dislikePost();
      } else {
        updateOptimistically(
          {
            liked: false,
            disliked: false,
            likes: post.likes,
            dislikes: post.dislikes - 1,
          },
          post
        );
        await removeDislikePost();
      }
    }
  };

  return (
    <button onClick={handleClick}>
      <Reaction id={id} number={number} active={active} />
    </button>
  );
}
