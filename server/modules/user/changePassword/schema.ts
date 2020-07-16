import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    changePassword(
      oldPassword: String!
      newPassword: String!
      newPasswordConfirm: String!
    ): Boolean
  }
`;
