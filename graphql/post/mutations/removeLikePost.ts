import gql from "graphql-tag";

export const REMOVE_LIKE_POST_MUTATION = gql`
  mutation removeLikePost($postId: Int!) {
    removeLikePost(postId: $postId)
  }
`;
