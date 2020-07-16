import { withApollo } from "../../../apollo/apollo";
import Layout from "../../../components/Layout";
import { CONFIRM_USER_MUTATION } from "../../../graphql/user/mutations/confirmUser";

const ConfirmUser = ({ response }) => (
  <Layout title="Confirm email." description="Confirm email GraphQL Forum.">
    <div
      className={`text-center ${
        response.success ? "bg-teal-400" : "bg-red-500"
      }`}
    >
      {response.message}
    </div>
  </Layout>
);

ConfirmUser.getInitialProps = async ({ query: { token }, apolloClient }) => {
  if (!token) {
    return { response: { message: "Something went wrong", success: false } };
  }
  try {
    await apolloClient.mutate({
      mutation: CONFIRM_USER_MUTATION,
      variables: { token },
    });
    return {
      response: { message: "Confirmed! You can now login!", success: true },
    };
  } catch (error) {
    return {
      response: { message: error.graphQLErrors[0]?.message, success: false },
    };
  }
};

export default withApollo({ ssr: true })(ConfirmUser);
