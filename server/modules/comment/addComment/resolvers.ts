import { CommentSchema } from "../../../../utils/yupSchemas";
import Comment from "../../../models/Comment";
import Post from "../../../models/Post";

export const resolvers = {
  Mutation: {
    addComment: async (_, { postId, comment }, { session: { user } }) => {
      try {
        await CommentSchema.validate({ comment });
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const post = await Post.findOne({ where: { id: postId } });
        if (!post) {
          throw new Error("No such post.");
        }
        await Comment.create({
          postId,
          userId: user.id,
          comment,
        });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
