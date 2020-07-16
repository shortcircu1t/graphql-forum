import gql from "graphql-tag";

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $token: String!
    $newPassword: String!
    $newPasswordConfirm: String!
  ) {
    resetPassword(
      token: $token
      newPassword: $newPassword
      newPasswordConfirm: $newPasswordConfirm
    )
  }
`;
