import Post from "../../../models/Post";

export const resolvers = {
  Mutation: {
    deletePost: async (_, { postId }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const post = await Post.findOne({ where: { id: postId } });
        if (post?.userId !== user.id) {
          throw new Error("Unauthorized.");
        }
        await post?.destroy();
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
