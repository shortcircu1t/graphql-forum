import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    likeComment(commentId: Int!): Boolean
  }
`;
