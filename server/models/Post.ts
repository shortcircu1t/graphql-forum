import {
  Model,
  DataTypes,
  Association,
  HasManyCountAssociationsMixin,
} from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";
import User from "./User";
import Comment from "./Comment";
import sequelize from "./index";
import Category from "./Category";
import PostLike from "./PostLike";
import PostDislike from "./PostDislike";

class Post extends Model {
  public id!: number;
  public userId!: number;
  public categoryId!: number;
  public title!: string;
  public body!: string;
  public headerImgUrl!: string;
  public postLikes?: any;
  public postDislikes?: any;
  public user?: any;
  public comments?: any;
  // public PostLikes?: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // public getUser!: BelongsToGetAssociationMixin<User>;
  public countPostLikes!: HasManyCountAssociationsMixin;
  public countPostDislikes!: HasManyCountAssociationsMixin;

  public static associations: {
    // comments: Association<Post, Comment>;
    // postLikes: Association<Post, PostLike>;
    // postDislikes: Association<Post, PostDislike>;
  };
}

Post.init(
  {
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    body: {
      type: new DataTypes.STRING(12800),
      allowNull: false,
    },
    headerImgUrl: {
      type: new DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  {
    modelName: "post",
    tableName: "posts",
    sequelize,
  }
);

export default Post;
