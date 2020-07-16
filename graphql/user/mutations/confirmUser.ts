import gql from "graphql-tag";

export const CONFIRM_USER_MUTATION = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
