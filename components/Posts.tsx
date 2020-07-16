import React, { ReactElement, useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import { useMe } from "../hooks/useMe";
import { POSTS_PAGE_SIZE } from "../config/constants";
import { GET_POSTS_BATCH_QUERY } from "../graphql/post/queries/getPostsBatch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "./ButtonPrimary";
import PostMini from "./PostMini";

interface getPostsBatch {
  cursor?: string;
  posts?: any;
}

interface getPostsBatchVariables {
  after?: number;
  categoryId?: string | null;
  pageSize: number;
  personal?: boolean;
  searchQuery?: string;
}

interface Props {
  categoryId?: string;
  personal?: boolean;
  searchQuery?: string;
}

export default function Posts({
  categoryId,
  personal,
  searchQuery,
}: Props): ReactElement {
  const [hasMore, setHasMore] = useState(true);
  const { me } = useMe();
  const { data, loading, error, fetchMore } = useQuery<
    getPostsBatch,
    getPostsBatchVariables
  >(GET_POSTS_BATCH_QUERY, {
    variables: {
      pageSize: POSTS_PAGE_SIZE,
      categoryId,
      personal,
      searchQuery,
    },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <div className="mt-2">
      {me && data?.posts && !personal && (
        <a href="/create">
          <button className="block w-5/6 p-3 m-auto my-3 bg-black-light">
            <FontAwesomeIcon icon={faPen} className="mr-2" />
            Create a Post
          </button>
        </a>
      )}
      {data &&
        data.posts?.posts?.map((post) => (
          <PostMini post={post} key={post.id} />
        ))}
      {!data?.posts && (
        <>
          <p className="text-xl text-center">
            No posts yet.{" "}
            {me ? "Create one yourself!" : "Sign in to create one."}
          </p>
          {me && (
            <a href="/create" className="block w-24 m-auto">
              <ButtonPrimary text="Create..." />
            </a>
          )}
        </>
      )}
      {hasMore && data?.posts && (
        <ButtonPrimary
          text="Load More"
          disabled={loading}
          onClick={() =>
            fetchMore({
              variables: {
                after: data && new Date(+data?.posts?.cursor).toISOString(),
                pageSize: POSTS_PAGE_SIZE,
                categoryId: categoryId,
              },
              updateQuery: (
                prev: getPostsBatch,
                { fetchMoreResult }: { fetchMoreResult?: getPostsBatch }
              ) => {
                if (!fetchMoreResult?.posts) {
                  setHasMore(false);
                  return prev;
                }
                return {
                  ...fetchMoreResult,
                  posts: {
                    ...fetchMoreResult.posts,
                    posts: [
                      ...prev.posts.posts,
                      ...fetchMoreResult.posts.posts,
                    ],
                  },
                };
              },
            })
          }
        />
      )}
      {!hasMore && (
        <p className="mt-4 text-2xl text-center lg:text-3xl">
          No More Results!
        </p>
      )}
    </div>
  );
}
