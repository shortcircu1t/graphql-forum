import gql from "graphql-tag";

export const GET_POSTS_BATCH_QUERY = gql`
  query getPostsBatch(
    $after: String
    $pageSize: Int!
    $categoryId: String
    $personal: Boolean
    $searchQuery: String
  ) {
    posts(
      after: $after
      pageSize: $pageSize
      categoryId: $categoryId
      personal: $personal
      searchQuery: $searchQuery
    ) {
      cursor
      posts {
        id
        title
        body
        headerImgUrl
        likes
        comments
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
