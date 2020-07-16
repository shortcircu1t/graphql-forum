import React from "react";
import { NextPage } from "next";
import { withApollo } from "../apollo/apollo";
import Layout from "../components/Layout";
import NewPostForm from "../components/Forms/NewPostForm";

const Home: NextPage = () => {
  return (
    <Layout
      title="Create new post."
      description="Create a post on GraphQL Forum."
    >
      <NewPostForm />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
