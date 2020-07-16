import { PostSchema } from "../../../../utils/yupSchemas";
import Post from "../../../models/Post";

export const resolvers = {
  Mutation: {
    addPost: async (
      _,
      { title, body, categoryId, headerImgUrl },
      { session: { user } }
    ) => {
      try {
        await PostSchema.validate({ title, body, headerImgUrl, categoryId });
        if (!user) {
          throw new Error("Unauthorized.");
        }
        await Post.create({
          title,
          body,
          userId: user.id,
          categoryId,
          headerImgUrl,
        });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
