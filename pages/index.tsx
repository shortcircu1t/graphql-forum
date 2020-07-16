import React from "react";
import { NextPage } from "next";
import { withApollo } from "../apollo/apollo";
import Layout from "../components/Layout";
import Posts from "../components/Posts";

const Home: NextPage = () => {
  return (
    <Layout
      title="GraphQL Forum"
      description="Forum built with GraphQL, NextJS and Apollo Client."
    >
      <Posts />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
