import gql from "graphql-tag";

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId)
  }
`;
