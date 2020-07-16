import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    removeLikePost(postId: Int!): Boolean
  }
`;
