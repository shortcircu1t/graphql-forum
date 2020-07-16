import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    removeDislikePost(postId: Int!): Boolean
  }
`;
