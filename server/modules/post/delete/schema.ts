import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    deletePost(postId: Int!): Boolean
  }
`;
