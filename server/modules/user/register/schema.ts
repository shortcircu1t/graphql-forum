import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    register(
      password: String!
      passwordConfirm: String!
      username: String!
      email: String!
    ): Boolean
    destroyAll: Boolean
  }

  type Query {
    test: [User]
  }
`;
