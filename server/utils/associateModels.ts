import sequelize from "../models";
import User from "../models/User";
import Comment from "../models/Comment";
import Post from "../models/Post";
import Category from "../models/Category";
import PostLike from "../models/PostLike";
import PostDislike from "../models/PostDislike";
import CommentLike from "../models/CommentLike";
import CommentDislike from "../models/CommentDislike";

export function associateModels() {
  User.hasMany(Post);
  User.hasMany(Comment);
  User.hasMany(PostLike);
  User.hasMany(PostDislike);
  User.hasMany(CommentLike);
  User.hasMany(CommentDislike);

  Post.hasMany(Comment);
  Post.hasMany(PostLike);
  Post.hasMany(PostDislike);
  Post.belongsTo(User);
  Post.belongsTo(Category);

  PostLike.belongsTo(User);
  PostLike.belongsTo(Post);

  PostDislike.belongsTo(User);
  PostDislike.belongsTo(Post);

  Comment.hasMany(CommentLike);
  Comment.hasMany(CommentDislike);
  Comment.belongsTo(User);
  Comment.belongsTo(Post);

  CommentLike.belongsTo(User);
  CommentLike.belongsTo(Post);

  CommentDislike.belongsTo(User);
  CommentDislike.belongsTo(Post);

  sequelize.models.User = User;
  sequelize.models.Comment = Comment;
  sequelize.models.Category = Category;
  sequelize.models.Post = Post;
  sequelize.models.PostLike = PostLike;
  sequelize.models.PostDislike = PostDislike;
  sequelize.models.CommentLike = CommentLike;
  sequelize.models.CommentDislike = CommentDislike;
}
