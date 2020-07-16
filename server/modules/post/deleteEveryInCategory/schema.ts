import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    deleteEvery(categoryId: String!): Boolean
  }
`;
