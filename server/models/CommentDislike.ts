import { Model, DataTypes } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";
import User from "./User";
import sequelize from "./index";

class CommentDislike extends Model {
  public id!: number;
  public userId!: number;
  public commentId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentDislike.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    modelName: "commentDislike",
    tableName: "comment_dislikes",
    sequelize,
  }
);

export default CommentDislike;
