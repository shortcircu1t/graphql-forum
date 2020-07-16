import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    addComment(postId: Int!, comment: String!): Boolean
  }
`;
