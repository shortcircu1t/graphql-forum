import { gql } from "apollo-server-express";

export const schema = gql`
  type Comment {
    id: String
    comment: String
    liked: Boolean
    disliked: Boolean
    likes: Int
    dislikes: Int
    createdAt: String
    user: UserSmall
  }

  type UserSmall {
    id: String
    username: String
    avatarUrl: String
    createdAt: String
    userPosts: [Post]
  }

  type User {
    id: String
    avatarUrl: String
    username: String
    email: String
    createdAt: String
    updatedAt: String
    userPosts: [Post]
    confirmed: Boolean
  }

  type Post {
    id: String
    title: String
    body: String
    headerImgUrl: String
    likes: Int
    dislikes: Int
    liked: Boolean
    disliked: Boolean
    comments: Int
    createdAt: String
    user: UserSmall
  }

  type S3Payload {
    signedRequest: String!
    url: String!
  }

  type Mutation {
    createSignedRequestToAWS(filename: String!, filetype: String!): S3Payload!
  }
`;
