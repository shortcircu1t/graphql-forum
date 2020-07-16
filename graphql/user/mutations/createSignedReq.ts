import gql from "graphql-tag";

export const CREATE_SIGNED_REQ_MUTATION = gql`
  mutation createSignedRequestToAWS($filename: String!, $filetype: String!) {
    createSignedRequestToAWS(filename: $filename, filetype: $filetype) {
      signedRequest
      url
    }
  }
`;
