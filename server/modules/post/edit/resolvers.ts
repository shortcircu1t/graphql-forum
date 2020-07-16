import Post from "../../../models/Post";
import { PostSchema } from "../../../../utils/yupSchemas";

export const resolvers = {
  Mutation: {
    editPost: async (
      _,
      { title, body, headerImgUrl, postId },
      { session: { user } }
    ) => {
      try {
        await PostSchema.validate({ title, body, headerImgUrl });
        if (!user) {
          throw new Error("Unauthorized.");
        }
        const post = await Post.findOne({
          where: {
            id: postId,
          },
        });
        if (!post) {
          throw new Error("No such post.");
        }
        if (user.id !== post?.userId) {
          throw new Error("Unauthorized.");
        }
        post.title = title;
        post.body = body;
        if (headerImgUrl) {
          post.headerImgUrl = headerImgUrl;
        }
        await post.save();
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
