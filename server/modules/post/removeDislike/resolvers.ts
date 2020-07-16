import PostDislike from "../../../models/PostDislike";

export const resolvers = {
  Mutation: {
    removeDislikePost: async (_, { postId }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const postDislike = await PostDislike.findOne({
          where: { postId, userId: user.id },
        });
        if (postDislike) {
          await postDislike.destroy();
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
