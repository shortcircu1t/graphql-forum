import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation register(
    $email: String!
    $password: String!
    $passwordConfirm: String!
    $username: String!
  ) {
    register(
      email: $email
      password: $password
      passwordConfirm: $passwordConfirm
      username: $username
    )
  }
`;
