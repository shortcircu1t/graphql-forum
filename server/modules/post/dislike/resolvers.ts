import PostDislike from "../../../models/PostDislike";
import PostLike from "../../../models/PostLike";

export const resolvers = {
  Mutation: {
    dislikePost: async (_, { postId }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const postDislike = await PostDislike.findOne({
          where: { postId, userId: user.id },
        });
        const postLike = await PostLike.findOne({
          where: { postId, userId: user.id },
        });
        if (!postDislike) {
          if (postLike) await postLike.destroy();
          await PostDislike.create({ userId: user.id, postId });
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
