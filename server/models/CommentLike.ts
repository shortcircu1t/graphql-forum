import { Model, DataTypes } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";
import User from "./User";
import sequelize from "./index";

class CommentLike extends Model {
  public id!: number;
  public userId!: number;
  public commentId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentLike.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    modelName: "commentLike",
    tableName: "comment_likes",
    sequelize,
  }
);

export default CommentLike;
