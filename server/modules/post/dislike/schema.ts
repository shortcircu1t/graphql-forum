import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    dislikePost(postId: Int!): Boolean
  }
`;
