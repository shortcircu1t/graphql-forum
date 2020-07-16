import gql from "graphql-tag";

export const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($commentId: Int!) {
    likeComment(commentId: $commentId)
  }
`;
