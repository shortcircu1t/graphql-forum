import gql from "graphql-tag";

export const ADD_POST_MUTATION = gql`
  mutation addPost(
    $title: String!
    $body: String!
    $categoryId: String!
    $headerImgUrl: String
  ) {
    addPost(
      title: $title
      body: $body
      categoryId: $categoryId
      headerImgUrl: $headerImgUrl
    )
  }
`;
