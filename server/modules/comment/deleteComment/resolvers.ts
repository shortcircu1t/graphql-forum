import Comment from "../../../models/Comment";

export const resolvers = {
  Mutation: {
    deleteComment: async (_, { commentId }, { session: { user } }) => {
      try {
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const comment = await Comment.findOne({ where: { id: commentId } });
        if (comment?.userId !== user.id) {
          throw new Error("Unauthorized.");
        }
        await comment?.destroy();
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
