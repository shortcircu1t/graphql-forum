import gql from "graphql-tag";

export const DISLIKE_COMMENT_MUTATION = gql`
  mutation dislikeComment($commentId: Int!) {
    dislikeComment(commentId: $commentId)
  }
`;
