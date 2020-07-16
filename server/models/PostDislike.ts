import { Model, DataTypes } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";
import User from "./User";
import sequelize from "./index";

class PostDislike extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public vote!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostDislike.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    modelName: "postDislike",
    tableName: "post_dislikes",
    sequelize,
  }
);

export default PostDislike;
