import gql from "graphql-tag";

export const SEND_PASSWORD_EMAIL_MUTATION = gql`
  mutation sendPasswordEmail($email: String!) {
    sendPasswordEmail(email: $email)
  }
`;
