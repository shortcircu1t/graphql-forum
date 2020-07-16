import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    addPost(
      title: String!
      body: String!
      categoryId: String!
      headerImgUrl: String
    ): Boolean
  }

  # type Query {
  #   # posts: Boolean
  # }
`;
