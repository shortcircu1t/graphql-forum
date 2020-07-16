import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    deleteComment(commentId: Int!): Boolean
  }
`;
