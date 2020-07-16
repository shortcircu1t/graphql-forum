import gql from "graphql-tag";

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;
