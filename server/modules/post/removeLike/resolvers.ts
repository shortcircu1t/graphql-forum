import PostLike from "../../../models/PostLike";

export const resolvers = {
  Mutation: {
    removeLikePost: async (_, { postId }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const postLike = await PostLike.findOne({
          where: { postId, userId: user.id },
        });
        if (postLike) {
          await postLike.destroy();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
