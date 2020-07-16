import gql from "graphql-tag";

export const CHANGE_USERNAME_MUTATION = gql`
  mutation changeUsername($username: String!) {
    changeUsername(username: $username)
  }
`;
