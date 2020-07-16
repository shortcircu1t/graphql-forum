import { withApollo } from "../../apollo/apollo";
import Layout from "../../components/Layout";
import redirect from "../../utils/redirect";
import Posts from "../../components/Posts";

interface Props {
  searchQuery: string;
}

const Post = ({ searchQuery }: Props) => {
  return (
    <Layout title="Searched Posts." description="GraphQL Forum searched posts.">
      <h1 style={{ fontSize: "30px" }} className="text-center ">
        Results
      </h1>
      <Posts searchQuery={searchQuery} />
    </Layout>
  );
};

Post.getInitialProps = async ({ query: { searchQuery }, ...ctx }) => {
  console.log(searchQuery);
  if (!searchQuery) {
    redirect(ctx, "/");
  }
  return { searchQuery };
};

export default withApollo({ ssr: true })(Post);
