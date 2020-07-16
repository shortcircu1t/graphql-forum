import Post from "../../../models/Post";
import PostLike from "../../../models/PostLike";
import PostDislike from "../../../models/PostDislike";
import User from "../../../models/User";
import Comment from "../../../models/Comment";
import Sequelize from "sequelize";

export const resolvers = {
  Query: {
    posts: async (
      _,
      { pageSize, after, categoryId, personal, searchQuery },
      { session: { user } }
    ) => {
      try {
        const newPageSize = pageSize < 100 ? pageSize : 100;
        let options = {
          where: {},
          limit: newPageSize,
          include: [PostLike, PostDislike, User, Comment],
        };
        if (categoryId) {
          options = {
            where: { categoryId },
            limit: newPageSize,
            include: [PostLike, PostDislike, User, Comment],
          };
        }
        if (after) {
          options = {
            where: { createdAt: { [Sequelize.Op.lt]: after } },
            limit: newPageSize,
            include: [PostLike, PostDislike, User, Comment],
          };
        }
        if (after && categoryId) {
          options = {
            where: { createdAt: { [Sequelize.Op.lt]: after }, categoryId },
            limit: newPageSize,
            include: [PostLike, PostDislike, User, Comment],
          };
        }
        if (personal && user) {
          options = {
            ...options,
            where: { ...options.where, userId: user.id },
          };
        }
        if (searchQuery) {
          options = {
            ...options,
            where: {
              ...options.where,
              title: { [Sequelize.Op.like]: "%" + searchQuery + "%" },
            },
          };
        }
        let postArr = await Post.findAll({
          ...options,
          order: [["createdAt", "DESC"]],
        });
        postArr = postArr.map((post) => {
          const plainPost: any = post.get({ plain: true });
          return {
            ...plainPost,
            body: plainPost.body.slice(0, 100),
            likes: plainPost.postLikes.length,
            dislikes: plainPost.postDislikes.length,
            comments: plainPost.comments.length,
          };
        });
        if (postArr.length > 0) {
          return {
            cursor: postArr[postArr.length - 1].createdAt,
            posts: postArr,
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
