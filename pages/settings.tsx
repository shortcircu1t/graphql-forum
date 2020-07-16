import Head from "next/head";
import React from "react";
import { NextPage } from "next";
import { withApollo } from "../apollo/apollo";
import Layout from "../components/Layout";
import AvatarForm from "../components/Forms/AvatarForm";
import UsernameForm from "../components/Forms/UsernameForm";
import NewPasswordForm from "../components/Forms/NewPasswordForm";

const Home: NextPage = () => {
  return (
    <Layout title="Settings" description="GraphQL Forum Settings">
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-8/12 mb-4 lg:w-full lg:flex-row justify-evenly">
          <AvatarForm />
          <UsernameForm />
        </div>
        <NewPasswordForm />
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Home);
