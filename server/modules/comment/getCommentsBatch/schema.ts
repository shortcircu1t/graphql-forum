import { gql } from "apollo-server-express";

export const schema = gql`
  type Query {
    comments(pageSize: Int!, after: String, postId: Int!): CommentConnection
  }

  type CommentConnection {
    cursor: String
    comments: [Comment]
  }
`;
