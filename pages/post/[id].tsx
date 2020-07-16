import { withApollo } from "../../apollo/apollo";
import Layout from "../../components/Layout";
import redirect from "../../utils/redirect";
import { useQuery } from "@apollo/react-hooks";
import { GET_FULL_POST_QUERY } from "../../graphql/post/queries/getFullPost";
import PostFull from "../../components/PostFull";

interface Props {
  id: string;
}

const Post = ({ id }: Props) => {
  const { data, error, loading } = useQuery(GET_FULL_POST_QUERY, {
    variables: { postId: +id },
  });
  return (
    <Layout
      title={data ? data.getFullPost.title : ""}
      description={data ? data.getFullPost.body.slice(0, 30) : ""}
    >
      {data?.getFullPost && <PostFull post={data.getFullPost} />}
    </Layout>
  );
};

Post.getInitialProps = async ({ query: { id }, ...ctx }) => {
  if (!+id) {
    redirect(ctx, "/");
  }
  return { id };
};

export default withApollo({ ssr: true })(Post);
