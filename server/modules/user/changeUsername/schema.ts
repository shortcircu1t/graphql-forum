import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    changeUsername(username: String!): Boolean
  }
`;
