import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    dislikeComment(commentId: Int!): Boolean
  }
`;
