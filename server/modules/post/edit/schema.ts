import { gql } from "apollo-server-express";

export const schema = gql`
  type Mutation {
    editPost(
      title: String
      body: String
      headerImgUrl: String
      postId: Int
    ): Boolean
  }
`;
