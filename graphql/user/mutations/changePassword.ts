import gql from "graphql-tag";

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword(
    $oldPassword: String!
    $newPassword: String!
    $newPasswordConfirm: String!
  ) {
    changePassword(
      oldPassword: $oldPassword
      newPassword: $newPassword
      newPasswordConfirm: $newPasswordConfirm
    )
  }
`;
