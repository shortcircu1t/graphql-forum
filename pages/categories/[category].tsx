import { withApollo } from "../../apollo/apollo";
import Layout from "../../components/Layout";
import Posts from "../../components/Posts";
import redirect from "../../utils/redirect";
import { CATEGORIES } from "../../config/constants";

interface Props {
  category?: string;
}

const Category = ({ category }: Props) => {
  return (
    <Layout
      activeLink={category}
      title={`Posts in ${category}`}
      description={`GraphQl Forum ${category} posts.`}
    >
      <Posts categoryId={category} />
    </Layout>
  );
};

Category.getInitialProps = async ({ query: { category }, ...ctx }) => {
  let isCategory = false;
  CATEGORIES.forEach((categoryStr) => {
    if (categoryStr === category) isCategory = true;
  });
  if (isCategory) return { category };
  if (!isCategory) redirect(ctx, "/");
  return { category };
};

export default withApollo({ ssr: true })(Category);
