import gql from "graphql-tag";

export const GET_COMMENTS_BATCH_QUERY = gql`
  query getCommentsBatchQuery($pageSize: Int!, $postId: Int!, $after: String) {
    comments(pageSize: $pageSize, postId: $postId, after: $after) {
      cursor
      comments {
        id
        comment
        liked
        disliked
        likes
        dislikes
        createdAt
        user {
          id
          avatarUrl
          username
        }
      }
    }
  }
`;
