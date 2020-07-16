import User from "../../../models/User";
import Comment from "../../../models/Comment";
import Sequelize from "sequelize";
import CommentLike from "../../../models/CommentLike";
import CommentDislike from "../../../models/CommentDislike";

export const resolvers = {
  Query: {
    comments: async (_, { pageSize, after, postId }, { session: { user } }) => {
      try {
        const newPageSize = pageSize < 100 ? pageSize : 100;
        let options: Sequelize.FindOptions = {
          where: {},
          limit: newPageSize,
          // include: [
          //   { model: CommentLike },
          //   { model: CommentDislike },
          //   { model: User },
          // ],
          include: [CommentLike, CommentDislike, User],
        };
        if (postId) {
          options = {
            ...options,
            where: { postId },
          };
        }
        if (after) {
          options = {
            ...options,
            where: { createdAt: { [Sequelize.Op.lt]: after } },
          };
        }
        if (after && postId) {
          options = {
            ...options,
            where: { createdAt: { [Sequelize.Op.lt]: after }, postId },
          };
        }

        let commentArr = await Comment.findAll({
          ...options,
          order: [["createdAt", "DESC"]],
        });
        const getNewCommentArr = async () =>
          Promise.all(
            commentArr.map(async (post) => {
              const plainComment: any = post.get({ plain: true });
              let commentLike;
              let commentDislike;
              if (user) {
                commentLike = await CommentLike.findOne({
                  where: { commentId: plainComment.id },
                });
                commentDislike = await CommentDislike.findOne({
                  where: { commentId: plainComment.id },
                });
              }
              return {
                ...plainComment,
                likes: plainComment.commentLikes.length,
                liked: !!commentLike,
                disliked: !!commentDislike,
                dislikes: plainComment.commentDislikes.length,
              };
            })
          );
        const newCommentArr = await getNewCommentArr();
        if (newCommentArr.length > 0) {
          return {
            cursor: newCommentArr[newCommentArr.length - 1].createdAt,
            comments: newCommentArr,
          };
        } else {
          return null;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
