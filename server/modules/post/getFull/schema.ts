import { gql } from "apollo-server-express";

export const schema = gql`
  type Query {
    getFullPost(postId: Int!): Post
  }
`;
