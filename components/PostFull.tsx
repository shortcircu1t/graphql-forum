import React, { ReactElement, useState } from "react";

import { useMe } from "../hooks/useMe";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { GET_COMMENTS_BATCH_QUERY } from "../graphql/comment/queries/getCommentsBatch";
import { COMMENTS_PAGE_SIZE } from "../config/constants";
import { DELETE_POST_MUTATION } from "../graphql/post/mutations/deletePost";
import { Post } from "../types/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import PostReaction from "./PostReaction";
import CommentSection from "./CommentSection";
import CreatorAndDate from "./CreatorAndDate";

interface Props {
  post: Post;
}

interface getCommentsBatch {
  cursor?: string;
  comments?: any;
}

interface getCommentsBatchVariables {
  after?: number;
  postId: number | null;
  pageSize: number;
}

interface deletePostVariables {
  postId: number;
}

interface deletePostData {
  deletePost: boolean;
}

export default function PostFull({ post }: Props): ReactElement {
  const [hasMore, setHasMore] = useState(true);
  const { me } = useMe();
  const [loadComments, { loading, data, error, fetchMore }] = useLazyQuery<
    getCommentsBatch,
    getCommentsBatchVariables
  >(GET_COMMENTS_BATCH_QUERY, { notifyOnNetworkStatusChange: true });
  const [
    deletePost,
    { loading: deleteLoading, data: deleteData, error: deleteError },
  ] = useMutation<deletePostData, deletePostVariables>(DELETE_POST_MUTATION, {
    variables: { postId: +post.id },
  });
  const loadMore = () =>
    fetchMore({
      variables: {
        after: data && new Date(+data?.comments?.cursor).toISOString(),
        pageSize: COMMENTS_PAGE_SIZE,
        postId: +post.id,
      },
      updateQuery: (
        prev: getCommentsBatch,
        { fetchMoreResult }: { fetchMoreResult?: getCommentsBatch }
      ) => {
        if (!fetchMoreResult?.comments) {
          setHasMore(false);
          return prev;
        }
        return {
          ...fetchMoreResult,
          comments: {
            ...fetchMoreResult.comments,
            comments: [
              ...prev.comments.comments,
              ...fetchMoreResult.comments.comments,
            ],
          },
        };
      },
    });
  return (
    <article className="p-5">
      <h1 className="mb-3 text-2xl lg:text-4xl">{post.title}</h1>
      <div className="flex justify-between mb-3 ">
        <CreatorAndDate
          username={post.user.username}
          createdAt={post.createdAt}
          avatarUrl={post.user.avatarUrl}
        />
        {me?.username === post.user.username && (
          <button
            disabled={deleteLoading}
            className="h-12 px-2 text-black bg-yellow-300 rounded-lg"
            onClick={async () => {
              try {
                await deletePost();
                if (window) {
                  window.location.replace("/");
                }
              } catch (error) {}
            }}
          >
            {deleteLoading ? "Loading..." : "Delete"}
          </button>
        )}
      </div>
      {post.headerImgUrl && (
        <img
          src={post.headerImgUrl}
          alt={`${post.user.username}'s Post Header Image`}
          className="w-full m-auto"
        />
      )}
      <p className="mt-2 mb-5 text-lg leading-relaxed break-words lg:text-2xl">
        {post.body}
      </p>
      {me && me?.username !== post.user.username && (
        <div className="flex my-3">
          <PostReaction
            number={post.likes}
            id="like"
            postId={+post.id}
            active={post.liked}
          />
          <PostReaction
            number={post.dislikes}
            id="dislike"
            postId={+post.id}
            active={post.disliked}
          />
        </div>
      )}

      <div className="p-3 bg-black-light">
        {!data && (
          <button
            disabled={loading}
            className="block w-full p-3 bg-black-light"
            onClick={() =>
              loadComments({
                variables: { postId: +post.id, pageSize: COMMENTS_PAGE_SIZE },
              })
            }
          >
            {!loading && (
              <>
                <FontAwesomeIcon icon={faComment} className="mr-3" />
                {post.comments} Load Comments
              </>
            )}
            {loading && `Loading...`}
          </button>
        )}
        {data && (
          <CommentSection
            comments={
              data.comments !== null ? data.comments.comments : undefined
            }
            postId={+post.id}
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loading}
          />
        )}
      </div>
    </article>
  );
}
