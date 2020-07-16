import { Model, DataTypes } from "sequelize";
import sequelize from "./index";
import CommentLike from "./CommentLike";
import CommentDislike from "./CommentDislike";

class Comment extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public comment!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment: {
      type: new DataTypes.STRING(120),
      allowNull: false,
    },
  },
  {
    modelName: "comment",
    tableName: "comments",
    sequelize,
  }
);

export default Comment;
