import gql from "graphql-tag";

export const ADD_COMMENT_MUTATION = gql`
  mutation addComment($comment: String!, $postId: Int!) {
    addComment(comment: $comment, postId: $postId)
  }
`;
