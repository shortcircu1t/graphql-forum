import CommentLike from "../../../models/CommentLike";
import CommentDislike from "../../../models/CommentDislike";

export const resolvers = {
  Mutation: {
    dislikeComment: async (_, { commentId }, { session: { user } }) => {
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
        if (!commentDislike) {
          if (commentLike) await commentLike.destroy();
          await CommentDislike.create({ userId: user.id, commentId });
          return true;
        } else {
          await commentDislike.destroy();
          return true;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
