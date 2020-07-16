import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    changeAvatar(avatarUrl: String!): Boolean
  }
`;
