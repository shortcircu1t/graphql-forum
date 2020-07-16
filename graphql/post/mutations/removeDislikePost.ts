import gql from "graphql-tag";

export const REMOVE_DISLIKE_POST_MUTATION = gql`
  mutation removeDislikePost($postId: Int!) {
    removeDislikePost(postId: $postId)
  }
`;
