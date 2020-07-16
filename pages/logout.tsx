import { LOGOUT_MUTATION } from "../graphql/user/mutations/logout";
import redirect from "../utils/redirect";
import { withApollo } from "../apollo/apollo";

function Logout() {
  return null;
}

Logout.getInitialProps = async ({ apolloClient, ...ctx }) => {
  try {
    const { res } = ctx;
    await apolloClient.mutate({ mutation: LOGOUT_MUTATION });
    await apolloClient.resetStore();
    res.clearCookie("sid");
    redirect(ctx, "/");
    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default withApollo({ ssr: true })(Logout);
