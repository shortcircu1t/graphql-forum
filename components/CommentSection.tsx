import React, { ReactElement } from "react";

import { useMe } from "../hooks/useMe";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import CommentForm from "./Forms/CommentForm";

interface Props {
  comments?: any[];
  postId: number;
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export default function CommentSection({
  comments,
  postId,
  loadMore,
  hasMore,
  loading,
}: Props): ReactElement {
  const { me } = useMe();
  return (
    <>
      {comments && <span>Comments</span>}
      {!comments && me && (
        <p className="text-2xl text-center">
          There are no comments yet to this post. Write one yourself!
        </p>
      )}
      {me && <CommentForm postId={postId} />}
      {!me && (
        <p className="text-2xl text-center">Sign in to make a comment.</p>
      )}
      {comments &&
        comments.map((comment) => (
          <Comment comment={comment} key={comment.id} postId={postId} />
        ))}

      {comments && hasMore && (
        <button
          className="block w-full p-3 bg-black-light"
          onClick={loadMore}
          disabled={loading}
        >
          {!loading && (
            <>
              <FontAwesomeIcon icon={faComment} className="mr-3" />
              Load More...
            </>
          )}
          {loading && "Loading..."}
        </button>
      )}
      {!hasMore && <p className="text-xl text-center">No more comments!</p>}
    </>
  );
}
