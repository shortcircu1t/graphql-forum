import gql from "graphql-tag";

export const DISLIKE_POST_MUTATION = gql`
  mutation dislikePost($postId: Int!) {
    dislikePost(postId: $postId)
  }
`;
