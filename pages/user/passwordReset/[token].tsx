import { withApollo } from "../../../apollo/apollo";
import Layout from "../../../components/Layout";
import ResetPasswordForm from "../../../components/Forms/ResetPasswordForm";

const ConfirmUser = ({ token }) => (
  <Layout title="Reset password." description="Reset password GraphQL Forum.">
    {!token && <div className={`text-center ${"bg-red-500"}`}>'No token.'</div>}
    {token && <ResetPasswordForm token={token} />}
  </Layout>
);

ConfirmUser.getInitialProps = async ({ query: { token }, apolloClient }) => {
  return { token };
};

export default withApollo({ ssr: true })(ConfirmUser);
