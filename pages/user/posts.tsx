import Posts from "../../components/Posts";
import Layout from "../../components/Layout";
import { withApollo } from "../../apollo/apollo";

const UserPosts = ({}) => {
  return (
    <Layout title="Your posts." description="GraphQL Forum User Posts.">
      <p className="text-2xl text-center">These are posts you created.</p>
      <Posts personal={true} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(UserPosts);
