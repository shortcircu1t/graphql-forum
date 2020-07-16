import PostLike from "../../../models/PostLike";
import PostDislike from "../../../models/PostDislike";

export const resolvers = {
  Mutation: {
    likePost: async (_, { postId }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const postLike = await PostLike.findOne({
          where: { postId, userId: user.id },
        });
        const postDislike = await PostDislike.findOne({
          where: { postId, userId: user.id },
        });
        if (!postLike) {
          if (postDislike) await postDislike.destroy();
          await PostLike.create({ userId: user.id, postId });
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
