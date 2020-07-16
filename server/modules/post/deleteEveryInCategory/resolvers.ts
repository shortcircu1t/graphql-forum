import Post from "../../../models/Post";

export const resolvers = {
  Mutation: {
    deleteEvery: async (_, { categoryId }, { session: { user } }) => {
      try {
        const post = await Post.destroy({ where: { categoryId } });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
