import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    sendPasswordEmail(email: String!): Boolean
    resetPassword(
      token: String!
      newPassword: String!
      newPasswordConfirm: String!
    ): Boolean
  }
`;
