import CommentLike from "../../../models/CommentLike";
import CommentDislike from "../../../models/CommentDislike";

export const resolvers = {
  Mutation: {
    likeComment: async (_, { commentId }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const commentLike = await CommentLike.findOne({
          where: { commentId, userId: user.id },
        });
        const commentDislike = await CommentDislike.findOne({
          where: { commentId, userId: user.id },
        });
        if (!commentLike) {
          if (commentDislike) await commentDislike.destroy();
          await CommentLike.create({ userId: user.id, commentId });
          return true;
        } else {
          await commentLike.destroy();
          return true;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
