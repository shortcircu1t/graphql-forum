import gql from "graphql-tag";

export const GET_FULL_POST_QUERY = gql`
  query post($postId: Int!) {
    getFullPost(postId: $postId) {
      id
      title
      body
      headerImgUrl
      likes
      comments
      dislikes
      liked
      disliked
      createdAt
      user {
        id
        avatarUrl
        username
      }
    }
  }
`;
