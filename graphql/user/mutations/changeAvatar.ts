import gql from "graphql-tag";

export const CHANGE_AVATAR_MUTATION = gql`
  mutation changeAvatar($avatarUrl: String!) {
    changeAvatar(avatarUrl: $avatarUrl)
  }
`;
