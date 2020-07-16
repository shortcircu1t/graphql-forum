import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    login(email: String!, password: String!): Boolean
  }
`;
