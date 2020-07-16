import { gql } from "apollo-server-express";

export const schema = gql`
  type Query {
    posts(
      pageSize: Int!
      after: String
      categoryId: String
      personal: Boolean
      searchQuery: String
    ): PostConnection
  }

  type PostConnection {
    cursor: String
    posts: [Post]
  }
`;
