import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    confirmUser(token: String!): Boolean
  }
`;
