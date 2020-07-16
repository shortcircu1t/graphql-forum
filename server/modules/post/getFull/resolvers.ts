import Post from "../../../models/Post";
import PostLike from "../../../models/PostLike";
import PostDislike from "../../../models/PostDislike";
import User from "../../../models/User";
import Comment from "../../../models/Comment";

export const resolvers = {
  Query: {
    getFullPost: async (_, { postId }, { session: { user } }) => {
      try {
        const post = await Post.findOne({
          where: { id: postId },
          include: [
            { model: PostLike },
            { model: PostDislike },
            { model: User },
            { model: Comment },
          ],
        });
        let liked;
        let disliked;
        if (user) {
          liked = await PostLike.findOne({
            where: { postId, userId: user.id },
          });
          disliked = await PostDislike.findOne({
            where: { postId, userId: user.id },
          });
        }
        const plainPost: any = post?.get({ plain: true });
        return {
          ...plainPost,
          likes: plainPost.postLikes.length,
          dislikes: plainPost.postDislikes.length,
          comments: plainPost.comments.length,
          liked: !!liked,
          disliked: !!disliked,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
